"""Text splitting and simple embedding for RAG pipeline."""
import re
import math
from dataclasses import dataclass


@dataclass
class Chunk:
    text: str
    index: int
    start_char: int
    end_char: int


class RecursiveTextSplitter:
    """Split text recursively by separators, respecting chunk size."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self._separators = ["\n\n", "\n", ". ", " "]

    def split(self, text: str) -> list[Chunk]:
        if not text or not text.strip():
            return []
        chunks = self._split_recursive(text, self._separators)
        result = []
        offset = 0
        for i, chunk_text in enumerate(chunks):
            start = text.find(chunk_text, offset)
            if start == -1:
                start = offset
            end = start + len(chunk_text)
            result.append(Chunk(text=chunk_text, index=i, start_char=start, end_char=end))
            offset = max(offset, start + 1)
        return result

    def _split_recursive(self, text: str, separators: list[str]) -> list[str]:
        if len(text) <= self.chunk_size:
            return [text.strip()] if text.strip() else []

        if not separators:
            # Force split by chunk_size
            chunks = []
            for i in range(0, len(text), self.chunk_size - self.chunk_overlap):
                piece = text[i : i + self.chunk_size].strip()
                if piece:
                    chunks.append(piece)
            return chunks

        sep = separators[0]
        parts = text.split(sep)
        chunks = []
        current = ""

        for part in parts:
            candidate = (current + sep + part).strip() if current else part.strip()
            if len(candidate) <= self.chunk_size:
                current = candidate
            else:
                if current.strip():
                    chunks.append(current.strip())
                if len(part) > self.chunk_size:
                    chunks.extend(self._split_recursive(part, separators[1:]))
                    current = ""
                else:
                    current = part.strip()

        if current.strip():
            chunks.append(current.strip())

        return chunks


class SimpleEmbedder:
    """TF-based embedding for demo RAG. No external dependencies."""

    def embed(self, text: str) -> dict[str, float]:
        words = re.findall(r"\w+", text.lower())
        if not words:
            return {}
        freq: dict[str, int] = {}
        for w in words:
            freq[w] = freq.get(w, 0) + 1
        total = len(words)
        return {w: count / total for w, count in freq.items()}

    def similarity(self, emb_a: dict[str, float], emb_b: dict[str, float]) -> float:
        if not emb_a or not emb_b:
            return 0.0
        common = set(emb_a.keys()) & set(emb_b.keys())
        if not common:
            return 0.0
        dot = sum(emb_a[w] * emb_b[w] for w in common)
        mag_a = math.sqrt(sum(v * v for v in emb_a.values()))
        mag_b = math.sqrt(sum(v * v for v in emb_b.values()))
        if mag_a == 0 or mag_b == 0:
            return 0.0
        return dot / (mag_a * mag_b)
