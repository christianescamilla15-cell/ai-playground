"""Content generation use case: topic + tone + format -> content."""
from services.llm.providers import get_provider


TONES = ["professional", "casual", "executive"]
FORMATS = ["email", "report", "social", "presentation"]


class ContentGenerator:
    """Generate business content with configurable tone and format."""

    def __init__(self, model: str = "claude-sonnet"):
        self._provider = get_provider()
        self._model = model

    def generate(
        self,
        topic: str,
        tone: str = "professional",
        format_type: str = "email",
        model: str | None = None,
    ) -> dict:
        model = model or self._model
        tone = tone if tone in TONES else "professional"
        format_type = format_type if format_type in FORMATS else "email"

        prompt = (
            f"Generate {format_type} content about: {topic}\n"
            f"Tone: {tone}\n"
            f"Format: {format_type}\n"
            f"Write the content:"
        )

        system = (
            f"You are a {tone} content writer. Generate high-quality "
            f"{format_type} content. Be concise and impactful."
        )

        response = self._provider.generate(prompt, model=model, system=system)

        return {
            "content": response.text,
            "topic": topic,
            "tone": tone,
            "format": format_type,
            "model": response.model,
            "tokens": {
                "input": response.input_tokens,
                "output": response.output_tokens,
            },
            "cost_usd": response.cost_usd,
        }

    @staticmethod
    def available_tones() -> list[str]:
        return TONES

    @staticmethod
    def available_formats() -> list[str]:
        return FORMATS
