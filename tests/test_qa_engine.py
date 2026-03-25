"""Tests for RAG Q&A engine."""
from services.documents.qa_engine import QAEngine


class TestQAEngine:
    def test_ingest_document(self, qa_engine, business_text):
        result = qa_engine.ingest(business_text)
        assert result["status"] == "ready"
        assert result["chunks"] > 0
        assert result["chars"] == len(business_text)

    def test_is_ready_after_ingest(self, qa_engine, business_text):
        assert not qa_engine.is_ready
        qa_engine.ingest(business_text)
        assert qa_engine.is_ready

    def test_chunk_count(self, qa_engine, business_text):
        qa_engine.ingest(business_text)
        assert qa_engine.chunk_count > 0

    def test_ask_without_document(self, qa_engine):
        result = qa_engine.ask("What is the revenue?")
        assert "No document" in result["answer"]

    def test_ask_returns_answer(self, qa_engine, business_text):
        qa_engine.ingest(business_text)
        result = qa_engine.ask("What is the revenue?")
        assert "answer" in result
        assert len(result["answer"]) > 0

    def test_ask_returns_sources(self, qa_engine, business_text):
        qa_engine.ingest(business_text)
        result = qa_engine.ask("What is the revenue?")
        assert "sources" in result
        assert len(result["sources"]) > 0

    def test_ask_includes_model(self, qa_engine, business_text):
        qa_engine.ingest(business_text)
        result = qa_engine.ask("Test question", model="gpt-4o")
        assert result["model"] == "gpt-4o"

    def test_ask_includes_cost(self, qa_engine, business_text):
        qa_engine.ingest(business_text)
        result = qa_engine.ask("Revenue?")
        assert "cost_usd" in result
        assert "tokens" in result
