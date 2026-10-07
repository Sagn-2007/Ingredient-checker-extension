import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
# Using openrouter/free auto-routes to a working free model
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openrouter/free")

# Safe diagnostic — never prints the actual key
print(f"[config] OpenRouter API key loaded: {bool(OPENROUTER_API_KEY)}")
print(f"[config] OpenRouter model: {OPENROUTER_MODEL}")
