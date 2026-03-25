"""FastAPI application with all AI Playground endpoints."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.llm.providers import get_provider, PRICING
from services.llm.comparator import ModelComparator
from services.llm.cost_tracker import get_cost_tracker
from services.documents.analyzer import DocumentAnalyzer
from services.documents.qa_engine import QAEngine
from services.usecases.chatbot import Chatbot
from services.usecases.content_gen import ContentGenerator
from services.usecases.data_extract import DataExtractor
from services.usecases.translator import Translator, SUPPORTED_LANGUAGES

app = FastAPI(title="AI Playground", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared instances
_qa_engine = QAEngine()
_chatbot = Chatbot()
_analyzer = DocumentAnalyzer()
_comparator = ModelComparator()
_content_gen = ContentGenerator()
_extractor = DataExtractor()
_translator = Translator()


# --- Request models ---
class ChatRequest(BaseModel):
    message: str
    model: str = "claude-sonnet"


class AnalyzeRequest(BaseModel):
    text: str


class QAIngestRequest(BaseModel):
    text: str


class QAQuestionRequest(BaseModel):
    question: str
    model: str = "claude-sonnet"
    top_k: int = 3


class GenerateRequest(BaseModel):
    topic: str
    tone: str = "professional"
    format_type: str = "email"
    model: str = "claude-sonnet"


class ExtractRequest(BaseModel):
    text: str
    model: str = "claude-sonnet"


class TranslateRequest(BaseModel):
    text: str
    target_lang: str = "es"
    source_lang: str = "en"
    model: str = "claude-sonnet"


class CompareRequest(BaseModel):
    prompt: str
    system: str = ""
    models: list[str] | None = None


# --- Endpoints ---
@app.get("/api/health")
def health():
    return {"status": "ok", "mode": "demo", "version": "1.0.0"}


@app.post("/api/chat")
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    _chatbot._model = req.model
    result = _chatbot.send(req.message)
    tracker = get_cost_tracker()
    tracker.record(
        model=req.model,
        input_tokens=result["tokens"]["input"],
        output_tokens=result["tokens"]["output"],
        cost_usd=result["cost_usd"],
        use_case="chat",
    )
    return result


@app.post("/api/analyze")
def analyze(req: AnalyzeRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    result = _analyzer.analyze(req.text)
    tracker = get_cost_tracker()
    tracker.record(
        model="rule-based",
        input_tokens=len(req.text.split()),
        output_tokens=0,
        cost_usd=0,
        use_case="analyze",
    )
    return result


@app.post("/api/qa/ingest")
def qa_ingest(req: QAIngestRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    return _qa_engine.ingest(req.text)


@app.post("/api/qa")
def qa_ask(req: QAQuestionRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    if not _qa_engine.is_ready:
        raise HTTPException(status_code=400, detail="No document ingested. Use /api/qa/ingest first.")
    result = _qa_engine.ask(req.question, top_k=req.top_k, model=req.model)
    tracker = get_cost_tracker()
    tracker.record(
        model=req.model,
        input_tokens=result["tokens"]["input"],
        output_tokens=result["tokens"]["output"],
        cost_usd=result["cost_usd"],
        use_case="qa",
    )
    return result


@app.post("/api/generate")
def generate(req: GenerateRequest):
    if not req.topic.strip():
        raise HTTPException(status_code=400, detail="Topic cannot be empty")
    result = _content_gen.generate(
        topic=req.topic, tone=req.tone, format_type=req.format_type, model=req.model
    )
    tracker = get_cost_tracker()
    tracker.record(
        model=req.model,
        input_tokens=result["tokens"]["input"],
        output_tokens=result["tokens"]["output"],
        cost_usd=result["cost_usd"],
        use_case="generate",
    )
    return result


@app.post("/api/extract")
def extract(req: ExtractRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    result = _extractor.extract(req.text, model=req.model)
    tracker = get_cost_tracker()
    tracker.record(
        model=req.model,
        input_tokens=result["tokens"]["input"],
        output_tokens=result["tokens"]["output"],
        cost_usd=result["cost_usd"],
        use_case="extract",
    )
    return result


@app.post("/api/translate")
def translate(req: TranslateRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    result = _translator.translate(
        text=req.text,
        target_lang=req.target_lang,
        source_lang=req.source_lang,
        model=req.model,
    )
    tracker = get_cost_tracker()
    tracker.record(
        model=req.model,
        input_tokens=result["tokens"]["input"],
        output_tokens=result["tokens"]["output"],
        cost_usd=result["cost_usd"],
        use_case="translate",
    )
    return result


@app.post("/api/compare")
def compare(req: CompareRequest):
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
    result = _comparator.compare(
        prompt=req.prompt, system=req.system, models=req.models
    )
    tracker = get_cost_tracker()
    for model_name, model_data in result["models"].items():
        tracker.record(
            model=model_name,
            input_tokens=model_data["input_tokens"],
            output_tokens=model_data["output_tokens"],
            cost_usd=model_data["cost_usd"],
            use_case="compare",
        )
    return result


@app.get("/api/costs")
def costs():
    return get_cost_tracker().get_summary()


@app.get("/api/models")
def models():
    return {
        "models": [
            {"id": k, "pricing": v, "provider": k.split("-")[0]}
            for k, v in PRICING.items()
        ]
    }


@app.get("/api/usecases")
def usecases():
    return {
        "usecases": [
            {"id": "chat", "name": "Chatbot", "description": "Conversational AI assistant with memory"},
            {"id": "analyze", "name": "Document Analysis", "description": "Summary, keywords, sentiment, entities, risk flags"},
            {"id": "qa", "name": "Q&A", "description": "RAG-based question answering over uploaded documents"},
            {"id": "generate", "name": "Content Generation", "description": "Generate business content with configurable tone and format"},
            {"id": "extract", "name": "Data Extraction", "description": "Extract structured entities and facts from text"},
            {"id": "translate", "name": "Translation", "description": "Translate text between supported languages"},
            {"id": "compare", "name": "Model Comparison", "description": "Compare responses from multiple AI models side by side"},
        ],
        "tones": ContentGenerator.available_tones(),
        "formats": ContentGenerator.available_formats(),
        "languages": SUPPORTED_LANGUAGES,
    }
