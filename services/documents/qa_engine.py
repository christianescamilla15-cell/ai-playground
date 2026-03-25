"""RAG Q&A engine: chunk documents, find relevant chunks, generate answers."""
from services.documents.chunker import RecursiveTextSplitter, SimpleEmbedder, Chunk
from services.llm.providers import get_provider


class QAEngine:
    """Simple RAG engine for document question answering."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self._splitter = RecursiveTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        self._embedder = SimpleEmbedder()
        self._provider = get_provider()
        self._chunks: list[Chunk] = []
        self._embeddings: list[dict[str, float]] = []
        self._document: str = ""

    def ingest(self, text: str) -> dict:
        """Ingest a document: split into chunks and embed."""
        self._document = text
        self._chunks = self._splitter.split(text)
        self._embeddings = [self._embedder.embed(c.text) for c in self._chunks]
        return {
            "chunks": len(self._chunks),
            "chars": len(text),
            "status": "ready",
        }

    def ask(self, question: str, top_k: int = 3, model: str = "claude-sonnet") -> dict:
        """Answer a question using the most relevant chunks."""
        if not self._chunks:
            return {
                "answer": "No document has been ingested. Please upload a document first.",
                "sources": [],
                "model": model,
            }

        q_emb = self._embedder.embed(question)
        scored = []
        for i, emb in enumerate(self._embeddings):
            score = self._embedder.similarity(q_emb, emb)
            scored.append((score, i))
        scored.sort(reverse=True)
        top_indices = [idx for _, idx in scored[:top_k]]

        context_chunks = [self._chunks[i] for i in top_indices]
        context = "\n\n---\n\n".join(c.text for c in context_chunks)

        prompt = (
            f"Based on the following document excerpts, answer the question.\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {question}\n\n"
            f"Answer:"
        )
        response = self._provider.generate(prompt, model=model)

        sources = [
            {
                "chunk_index": c.index,
                "text": c.text[:200] + ("..." if len(c.text) > 200 else ""),
                "relevance": round(scored[i][0], 4) if i < len(scored) else 0,
            }
            for i, c in enumerate(context_chunks)
        ]

        return {
            "answer": response.text,
            "sources": sources,
            "model": model,
            "tokens": {
                "input": response.input_tokens,
                "output": response.output_tokens,
            },
            "cost_usd": response.cost_usd,
        }

    @property
    def is_ready(self) -> bool:
        return len(self._chunks) > 0

    @property
    def chunk_count(self) -> int:
        return len(self._chunks)
