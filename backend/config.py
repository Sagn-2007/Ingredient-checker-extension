import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

# Must use full path "models/..." as required by google-genai SDK
GEMINI_MODEL = "models/gemini-3.8-flash"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Safe diagnostic — never prints the actual key
print(f"[config] Gemini API key loaded: {bool(GEMINI_API_KEY)}")
print(f"[config] Gemini model: {GEMINI_MODEL}")
