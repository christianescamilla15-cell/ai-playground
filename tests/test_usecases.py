"""Tests for all use cases: chatbot, content_gen, data_extract, translator."""
from services.usecases.chatbot import Chatbot
from services.usecases.content_gen import ContentGenerator
from services.usecases.data_extract import DataExtractor
from services.usecases.translator import Translator


class TestChatbot:
    def test_send_returns_reply(self, chatbot):
        result = chatbot.send("Hello!")
        assert "reply" in result
        assert len(result["reply"]) > 0

    def test_send_tracks_history(self, chatbot):
        chatbot.send("Hello!")
        assert len(chatbot.history) == 2  # user + assistant

    def test_send_includes_tokens(self, chatbot):
        result = chatbot.send("Hello!")
        assert "tokens" in result
        assert result["tokens"]["input"] > 0

    def test_reset_clears_history(self, chatbot):
        chatbot.send("Hello!")
        chatbot.reset()
        assert len(chatbot.history) == 0

    def test_multiple_messages(self, chatbot):
        chatbot.send("Hello!")
        chatbot.send("How are you?")
        assert len(chatbot.history) == 4

    def test_cost_included(self, chatbot):
        result = chatbot.send("Hello!")
        assert "cost_usd" in result
        assert "latency_ms" in result


class TestContentGenerator:
    def test_generate_returns_content(self, content_gen):
        result = content_gen.generate("AI trends in 2025")
        assert "content" in result
        assert len(result["content"]) > 0

    def test_generate_with_tone(self, content_gen):
        result = content_gen.generate("AI trends", tone="executive")
        assert result["tone"] == "executive"

    def test_generate_with_format(self, content_gen):
        result = content_gen.generate("AI trends", format_type="email")
        assert result["format"] == "email"

    def test_invalid_tone_defaults(self, content_gen):
        result = content_gen.generate("AI trends", tone="invalid_tone")
        assert result["tone"] == "professional"

    def test_invalid_format_defaults(self, content_gen):
        result = content_gen.generate("AI trends", format_type="invalid_format")
        assert result["format"] == "email"

    def test_available_tones(self):
        tones = ContentGenerator.available_tones()
        assert "professional" in tones
        assert "casual" in tones
        assert "executive" in tones

    def test_available_formats(self):
        formats = ContentGenerator.available_formats()
        assert "email" in formats
        assert "report" in formats

    def test_generate_includes_cost(self, content_gen):
        result = content_gen.generate("Test topic")
        assert "cost_usd" in result
        assert "tokens" in result


class TestDataExtractor:
    def test_extract_entities(self, extractor, business_text):
        result = extractor.extract(business_text)
        assert "rule_based" in result
        entities = result["rule_based"]["entities"]
        assert len(entities) > 0

    def test_extract_money(self, extractor):
        result = extractor.extract("Revenue was $4.2M last quarter")
        money = [e for e in result["rule_based"]["entities"] if e["type"] == "money"]
        assert len(money) >= 1

    def test_extract_percentages(self, extractor):
        result = extractor.extract("Growth of 23% year over year")
        pcts = [e for e in result["rule_based"]["entities"] if e["type"] == "percentage"]
        assert len(pcts) >= 1

    def test_extract_key_facts(self, extractor, business_text):
        result = extractor.extract(business_text)
        facts = result["rule_based"]["key_facts"]
        assert len(facts) > 0

    def test_extract_includes_llm_result(self, extractor, business_text):
        result = extractor.extract(business_text)
        assert "llm_extraction" in result

    def test_extract_includes_cost(self, extractor):
        result = extractor.extract("Test text with $100 amount")
        assert "cost_usd" in result


class TestTranslator:
    def test_translate_returns_result(self, translator):
        result = translator.translate("Hello world", target_lang="es")
        assert "translated" in result
        assert len(result["translated"]) > 0

    def test_translate_preserves_original(self, translator):
        result = translator.translate("Hello world", target_lang="es")
        assert result["original"] == "Hello world"

    def test_translate_includes_langs(self, translator):
        result = translator.translate("Hello", target_lang="es", source_lang="en")
        assert result["source_lang"] == "en"
        assert result["target_lang"] == "es"

    def test_supported_languages(self):
        langs = Translator.supported_languages()
        assert "en" in langs
        assert "es" in langs

    def test_translate_includes_cost(self, translator):
        result = translator.translate("Test", target_lang="es")
        assert "cost_usd" in result
        assert "tokens" in result
