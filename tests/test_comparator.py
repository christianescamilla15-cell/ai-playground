"""Tests for model comparator."""
from services.llm.comparator import ModelComparator


class TestModelComparator:
    def test_compare_returns_all_models(self, comparator):
        result = comparator.compare("Summarize this")
        assert "models" in result
        assert len(result["models"]) == 3
        assert "claude-sonnet" in result["models"]
        assert "gpt-4o" in result["models"]
        assert "gemini-pro" in result["models"]

    def test_compare_has_rankings(self, comparator):
        result = comparator.compare("Summarize this")
        assert "rankings" in result
        assert "fastest" in result["rankings"]
        assert "cheapest" in result["rankings"]
        assert "most_detailed" in result["rankings"]

    def test_fastest_is_gemini(self, comparator):
        result = comparator.compare("Test prompt")
        assert result["rankings"]["fastest"] == "gemini-pro"

    def test_compare_includes_prompt_preview(self, comparator):
        long_prompt = "A" * 300
        result = comparator.compare(long_prompt)
        assert len(result["prompt"]) <= 200

    def test_compare_each_model_has_metrics(self, comparator):
        result = comparator.compare("Test")
        for model_data in result["models"].values():
            assert "text" in model_data
            assert "latency_ms" in model_data
            assert "input_tokens" in model_data
            assert "output_tokens" in model_data
            assert "cost_usd" in model_data
            assert "provider" in model_data

    def test_compare_custom_models(self, comparator):
        result = comparator.compare("Test", models=["claude-sonnet", "gpt-4o"])
        assert len(result["models"]) == 2

    def test_compare_with_system_prompt(self, comparator):
        result = comparator.compare("Test", system="Be brief")
        assert len(result["models"]) == 3
