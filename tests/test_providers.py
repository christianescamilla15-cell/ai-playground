"""Tests for LLM providers."""
from services.llm.providers import MockLLMProvider, LLMResponse, PRICING, get_provider


class TestMockLLMProvider:
    def test_generate_returns_llm_response(self, provider):
        result = provider.generate("Hello world")
        assert isinstance(result, LLMResponse)

    def test_generate_claude_model(self, provider):
        result = provider.generate("Hello", model="claude-sonnet")
        assert result.model == "claude-sonnet"
        assert result.provider == "claude"
        assert result.latency_ms == 800

    def test_generate_gpt_model(self, provider):
        result = provider.generate("Hello", model="gpt-4o")
        assert result.model == "gpt-4o"
        assert result.provider == "gpt"
        assert result.latency_ms == 650

    def test_generate_gemini_model(self, provider):
        result = provider.generate("Hello", model="gemini-pro")
        assert result.model == "gemini-pro"
        assert result.provider == "gemini"
        assert result.latency_ms == 500

    def test_summary_prompt_claude(self, provider):
        result = provider.generate("Summarize this document", model="claude-sonnet")
        assert "analysis" in result.text.lower() or "document" in result.text.lower()

    def test_summary_prompt_gpt(self, provider):
        result = provider.generate("Summarize this report", model="gpt-4o")
        assert "summary" in result.text.lower() or "key" in result.text.lower()

    def test_summary_prompt_gemini(self, provider):
        result = provider.generate("Summarize this", model="gemini-pro")
        assert "summary" in result.text.lower() or "document" in result.text.lower()

    def test_translation_prompt_spanish(self, provider):
        result = provider.generate("Translate to Spanish", model="claude-sonnet")
        assert "documento" in result.text.lower() or "estrategia" in result.text.lower()

    def test_extraction_prompt(self, provider):
        result = provider.generate("Extract entities from this", model="claude-sonnet")
        assert "entities" in result.text or "key_facts" in result.text

    def test_chat_prompt(self, provider):
        result = provider.generate("Hello, can you help me?", model="claude-sonnet")
        assert len(result.text) > 10

    def test_content_generation_prompt(self, provider):
        result = provider.generate("Generate content about AI", model="claude-sonnet")
        assert len(result.text) > 20

    def test_token_counting(self, provider):
        result = provider.generate("This is a five word prompt", model="claude-sonnet")
        assert result.input_tokens > 0
        assert result.output_tokens > 0

    def test_cost_calculation(self, provider):
        result = provider.generate("Test prompt", model="claude-sonnet")
        assert result.cost_usd >= 0
        assert isinstance(result.cost_usd, float)

    def test_pricing_dict_has_all_models(self):
        assert "claude-sonnet" in PRICING
        assert "gpt-4o" in PRICING
        assert "gemini-pro" in PRICING

    def test_get_provider_returns_instance(self):
        p = get_provider()
        assert isinstance(p, MockLLMProvider)

    def test_system_prompt_included_in_token_count(self, provider):
        r1 = provider.generate("Hello", system="")
        r2 = provider.generate("Hello", system="You are a helpful assistant with a long system prompt")
        assert r2.input_tokens > r1.input_tokens

    def test_default_fallback_response(self, provider):
        result = provider.generate("xyz unknown prompt type", model="claude-sonnet")
        assert len(result.text) > 10
