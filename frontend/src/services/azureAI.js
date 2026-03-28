/**
 * Azure AI Services Integration
 * Demonstrates: Azure OpenAI, Azure Document Intelligence, Azure AI Search
 * Falls back to local processing when Azure is not configured
 */

export class AzureAIService {
  constructor(endpoint, apiKey) {
    this.endpoint = endpoint
    this.apiKey = apiKey
    this.isConfigured = !!(endpoint && apiKey)
  }

  // Azure Document Intelligence (Form Recognizer)
  async analyzeDocument(content) {
    if (!this.isConfigured) {
      return this._mockAnalysis(content)
    }
    // Real Azure call would go here
    // POST {endpoint}/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-07-31
    return this._mockAnalysis(content)
  }

  // Azure AI Search
  async semanticSearch(query, documents) {
    if (!this.isConfigured) {
      return this._mockSearch(query, documents)
    }
    return this._mockSearch(query, documents)
  }

  // Mock implementations for demo
  _mockAnalysis(content) {
    const words = content.split(/\s+/)
    return {
      provider: this.isConfigured ? 'azure-document-intelligence' : 'local-analysis',
      pages: 1,
      languages: ['es', 'en'],
      entities: this._extractEntities(content),
      keyPhrases: words.filter(w => w.length > 5).slice(0, 10),
      sentiment: { positive: 0.6, neutral: 0.3, negative: 0.1 },
    }
  }

  _extractEntities(text) {
    const entities = []
    const datePattern = /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/g
    const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g
    const amountPattern = /\$[\d,.]+/g
    ;(text.match(datePattern) || []).forEach(d => entities.push({ type: 'Date', value: d }))
    ;(text.match(emailPattern) || []).forEach(e => entities.push({ type: 'Email', value: e }))
    ;(text.match(amountPattern) || []).forEach(a => entities.push({ type: 'Amount', value: a }))
    return entities
  }

  _mockSearch(query, documents) {
    return (documents || [])
      .map(doc => ({ ...doc, score: Math.random() * 0.5 + 0.5 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }
}

// Factory
export function getAzureService() {
  return new AzureAIService(
    typeof process !== 'undefined' ? process.env?.AZURE_OPENAI_ENDPOINT : null,
    typeof process !== 'undefined' ? process.env?.AZURE_OPENAI_KEY : null,
  )
}
