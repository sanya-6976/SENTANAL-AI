from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeoutError
from collections.abc import Callable

from fastapi import HTTPException


SUPPORTED_LANGUAGES = frozenset(
    {
        "English",
        "Kannada",
        "Hindi",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Marathi",
    }
)
TRANSLATION_TIMEOUT_SECONDS = 30
_translation_executor = ThreadPoolExecutor(max_workers=4)


class TranslationService:
    """Translate police investigation text through Gemini."""

    def __init__(self, ask: Callable[[str], str] | None = None):
        self._ask = ask

    def translate_text(self, text: str, source_language: str, target_language: str) -> str:
        normalized_text = text.strip()
        self._validate_request(normalized_text, source_language, target_language)

        if source_language == target_language:
            return normalized_text

        prompt = self._build_prompt(normalized_text, source_language, target_language)
        future = _translation_executor.submit(self._get_ask(), prompt)

        try:
            translated_text = future.result(timeout=TRANSLATION_TIMEOUT_SECONDS)
        except FutureTimeoutError as error:
            future.cancel()
            raise HTTPException(
                status_code=504,
                detail="Translation request timed out. Please try again.",
            ) from error
        except Exception as error:
            raise HTTPException(
                status_code=502,
                detail="Translation service is temporarily unavailable.",
            ) from error

        if not translated_text or not translated_text.strip():
            raise HTTPException(
                status_code=502,
                detail="Translation service returned an empty response.",
            )

        return translated_text.strip()

    @staticmethod
    def _validate_request(text: str, source_language: str, target_language: str) -> None:
        if not text:
            raise HTTPException(status_code=400, detail="Text must not be empty.")

        invalid_languages = [
            language
            for language in (source_language, target_language)
            if language not in SUPPORTED_LANGUAGES
        ]
        if invalid_languages:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Unsupported language. Supported languages: "
                    f"{', '.join(sorted(SUPPORTED_LANGUAGES))}."
                ),
            )

    @staticmethod
    def _build_prompt(text: str, source_language: str, target_language: str) -> str:
        return f"""You are an official government translator.

Translate the following police investigation text from {source_language} to {target_language}.

Preserve exactly:
- FIR numbers
- IPC/BNS sections
- Names
- Phone numbers
- Vehicle numbers
- Bank account numbers
- IDs
- Dates
- Evidence IDs

Translate only natural language.

Return ONLY the translated text.

Text to translate:
{text}"""

    def _get_ask(self) -> Callable[[str], str]:
        if self._ask is not None:
            return self._ask

        from app.services.gemini_service import gemini_service

        return gemini_service.ask


translation_service = TranslationService()
