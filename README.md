# Ingredient Label Checker

A browser extension that helps users determine whether a packaged food product is suitable for their chosen diet while shopping online.

## 1. Project overview

Checking food ingredients manually can be confusing and error-prone, especially for beginners or people with strict dietary requirements. This extension simplifies the process by analyzing product pages online and classifying ingredients into three categories: FITS, DOUBTFUL, or DOES NOT FIT.

It uses a deterministic rules engine for known ingredients and leverages Google Gemini as a fallback for unknown items.

## 2. Features

- **Vegan, Vegetarian, Jain checking**: Supports multiple dietary preferences out of the box.
- **Custom exclusions**: Users can add specific items they want to avoid (e.g., peanuts, caffeine).
- **Gemini classification**: Uses generative AI to classify ingredients not in the local database.
- **Automatic ingredient extraction**: Automatically finds and extracts product names and ingredients from standard online store pages.
- **Manual fallback**: If extraction fails, users can manually paste an ingredient list.
- **Product-page badge**: Injects a clean badge near the product title with the overall verdict.
- **Scan history**: Remembers the last 10 products checked in the current session.
- **Multilingual support**: Output is available in English, Hindi, and Bengali.

## 3. Architecture

```text
                 ONLINE PRODUCT PAGE
                         │
                         ▼
                Chrome Extension
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
       Product Name            Ingredient List
             │                       │
             └───────────┬───────────┘
                         ▼
                  FastAPI Backend
                         │
                         ▼
                 Deterministic Rules
                  ingredients.json
                         │
              ┌──────────┴──────────┐
              │                     │
           Known                  Unknown
              │                     │
              │                     ▼
              │                   Gemini
              │                     │
              └──────────┬──────────┘
                         ▼
                   Final Verdict
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
             🟢         🟡         🔴
            FITS     DOUBTFUL   DOES NOT FIT
```

## 4. Installation

**Prerequisites:** Python 3.11+, Google Chrome.

Windows setup for the backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## 5. API key

Set your Gemini API key in your environment. Do NOT put the API key in the extension's JavaScript!

PowerShell:

```powershell
$env:GEMINI_API_KEY="YOUR_API_KEY"
```

## 6. Start backend

From the `backend` directory, run:

```bash
uvicorn app:app --reload
```
The server will start at `http://localhost:8000`.

## 7. Load Chrome extension

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select the `extension/` directory.

## 8. How to use

1. Start the FastAPI backend.
2. Load the extension in Chrome.
3. Open an online food product page.
4. Click the extension icon.
5. Review your Diet and Language settings, and save your profile.
6. Click **Check Product**.
7. See the detailed verdict and explanations! If the page layout is unusual, use the manual fallback to paste the ingredients.

## 9. Test

From the `backend` directory, run:

```bash
pytest
```

## 10. Demo cases

- **Demo 1:** `wheat flour, sugar, gelatin` (Vegetarian) → 🔴 DOES NOT FIT
- **Demo 2:** `rice, salt, sunflower oil` (Vegetarian) → 🟢 FITS
- **Demo 3:** `sugar, natural flavours` (Vegan) → 🟡 DOUBTFUL
- **Demo 4:** `potato, onion powder` (Jain) → 🔴 DOES NOT FIT

*(Note: These deterministic examples will work even without a Gemini API key.)*

## 11. Limitations

- Different websites have different HTML structures, so automatic ingredient extraction may occasionally fail.
- Unknown ingredients are conservatively marked doubtful if they cannot be classified.
- This is **not a medical or allergy checker**.
- Product formulations can change; always verify the original label.

## 12. Future improvements

- Add support for more shopping websites.
- Barcode scanning for mobile usage.
- Integration with certified vegan and regional food databases.
- Price comparison tools for dietary-friendly alternatives.
- A dedicated mobile app.
