"""Translation use case: text + target language -> translated text."""
from services.llm.providers import get_provider


SUPPORTED_LANGUAGES = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "pt": "Portuguese",
    "de": "German",
}


class Translator:
    """Translate text between languages using LLM."""

    def __init__(self, model: str = "claude-sonnet"):
        self._provider = get_provider()
        self._model = model

    def translate(
        self,
        text: str,
        target_lang: str = "es",
        source_lang: str = "en",
        model: str | None = None,
    ) -> dict:
        model = model or self._model
        target_name = SUPPORTED_LANGUAGES.get(target_lang, target_lang)
        source_name = SUPPORTED_LANGUAGES.get(source_lang, source_lang)

        prompt = (
            f"Translate the following text from {source_name} to {target_name}:\n\n"
            f"{text}"
        )

        system = (
            f"You are a professional translator. Translate accurately from "
            f"{source_name} to {target_name}. Preserve formatting and tone."
        )

        response = self._provider.generate(prompt, model=model, system=system)

        return {
            "original": text,
            "translated": response.text,
            "source_lang": source_lang,
            "target_lang": target_lang,
            "model": response.model,
            "tokens": {
                "input": response.input_tokens,
                "output": response.output_tokens,
            },
            "cost_usd": response.cost_usd,
        }

    @staticmethod
    def supported_languages() -> dict[str, str]:
        return SUPPORTED_LANGUAGES.copy()
