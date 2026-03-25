"""Document analysis: summary, keywords, sentiment, entities, risk flags."""
import re
from collections import Counter


POSITIVE_WORDS = {
    "growth", "increase", "improved", "strong", "positive", "success", "excellent",
    "profit", "gain", "revenue", "opportunity", "expansion", "achievement", "high",
    "satisfaction", "retention", "exceeded", "momentum", "innovation", "leading",
}

NEGATIVE_WORDS = {
    "risk", "decline", "loss", "decrease", "threat", "concern", "liability",
    "penalty", "violation", "breach", "terminate", "damage", "negligence",
    "default", "failure", "dispute", "indemnify", "limitation", "warning", "drop",
}

RISK_PATTERNS = [
    (r"(?i)terminat\w+", "Termination clause detected"),
    (r"(?i)liabilit\w+", "Liability clause detected"),
    (r"(?i)penalt\w+", "Penalty clause detected"),
    (r"(?i)indemnif\w+", "Indemnification clause detected"),
    (r"(?i)force\s+majeure", "Force majeure clause detected"),
    (r"(?i)confidential\w*", "Confidentiality clause detected"),
    (r"(?i)non[\-\s]?compet\w+", "Non-compete clause detected"),
    (r"(?i)arbitrat\w+", "Arbitration clause detected"),
]


class DocumentAnalyzer:
    """Analyze text documents for summary, keywords, sentiment, entities, risks."""

    def analyze(self, text: str) -> dict:
        if not text or not text.strip():
            return {
                "summary": "",
                "keywords": [],
                "sentiment": {"score": 0, "label": "neutral"},
                "entities": [],
                "risk_flags": [],
                "stats": {"chars": 0, "words": 0, "sentences": 0},
            }

        words = re.findall(r"\w+", text.lower())
        sentences = [s.strip() for s in re.split(r"[.!?]+", text) if s.strip()]

        return {
            "summary": self._summarize(sentences),
            "keywords": self._extract_keywords(words),
            "sentiment": self._analyze_sentiment(words),
            "entities": self._extract_entities(text),
            "risk_flags": self._detect_risks(text),
            "stats": {
                "chars": len(text),
                "words": len(words),
                "sentences": len(sentences),
            },
        }

    def _summarize(self, sentences: list[str]) -> str:
        if not sentences:
            return ""
        # Take first 3 sentences as extractive summary
        summary_sents = sentences[:3]
        return ". ".join(summary_sents) + "."

    def _extract_keywords(self, words: list[str], top_n: int = 10) -> list[dict]:
        stopwords = {
            "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
            "have", "has", "had", "do", "does", "did", "will", "would", "could",
            "should", "may", "might", "shall", "can", "to", "of", "in", "for",
            "on", "with", "at", "by", "from", "as", "into", "through", "during",
            "before", "after", "and", "but", "or", "nor", "not", "so", "yet",
            "both", "either", "neither", "each", "every", "all", "any", "few",
            "more", "most", "other", "some", "such", "no", "only", "own", "same",
            "than", "too", "very", "just", "because", "if", "when", "where",
            "how", "what", "which", "who", "whom", "this", "that", "these",
            "those", "it", "its", "we", "our", "they", "their", "them", "he",
            "she", "his", "her", "i", "me", "my", "you", "your",
        }
        filtered = [w for w in words if w not in stopwords and len(w) > 2]
        counts = Counter(filtered)
        total = len(filtered) if filtered else 1
        return [
            {"word": word, "count": count, "frequency": round(count / total, 4)}
            for word, count in counts.most_common(top_n)
        ]

    def _analyze_sentiment(self, words: list[str]) -> dict:
        pos = sum(1 for w in words if w in POSITIVE_WORDS)
        neg = sum(1 for w in words if w in NEGATIVE_WORDS)
        total = pos + neg
        if total == 0:
            return {"score": 0, "label": "neutral", "positive": 0, "negative": 0}
        score = (pos - neg) / total
        if score > 0.2:
            label = "positive"
        elif score < -0.2:
            label = "negative"
        else:
            label = "mixed"
        return {
            "score": round(score, 3),
            "label": label,
            "positive": pos,
            "negative": neg,
        }

    def _extract_entities(self, text: str) -> list[dict]:
        entities = []
        # Money amounts
        for m in re.finditer(r"\$[\d,.]+[MBKmkb]?", text):
            entities.append({"type": "money", "value": m.group(), "position": m.start()})
        # Percentages
        for m in re.finditer(r"\d+\.?\d*%", text):
            entities.append({"type": "percentage", "value": m.group(), "position": m.start()})
        # Dates
        for m in re.finditer(r"(?:Q[1-4]\s+\d{4}|\d{4}-\d{2}-\d{2}|\w+\s+\d{1,2},?\s+\d{4})", text):
            entities.append({"type": "date", "value": m.group(), "position": m.start()})
        # Emails
        for m in re.finditer(r"[\w.+-]+@[\w-]+\.[\w.-]+", text):
            entities.append({"type": "email", "value": m.group(), "position": m.start()})
        return sorted(entities, key=lambda e: e["position"])

    def _detect_risks(self, text: str) -> list[dict]:
        risks = []
        for pattern, description in RISK_PATTERNS:
            matches = list(re.finditer(pattern, text))
            if matches:
                risks.append({
                    "description": description,
                    "count": len(matches),
                    "positions": [m.start() for m in matches],
                })
        return risks
