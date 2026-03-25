"""Tests for document analyzer."""
from services.documents.analyzer import DocumentAnalyzer


class TestDocumentAnalyzer:
    def test_analyze_returns_all_fields(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        assert "summary" in result
        assert "keywords" in result
        assert "sentiment" in result
        assert "entities" in result
        assert "risk_flags" in result
        assert "stats" in result

    def test_analyze_empty_text(self, analyzer):
        result = analyzer.analyze("")
        assert result["summary"] == ""
        assert result["keywords"] == []
        assert result["sentiment"]["label"] == "neutral"

    def test_summary_is_nonempty(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        assert len(result["summary"]) > 10

    def test_keywords_extracted(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        assert len(result["keywords"]) > 0
        keyword_words = [k["word"] for k in result["keywords"]]
        assert any(w in keyword_words for w in ["revenue", "operating", "customer"])

    def test_sentiment_positive_for_business(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        assert result["sentiment"]["label"] in ("positive", "mixed")
        assert result["sentiment"]["positive"] > 0

    def test_sentiment_negative_for_legal(self, analyzer, legal_text):
        result = analyzer.analyze(legal_text)
        assert result["sentiment"]["negative"] > 0

    def test_entities_money(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        money_entities = [e for e in result["entities"] if e["type"] == "money"]
        assert len(money_entities) >= 1

    def test_entities_percentage(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        pct_entities = [e for e in result["entities"] if e["type"] == "percentage"]
        assert len(pct_entities) >= 1

    def test_entities_date(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        date_entities = [e for e in result["entities"] if e["type"] == "date"]
        assert len(date_entities) >= 1

    def test_risk_flags_legal(self, analyzer, legal_text):
        result = analyzer.analyze(legal_text)
        assert len(result["risk_flags"]) >= 3
        descriptions = [r["description"] for r in result["risk_flags"]]
        assert any("Termination" in d for d in descriptions)
        assert any("Liability" in d for d in descriptions)

    def test_stats_word_count(self, analyzer, business_text):
        result = analyzer.analyze(business_text)
        assert result["stats"]["words"] > 0
        assert result["stats"]["chars"] > 0
        assert result["stats"]["sentences"] > 0

    def test_entities_email_detection(self, analyzer, legal_text):
        result = analyzer.analyze(legal_text)
        email_entities = [e for e in result["entities"] if e["type"] == "email"]
        assert len(email_entities) >= 1
