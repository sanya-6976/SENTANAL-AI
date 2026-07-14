from google import genai

from app.core.config import settings
from app.core.model_manager import model_manager


class GeminiService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

    def ask(self, prompt: str) -> str:
        last_error = None

        for model in model_manager.get_models():
            try:
                print(f"Trying model: {model}")

                response = self.client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                print(f"Using model: {model}")

                return response.text

            except Exception as e:
                print(f"Model {model} failed: {e}")
                last_error = e

        raise Exception(f"All models failed.\nLast error: {last_error}")


gemini_service = GeminiService()