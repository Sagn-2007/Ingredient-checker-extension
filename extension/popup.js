const API_URL = "http://localhost:8000/check-product";

const TRANSLATIONS = {
  English: {
    fits: "🟢 FITS",
    fits_desc: "No known conflicts detected.",
    doubtful: "🟡 DOUBTFUL",
    doubtful_desc: "Some ingredients need verification.",
    conflicts: "🔴 DOES NOT FIT",
    conflicts_desc: "A conflicting ingredient was detected.",
    checked_count: "ingredients checked",
    fits_count: "Fit",
    doubtful_count: "Need verification",
    conflicts_count: "Conflicts",
    suggested_action_doubtful_title: "💡 WHAT SHOULD I DO?",
    suggested_action_doubtful: "One or more ingredients require verification. Check the manufacturer's current ingredient information before relying on this result.",
    suggested_action_conflict_title: "⚠️ WHY IT DOESN'T FIT",
    suggested_action_conflict: "The following ingredient conflicts with your selected dietary profile. Consider choosing another product.",
    reason_label: "Why?",
    source_rules: "✓ Rule database",
    source_gemini: "🤖 AI Model",
    source_custom: "👤 Custom avoid list",
    source_error: "⚠️ Error",
    allergen_title: "⚠️ ALLERGEN INFORMATION",
    contains_label: "Contains:",
    may_contain_label: "May contain:",
    analysis_title: "Ingredient analysis",
    how_it_works: "🔍 HOW IT WORKS",
    manual_fallback_msg: "We couldn't automatically detect the ingredients.",
    manual_label: "Paste the ingredient list below:",
    scan_history: "📋 SCAN HISTORY",
    current_product: "🛒 CURRENT PRODUCT",
    product_unavailable: "Product name unavailable",
    check_btn: "🔍 Check Product",
    analyze_btn: "Analyze Ingredients",
    diet_label: "Diet:",
    also_avoid_label: "Also avoid (comma-separated):",
    language_label: "Language:",
    ingredient_source_title: "🔍 Ingredient source",
    api_error_title: "🟡 CHECK INGREDIENTS",
    api_error_desc: "AI analysis is temporarily unavailable.",
    api_error_action: "Please verify unknown ingredients manually."
  },
  Hindi: {
    fits: "🟢 अनुकूल",
    fits_desc: "कोई ज्ञात प्रतिकूल सामग्री नहीं मिली।",
    doubtful: "🟡 संदिग्ध",
    doubtful_desc: "कुछ सामग्रियों के सत्यापन की आवश्यकता है।",
    conflicts: "🔴 अनुकूल नहीं",
    conflicts_desc: "एक प्रतिकूल सामग्री पाई गई।",
    checked_count: "जांची गई सामग्रियां",
    fits_count: "अनुकूल",
    doubtful_count: "सत्यापन आवश्यक",
    conflicts_count: "प्रतिकूल",
    suggested_action_doubtful_title: "💡 मुझे क्या करना चाहिए?",
    suggested_action_doubtful: "एक या अधिक सामग्रियों के सत्यापन की आवश्यकता है। इस परिणाम पर भरोसा करने से पहले निर्माता की वर्तमान सामग्री जानकारी की जांच करें।",
    suggested_action_conflict_title: "⚠️ यह अनुकूल क्यों नहीं है",
    suggested_action_conflict: "निम्नलिखित सामग्री आपके चयनित आहार प्रोफ़ाइल के प्रतिकूल है। किसी अन्य उत्पाद को चुनने पर विचार करें।",
    reason_label: "क्यों?",
    source_rules: "✓ नियम डेटाबेस",
    source_gemini: "🤖 जेमिनी एआई",
    source_custom: "👤 कस्टम सूची",
    source_error: "⚠️ त्रुटि",
    allergen_title: "⚠️ एलर्जी की जानकारी",
    contains_label: "शामिल हैं:",
    may_contain_label: "शामिल हो सकते हैं:",
    analysis_title: "सामग्री विश्लेषण",
    how_it_works: "🔍 यह कैसे काम करता है",
    manual_fallback_msg: "हम स्वचालित रूप से सामग्रियों का पता नहीं लगा सके।",
    manual_label: "कृपया नीचे सामग्री सूची पेस्ट करें:",
    scan_history: "📋 स्कैन इतिहास",
    current_product: "🛒 वर्तमान उत्पाद",
    product_unavailable: "उत्पाद का नाम उपलब्ध नहीं है",
    check_btn: "🔍 उत्पाद जांचें",
    analyze_btn: "सामग्री का विश्लेषण करें",
    diet_label: "आहार:",
    also_avoid_label: "यह भी बचें (अल्पविराम से अलग करें):",
    language_label: "भाषा:",
    ingredient_source_title: "🔍 सामग्री स्रोत",
    api_error_title: "🟡 सामग्री जांचें",
    api_error_desc: "एआई विश्लेषण अस्थायी रूप से अनुपलब्ध है।",
    api_error_action: "कृपया अज्ञात सामग्रियों को मैन्युअल रूप से सत्यापित करें।"
  },
  Bengali: {
    fits: "🟢 উপযুক্ত",
    fits_desc: "কোনো পরিচিত সমস্যাযুক্ত উপাদান পাওয়া যায়নি।",
    doubtful: "🟡 সন্দেহজনক",
    doubtful_desc: "কিছু উপাদানের যাচাই প্রয়োজন।",
    conflicts: "🔴 উপযুক্ত নয়",
    conflicts_desc: "একটি সমস্যাযুক্ত উপাদান পাওয়া গেছে।",
    checked_count: "যাচাই করা উপাদান",
    fits_count: "উপযুক্ত",
    doubtful_count: "যাচাই প্রয়োজন",
    conflicts_count: "সমস্যাযুক্ত",
    suggested_action_doubtful_title: "💡 আমার কী করা উচিত?",
    suggested_action_doubtful: "একাধিক উপাদানের যাচাই প্রয়োজন। এই ফলাফলের উপর নির্ভর করার আগে প্রস্তুতকারকের বর্তমান উপাদান তথ্য পরীক্ষা করুন।",
    suggested_action_conflict_title: "⚠️ এটি কেন উপযুক্ত নয়",
    suggested_action_conflict: "নিম্নলিখিত উপাদানটি আপনার নির্বাচিত ডায়েটের সাথে সাংঘর্ষিক। অন্য একটি পণ্য নির্বাচন করার কথা বিবেচনা করুন।",
    reason_label: "কেন?",
    source_rules: "✓ নিয়ম ডেটাবেস",
    source_gemini: "🤖 জেমিনি এআই",
    source_custom: "👤 কাস্টম তালিকা",
    source_error: "⚠️ ত্রুটি",
    allergen_title: "⚠️ অ্যালার্জেন তথ্য",
    contains_label: "রয়েছে:",
    may_contain_label: "থাকতে পারে:",
    analysis_title: "উপাদান বিশ্লেষণ",
    how_it_works: "🔍 এটি কীভাবে কাজ করে",
    manual_fallback_msg: "আমরা স্বয়ংক্রিয়ভাবে উপাদানগুলি সনাক্ত করতে পারিনি।",
    manual_label: "নীচে উপাদান তালিকা পেস্ট করুন:",
    scan_history: "📋 স্ক্যান ইতিহাস",
    current_product: "🛒 বর্তমান পণ্য",
    product_unavailable: "পণ্যের নাম উপলব্ধ নয়",
    check_btn: "🔍 পণ্য পরীক্ষা করুন",
    analyze_btn: "উপাদান বিশ্লেষণ করুন",
    diet_label: "ডায়েট:",
    also_avoid_label: "এটিও এড়িয়ে চলুন (কমা দিয়ে আলাদা করুন):",
    language_label: "ভাষা:",
    ingredient_source_title: "🔍 উপাদান উৎস",
    api_error_title: "🟡 উপাদান পরীক্ষা করুন",
    api_error_desc: "এআই বিশ্লেষণ সাময়িকভাবে অনুপলব্ধ।",
    api_error_action: "অনুগ্রহ করে অজানা উপাদানগুলি ম্যানুয়ালি যাচাই করুন।"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadHistory();

  document.getElementById("save-profile-btn").addEventListener("click", saveProfile);
  document.getElementById("check-btn").addEventListener("click", checkProductFromPage);
  document.getElementById("manual-check-btn").addEventListener("click", checkProductManual);
  
  document.getElementById("clear-history-btn").addEventListener("click", () => {
    if(confirm("Clear all history?")) {
      chrome.storage.local.set({ history: [] }, () => {
        loadHistory();
      });
    }
  });
});

function applyTranslations(language) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  
  const el = (id, text) => {
    const element = document.getElementById(id);
    if(element) element.innerText = text;
  };
  
  el("ui-how-it-works-title", t.how_it_works);
  el("ui-manual-fallback-msg", t.manual_fallback_msg);
  el("ui-manual-label", t.manual_label);
  el("ui-scan-history", t.scan_history);
  el("ui-current-product-title", t.current_product);
  
  if (document.getElementById("current-product-name").innerText === TRANSLATIONS.English.product_unavailable) {
      el("current-product-name", t.product_unavailable);
  }

  el("check-btn", t.check_btn);
  el("manual-check-btn", t.analyze_btn);
  
  el("ui-diet-label", t.diet_label);
  el("ui-also-avoid-label", t.also_avoid_label);
  el("ui-language-label", t.language_label);
  
  el("ui-allergen-title", t.allergen_title);
  el("ui-contains-label", t.contains_label);
  el("ui-may-contain-label", t.may_contain_label);
  
  el("ui-ingredient-analysis", t.analysis_title);
  el("ui-analysis-source-title", t.ingredient_source_title);
}

function loadProfile() {
  chrome.storage.local.get(["diet", "alsoAvoid", "language"], (res) => {
    if (res.diet) document.getElementById("diet-select").value = res.diet;
    if (res.alsoAvoid) document.getElementById("custom-avoid").value = res.alsoAvoid;
    if (res.language) {
        document.getElementById("lang-select").value = res.language;
        applyTranslations(res.language);
    }
  });
}

function saveProfile() {
  const diet = document.getElementById("diet-select").value;
  const alsoAvoid = document.getElementById("custom-avoid").value;
  const language = document.getElementById("lang-select").value;

  chrome.storage.local.set({ diet, alsoAvoid, language }, () => {
    const status = document.getElementById("save-status");
    status.classList.remove("hidden");
    setTimeout(() => status.classList.add("hidden"), 2000);
    applyTranslations(language);
  });
}

async function checkProductFromPage() {
  hideErrors();
  hideResult();
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    const tab = tabs[0];
    
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          let productName = "Unknown Product";
          const titleSelectors = ['#productTitle', 'h1', '[property="og:title"]', 'meta[itemprop="name"]', '[itemprop="name"]', '.product-title'];
          for (const selector of titleSelectors) {
            const el = document.querySelector(selector);
            if (el) {
              if (el.tagName.toLowerCase() === 'meta') { productName = el.getAttribute('content'); }
              else { productName = el.innerText || el.textContent; }
              if (productName) break;
            }
          }


          // ---------------------------------------------------------------
          // ALLERGEN EXTRACTION — strict, contextual, never from body text
          // Returns null if no valid allergen block found
          // ---------------------------------------------------------------
          let allergens = null;
          let ingredientsStr = "";

          const DISCLAIMER_WORDS = ['website', ' app ', 'shown on our', 'packaging may', 'click here', 'learn more', 'may differ'];

          function isDisclaimer(text) {
            const lower = text.toLowerCase();
            return DISCLAIMER_WORDS.some(w => lower.includes(w));
          }

          function parseAllergenItems(text) {
            const cleaned = text
              .replace(/^(?:contains?|may contain|allergen[^:]*)[:\s]*/i, '')
              .replace(/[.;]+$/, '')
              .trim();
            if (!cleaned || isDisclaimer(cleaned)) return [];
            return cleaned
              .split(/,|\band\b|&/)
              .map(s => s.trim().replace(/[.;]+$/, ''))
              .filter(s => s.length > 1 && s.length < 60 && !isDisclaimer(s));
          }

          // Only scan known product-info containers — NOT document.body
          const ALLERGEN_CONTAINERS = [
            '#important-information',
            '#importantInformation',
            '#productDetails',
            '#prodDetails',
            '#detail-bullets',
            '#feature-bullets',
            '[data-feature-name="productDescription"]',
            '#dpx-ingredients-desktop_feature_div',
          ];

          let productSectionText = "";
          for (const sel of ALLERGEN_CONTAINERS) {
            const el = document.querySelector(sel);
            if (el) productSectionText += (el.innerText || "") + "\n";
          }

          if (productSectionText.trim().length > 20) {
            const lines = productSectionText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const HEADING_RE = /^(?:ALLERGEN DECLARATION|ALLERGEN INFORMATION|ALLERGY INFORMATION|ALLERGY ADVICE)\s*[:\-]?\s*$/i;
            const CONTAINS_RE = /^CONTAINS?\s*[:\-]\s*(.+)/i;
            const MAY_CONTAIN_RE = /^MAY CONTAIN\s*[:\-]\s*(.+)/i;
            const COMBINED_RE = /CONTAINS?\s*[:\-]\s*([^.]+)\.?\s*MAY CONTAIN\s*[:\-]\s*([^.]+)/i;

            let containsList = [];
            let mayContainList = [];
            let foundBlock = false;

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              if (isDisclaimer(line)) continue;

              const combined = line.match(COMBINED_RE);
              if (combined) {
                containsList = parseAllergenItems(combined[1]);
                mayContainList = parseAllergenItems(combined[2]);
                foundBlock = true;
                break;
              }

              if (HEADING_RE.test(line)) {
                foundBlock = true;
                for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
                  const nl = lines[j];
                  if (isDisclaimer(nl)) continue;
                  const cm = nl.match(CONTAINS_RE);
                  if (cm && !/MAY CONTAIN/i.test(nl)) containsList = parseAllergenItems(cm[1]);
                  const mcm = nl.match(MAY_CONTAIN_RE);
                  if (mcm) mayContainList = parseAllergenItems(mcm[1]);
                }
                break;
              }

              const cm = line.match(CONTAINS_RE);
              if (cm && !/MAY CONTAIN/i.test(line) && !isDisclaimer(line) && line.length < 200) {
                containsList = parseAllergenItems(cm[1]);
                foundBlock = true;
              }
              const mcm = line.match(MAY_CONTAIN_RE);
              if (mcm && !isDisclaimer(line) && line.length < 200) {
                mayContainList = parseAllergenItems(mcm[1]);
                foundBlock = true;
              }
            }

            if (foundBlock && (containsList.length > 0 || mayContainList.length > 0)) {
              allergens = { contains: containsList, may_contain: mayContainList };
            }
          }
          // allergens stays null if nothing was confidently found

          // Ingredient extraction
          let fullText = "";
          const importantBox = document.querySelector('#important-information, #importantInformation');
          if (importantBox) {
              fullText = importantBox.innerText || "";
          } else {
              fullText = document.body.innerText || "";
          }
          
          let match = fullText.match(/Ingredients?:?([\s\S]*?)(?:\n\n|\n[A-Z][a-z]+:|$)/i);
          if (match && match[1] && match[1].trim().length > 10) {
              ingredientsStr = match[1].trim();
          }

          if (!ingredientsStr) {
             const allElements = document.querySelectorAll('div, p, span, h1, h2, h3, h4, h5, h6, li, td, th');
              for (const el of allElements) {
                  const text = (el.innerText || "").trim();
                  const lowerText = text.toLowerCase();
                  if (text.length > 2000) continue;

                  if ((lowerText.startsWith('ingredients:') || lowerText.startsWith('ingredients\n')) && text.length > 20) {
                      ingredientsStr = text.substring(text.toLowerCase().indexOf('ingredients') + 11).replace(/^:/, '').trim();
                      break;
                  }
                  if (lowerText === 'ingredients' || lowerText === 'ingredients:' || lowerText === 'ingredient list') {
                      let next = el.nextElementSibling;
                      if (next && next.innerText && next.innerText.trim().length > 10) {
                          ingredientsStr = next.innerText.trim();
                          break;
                      }
                      let parentNext = el.parentElement ? el.parentElement.nextElementSibling : null;
                      if (parentNext && parentNext.innerText && parentNext.innerText.trim().length > 10) {
                          ingredientsStr = parentNext.innerText.trim();
                          break;
                      }
                  }
              }
          }

          let isCategoryPage = false;
          if (document.querySelector('.s-search-results, [data-component-type="s-search-result"], .s-result-list')) {
              isCategoryPage = true;
          }
          
          let isFood = false;
          let foodScore = 0;
          if (ingredientsStr) {
              foodScore += 10;
          }
          if (allergens) {
              foodScore += 5;
          }
          
          const foodKeywords = ['food', 'grocery', 'cereal', 'snack', 'biscuit', 'cookie', 'chocolate', 'chips', 'noodle', 'pasta', 'rice', 'flour', 'bread', 'sauce', 'ketchup', 'spice', 'masala', 'tea', 'coffee', 'juice', 'milk', 'beverage', 'drink', 'protein', 'bar', 'candy', 'sweet', 'frozen', 'ready to eat', 'ingredient', 'nutrition', 'calorie', 'allergen', 'pantry', 'jam', 'peanut butter', 'grocery'];
          const nonFoodKeywords = ['laptop', 'phone', 'mobile', 'smartphone', 'tablet', 'television', 'tv', 'monitor', 'keyboard', 'mouse', 'headphone', 'earbud', 'camera', 'charger', 'cable', 'shirt', 'shoe', 'jeans', 'watch', 'bag', 'furniture', 'sofa', 'chair', 'detergent', 'shampoo', 'soap', 'cosmetic', 'perfume', 'book', 'toy', 'appliance', 'electronics', 'fashion', 'clothing', 'beauty', 'auto', 'car', 'accessory', 'cover', 'case'];
          
          const titleLower = productName.toLowerCase();
          
          let breadcrumbText = "";
          const breadcrumbs = document.querySelectorAll('.a-breadcrumb, .breadcrumb, [data-feature-name="wayfinding-breadcrumbs"], #wayfinding-breadcrumbs_feature_div');
          if (breadcrumbs) {
              breadcrumbs.forEach(b => breadcrumbText += b.innerText.toLowerCase() + " ");
          }
          
          const combinedText = titleLower + " " + breadcrumbText;
          for (let w of foodKeywords) {
              if (combinedText.includes(w)) foodScore += 2;
          }
          for (let w of nonFoodKeywords) {
              if (combinedText.includes(w)) foodScore -= 3;
          }
          
          if (productSectionText && productSectionText.toLowerCase().includes('nutrition')) {
              foodScore += 5;
          }
          
          isFood = foodScore > 0;

          let ingredientsList = [];
          if (ingredientsStr) {
              ingredientsStr = ingredientsStr.replace(/contains\s+[^\n.]+/i, '');
              ingredientsStr = ingredientsStr.replace(/may contain\s+[^\n.]+/i, '');
              
              let items = ingredientsStr.split(",");
              for(let item of items) {
                  item = item.replace(/\n/g, ' ').trim().replace(/\.$/, '');
                  if(item.length > 1 && !item.toLowerCase().startsWith('contains') && !item.toLowerCase().startsWith('may contain')) {
                      ingredientsList.push(item);
                  }
              }
          }
          return { productName: productName.trim().replace(/\n/g, ' '), ingredients: ingredientsList, allergens: allergens, isFood: isFood, isCategoryPage: isCategoryPage };
        }
      },
      (results) => {
        if (chrome.runtime.lastError || !results || !results[0].result) {
          showManualFallback();
          return;
        }
        
        const data = results[0].result;
        
        if (data.isCategoryPage) {
           showNonFoodError("SELECT A SPECIFIC PRODUCT", "Please click on a specific product page rather than scanning the search results.");
           return;
        }
        
        if (!data.isFood) {
           showNonFoodError("FOOD PRODUCT NOT DETECTED", "This doesn't appear to be a food or grocery item. We only analyze edible products.");
           return;
        }

        if (!data.ingredients || data.ingredients.length === 0) {
          showManualFallback();
          return;
        }
        
        // Clean product name
        let cleanName = data.productName;
        if (cleanName.length > 50) {
            cleanName = cleanName.substring(0, 50) + "...";
        }
        document.getElementById("current-product-name").innerText = cleanName;
        
        chrome.storage.local.get(["diet"], (res) => {
            document.getElementById("current-product-diet").innerText = `Diet: ${res.diet || "Vegetarian"} | Ingredients detected: ${data.ingredients.length}`;
            console.log("🔥 WORKING EXTRACTION ARRAY:");
            console.log(data.ingredients);
            console.log("🔥 COUNT:", data.ingredients.length);
        });
        
        performCheck(data.productName, data.ingredients, data.allergens, data.isFood);

      }
    );
  });
}

function checkProductManual() {
  const text = document.getElementById("manual-ingredients").value;
  if (!text.trim()) {
    showError("Please enter an ingredient list first.");
    return;
  }
  
  const ingredients = text.split(",").map(i => i.trim()).filter(i => i);
  
  chrome.storage.local.get(["language"], (res) => {
      const t = TRANSLATIONS[res.language || "English"] || TRANSLATIONS.English;
      document.getElementById("current-product-name").innerText = "Manual Input";
      chrome.storage.local.get(["diet"], (d) => {
          document.getElementById("current-product-diet").innerText = `Diet: ${d.diet || "Vegetarian"} | Ingredients detected: ${ingredients.length}`;
      });
      performCheck("Manual Input", ingredients, null);
  });
}

function showManualFallback() {
  document.getElementById("manual-fallback").classList.remove("hidden");
}

function showNonFoodError(title, msg) {
  document.getElementById("manual-fallback").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
  
  const card = document.getElementById("verdict-card");
  card.className = "verdict-card verdict-doubtful"; 
  
  document.getElementById("verdict-title").innerText = "⚠️ " + title;
  document.getElementById("verdict-subtitle").innerText = msg;
  
  document.getElementById("verdict-stats").innerText = "";
  document.getElementById("flagged-ingredients-list").innerHTML = "";
  document.getElementById("allergen-section").classList.add("hidden");
  document.getElementById("suggested-action-container").classList.add("hidden");
  document.getElementById("current-product-name").innerText = "Not a food product";
  document.getElementById("current-product-diet").innerText = "";
}

function hideErrors() {
  document.getElementById("error-msg").classList.add("hidden");
  document.getElementById("error-msg").innerText = "";
}

function showError(msg) {
  document.getElementById("error-msg").classList.remove("hidden");
  document.getElementById("error-msg").innerText = msg;
}

function hideResult() {
  document.getElementById("result-section").classList.add("hidden");
}

async function performCheck(productName, ingredientsList, allergens, isFood = true) {
  hideErrors();
  
  chrome.storage.local.get(["diet", "alsoAvoid", "language"], async (res) => {
    const diet = res.diet || "Vegetarian";
    const alsoAvoidStr = res.alsoAvoid || "";
    const alsoAvoid = alsoAvoidStr.split(",").map(i => i.trim()).filter(i => i);
    const language = res.language || "English";
    
    const reqBody = {
      product_name: productName,
      ingredients: ingredientsList,
      diet: diet,
      also_avoid: alsoAvoid,
      language: language,
      is_food: isFood
    };
    
    console.log("========== CHECK PRODUCT DEBUG ==========");
    console.log("Product name:", productName);
    console.log("Ingredients:", ingredientsList);
    console.log("Ingredient count:", ingredientsList?.length);
    console.log("Diet:", diet);
    console.log("Custom avoid:", alsoAvoid);
    console.log("Language:", language);
    console.log("==========================================");
    
    try {
      console.log("🔥 CHECK PRODUCT PAYLOAD:");
      console.log(JSON.stringify(reqBody, null, 2));
      console.log("[IngredientChecker] Sending to backend:", JSON.stringify(reqBody));
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      });
      
      console.log("[IngredientChecker] Backend HTTP status:", response.status);
      if (!response.ok) {
        const errText = await response.text().catch(() => "(no body)");
        console.error("[IngredientChecker] Backend error body:", errText);
        throw new Error("Backend responded " + response.status + ": " + errText.substring(0, 200));
      }
      
      const data = await response.json();
      console.log("[IngredientChecker] Backend response:", data);
      displayResult(data, ingredientsList, allergens, language);
      saveToHistory(productName, data.verdict, diet);
      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            args: [data.verdict],
            func: (verdict) => {
              const title = document.querySelector('h1') || document.querySelector('#productTitle');
              if (title && !document.getElementById('ing-label-badge')) {
                const badge = document.createElement('span');
                badge.id = 'ing-label-badge';
                badge.style.marginLeft = '12px';
                badge.style.padding = '4px 8px';
                badge.style.borderRadius = '4px';
                badge.style.fontSize = '14px';
                badge.style.fontWeight = 'bold';
                badge.style.verticalAlign = 'middle';
                if (verdict === 'fits') {
                  badge.innerText = '🟢 FITS DIET';
                  badge.style.background = '#e8f5e9';
                  badge.style.color = '#2e7d32';
                } else if (verdict === 'doubtful') {
                  badge.innerText = '🟡 CHECK INGREDIENTS';
                  badge.style.background = '#fff8e1';
                  badge.style.color = '#f57f17';
                } else {
                  badge.innerText = '🔴 DOES NOT FIT';
                  badge.style.background = '#ffebee';
                  badge.style.color = '#c62828';
                }
                title.appendChild(badge);
              }
            }
          }).catch(() => {});
        }
      });
    } catch (err) {
      // API error — log real error for debugging
      console.error("[IngredientChecker] CHECK PRODUCT ERROR:", err.message || err);
      const card = document.getElementById("verdict-card");
      card.className = "verdict-card verdict-doubtful";
      
      document.getElementById("verdict-title").innerText = "⚠️ ANALYSIS SERVER UNAVAILABLE";
      document.getElementById("verdict-subtitle").innerText = "The ingredients were successfully detected from the product page, but the analysis server could not be reached.";
      
      const suggActionText = document.getElementById("suggested-action-text");
      suggActionText.innerText = "Please ensure the backend server is running to perform dietary classification.";
      document.getElementById("suggested-action-title").innerText = "⚠️ SERVER OFFLINE";
      document.getElementById("suggested-action-container").classList.remove("hidden");
      
      document.getElementById("verdict-stats").innerText = "";
      
      const list = document.getElementById("flagged-ingredients-list");
      list.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px; font-size: 13px; color: #555; text-transform: uppercase;">📋 DETECTED INGREDIENTS</div>`;
      
      ingredientsList.forEach((ing, i) => {
         const div = document.createElement("div");
         div.style.background = "#fff";
         div.style.border = "1px solid #ddd";
         div.style.borderRadius = "6px";
         div.style.padding = "10px";
         div.style.marginBottom = "8px";
         div.style.borderLeft = "4px solid #9e9e9e";
         div.innerText = `${i+1}. ${ing}`;
         list.appendChild(div);
      });
      
      document.getElementById("result-section").classList.remove("hidden");
    }
  });
}

function getSourceTranslation(source, t) {
    if (source === "rules") return t.source_rules;
    if (source === "gemini" || source === "openrouter") return t.source_gemini;
    if (source === "custom") return t.source_custom;
    return t.source_error;
}

function displayResult(data, ingredientsList, allergens, language) {
  const resultSec = document.getElementById("result-section");
  resultSec.classList.remove("hidden");
  
  const totalCount = ingredientsList.length;
  
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  
  const card = document.getElementById("verdict-card");
  card.className = "verdict-card"; // reset
  
  let vTitle = "";
  let vSub = "";
  
  let fitsCount = 0;
  let doubtfulCount = 0;
  let conflictsCount = 0;
  
  // Calculate stats
  const analysis = data.flagged_ingredients || [];
  console.log("🔥 RESULTS FROM BACKEND:", analysis);
  console.log("🔥 RESULT COUNT:", analysis.length);
  analysis.forEach(item => {
      if (item.status === 'fits') fitsCount++;
      else if (item.status === 'doubtful') doubtfulCount++;
      else if (item.status === 'conflicts') conflictsCount++;
  });
  
  if (data.verdict === "fits") {
    card.classList.add("verdict-fits");
    vTitle = t.fits;
    vSub = t.fits_desc;
  } else if (data.verdict === "doubtful") {
    card.classList.add("verdict-doubtful");
    vTitle = t.doubtful;
    vSub = t.doubtful_desc;
  } else {
    card.classList.add("verdict-conflicts");
    vTitle = t.conflicts;
    vSub = t.conflicts_desc;
  }
  
  document.getElementById("verdict-title").innerText = vTitle;
  document.getElementById("verdict-subtitle").innerText = vSub;
  
  if (data.ai_error) {
      document.getElementById("verdict-title").innerText = t.api_error_title;
      document.getElementById("verdict-subtitle").innerHTML = `<strong>${t.api_error_desc}</strong><br>Known ingredients were still checked using<br>the local rules database.`;
  }
  
  document.getElementById("verdict-stats").innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px;">📊 ANALYSIS SUMMARY</div>
    ${t.checked_count || 'Ingredients checked'}: ${totalCount}<br><br>
    🟢 Fits: ${fitsCount}<br>
    🟡 Doubtful: ${doubtfulCount}<br>
    🔴 Does not fit: ${conflictsCount}
  `;
  
  // Suggested action
  const suggContainer = document.getElementById("suggested-action-container");
  const suggTitle = document.getElementById("suggested-action-title");
  const suggText = document.getElementById("suggested-action-text");
  
  if (data.verdict === "doubtful") {
      suggTitle.innerText = t.suggested_action_doubtful_title;
      suggText.innerText = t.suggested_action_doubtful;
      suggContainer.classList.remove("hidden");
      suggContainer.style.background = "#fff8e1";
  } else if (data.verdict === "conflicts") {
      suggTitle.innerText = t.suggested_action_conflict_title;
      suggText.innerText = t.suggested_action_conflict;
      suggContainer.classList.remove("hidden");
      suggContainer.style.background = "#ffebee";
  } else {
      suggContainer.classList.add("hidden");
  }

  // Allergens
  const allergenSec = document.getElementById("allergen-section");
  const containsSec = document.getElementById("allergen-contains-container");
  const mayContainSec = document.getElementById("allergen-may-contain-container");
  
  allergenSec.classList.remove("hidden");
  if (allergens && ((allergens.contains && allergens.contains.length > 0) || (allergens.may_contain && allergens.may_contain.length > 0))) {
      if (allergens.contains && allergens.contains.length > 0) {
          containsSec.classList.remove("hidden");
          const ul = document.getElementById("allergen-contains-list");
          ul.innerHTML = "";
          allergens.contains.forEach(a => {
             const li = document.createElement("li");
             li.innerText = a;
             ul.appendChild(li);
          });
      } else {
          containsSec.classList.add("hidden");
      }
      
      if (allergens.may_contain && allergens.may_contain.length > 0) {
          mayContainSec.classList.remove("hidden");
          const ul = document.getElementById("allergen-may-contain-list");
          ul.innerHTML = "";
          allergens.may_contain.forEach(a => {
             const li = document.createElement("li");
             li.innerText = a;
             ul.appendChild(li);
          });
      } else {
          mayContainSec.classList.add("hidden");
      }
      
      // Remove any previous fallback text
      const fallbackEl = document.getElementById("allergen-fallback-text");
      if (fallbackEl) fallbackEl.remove();
  } else {
      containsSec.classList.add("hidden");
      mayContainSec.classList.add("hidden");
      
      let fallbackEl = document.getElementById("allergen-fallback-text");
      if (!fallbackEl) {
          fallbackEl = document.createElement("div");
          fallbackEl.id = "allergen-fallback-text";
          fallbackEl.style.fontSize = "13px";
          fallbackEl.style.color = "#666";
          fallbackEl.style.marginTop = "8px";
          allergenSec.appendChild(fallbackEl);
      }
      fallbackEl.innerText = "Please check the product label for allergen warnings.";
  }
  
  const list = document.getElementById("flagged-ingredients-list");
  list.innerHTML = "";
  
  if (analysis.length === 0) {
      document.getElementById("verdict-title").innerText = "⚠️ ANALYSIS FAILED";
      document.getElementById("verdict-subtitle").innerText = "The ingredients were detected successfully, but the analysis server did not return results.";
      
      list.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px; font-size: 13px; color: #555; text-transform: uppercase;">📋 DETECTED INGREDIENTS</div>`;
      
      ingredientsList.forEach((ing, i) => {
         const div = document.createElement("div");
         div.style.background = "#fff";
         div.style.border = "1px solid #ddd";
         div.style.borderRadius = "6px";
         div.style.padding = "10px";
         div.style.marginBottom = "8px";
         div.style.borderLeft = "4px solid #9e9e9e";
         div.innerText = `${i+1}. ${ing}`;
         list.appendChild(div);
      });
      document.getElementById("analysis-source-text").innerText = (data.product_name === "Manual Input") ? "✓ Manual Input" : "✓ Product page";
      return;
  }
  
  // Sort analysis: DOES NOT FIT, DOUBTFUL, FITS
  const order = { "conflicts": 1, "doubtful": 2, "fits": 3 };
  analysis.sort((a, b) => order[a.status] - order[b.status]);
  
  let currentGroup = "";
  
  analysis.forEach(item => {
    let group = (item.status === "conflicts" || item.status === "doubtful") ? "needs_attention" : "compatible";
    
    if (group !== currentGroup) {
      currentGroup = group;
      const headerDiv = document.createElement("div");
      headerDiv.style.fontWeight = "bold";
      headerDiv.style.marginTop = "16px";
      headerDiv.style.marginBottom = "8px";
      headerDiv.style.fontSize = "13px";
      headerDiv.style.color = "#555";
      headerDiv.style.textTransform = "uppercase";
      headerDiv.innerText = group === "needs_attention" ? "⚠️ NEEDS ATTENTION" : "✓ COMPATIBLE INGREDIENTS";
      list.appendChild(headerDiv);
    }

    const div = document.createElement("div");
    div.className = "ingredient-card " + item.status;
    
    let icon = "🟢";
    let statusText = "FITS";
    if (item.status === "conflicts") { icon = "🔴"; statusText = "DOES NOT FIT"; }
    else if (item.status === "doubtful") { icon = "🟡"; statusText = "DOUBTFUL"; }
    
    const header = document.createElement("div");
    header.className = "ingredient-header";
    header.style.cursor = "pointer";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.fontWeight = "bold";
    header.innerHTML = `<span>${icon} ${item.ingredient}</span><span style="font-size: 11px; opacity: 0.8; font-weight: normal;">${statusText} ▼</span>`;
    
    const body = document.createElement("div");
    body.className = "ingredient-body";
    body.style.display = "none";
    body.style.marginTop = "8px";
    body.style.paddingTop = "8px";
    body.style.borderTop = "1px solid rgba(0,0,0,0.1)";
    body.style.fontSize = "13px";
    
    let suggestedActionHtml = "";
    if (item.status === "doubtful") {
        suggestedActionHtml = `<div style="margin-top: 8px;"><strong>💡 What should I do?</strong><br>Check the manufacturer's website for the ingredient source.</div>`;
    }
    
    body.innerHTML = `
      <div><strong>Status:</strong><br>${statusText}</div>
      <div style="margin-top: 8px;"><strong>Reason:</strong><br>${item.reason}</div>
      ${suggestedActionHtml}
      <div style="margin-top: 8px;"><strong>Source:</strong><br>${getSourceTranslation(item.source, t)}</div>
    `;
    
    header.addEventListener("click", () => {
        const isHidden = body.style.display === "none";
        body.style.display = isHidden ? "block" : "none";
        header.innerHTML = `<span>${icon} ${item.ingredient}</span><span style="font-size: 11px; opacity: 0.8; font-weight: normal;">${statusText} ${isHidden ? '▲' : '▼'}</span>`;
    });
    
    div.appendChild(header);
    div.appendChild(body);
    
    div.style.background = "#fff";
    div.style.border = "1px solid #ddd";
    div.style.borderRadius = "6px";
    div.style.padding = "10px";
    div.style.marginBottom = "8px";
    
    if (item.status === "conflicts") div.style.borderLeft = "4px solid #f44336";
    else if (item.status === "doubtful") div.style.borderLeft = "4px solid #ff9800";
    else div.style.borderLeft = "4px solid #4caf50";
    
    list.appendChild(div);
  });
  
  document.getElementById("analysis-source-text").innerText = (data.product_name === "Manual Input") ? "✓ Manual Input" : "✓ Product page";
}

function saveToHistory(productName, verdict, diet) {
  chrome.storage.local.get(["history"], (res) => {
    let history = res.history || [];
    history.unshift({
      product_name: productName,
      verdict: verdict,
      diet: diet,
      timestamp: new Date().toLocaleString()
    });
    
    history = history.slice(0, 10);
    chrome.storage.local.set({ history }, () => {
      loadHistory();
    });
  });
}

function loadHistory() {
  chrome.storage.local.get(["history", "language"], (res) => {
    const t = TRANSLATIONS[res.language || "English"] || TRANSLATIONS.English;
    const list = document.getElementById("history-list");
    list.innerHTML = "";
    const history = res.history || [];
    
    if (history.length === 0) {
      list.innerHTML = "<li style='color:#666; font-size: 13px; text-align: center; margin-top: 10px;'>No history yet.</li>";
      return;
    }
    
    history.forEach((item, index) => {
      let icon = "🟢";
      let vText = t.fits;
      if (item.verdict === "conflicts") { icon = "🔴"; vText = t.conflicts; }
      else if (item.verdict === "doubtful") { icon = "🟡"; vText = t.doubtful; }
      
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.flexDirection = "column";
      li.style.marginBottom = "8px";
      li.style.borderBottom = "1px solid #eee";
      li.style.paddingBottom = "8px";

      const topRow = document.createElement("div");
      topRow.style.display = "flex";
      topRow.style.justifyContent = "space-between";
      topRow.style.alignItems = "center";
      
      const prodSpan = document.createElement("span");
      prodSpan.innerText = item.product_name;
      prodSpan.style.fontWeight = "bold";
      prodSpan.style.fontSize = "13px";
      
      const delBtn = document.createElement("button");
      delBtn.innerText = "✖";
      delBtn.style.background = "none";
      delBtn.style.border = "none";
      delBtn.style.cursor = "pointer";
      delBtn.style.fontSize = "12px";
      delBtn.title = "Delete";
      delBtn.addEventListener("click", () => {
         history.splice(index, 1);
         chrome.storage.local.set({ history }, () => {
            loadHistory();
         });
      });
      
      topRow.appendChild(prodSpan);
      topRow.appendChild(delBtn);
      
      const bottomRow = document.createElement("div");
      bottomRow.style.fontSize = "12px";
      bottomRow.style.color = "#555";
      bottomRow.style.marginTop = "4px";
      bottomRow.innerText = `${icon} ${vText} • ${item.diet} • ${item.timestamp}`;
      
      li.appendChild(topRow);
      li.appendChild(bottomRow);
      list.appendChild(li);
    });
  });
}
