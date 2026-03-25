"""Tests for cost tracker."""
from services.llm.cost_tracker import CostTracker, CostEntry, get_cost_tracker


class TestCostTracker:
    def test_empty_summary(self, cost_tracker):
        summary = cost_tracker.get_summary()
        assert summary["total_requests"] == 0
        assert summary["total_tokens"] == 0
        assert summary["total_cost_usd"] == 0

    def test_record_single_entry(self, cost_tracker):
        cost_tracker.record("claude-sonnet", 100, 200, 0.001, "chat")
        summary = cost_tracker.get_summary()
        assert summary["total_requests"] == 1
        assert summary["total_tokens"] == 300
        assert summary["total_cost_usd"] == 0.001

    def test_record_multiple_entries(self, cost_tracker):
        cost_tracker.record("claude-sonnet", 100, 200, 0.001, "chat")
        cost_tracker.record("gpt-4o", 150, 250, 0.002, "generate")
        summary = cost_tracker.get_summary()
        assert summary["total_requests"] == 2
        assert summary["total_tokens"] == 700

    def test_by_model_breakdown(self, cost_tracker):
        cost_tracker.record("claude-sonnet", 100, 200, 0.001, "chat")
        cost_tracker.record("claude-sonnet", 50, 100, 0.0005, "chat")
        cost_tracker.record("gpt-4o", 150, 250, 0.002, "generate")
        summary = cost_tracker.get_summary()
        assert "claude-sonnet" in summary["by_model"]
        assert summary["by_model"]["claude-sonnet"]["requests"] == 2
        assert "gpt-4o" in summary["by_model"]

    def test_by_use_case_breakdown(self, cost_tracker):
        cost_tracker.record("claude-sonnet", 100, 200, 0.001, "chat")
        cost_tracker.record("gpt-4o", 150, 250, 0.002, "generate")
        summary = cost_tracker.get_summary()
        assert "chat" in summary["by_use_case"]
        assert "generate" in summary["by_use_case"]

    def test_cost_entry_has_timestamp(self):
        entry = CostEntry(model="test", input_tokens=10, output_tokens=20, cost_usd=0.001, use_case="test")
        assert entry.timestamp is not None
        assert "T" in entry.timestamp

    def test_reset_clears_entries(self, cost_tracker):
        cost_tracker.record("claude-sonnet", 100, 200, 0.001, "chat")
        cost_tracker.reset()
        summary = cost_tracker.get_summary()
        assert summary["total_requests"] == 0

    def test_input_output_tokens_separate(self, cost_tracker):
        cost_tracker.record("claude-sonnet", 100, 200, 0.001, "chat")
        summary = cost_tracker.get_summary()
        assert summary["total_input_tokens"] == 100
        assert summary["total_output_tokens"] == 200

    def test_get_cost_tracker_singleton(self):
        t1 = get_cost_tracker()
        t2 = get_cost_tracker()
        assert t1 is t2
