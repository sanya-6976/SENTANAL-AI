from dotenv import load_dotenv
import os

# Load variables from the .env file, overriding existing env vars
load_dotenv(override=True)

class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_API_KEY_2 = os.getenv("GEMINI_API_KEY_2")
    GEMINI_API_KEY_3 = os.getenv("GEMINI_API_KEY_3")

settings = Settings()