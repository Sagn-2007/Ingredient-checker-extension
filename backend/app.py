from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
import os
from datetime import datetime

try:
    from .checker import check_product
except ImportError:
    from checker import check_product

app = FastAPI(title="Ingredient Label Checker API")

# Allow requests from the Chrome Extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HISTORY_FILE = "history.json"

def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r") as f:
                return json.load(f)
        except:
            return []
    return []

def save_history(history):
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=4)

class CheckRequest(BaseModel):
    product_name: str
    ingredients: List[str]
    diet: str
    also_avoid: Optional[List[str]] = []
    language: Optional[str] = "English"
    is_food: Optional[bool] = True

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/test-openrouter")
def test_openrouter():
    """Development endpoint — verify OpenRouter connectivity."""
    try:
        from .checker import client, OPENROUTER_MODEL
    except ImportError:
        from checker import client, OPENROUTER_MODEL

    try:
        from .config import OPENROUTER_API_KEY
    except ImportError:
        from config import OPENROUTER_API_KEY

    if not OPENROUTER_API_KEY:
        return {"openrouter_available": False, "error": "OPENROUTER_API_KEY not loaded from .env"}
    if not client:
        return {"openrouter_available": False, "error": "OpenRouter client failed to initialize"}

    try:
        response = client.chat.completions.create(
            model=OPENROUTER_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": 'Classify the ingredient "corn" for a vegetarian diet. Return ONLY JSON: {"ingredient":"corn","status":"fits","reason":"plant-derived"}'
                }
            ]
        )
        import json
        raw_text = response.choices[0].message.content.strip()
        if raw_text.startswith("```json"): raw_text = raw_text[7:]
        if raw_text.startswith("```"): raw_text = raw_text[3:]
        if raw_text.endswith("```"): raw_text = raw_text[:-3]
        result = json.loads(raw_text.strip())
        return {"openrouter_available": True, "model": OPENROUTER_MODEL, "test_result": result}
    except Exception as e:
        return {"openrouter_available": False, "error": str(e), "model": OPENROUTER_MODEL}

@app.post("/check-product")
def api_check_product(req: CheckRequest):
    print("========== CHECK PRODUCT ==========")
    print("PRODUCT:", req.product_name)
    print("DIET:", req.diet)
    print("INGREDIENTS:", req.ingredients)
    print("COUNT:", len(req.ingredients))
    print("===================================")

    if not req.is_food:
        return {
            "verdict": "doubtful",
            "flagged_ingredients": [],
            "ai_error": False,
            "error_msg": "Not a food product."
        }

    result = check_product(
        product_name=req.product_name,
        ingredients=req.ingredients,
        diet=req.diet,
        also_avoid=req.also_avoid
    )
    
    # Log to backend history
    history = load_history()
    history.insert(0, {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "product_name": req.product_name,
        "diet": req.diet,
        "verdict": result["verdict"],
        "ingredients_checked": len(req.ingredients)
    })
    save_history(history)
    
    return result

@app.get("/admin", response_class=HTMLResponse)
def admin_dashboard():
    history = load_history()
    rows = ""
    for idx, item in enumerate(history):
        color = "green" if item.get('verdict') == "fits" else "red" if item.get('verdict') == "conflicts" else "orange"
        rows += f"""
        <tr>
            <td>{item.get('timestamp')}</td>
            <td>{item.get('product_name')}</td>
            <td>{item.get('diet')}</td>
            <td style='color:{color}; font-weight:bold;'>{str(item.get('verdict')).upper()}</td>
            <td>
                <button class="action-btn" onclick='deleteItem({idx})'>Delete</button>
            </td>
        </tr>
        """
        
    if not history:
        rows = "<tr><td colspan='5' style='text-align:center;'>No history recorded yet.</td></tr>"
        
    html = f"""
    <html>
        <head>
            <title>Admin Dashboard</title>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f9f9f9; }}
                h1 {{ color: #333; }}
                .container {{ background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
                table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 12px; text-align: left; }}
                th {{ background-color: #f2f2f2; color: #555; }}
                tr:hover {{ background-color: #f5f5f5; }}
                .clear-btn {{ background: #dc3545; color: white; padding: 10px 15px; border: none; cursor: pointer; border-radius: 4px; font-weight: bold; }}
                .clear-btn:hover {{ background: #c82333; }}
                .action-btn {{ background: #6c757d; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; }}
                .action-btn:hover {{ background: #5a6268; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🛡️ Admin Dashboard - Scan History</h1>
                <p>View and manage all products scanned by users through the extension.</p>
                <button class="clear-btn" onclick="clearAll()">🗑️ Clear All History</button>
                <table>
                    <tr>
                        <th>Time</th>
                        <th>Product Name</th>
                        <th>Diet Checked</th>
                        <th>Verdict</th>
                        <th>Action</th>
                    </tr>
                    {rows}
                </table>
            </div>
            
            <script>
                async function deleteItem(index) {{
                    if(confirm("Delete this single entry?")) {{
                        await fetch('/admin/delete/' + index, {{ method: 'DELETE' }});
                        window.location.reload();
                    }}
                }}
                async function clearAll() {{
                    if(confirm("Are you sure you want to delete ALL history? This cannot be undone.")) {{
                        await fetch('/admin/clear', {{ method: 'POST' }});
                        window.location.reload();
                    }}
                }}
            </script>
        </body>
    </html>
    """
    return html

@app.delete("/admin/delete/{index}")
def delete_history_item(index: int):
    history = load_history()
    if 0 <= index < len(history):
        history.pop(index)
        save_history(history)
    return {"status": "deleted"}

@app.post("/admin/clear")
def clear_history():
    save_history([])
    return {"status": "cleared"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
