import json
import os
import logging
from typing import Dict, List, Any

try:
    from .config import OPENROUTER_API_KEY, OPENROUTER_MODEL
except ImportError:
    from config import OPENROUTER_API_KEY, OPENROUTER_MODEL

RULES_PATH = os.path.join(os.path.dirname(__file__), 'rules', 'ingredients.json')
with open(RULES_PATH, 'r', encoding='utf-8') as f:
    KNOWN_INGREDIENTS = json.load(f)

# ---------------------------------------------------------------------------
# OpenRouter client initialisation
# ---------------------------------------------------------------------------
client = None
if OPENROUTER_API_KEY:
    try:
        from openai import OpenAI
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=OPENROUTER_API_KEY,
        )
        print("[checker] OpenRouter client initialised successfully.")
    except Exception as e:
        logging.error(f"[checker] Failed to initialise OpenRouter client: {e}")
        print(f"[checker] OpenRouter client init FAILED: {e}")
else:
    print("[checker] WARNING: OPENROUTER_API_KEY is empty — AI disabled.")


# ---------------------------------------------------------------------------
# Normalisation helpers
# ---------------------------------------------------------------------------
def normalise(text: str) -> str:
    """Lowercase, strip whitespace, remove surrounding quotes."""
    return text.lower().strip().strip('"').strip("'")


def singular(text: str) -> str:
    """Very simple singular: strip trailing 's' unless word ends in 'ss'."""
    if text.endswith('s') and not text.endswith('ss') and len(text) > 2:
        return text[:-1]
    return text


# ---------------------------------------------------------------------------
# Main check function
# ---------------------------------------------------------------------------
def check_product(
    product_name: str,
    ingredients: List[str],
    diet: str,
    also_avoid: List[str]
) -> Dict[str, Any]:

    diet = diet.lower().strip()
    custom_avoid = [normalise(a) for a in also_avoid if a.strip()]

    flagged_ingredients: List[Dict] = []
    unknown_ingredients: List[str] = []
    ai_error = False

    # -----------------------------------------------------------------------
    print("=" * 50)
    print("CHECK PRODUCT")
    print(f"Product : {product_name}")
    print(f"Diet    : {diet}")
    print(f"Ingredients received ({len(ingredients)}):")
    for i in ingredients:
        print(f"  - {i}")
    # -----------------------------------------------------------------------

    for original_ing in ingredients:
        ing_norm = normalise(original_ing)
        if not ing_norm:
            continue

        ing_sing = singular(ing_norm)

        # 1. Custom avoid list
        matched_custom = False
        for avoid in custom_avoid:
            if avoid in ing_norm:
                flagged_ingredients.append({
                    "ingredient": original_ing,
                    "status": "conflicts",
                    "reason": f'Matches your custom "also avoid" item: "{avoid}".',
                    "source": "custom"
                })
                matched_custom = True
                break
        if matched_custom:
            continue

        # 2. Deterministic rules
        matched_rule = None
        for rule in KNOWN_INGREDIENTS:
            rule_name = normalise(rule['name'])
            aliases = [normalise(a) for a in rule.get('aliases', [])]
            if rule_name in (ing_norm, ing_sing) or ing_norm in aliases or ing_sing in aliases:
                matched_rule = rule
                break

        if matched_rule:
            conflicts_with = [d.lower() for d in matched_rule.get('conflicts_with', [])]
            if diet in conflicts_with:
                status = "conflicts"
                reason = matched_rule.get('reason', f"Conflicts with {diet} diet.")
            else:
                status = "fits" if matched_rule.get('status') == "conflicts" else matched_rule.get('status', 'fits')
                reason = "Generally safe for this diet." if matched_rule.get('status') == "conflicts" else matched_rule.get('reason', "Plant-derived or generally safe for this diet.")

            print(f"  [rules] {original_ing} -> {status}")
            flagged_ingredients.append({
                "ingredient": original_ing,
                "status": status,
                "reason": reason,
                "source": "rules"
            })
            continue

        # 3. Unknown — needs Gemini
        print(f"  [unknown] {original_ing} -> sending to Gemini")
        unknown_ingredients.append(original_ing)

    # -----------------------------------------------------------------------
    print(f"\nDeterministic resolved: {len(flagged_ingredients)}")
    print(f"Unknown (needs Gemini): {unknown_ingredients}")
    # -----------------------------------------------------------------------

    # 3. Batch OpenRouter call for unknown ingredients only
    if unknown_ingredients:
        if not client:
            ai_error = True
            print("[OpenRouter] SKIPPED — client not available (check API key).")
            for ing in unknown_ingredients:
                flagged_ingredients.append({
                    "ingredient": ing,
                    "status": "doubtful",
                    "reason": "AI classification unavailable — could not determine ingredient source.",
                    "source": "system"
                })
        else:
            print(f"[OpenRouter] Calling OpenRouter for {len(unknown_ingredients)} ingredient(s)...")
            try:
                from tenacity import retry, stop_after_attempt, wait_exponential

                unknown_ingredients_with_ids = [{"id": str(idx), "name": ing} for idx, ing in enumerate(unknown_ingredients)]
                ingredients_json_str = json.dumps(unknown_ingredients_with_ids)
                prompt = f"""You are classifying food ingredients for a dietary preference check.

Diet: {diet}

Ingredients to classify:
{ingredients_json_str}

Rules:
- Classify each ingredient independently.
- "fits": clearly plant-derived, mineral-derived, or otherwise safe for the diet.
- "conflicts": clearly animal-derived or otherwise prohibited for the diet.
- "doubtful": ONLY when the actual source genuinely cannot be determined (e.g., "natural flavors" which could be animal or plant).
- Do NOT mark something doubtful just because it has a generic name. Vitamins added to cereal are usually plant/synthetic — classify them "fits" for vegetarian unless you have a specific reason for conflict.
- Common synthetic additives (citric acid, ascorbic acid, tocopherol) are generally "fits".

Return ONLY valid JSON in this exact format:
{{
  "results": [
    {{"id": "<id>", "status": "fits|doubtful|conflicts", "reason": "<short explanation>"}}
  ]
}}"""

                @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
                def call_openrouter_with_retry():
                    return client.chat.completions.create(
                        model=OPENROUTER_MODEL,
                        messages=[{"role": "user", "content": prompt}]
                    )

                response = call_openrouter_with_retry()

                print(f"[OpenRouter] Response received.")
                raw_text = response.choices[0].message.content.strip()
                # Clean up potential markdown blocks even with response_format
                if raw_text.startswith("```json"):
                    raw_text = raw_text[7:]
                if raw_text.startswith("```"):
                    raw_text = raw_text[3:]
                if raw_text.endswith("```"):
                    raw_text = raw_text[:-3]
                raw_text = raw_text.strip()
                
                print(f"[OpenRouter] Raw response (first 500 chars): {raw_text[:500]}")

                result = json.loads(raw_text)
                ai_results = {str(item.get("id")): item for item in result.get("results", []) if "id" in item}

                for idx, ing in enumerate(unknown_ingredients):
                    ing_id = str(idx)
                    if ing_id in ai_results:
                        res = ai_results[ing_id]
                        status = res.get('status', 'doubtful').lower()
                        if status not in ['fits', 'doubtful', 'conflicts']:
                            status = 'doubtful'
                        print(f"  [OpenRouter] {ing} -> {status}")
                        flagged_ingredients.append({
                            "ingredient": ing,
                            "status": status,
                            "reason": res.get('reason', 'Classified by AI.'),
                            "source": "openrouter"
                        })
                    else:
                        print(f"  [OpenRouter] {ing} -> NOT in response, marking doubtful")
                        flagged_ingredients.append({
                            "ingredient": ing,
                            "status": "doubtful",
                            "reason": "AI did not return a classification for this ingredient.",
                            "source": "openrouter"
                        })

            except Exception as e:
                ai_error = True
                logging.error(f"[OpenRouter] Request failed: {e}")
                print(f"[OpenRouter] ERROR: {e}")
                for ing in unknown_ingredients:
                    flagged_ingredients.append({
                        "ingredient": ing,
                        "status": "doubtful",
                        "reason": "AI classification failed after multiple attempts — please verify this ingredient manually.",
                        "source": "error"
                    })

    # Restore original ingredient order
    flagged_map = {item['ingredient']: item for item in flagged_ingredients}
    ordered_flagged = [flagged_map[ing] for ing in ingredients if ing in flagged_map]

    # Overall verdict
    verdict = "fits"
    if any(item["status"] == "conflicts" for item in ordered_flagged):
        verdict = "conflicts"
    elif any(item["status"] == "doubtful" for item in ordered_flagged):
        verdict = "doubtful"

    print(f"\nFinal verdict: {verdict}")
    print(f"ai_error: {ai_error}")
    print("=" * 50)

    return {
        "verdict": verdict,
        "product_name": product_name,
        "flagged_ingredients": ordered_flagged,
        "ai_error": ai_error
    }
