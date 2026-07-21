import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv(".env")

POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
POSTGRES_DB = os.getenv("POSTGRES_DB", "sentinel_ai")
POSTGRES_USER = os.getenv("POSTGRES_USER", "sentinel_user")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "changeme")

url = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
print(f"Connecting to: postgresql://{POSTGRES_USER}:***@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}")

try:
    engine = create_engine(url)
    with engine.connect() as conn:
        print("Successfully connected!")
except Exception as e:
    print(f"Error: {e}")
