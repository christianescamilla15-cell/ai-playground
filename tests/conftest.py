"""Shared fixtures for AI Playground tests."""
import sys
import os
import pytest

# Ensure project root is on path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.llm.providers import MockLLMProvider, get_provider
from services.llm.comparator import ModelComparator
from services.llm.cost_tracker import CostTracker
from services.documents.analyzer import DocumentAnalyzer
from services.documents.qa_engine import QAEngine
from services.documents.chunker import RecursiveTextSplitter, SimpleEmbedder
from services.usecases.chatbot import Chatbot
from services.usecases.content_gen import ContentGenerator
from services.usecases.data_extract import DataExtractor
from services.usecases.translator import Translator


SAMPLE_BUSINESS_TEXT = (
    "TechCorp Inc. reported Q4 2025 financial results. Revenue reached $4.2M, "
    "representing a 23% increase year-over-year. Operating margins improved to 18%, "
    "driven by efficiency initiatives and cost optimization. Customer satisfaction "
    "scores hit an all-time high of 4.7/5.0, with a retention rate of 94%. "
    "International expansion into Brazil and Colombia contributed 12% of total revenue. "
    "The company plans to invest $1.5M in AI product development in Q1 2026. "
    "Key risks include increasing market competition and currency fluctuation in LATAM markets."
)

SAMPLE_LEGAL_TEXT = (
    "SERVICE AGREEMENT between Provider Corp and Client LLC. "
    "This agreement governs the provision of cloud computing services. "
    "Section 4: Liability. The Provider's total liability shall not exceed $500,000. "
    "Section 5: Termination. Either party may terminate with 30 days written notice. "
    "Section 6: Indemnification. Client shall indemnify Provider against third-party claims. "
    "Section 7: Confidentiality. All proprietary information shared under this agreement "
    "shall remain confidential for a period of 5 years. "
    "Section 8: Non-compete. Client agrees to a 12-month non-compete clause. "
    "Section 9: Arbitration. All disputes shall be resolved through binding arbitration. "
    "Penalty for breach: $50,000 per occurrence. "
    "Contact: legal@providercorp.com or call +1-555-123-4567."
)


@pytest.fixture
def provider():
    return MockLLMProvider()


@pytest.fixture
def comparator():
    return ModelComparator()


@pytest.fixture
def cost_tracker():
    return CostTracker()


@pytest.fixture
def analyzer():
    return DocumentAnalyzer()


@pytest.fixture
def qa_engine():
    return QAEngine()


@pytest.fixture
def splitter():
    return RecursiveTextSplitter(chunk_size=200, chunk_overlap=20)


@pytest.fixture
def embedder():
    return SimpleEmbedder()


@pytest.fixture
def chatbot():
    return Chatbot()


@pytest.fixture
def content_gen():
    return ContentGenerator()


@pytest.fixture
def extractor():
    return DataExtractor()


@pytest.fixture
def translator():
    return Translator()


@pytest.fixture
def business_text():
    return SAMPLE_BUSINESS_TEXT


@pytest.fixture
def legal_text():
    return SAMPLE_LEGAL_TEXT
