"""Track cumulative token usage and costs across all playground sessions."""
from dataclasses import dataclass, field
from datetime import datetime, timezone


@dataclass
class CostEntry:
    model: str
    input_tokens: int
    output_tokens: int
    cost_usd: float
    use_case: str
    timestamp: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class CostTracker:
    def __init__(self):
        self._entries: list[CostEntry] = []

    def record(
        self,
        model: str,
        input_tokens: int,
        output_tokens: int,
        cost_usd: float,
        use_case: str = "general",
    ):
        self._entries.append(
            CostEntry(
                model=model,
                input_tokens=input_tokens,
                output_tokens=output_tokens,
                cost_usd=cost_usd,
                use_case=use_case,
            )
        )

    def get_summary(self) -> dict:
        if not self._entries:
            return {
                "total_requests": 0,
                "total_tokens": 0,
                "total_cost_usd": 0,
                "by_model": {},
                "by_use_case": {},
            }

        total_input = sum(e.input_tokens for e in self._entries)
        total_output = sum(e.output_tokens for e in self._entries)
        total_cost = sum(e.cost_usd for e in self._entries)

        by_model: dict = {}
        for e in self._entries:
            if e.model not in by_model:
                by_model[e.model] = {"requests": 0, "tokens": 0, "cost": 0.0}
            by_model[e.model]["requests"] += 1
            by_model[e.model]["tokens"] += e.input_tokens + e.output_tokens
            by_model[e.model]["cost"] += e.cost_usd

        by_use_case: dict = {}
        for e in self._entries:
            if e.use_case not in by_use_case:
                by_use_case[e.use_case] = {"requests": 0, "cost": 0.0}
            by_use_case[e.use_case]["requests"] += 1
            by_use_case[e.use_case]["cost"] += e.cost_usd

        return {
            "total_requests": len(self._entries),
            "total_input_tokens": total_input,
            "total_output_tokens": total_output,
            "total_tokens": total_input + total_output,
            "total_cost_usd": round(total_cost, 6),
            "by_model": {
                k: {**v, "cost": round(v["cost"], 6)} for k, v in by_model.items()
            },
            "by_use_case": {
                k: {**v, "cost": round(v["cost"], 6)}
                for k, v in by_use_case.items()
            },
        }

    def reset(self):
        self._entries.clear()


_tracker: CostTracker | None = None


def get_cost_tracker() -> CostTracker:
    global _tracker
    if _tracker is None:
        _tracker = CostTracker()
    return _tracker
