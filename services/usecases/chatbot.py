"""Chatbot use case: conversational AI with history."""
from dataclasses import dataclass, field
from services.llm.providers import get_provider, LLMResponse


@dataclass
class Message:
    role: str  # "user" or "assistant"
    content: str


class Chatbot:
    """Wraps the LLM provider with conversation history."""

    SYSTEM_PROMPT = (
        "You are a helpful business AI assistant. You help stakeholders "
        "understand AI capabilities through practical demonstrations. "
        "Be concise, professional, and provide actionable insights."
    )

    def __init__(self, model: str = "claude-sonnet"):
        self._provider = get_provider()
        self._model = model
        self._history: list[Message] = []

    def send(self, user_message: str) -> dict:
        self._history.append(Message(role="user", content=user_message))

        # Build context from history
        context = "\n".join(
            f"{m.role}: {m.content}" for m in self._history[-10:]  # Last 10 messages
        )
        prompt = f"{context}\nassistant:"

        response = self._provider.generate(
            prompt, model=self._model, system=self.SYSTEM_PROMPT
        )

        self._history.append(Message(role="assistant", content=response.text))

        return {
            "reply": response.text,
            "model": response.model,
            "tokens": {
                "input": response.input_tokens,
                "output": response.output_tokens,
            },
            "cost_usd": response.cost_usd,
            "latency_ms": response.latency_ms,
            "history_length": len(self._history),
        }

    def reset(self):
        self._history.clear()

    @property
    def history(self) -> list[dict]:
        return [{"role": m.role, "content": m.content} for m in self._history]
