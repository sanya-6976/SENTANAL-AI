from app.services.gemini_service import gemini_service


class TranslationService:

    def translate(
        self,
        text: str,
        target_language: str = "English"
    ):

        prompt = f"""
You are a professional translator.

Translate the following text into {target_language}.

Rules:
- Preserve all names.
- Preserve FIR numbers.
- Preserve locations.
- Preserve crime-related terms.
- Do not summarize.
- Return only the translated text.

Text:

{text}
"""

        return gemini_service.ask(prompt)


translation_service = TranslationService()