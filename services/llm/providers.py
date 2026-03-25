"""Multi-model LLM provider supporting Claude, GPT, Gemini with demo mocks."""
import time
import json
from dataclasses import dataclass


@dataclass
class LLMResponse:
    text: str
    model: str
    input_tokens: int
    output_tokens: int
    latency_ms: int
    cost_usd: float
    provider: str


PRICING = {
    "claude-sonnet": {"input": 3.0, "output": 15.0},
    "gpt-4o": {"input": 5.0, "output": 15.0},
    "gemini-pro": {"input": 1.25, "output": 5.0},
}


class MockLLMProvider:
    """Simulates responses from different LLM providers for demo."""

    def generate(
        self, prompt: str, model: str = "claude-sonnet", system: str = ""
    ) -> LLMResponse:
        start = time.time()

        if "claude" in model:
            text = self._claude_style(prompt, system)
            latency = 800
        elif "gpt" in model:
            text = self._gpt_style(prompt, system)
            latency = 650
        else:
            text = self._gemini_style(prompt, system)
            latency = 500

        input_tokens = len(prompt.split()) + len(system.split())
        output_tokens = len(text.split())
        pricing = PRICING.get(model, PRICING["claude-sonnet"])
        cost = (
            input_tokens * pricing["input"] + output_tokens * pricing["output"]
        ) / 1_000_000

        return LLMResponse(
            text=text,
            model=model,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            latency_ms=latency,
            cost_usd=round(cost, 6),
            provider=model.split("-")[0],
        )

    def _claude_style(self, prompt: str, system: str) -> str:
        p = prompt.lower()
        if "summar" in p or "resum" in p:
            return (
                "Based on my analysis, the document covers three main areas: "
                "organizational strategy, financial performance, and market positioning. "
                "The key takeaway is that the company shows strong growth potential with a "
                "23% revenue increase, though market competition requires strategic attention. "
                "I recommend focusing on the identified growth opportunities while monitoring "
                "competitive threats."
            )
        elif "translat" in p or "traduc" in p:
            if "spanish" in p or "espanol" in p or "español" in p:
                return (
                    "El documento analizado presenta tres areas principales: "
                    "estrategia organizacional, desempeno financiero y posicionamiento "
                    "de mercado. El punto clave es que la empresa muestra un fuerte "
                    "potencial de crecimiento."
                )
            return (
                "The analyzed document presents three main areas: organizational "
                "strategy, financial performance, and market positioning."
            )
        elif "extract" in p or "extrae" in p:
            return json.dumps(
                {
                    "entities": [
                        {"type": "organization", "value": "TechCorp Inc."},
                        {"type": "amount", "value": "$4.2M"},
                        {"type": "date", "value": "Q4 2025"},
                        {"type": "metric", "value": "23% growth"},
                    ],
                    "key_facts": [
                        "Revenue increased 23% YoY",
                        "Operating margin at 18%",
                        "Customer retention at 94%",
                    ],
                }
            )
        elif "chat" in p or "help" in p or "hola" in p or "hello" in p:
            return (
                "Hello! I'm your AI assistant. I can help you with document analysis, "
                "content generation, data extraction, and translation. What would you "
                "like to explore today?"
            )
        elif "content" in p or "generat" in p or "write" in p or "escrib" in p:
            return (
                "Here's a professional summary for your stakeholders:\n\n"
                "Q4 Performance Highlights:\n"
                "- Revenue growth of 23% year-over-year, reaching $4.2M\n"
                "- Operating margins improved to 18%, driven by efficiency initiatives\n"
                "- Customer satisfaction scores hit an all-time high of 4.7/5.0\n"
                "- International expansion contributed 12% of total revenue\n\n"
                "Key Takeaway: The company is on a strong growth trajectory with "
                "healthy margins and expanding market reach."
            )
        return (
            "I've analyzed your request. Based on the available information, I can "
            "provide insights across document analysis, content generation, data "
            "extraction, and translation. Please provide more specific details about "
            "what you'd like me to help with, and I'll deliver a tailored response."
        )

    def _gpt_style(self, prompt: str, system: str) -> str:
        p = prompt.lower()
        if "summar" in p or "resum" in p:
            return (
                "Here's a concise summary:\n\n"
                "**Key Points:**\n"
                "1. Revenue grew 23% YoY to $4.2M\n"
                "2. Operating margins improved to 18%\n"
                "3. Customer satisfaction at 4.7/5.0\n"
                "4. International expansion now 12% of revenue\n\n"
                "**Bottom Line:** Strong performance across all metrics with "
                "positive momentum heading into next quarter."
            )
        elif "extract" in p or "extrae" in p:
            return json.dumps(
                {
                    "entities": [
                        {"type": "company", "value": "TechCorp"},
                        {"type": "revenue", "value": "$4.2M"},
                        {"type": "growth", "value": "23%"},
                        {"type": "margin", "value": "18%"},
                    ],
                    "summary": "Financial report showing strong growth",
                }
            )
        elif "content" in p or "generat" in p:
            return (
                "Quarterly Performance Update\n\n"
                "We're pleased to share our Q4 results:\n"
                "- 23% revenue growth ($4.2M)\n"
                "- 18% operating margin (+5pp improvement)\n"
                "- 94% customer retention rate\n"
                "- New markets: Brazil & Colombia (12% of revenue)\n\n"
                "Looking ahead, we're targeting $4.8M in Q1 with expanded AI capabilities."
            )
        return (
            "Based on your request, I can help analyze documents, generate content, "
            "extract data, or translate text. Let me know which capability you'd like to try!"
        )

    def _gemini_style(self, prompt: str, system: str) -> str:
        p = prompt.lower()
        if "summar" in p or "resum" in p:
            return (
                "Summary: The document reports Q4 2025 financial results. "
                "Revenue: $4.2M (+23% YoY). Operating margin: 18%. "
                "Customer satisfaction: 4.7/5.0. Key risk: Increasing market competition. "
                "Recommendation: Accelerate AI product development and implement "
                "currency hedging for LATAM operations."
            )
        elif "extract" in p or "extrae" in p:
            return json.dumps(
                {
                    "data_points": [
                        {"label": "Revenue", "value": "$4.2M", "change": "+23%"},
                        {"label": "Margin", "value": "18%", "change": "+5pp"},
                        {"label": "Customers", "value": "2000+", "change": "+340 new"},
                    ]
                }
            )
        return (
            "I can assist with document analysis, summarization, data extraction, "
            "content generation, and translation. What would you like to explore?"
        )


def get_provider() -> MockLLMProvider:
    return MockLLMProvider()
