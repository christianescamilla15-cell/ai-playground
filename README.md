# AI Playground

Interactive demo where non-technical stakeholders can test AI capabilities without writing code.

## Features

- **Chat** — Conversational AI assistant with memory
- **Document Analysis** — Summary, keywords, sentiment, entities, risk flags
- **Q&A** — RAG-based question answering over uploaded documents
- **Content Generation** — Business content with configurable tone and format
- **Data Extraction** — Structured entities and facts from unstructured text
- **Translation** — Multi-language support (EN, ES, FR, PT, DE)
- **Model Comparison** — Side-by-side Claude vs GPT vs Gemini comparison
- **Cost Tracking** — Real-time token usage and cost dashboard

## Stack

- **Backend:** Python + FastAPI
- **Frontend:** React + Vite (dark theme, responsive, bilingual EN/ES)
- **AI:** Mock providers for demo (Claude, GPT-4o, Gemini Pro)

## Quick Start

```bash
# Backend
pip install -e .
uvicorn api.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Run Tests

```bash
pip install -e ".[dev]"
python -m pytest tests/ -v
```

## License

Non-commercial use only. See LICENSE file.
