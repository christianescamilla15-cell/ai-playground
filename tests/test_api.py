"""Tests for FastAPI endpoints."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from fastapi.testclient import TestClient
from api.main import app


@pytest.fixture
def client():
    return TestClient(app)


class TestHealthEndpoint:
    def test_health(self, client):
        r = client.get("/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        assert data["mode"] == "demo"


class TestChatEndpoint:
    def test_chat_success(self, client):
        r = client.post("/api/chat", json={"message": "Hello!"})
        assert r.status_code == 200
        assert "reply" in r.json()

    def test_chat_empty_message(self, client):
        r = client.post("/api/chat", json={"message": ""})
        assert r.status_code == 400

    def test_chat_with_model(self, client):
        r = client.post("/api/chat", json={"message": "Hello!", "model": "gpt-4o"})
        assert r.status_code == 200


class TestAnalyzeEndpoint:
    def test_analyze_success(self, client):
        r = client.post("/api/analyze", json={"text": "Revenue grew 23% to $4.2M in Q4 2025."})
        assert r.status_code == 200
        data = r.json()
        assert "summary" in data
        assert "keywords" in data

    def test_analyze_empty(self, client):
        r = client.post("/api/analyze", json={"text": ""})
        assert r.status_code == 400


class TestQAEndpoint:
    def test_qa_ingest(self, client):
        r = client.post("/api/qa/ingest", json={"text": "TechCorp revenue was $4.2M in Q4 2025."})
        assert r.status_code == 200
        assert r.json()["status"] == "ready"

    def test_qa_ask_after_ingest(self, client):
        client.post("/api/qa/ingest", json={"text": "TechCorp revenue was $4.2M in Q4 2025. Growth was 23%."})
        r = client.post("/api/qa", json={"question": "What was the revenue?"})
        assert r.status_code == 200
        assert "answer" in r.json()

    def test_qa_empty_question(self, client):
        r = client.post("/api/qa", json={"question": ""})
        assert r.status_code == 400


class TestGenerateEndpoint:
    def test_generate_success(self, client):
        r = client.post("/api/generate", json={"topic": "AI trends"})
        assert r.status_code == 200
        assert "content" in r.json()

    def test_generate_empty(self, client):
        r = client.post("/api/generate", json={"topic": ""})
        assert r.status_code == 400


class TestExtractEndpoint:
    def test_extract_success(self, client):
        r = client.post("/api/extract", json={"text": "Revenue was $4.2M with 23% growth"})
        assert r.status_code == 200
        assert "rule_based" in r.json()

    def test_extract_empty(self, client):
        r = client.post("/api/extract", json={"text": ""})
        assert r.status_code == 400


class TestTranslateEndpoint:
    def test_translate_success(self, client):
        r = client.post("/api/translate", json={"text": "Hello world"})
        assert r.status_code == 200
        assert "translated" in r.json()

    def test_translate_empty(self, client):
        r = client.post("/api/translate", json={"text": ""})
        assert r.status_code == 400


class TestCompareEndpoint:
    def test_compare_success(self, client):
        r = client.post("/api/compare", json={"prompt": "Summarize AI trends"})
        assert r.status_code == 200
        data = r.json()
        assert "models" in data
        assert "rankings" in data

    def test_compare_empty(self, client):
        r = client.post("/api/compare", json={"prompt": ""})
        assert r.status_code == 400


class TestCostsEndpoint:
    def test_costs(self, client):
        r = client.get("/api/costs")
        assert r.status_code == 200
        assert "total_requests" in r.json()


class TestModelsEndpoint:
    def test_models(self, client):
        r = client.get("/api/models")
        assert r.status_code == 200
        assert "models" in r.json()
        assert len(r.json()["models"]) == 3


class TestUsecasesEndpoint:
    def test_usecases(self, client):
        r = client.get("/api/usecases")
        assert r.status_code == 200
        data = r.json()
        assert "usecases" in data
        assert len(data["usecases"]) == 7
        assert "tones" in data
        assert "formats" in data
