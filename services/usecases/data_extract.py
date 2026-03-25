"""Data extraction use case: text -> structured entities and facts."""
import re
import json
from services.llm.providers import get_provider


class DataExtractor:
    """Extract structured data from unstructured text."""

    def __init__(self, model: str = "claude-sonnet"):
        self._provider = get_provider()
        self._model = model

    def extract(self, text: str, model: str | None = None) -> dict:
        model = model or self._model

        # Rule-based extraction
        entities = self._extract_entities(text)
        key_facts = self._extract_key_facts(text)

        # Also get LLM extraction for comparison
        prompt = f"Extract all key entities, dates, amounts, and facts from this text:\n\n{text}"
        response = self._provider.generate(prompt, model=model)

        llm_data = {}
        try:
            llm_data = json.loads(response.text)
        except json.JSONDecodeError:
            llm_data = {"raw": response.text}

        return {
            "rule_based": {
                "entities": entities,
                "key_facts": key_facts,
            },
            "llm_extraction": llm_data,
            "model": model,
            "tokens": {
                "input": response.input_tokens,
                "output": response.output_tokens,
            },
            "cost_usd": response.cost_usd,
        }

    def _extract_entities(self, text: str) -> list[dict]:
        entities = []
        # Money
        for m in re.finditer(r"\$[\d,.]+[MBKmkb]?", text):
            entities.append({"type": "money", "value": m.group()})
        # Percentages
        for m in re.finditer(r"\d+\.?\d*%", text):
            entities.append({"type": "percentage", "value": m.group()})
        # Dates
        for m in re.finditer(
            r"(?:Q[1-4]\s+\d{4}|\d{4}-\d{2}-\d{2}|\w+\s+\d{1,2},?\s+\d{4})", text
        ):
            entities.append({"type": "date", "value": m.group()})
        # Emails
        for m in re.finditer(r"[\w.+-]+@[\w-]+\.[\w.-]+", text):
            entities.append({"type": "email", "value": m.group()})
        # Phone numbers
        for m in re.finditer(r"\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", text):
            entities.append({"type": "phone", "value": m.group()})
        return entities

    def _extract_key_facts(self, text: str) -> list[str]:
        facts = []
        sentences = [s.strip() for s in re.split(r"[.!?]+", text) if s.strip()]
        fact_indicators = [
            "increase", "decrease", "grew", "growth", "decline", "rose", "fell",
            "reached", "achieved", "exceeded", "total", "revenue", "profit",
            "margin", "rate", "score", "improved", "reduced",
        ]
        for sent in sentences:
            lower = sent.lower()
            if any(ind in lower for ind in fact_indicators):
                facts.append(sent.strip())
        return facts[:10]  # Top 10 facts
