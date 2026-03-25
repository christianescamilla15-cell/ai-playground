"""Compare responses from multiple models side by side."""
from services.llm.providers import get_provider


class ModelComparator:
    MODELS = ["claude-sonnet", "gpt-4o", "gemini-pro"]

    def __init__(self):
        self._provider = get_provider()

    def compare(
        self, prompt: str, system: str = "", models: list[str] | None = None
    ) -> dict:
        models = models or self.MODELS
        results = {}
        for model in models:
            response = self._provider.generate(prompt, model=model, system=system)
            results[model] = {
                "text": response.text,
                "latency_ms": response.latency_ms,
                "input_tokens": response.input_tokens,
                "output_tokens": response.output_tokens,
                "cost_usd": response.cost_usd,
                "provider": response.provider,
            }

        fastest = min(results, key=lambda m: results[m]["latency_ms"])
        cheapest = min(results, key=lambda m: results[m]["cost_usd"])
        most_detailed = max(results, key=lambda m: results[m]["output_tokens"])

        return {
            "prompt": prompt[:200],
            "models": results,
            "rankings": {
                "fastest": fastest,
                "cheapest": cheapest,
                "most_detailed": most_detailed,
            },
        }
