from google import genai

from app.core.config import settings
from app.core.model_manager import model_manager


class GeminiService:
    def __init__(self):
        self.clients = []
        keys = [settings.GEMINI_API_KEY, settings.GEMINI_API_KEY_2, settings.GEMINI_API_KEY_3]
        for key in keys:
            if key and key.strip():
                try:
                    self.clients.append(genai.Client(api_key=key))
                except Exception as e:
                    print(f"Failed to init client with a key: {e}")
        
        # We need at least one client if no valid keys are provided (will crash on usage)
        if not self.clients:
            self.clients.append(genai.Client(api_key=settings.GEMINI_API_KEY))

    def ask(self, prompt: str) -> str:
        last_error = None

        for model in model_manager.get_models():
            for client_idx, client in enumerate(self.clients):
                try:
                    print(f"Trying model: {model} with Client #{client_idx + 1}")

                    response = client.models.generate_content(
                        model=model,
                        contents=prompt,
                    )

                    print(f"Using model: {model} with Client #{client_idx + 1}")

                    return response.text

                except Exception as e:
                    print(f"Model {model} failed on Client #{client_idx + 1}: {e}")
                    last_error = e
                    # If this client fails, loop to the next client.
                    continue

        raise Exception(f"All models failed.\nLast error: {last_error}")


gemini_service = GeminiService()