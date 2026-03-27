import React, { useState, useRef, useEffect, useCallback } from 'react'
import PlaygroundAssistant from './PlaygroundAssistant.jsx'

/* ───────── i18n ───────── */
const T = {
  en: {
    title: 'AI Playground',
    subtitle: 'Interactive AI Demo',
    chat: 'Chat', analyze: 'Analyze', qa: 'Q&A', generate: 'Generate',
    extract: 'Extract', translate: 'Translate', compare: 'Compare',
    model: 'Model', send: 'Send', analyze_btn: 'Analyze', ask: 'Ask',
    generate_btn: 'Generate', extract_btn: 'Extract', translate_btn: 'Translate',
    compare_btn: 'Compare', copy: 'Copy', copied: 'Copied!', export_json: 'Export JSON',
    topic: 'Topic', tone: 'Tone', format: 'Format', question: 'Question',
    paste_doc: 'Paste document text or select a sample...',
    type_message: 'Type a message...',
    type_question: 'Ask a question about the document...',
    source_text: 'Source text', target_lang: 'Target language',
    prompt_placeholder: 'Enter a prompt to compare across models...',
    summary: 'Summary', keywords: 'Keywords', sentiment: 'Sentiment',
    entities: 'Entities', risk_flags: 'Risk Flags', stats: 'Statistics',
    original: 'Original', translated: 'Translated',
    fastest: 'Fastest', cheapest: 'Cheapest', most_detailed: 'Most Detailed',
    tokens: 'Tokens', cost: 'Cost', latency: 'Latency',
    total_requests: 'Total Requests', total_tokens: 'Total Tokens', total_cost: 'Total Cost',
    costs_title: 'Cost Tracker', no_data: 'No data yet. Start using the playground!',
    sample_biz: 'Sample: Business Report', sample_legal: 'Sample: Legal Document',
    professional: 'Professional', casual: 'Casual', executive: 'Executive',
    email: 'Email', report: 'Report', social: 'Social', presentation: 'Presentation',
    suggestions: ['Summarize this quarter\'s results', 'Draft an email to stakeholders',
      'What are the key risks?', 'Generate a LATAM expansion brief'],
    ingest_first: 'First paste or select a document, then ask questions.',
    doc_ready: 'Document loaded! Ask a question below.',
    rule_based: 'Rule-Based Extraction', llm_extraction: 'LLM Extraction',
    key_facts: 'Key Facts', no_risks: 'No risk flags detected.',
    chars: 'Characters', words: 'Words', sentences: 'Sentences',
    metrics: 'Metrics', by_model: 'By Model', by_usecase: 'By Use Case',
    requests: 'Requests',
    load_doc: 'Load Document', load_different: 'Load Different Document',
    answer_title: 'Answer', sources: 'Sources', relevance: 'Relevance',
    generated_content: 'Generated Content',
    pipeline_steps: ['Chunking', 'Keywords', 'Sentiment', 'Entities', 'Risks'],
  },
  es: {
    title: 'AI Playground',
    subtitle: 'Demo Interactivo de IA',
    chat: 'Chat', analyze: 'Analizar', qa: 'P&R', generate: 'Generar',
    extract: 'Extraer', translate: 'Traducir', compare: 'Comparar',
    model: 'Modelo', send: 'Enviar', analyze_btn: 'Analizar', ask: 'Preguntar',
    generate_btn: 'Generar', extract_btn: 'Extraer', translate_btn: 'Traducir',
    compare_btn: 'Comparar', copy: 'Copiar', copied: 'Copiado!', export_json: 'Exportar JSON',
    topic: 'Tema', tone: 'Tono', format: 'Formato', question: 'Pregunta',
    paste_doc: 'Pega el texto del documento o selecciona una muestra...',
    type_message: 'Escribe un mensaje...',
    type_question: 'Haz una pregunta sobre el documento...',
    source_text: 'Texto original', target_lang: 'Idioma destino',
    prompt_placeholder: 'Escribe un prompt para comparar entre modelos...',
    summary: 'Resumen', keywords: 'Palabras clave', sentiment: 'Sentimiento',
    entities: 'Entidades', risk_flags: 'Alertas de Riesgo', stats: 'Estadisticas',
    original: 'Original', translated: 'Traducido',
    fastest: 'Mas Rapido', cheapest: 'Mas Barato', most_detailed: 'Mas Detallado',
    tokens: 'Tokens', cost: 'Costo', latency: 'Latencia',
    total_requests: 'Total Solicitudes', total_tokens: 'Total Tokens', total_cost: 'Costo Total',
    costs_title: 'Rastreador de Costos', no_data: 'Sin datos aun. Comienza a usar el playground!',
    sample_biz: 'Muestra: Reporte de Negocio', sample_legal: 'Muestra: Documento Legal',
    professional: 'Profesional', casual: 'Casual', executive: 'Ejecutivo',
    email: 'Email', report: 'Reporte', social: 'Social', presentation: 'Presentacion',
    suggestions: ['Resume los resultados del trimestre', 'Redacta un email para stakeholders',
      'Cuales son los riesgos clave?', 'Genera un brief de expansion LATAM'],
    ingest_first: 'Primero pega o selecciona un documento, luego haz preguntas.',
    doc_ready: 'Documento cargado! Haz una pregunta abajo.',
    rule_based: 'Extraccion por Reglas', llm_extraction: 'Extraccion LLM',
    key_facts: 'Hechos Clave', no_risks: 'No se detectaron alertas de riesgo.',
    chars: 'Caracteres', words: 'Palabras', sentences: 'Oraciones',
    metrics: 'Metricas', by_model: 'Por Modelo', by_usecase: 'Por Caso de Uso',
    requests: 'Solicitudes',
    load_doc: 'Cargar Documento', load_different: 'Cargar Otro Documento',
    answer_title: 'Respuesta', sources: 'Fuentes', relevance: 'Relevancia',
    generated_content: 'Contenido Generado',
    pipeline_steps: ['Fragmentacion', 'Palabras clave', 'Sentimiento', 'Entidades', 'Riesgos'],
  }
}

/* ───────── Tour i18n ───────── */
const TOUR_TEXT = {
  0: {
    title: { en: 'AI Playground \u2014 Interactive AI Demo', es: 'AI Playground \u2014 Demo Interactiva de IA' },
    text: {
      en: 'Explore 7 AI capabilities side by side: Chat, Document Analysis, Q&A, Content Generation, Data Extraction, Translation, and Model Comparison. Try each one with sample data and see real-time cost tracking.\n\nLet me give you a guided tour!',
      es: 'Explora 7 capacidades de IA lado a lado: Chat, An\u00e1lisis de Documentos, Q&A, Generaci\u00f3n de Contenido, Extracci\u00f3n de Datos, Traducci\u00f3n, y Comparaci\u00f3n de Modelos. Prueba cada una con datos de ejemplo y observa el seguimiento de costos en tiempo real.\n\n\u00a1D\u00e9jame darte un tour guiado!'
    },
    btn: { en: 'Start Tour \u2192', es: 'Iniciar Tour \u2192' }
  },
  1: {
    title: { en: 'Navigation & Models', es: 'Navegaci\u00f3n y Modelos' },
    text: {
      en: 'The sidebar has 7 use-case tabs: Chat, Analyze, Q&A, Generate, Extract, Translate, and Compare. Below them you can switch between Claude, GPT-4o, and Gemini Pro.',
      es: 'La barra lateral tiene 7 pesta\u00f1as: Chat, Analizar, P&R, Generar, Extraer, Traducir y Comparar. Debajo puedes cambiar entre Claude, GPT-4o y Gemini Pro.'
    },
    btn: { en: 'Next \u2192', es: 'Siguiente \u2192' }
  },
  2: {
    title: { en: 'Document Analysis', es: 'An\u00e1lisis de Documentos' },
    text: {
      en: 'The Analyze tab processes any text and extracts keywords, sentiment, entities, and risk flags \u2014 all client-side. Let me run a demo for you!',
      es: 'La pesta\u00f1a Analizar procesa cualquier texto y extrae palabras clave, sentimiento, entidades y alertas de riesgo \u2014 todo en el cliente. \u00a1D\u00e9jame ejecutar una demo!'
    },
    btn: { en: 'Try it \u2192', es: 'Probar \u2192' }
  },
  3: {
    title: { en: 'Analysis Results', es: 'Resultados del An\u00e1lisis' },
    text: {
      en: 'Here are the results: keyword frequency, sentiment gauge, extracted entities (money, dates, percentages), and risk flags for legal documents.',
      es: 'Aqu\u00ed est\u00e1n los resultados: frecuencia de palabras clave, medidor de sentimiento, entidades extra\u00eddas (dinero, fechas, porcentajes) y alertas de riesgo para documentos legales.'
    },
    btn: { en: 'Next \u2192', es: 'Siguiente \u2192' }
  },
  4: {
    title: { en: 'Model Comparison', es: 'Comparaci\u00f3n de Modelos' },
    text: {
      en: 'The Compare tab sends the same prompt to all 3 models simultaneously and ranks them by speed, cost, and detail. Watch!',
      es: 'La pesta\u00f1a Comparar env\u00eda el mismo prompt a los 3 modelos simult\u00e1neamente y los clasifica por velocidad, costo y detalle. \u00a1Mira!'
    },
    btn: { en: 'Try it \u2192', es: 'Probar \u2192' }
  },
  5: {
    title: { en: 'Comparison Results', es: 'Resultados de Comparaci\u00f3n' },
    text: {
      en: 'Each model card shows its response, latency, token count, and cost. Winner badges highlight the Fastest, Cheapest, and Most Detailed model.',
      es: 'Cada tarjeta muestra la respuesta, latencia, tokens y costo. Las insignias resaltan el modelo M\u00e1s R\u00e1pido, M\u00e1s Barato y M\u00e1s Detallado.'
    },
    btn: { en: 'Next \u2192', es: 'Siguiente \u2192' }
  },
  6: {
    title: { en: 'Cost Tracker', es: 'Rastreador de Costos' },
    text: {
      en: 'Every action tracks token usage and estimated cost. The metrics panel shows totals by model and by use case \u2014 like a real production dashboard.',
      es: 'Cada acci\u00f3n registra el uso de tokens y costo estimado. El panel de m\u00e9tricas muestra totales por modelo y por caso de uso \u2014 como un dashboard de producci\u00f3n real.'
    },
    btn: { en: 'Next \u2192', es: 'Siguiente \u2192' }
  },
  7: {
    title: { en: 'Translation', es: 'Traducci\u00f3n' },
    text: {
      en: 'The Translate tab supports English, Spanish, French, Portuguese, and German. Let me show you a quick demo!',
      es: 'La pesta\u00f1a Traducir soporta ingl\u00e9s, espa\u00f1ol, franc\u00e9s, portugu\u00e9s y alem\u00e1n. \u00a1D\u00e9jame mostrarte una demo r\u00e1pida!'
    },
    btn: { en: 'Try it \u2192', es: 'Probar \u2192' }
  },
  8: {
    title: { en: 'Tour Complete!', es: '\u00a1Tour Completado!' },
    text: {
      en: 'You\'ve seen Analyze, Compare, and Translate in action. Feel free to explore Chat, Generate, Extract, and Q&A on your own \u2014 they all work the same way with sample data and real-time cost tracking!',
      es: '\u00a1Has visto Analizar, Comparar y Traducir en acci\u00f3n! Explora Chat, Generar, Extraer y P&R por tu cuenta \u2014 todos funcionan igual con datos de ejemplo y seguimiento de costos en tiempo real!'
    },
    btn: { en: 'Finish Tour \u2713', es: 'Finalizar Tour \u2713' }
  }
}
const TOUR_TOTAL = 9
const TOUR_SKIP = { en: 'Skip Tour', es: 'Saltar Tour' }

/* ───────── Sample data ───────── */
const SAMPLES = {
  business: `TechCorp Inc. reported Q4 2025 financial results. Revenue reached $4.2M, representing a 23% increase year-over-year. Operating margins improved to 18%, driven by efficiency initiatives and cost optimization. Customer satisfaction scores hit an all-time high of 4.7/5.0, with a retention rate of 94%. International expansion into Brazil and Colombia contributed 12% of total revenue. The company plans to invest $1.5M in AI product development in Q1 2026. Key risks include increasing market competition and currency fluctuation in LATAM markets.`,
  legal: `SERVICE AGREEMENT between Provider Corp and Client LLC. This agreement governs the provision of cloud computing services. Section 4: Liability. The Provider's total liability shall not exceed $500,000. Section 5: Termination. Either party may terminate with 30 days written notice. Section 6: Indemnification. Client shall indemnify Provider against third-party claims. Section 7: Confidentiality. All proprietary information shared under this agreement shall remain confidential for a period of 5 years. Section 8: Non-compete. Client agrees to a 12-month non-compete clause. Section 9: Arbitration. All disputes shall be resolved through binding arbitration. Penalty for breach: $50,000 per occurrence. Contact: legal@providercorp.com or call +1-555-123-4567.`
}

/* ───────── Mock engine (client-side demo) ───────── */
const PRICING = { 'claude-sonnet': { input: 3.0, output: 15.0 }, 'gpt-4o': { input: 5.0, output: 15.0 }, 'gemini-pro': { input: 1.25, output: 5.0 } }
const LATENCY = { 'claude-sonnet': 800, 'gpt-4o': 650, 'gemini-pro': 500 }

function mockGenerate(prompt, model = 'claude-sonnet', system = '') {
  const p = prompt.toLowerCase()
  let text
  const style = model.includes('claude') ? 'claude' : model.includes('gpt') ? 'gpt' : 'gemini'

  if (p.includes('summar') || p.includes('resum')) {
    text = style === 'claude'
      ? 'Based on my analysis, the document covers three main areas: organizational strategy, financial performance, and market positioning. The key takeaway is that the company shows strong growth potential with a 23% revenue increase, though market competition requires strategic attention.'
      : style === 'gpt'
      ? "Here's a concise summary:\n\n**Key Points:**\n1. Revenue grew 23% YoY to $4.2M\n2. Operating margins improved to 18%\n3. Customer satisfaction at 4.7/5.0\n\n**Bottom Line:** Strong performance with positive momentum."
      : 'Summary: Q4 2025 financial results. Revenue: $4.2M (+23% YoY). Operating margin: 18%. Customer satisfaction: 4.7/5.0. Key risk: Increasing competition.'
  } else if (p.includes('translat') || p.includes('traduc')) {
    text = p.includes('spanish') || p.includes('espanol') || p.includes('espa\u00f1ol')
      ? 'El documento analizado presenta tres areas principales: estrategia organizacional, desempeno financiero y posicionamiento de mercado.'
      : 'The analyzed document presents three main areas: organizational strategy, financial performance, and market positioning.'
  } else if (p.includes('extract') || p.includes('extrae')) {
    text = JSON.stringify({ entities: [{ type: 'organization', value: 'TechCorp Inc.' }, { type: 'amount', value: '$4.2M' }, { type: 'date', value: 'Q4 2025' }], key_facts: ['Revenue increased 23% YoY', 'Operating margin at 18%', 'Customer retention at 94%'] })
  } else if (p.includes('content') || p.includes('generat') || p.includes('write') || p.includes('escrib') || p.includes('draft') || p.includes('redact')) {
    text = "Here's a professional summary for your stakeholders:\n\nQ4 Performance Highlights:\n- Revenue growth of 23% year-over-year, reaching $4.2M\n- Operating margins improved to 18%\n- Customer satisfaction scores hit an all-time high of 4.7/5.0\n- International expansion contributed 12% of total revenue\n\nKey Takeaway: The company is on a strong growth trajectory."
  } else if (p.includes('risk') || p.includes('riesgo')) {
    text = 'Key risks identified:\n\n1. **Market Competition** \u2014 Three new competitors entered the segment in Q4\n2. **Currency Risk** \u2014 BRL and COP volatility affecting LATAM margins\n3. **Talent Acquisition** \u2014 Engineering hiring taking 45 days (target: 30)\n4. **Infrastructure Costs** \u2014 Cloud costs grew 31% vs 23% revenue growth'
  } else {
    text = style === 'claude'
      ? "Hello! I'm your AI assistant. I can help you with document analysis, content generation, data extraction, and translation. What would you like to explore today?"
      : style === 'gpt'
      ? "I can help analyze documents, generate content, extract data, or translate text. Let me know which capability you'd like to try!"
      : 'I can assist with document analysis, summarization, data extraction, content generation, and translation. What would you like to explore?'
  }

  const inTok = prompt.split(/\s+/).length + system.split(/\s+/).length
  const outTok = text.split(/\s+/).length
  const pr = PRICING[model] || PRICING['claude-sonnet']
  const cost = (inTok * pr.input + outTok * pr.output) / 1_000_000
  return { text, model, input_tokens: inTok, output_tokens: outTok, latency_ms: LATENCY[model] || 700, cost_usd: +cost.toFixed(6), provider: model.split('-')[0] }
}

/* ───────── API caller with mock fallback ───────── */
async function callAPI(messages, { temperature = 0.7, max_tokens = 1024 } = {}) {
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, temperature, max_tokens }),
    })
    if (resp.ok) {
      const data = await resp.json()
      return {
        text: data.text,
        provider: data.provider,
        model: data.model,
        input_tokens: data.tokens?.input || 0,
        output_tokens: data.tokens?.output || 0,
        latency_ms: 0,
        cost_usd: 0,
        fromAPI: true,
      }
    }
  } catch (e) { /* fall through to mock */ }
  // Fallback: use last user message content for mock
  const lastMsg = messages[messages.length - 1]?.content || ''
  const systemMsg = messages.find(m => m.role === 'system')?.content || ''
  return { ...mockGenerate(lastMsg, 'claude-sonnet', systemMsg), fromAPI: false }
}

/* ───────── RAG chunker + keyword search ───────── */
function chunkText(text, chunkSize = 500, overlap = 50) {
  const chunks = []
  let start = 0
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push({ text: text.slice(start, end), start, end })
    start += chunkSize - overlap
  }
  return chunks
}

function findRelevantChunks(chunks, query, topK = 3) {
  const queryWords = query.toLowerCase().match(/\w+/g) || []
  const queryFiltered = queryWords.filter(w => !STOP.has(w) && w.length > 2)
  const scored = chunks.map((chunk, idx) => {
    const chunkLower = chunk.text.toLowerCase()
    let score = 0
    queryFiltered.forEach(w => {
      const re = new RegExp(w, 'gi')
      const matches = chunkLower.match(re)
      if (matches) score += matches.length
    })
    return { ...chunk, score, index: idx }
  })
  return scored.filter(c => c.score > 0).sort((a, b) => b.score - a.score).slice(0, topK)
}

/* ───────── Translation mock per language ───────── */
const LANG_NAMES = { en: 'English', es: 'Spanish', fr: 'French', pt: 'Portuguese', de: 'German' }

function mockTranslate(text, sourceLang, targetLang) {
  const prefixes = {
    es: '[ES] ',
    fr: '[FR] ',
    pt: '[PT] ',
    de: '[DE] ',
    en: '[EN] ',
  }
  // Simple mock: prefix with target lang tag and slightly modify text
  const mockTexts = {
    es: 'El documento analizado presenta informacion sobre estrategia organizacional, desempeno financiero y posicionamiento de mercado. Los resultados muestran un crecimiento significativo.',
    fr: "Le document analyse presente des informations sur la strategie organisationnelle, la performance financiere et le positionnement sur le marche. Les resultats montrent une croissance significative.",
    pt: 'O documento analisado apresenta informacoes sobre estrategia organizacional, desempenho financeiro e posicionamento de mercado. Os resultados mostram um crescimento significativo.',
    de: 'Das analysierte Dokument enthalt Informationen uber die Organisationsstrategie, die finanzielle Leistung und die Marktpositionierung. Die Ergebnisse zeigen ein signifikantes Wachstum.',
    en: 'The analyzed document presents information about organizational strategy, financial performance, and market positioning. The results show significant growth.',
  }
  return mockTexts[targetLang] || `${prefixes[targetLang] || ''}${text}`
}

/* ───────── Analyzer (client-side) ───────── */
const POS = new Set(['growth','increase','improved','strong','positive','success','profit','gain','revenue','opportunity','expansion','achievement','high','satisfaction','retention','exceeded','momentum','innovation'])
const NEG = new Set(['risk','decline','loss','decrease','threat','concern','liability','penalty','violation','breach','terminate','damage','negligence','default','failure','dispute','indemnify','limitation','warning'])
const RISK_RE = [[/terminat\w+/gi,'Termination clause'],[/liabilit\w+/gi,'Liability clause'],[/penalt\w+/gi,'Penalty clause'],[/indemnif\w+/gi,'Indemnification clause'],[/force\s+majeure/gi,'Force majeure clause'],[/confidential\w*/gi,'Confidentiality clause'],[/non[-\s]?compet\w+/gi,'Non-compete clause'],[/arbitrat\w+/gi,'Arbitration clause']]
const STOP = new Set('the a an is are was were be been being have has had do does did will would could should may might shall can to of in for on with at by from as into through during before after and but or nor not so yet both either neither each every all any few more most other some such no only own same than too very just because if when where how what which who whom this that these those it its we our they their them he she his her i me my you your'.split(' '))

function analyzeText(text) {
  if (!text.trim()) return null
  const words = text.toLowerCase().match(/\w+/g) || []
  const sents = text.split(/[.!?]+/).filter(s => s.trim())
  const filtered = words.filter(w => !STOP.has(w) && w.length > 2)
  const freq = {}; filtered.forEach(w => { freq[w] = (freq[w]||0) + 1 })
  const total = filtered.length || 1
  const keywords = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,10).map(([word,count]) => ({ word, count, frequency: +(count/total).toFixed(4) }))
  let pos = 0, neg = 0; words.forEach(w => { if (POS.has(w)) pos++; if (NEG.has(w)) neg++ })
  const stotal = pos+neg; const score = stotal ? +( (pos-neg)/stotal ).toFixed(3) : 0
  const slabel = score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : stotal ? 'mixed' : 'neutral'
  const entities = []
  for (const m of text.matchAll(/\$[\d,.]+[MBKmkb]?/g)) entities.push({ type: 'money', value: m[0] })
  for (const m of text.matchAll(/\d+\.?\d*%/g)) entities.push({ type: 'percentage', value: m[0] })
  for (const m of text.matchAll(/(?:Q[1-4]\s+\d{4}|\d{4}-\d{2}-\d{2})/g)) entities.push({ type: 'date', value: m[0] })
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)) entities.push({ type: 'email', value: m[0] })
  const risks = []
  RISK_RE.forEach(([re, desc]) => { const ms = [...text.matchAll(re)]; if (ms.length) risks.push({ description: desc, count: ms.length }) })
  return { summary: sents.slice(0,3).join('. ')+(sents.length?'.':''), keywords, sentiment: { score, label: slabel, positive: pos, negative: neg }, entities, risk_flags: risks, stats: { chars: text.length, words: words.length, sentences: sents.length } }
}

/* ───────── Styles ───────── */
const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0A0F1A;color:#E2E8F0;overflow-x:hidden}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#1A1F2E}::-webkit-scrollbar-thumb{background:#6366F1;border-radius:3px}
.app{display:flex;min-height:100vh}
.sidebar{width:260px;background:#111827;border-right:1px solid #1F2937;padding:20px;display:flex;flex-direction:column;gap:8px;position:fixed;height:100vh;overflow-y:auto;z-index:100;transition:transform .3s}
.sidebar .logo{font-size:1.4rem;font-weight:800;color:#6366F1;margin-bottom:4px;letter-spacing:-0.5px}
.sidebar .sub{font-size:.75rem;color:#9CA3AF;margin-bottom:16px}
.nav-btn{width:100%;padding:10px 14px;border:none;border-radius:8px;background:transparent;color:#9CA3AF;cursor:pointer;text-align:left;font-size:.875rem;transition:all .15s;display:flex;align-items:center;gap:8px}
.nav-btn:hover{background:#1F2937;color:#E2E8F0}
.nav-btn.active{background:#6366F1;color:#fff}
.nav-icon{width:20px;text-align:center}
.divider{height:1px;background:#1F2937;margin:8px 0}
.model-sel{margin-top:4px}
.model-sel select{width:100%;padding:8px;background:#1A1F2E;color:#E2E8F0;border:1px solid #374151;border-radius:6px;font-size:.8rem}
.lang-toggle{display:flex;gap:4px;margin-top:8px}
.lang-btn{flex:1;padding:6px;border:1px solid #374151;border-radius:6px;background:transparent;color:#9CA3AF;cursor:pointer;font-size:.75rem;font-weight:600}
.lang-btn.active{background:#6366F1;color:#fff;border-color:#6366F1}
.cost-mini{margin-top:auto;padding:12px;background:#1A1F2E;border-radius:8px;font-size:.75rem;color:#9CA3AF}
.cost-mini .cost-val{font-size:1.1rem;color:#10B981;font-weight:700}
.main{margin-left:260px;flex:1;padding:24px;max-width:1200px}
.hamburger{display:none;position:fixed;top:12px;left:12px;z-index:200;background:#6366F1;border:none;color:#fff;width:40px;height:40px;border-radius:8px;font-size:1.2rem;cursor:pointer}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90}
.card{background:#111827;border:1px solid #1F2937;border-radius:12px;padding:20px;margin-bottom:16px}
.card-title{font-size:1rem;font-weight:600;color:#E2E8F0;margin-bottom:12px;display:flex;align-items:center;gap:8px}
textarea,.input{width:100%;padding:12px;background:#1A1F2E;color:#E2E8F0;border:1px solid #374151;border-radius:8px;font-size:.875rem;resize:vertical;font-family:inherit}
textarea{min-height:120px}
.input{resize:none;min-height:auto}
.btn{padding:10px 20px;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.875rem;transition:all .15s}
.btn-primary{background:#6366F1;color:#fff}.btn-primary:hover{background:#818CF8}
.btn-secondary{background:#1F2937;color:#E2E8F0;border:1px solid #374151}.btn-secondary:hover{background:#374151}
.btn-sm{padding:6px 12px;font-size:.75rem}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:.7rem;font-weight:600}
.badge-money{background:#10B98133;color:#10B981}.badge-percentage{background:#F59E0B33;color:#F59E0B}
.badge-date{background:#6366F133;color:#818CF8}.badge-email{background:#EC489933;color:#EC4899}
.badge-phone{background:#8B5CF633;color:#A78BFA}
.badge-winner{background:#10B981;color:#fff;font-size:.65rem;padding:2px 8px;border-radius:12px;margin-left:8px}
.chat-msgs{max-height:400px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:12px;padding:4px}
.msg{padding:10px 14px;border-radius:12px;max-width:85%;font-size:.875rem;line-height:1.5;white-space:pre-wrap}
.msg-user{background:#6366F1;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.msg-ai{background:#1F2937;color:#E2E8F0;align-self:flex-start;border-bottom-left-radius:4px}
.msg-meta{font-size:.65rem;color:#9CA3AF;margin-top:4px}
.chat-input{display:flex;gap:8px}
.chat-input .input{flex:1}
.suggestions{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.suggestion{padding:6px 12px;background:#1F2937;border:1px solid #374151;border-radius:20px;color:#9CA3AF;font-size:.75rem;cursor:pointer;transition:all .15s}
.suggestion:hover{border-color:#6366F1;color:#E2E8F0}
.kw-bar{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:.8rem}
.kw-bar-fill{height:20px;background:#6366F1;border-radius:4px;min-width:4px;transition:width .3s}
.kw-label{min-width:80px;text-align:right;color:#9CA3AF}
.kw-count{color:#6B7280;font-size:.7rem;min-width:30px}
.sentiment-gauge{display:flex;align-items:center;gap:12px;padding:12px 0}
.gauge-bar{flex:1;height:12px;background:#1F2937;border-radius:6px;overflow:hidden;position:relative}
.gauge-fill{height:100%;border-radius:6px;transition:width .5s}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.compare-card{background:#1A1F2E;border:1px solid #374151;border-radius:10px;padding:16px}
.compare-card h4{font-size:.85rem;color:#818CF8;margin-bottom:8px;display:flex;align-items:center}
.compare-text{font-size:.8rem;color:#D1D5DB;line-height:1.5;margin-bottom:12px;white-space:pre-wrap;max-height:200px;overflow-y:auto}
.metric{display:flex;justify-content:space-between;font-size:.75rem;color:#9CA3AF;padding:4px 0;border-top:1px solid #1F2937}
.metric-val{color:#E2E8F0;font-weight:600}
.sel-row{display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap}
.sel-row select{padding:8px;background:#1A1F2E;color:#E2E8F0;border:1px solid #374151;border-radius:6px;font-size:.8rem}
.sel-row label{font-size:.8rem;color:#9CA3AF}
.translate-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.source-box,.target-box{background:#1A1F2E;border:1px solid #374151;border-radius:8px;padding:16px}
.source-box h4,.target-box h4{font-size:.8rem;color:#9CA3AF;margin-bottom:8px}
.target-text{font-size:.875rem;line-height:1.6;color:#E2E8F0;white-space:pre-wrap;min-height:80px}
.entity-list{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
.fact-list{list-style:none;padding:0}.fact-list li{padding:6px 0;border-bottom:1px solid #1F2937;font-size:.85rem;color:#D1D5DB}
.fact-list li::before{content:'';display:inline-block;width:6px;height:6px;background:#10B981;border-radius:50%;margin-right:8px}
.risk-item{padding:8px 12px;background:#7F1D1D33;border-left:3px solid #EF4444;border-radius:0 8px 8px 0;margin-bottom:6px;font-size:.8rem;color:#FCA5A5}
.pipeline{display:flex;align-items:center;gap:4px;margin:12px 0;flex-wrap:wrap}
.pipe-step{padding:6px 12px;background:#1F2937;border-radius:6px;font-size:.7rem;color:#9CA3AF;position:relative}
.pipe-step.done{background:#6366F133;color:#818CF8}
.pipe-arrow{color:#374151;font-size:.8rem}
.loading{display:inline-block;width:16px;height:16px;border:2px solid #374151;border-top-color:#6366F1;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.metrics-panel{margin-top:24px}
.metrics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
.metric-card{background:#1A1F2E;border-radius:8px;padding:14px;text-align:center}
.metric-card .mc-val{font-size:1.5rem;font-weight:700;color:#6366F1}
.metric-card .mc-label{font-size:.7rem;color:#9CA3AF;margin-top:4px}
.mini-bar{display:flex;align-items:flex-end;gap:4px;height:60px;padding-top:8px}
.mini-bar-col{flex:1;background:#6366F1;border-radius:3px 3px 0 0;min-height:4px;transition:height .3s;position:relative}
.mini-bar-label{font-size:.55rem;color:#9CA3AF;text-align:center;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:#111827;border-top:1px solid #1F2937;padding:4px 8px;z-index:100;overflow-x:auto}
.bottom-nav-inner{display:flex;gap:2px;min-width:max-content}
.bottom-btn{flex:0 0 auto;padding:8px 12px;border:none;background:transparent;color:#9CA3AF;font-size:.65rem;cursor:pointer;border-radius:6px;text-align:center;white-space:nowrap}
.bottom-btn.active{color:#6366F1;background:#6366F133}
.voice-widget{position:fixed;bottom:20px;left:20px;z-index:80;width:48px;height:48px;border-radius:50%;background:#6366F1;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px #6366F166;transition:transform .2s}
.voice-widget:hover{transform:scale(1.1)}

/* ── Tour overlay ── */
.tour-backdrop{position:fixed;inset:0;z-index:9998;pointer-events:none}
.tour-backdrop-fill{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9998;pointer-events:auto}
.tour-spotlight{position:absolute;z-index:9999;border-radius:12px;box-shadow:0 0 0 9999px rgba(0,0,0,.65);pointer-events:none;transition:all .4s ease}
.tour-tooltip{position:absolute;z-index:10000;background:#1A1F2E;border:1px solid #6366F1;border-radius:12px;padding:20px;max-width:380px;min-width:280px;pointer-events:auto;box-shadow:0 8px 32px rgba(0,0,0,.5)}
.tour-tooltip h3{font-size:1rem;color:#E2E8F0;margin-bottom:8px}
.tour-tooltip p{font-size:.85rem;color:#D1D5DB;line-height:1.6;margin-bottom:16px;white-space:pre-wrap}
.tour-tooltip .tour-step-counter{font-size:.7rem;color:#9CA3AF;margin-bottom:12px}
.tour-tooltip .tour-actions{display:flex;align-items:center;justify-content:space-between;gap:12px}
.tour-tooltip .tour-skip{font-size:.75rem;color:#9CA3AF;cursor:pointer;text-decoration:underline;background:none;border:none}
.tour-tooltip .tour-skip:hover{color:#E2E8F0}
.tour-modal-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;pointer-events:auto}
.tour-modal{background:#111827;border:1px solid #6366F1;border-radius:16px;padding:32px;max-width:480px;width:90%;text-align:center}
.tour-modal h2{font-size:1.4rem;color:#6366F1;margin-bottom:8px}
.tour-modal p{font-size:.9rem;color:#D1D5DB;line-height:1.7;margin-bottom:24px;white-space:pre-wrap}
.tour-modal .tour-lang-sel{display:flex;gap:8px;justify-content:center;margin-bottom:20px}
.tour-modal .tour-lang-btn{padding:8px 24px;border:1px solid #374151;border-radius:8px;background:transparent;color:#9CA3AF;cursor:pointer;font-size:.85rem;font-weight:600}
.tour-modal .tour-lang-btn.active{background:#6366F1;color:#fff;border-color:#6366F1}
.tour-modal .tour-modal-actions{display:flex;gap:12px;justify-content:center}

@media(max-width:1024px){
  .grid-3{grid-template-columns:1fr}
  .translate-grid{grid-template-columns:1fr}
  .metrics-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:640px){
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)}
  .overlay.show{display:block}
  .hamburger{display:flex;align-items:center;justify-content:center}
  .main{margin-left:0;padding:16px;padding-top:60px;padding-bottom:72px}
  .bottom-nav{display:block}
  .grid-2{grid-template-columns:1fr}
  .metrics-grid{grid-template-columns:1fr}
  .compare-card{margin-bottom:12px}
  .voice-widget{bottom:76px;left:12px;width:40px;height:40px}
  .tour-tooltip{max-width:90vw;min-width:auto}
}
`

/* ───────── Tour Overlay Component ───────── */
function TourOverlay({ tourStep, lang, onNext, onSkip, onSetLang }) {
  const [spotlightStyle, setSpotlightStyle] = useState(null)
  const [tooltipStyle, setTooltipStyle] = useState(null)

  const tourTargets = {
    1: '[data-tour="sidebar"]',
    2: '[data-tour="main-panel"]',
    3: '[data-tour="main-panel"]',
    4: '[data-tour="main-panel"]',
    5: '[data-tour="main-panel"]',
    6: '[data-tour="cost-tracker"]',
    7: '[data-tour="main-panel"]',
    8: null,
  }

  useEffect(() => {
    if (tourStep === 0 || tourStep >= TOUR_TOTAL - 1) {
      setSpotlightStyle(null)
      setTooltipStyle(null)
      return
    }
    const selector = tourTargets[tourStep]
    if (!selector) return
    const el = document.querySelector(selector)
    if (!el) return

    // Scroll into view
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })

    const positionElements = () => {
      const rect = el.getBoundingClientRect()
      const pad = 8
      setSpotlightStyle({
        top: rect.top - pad + window.scrollY,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      })

      // Position tooltip with viewport clamping
      const tooltipHeight = 200
      const tooltipWidth = 380
      const vpPad = 16
      let ttTop, ttLeft = rect.left
      const roomBelow = window.innerHeight - rect.bottom
      const roomAbove = rect.top

      if (roomBelow >= tooltipHeight + vpPad + 12) {
        // Position below element
        ttTop = rect.bottom + 12 + window.scrollY
      } else if (roomAbove >= tooltipHeight + vpPad + 12) {
        // Position above element
        ttTop = rect.top - tooltipHeight - 12 + window.scrollY
      } else {
        // Fallback: fixed bottom-center (handled in render)
        setTooltipStyle({ fallback: true })
        return
      }

      // Clamp top to viewport
      const scrollY = window.scrollY
      ttTop = Math.max(vpPad + scrollY, ttTop)
      ttTop = Math.min(window.innerHeight - tooltipHeight - vpPad + scrollY, ttTop)
      // Clamp left to viewport
      ttLeft = Math.max(vpPad, ttLeft)
      ttLeft = Math.min(window.innerWidth - tooltipWidth - vpPad, ttLeft)

      setTooltipStyle({ top: ttTop, left: ttLeft })
    }

    // Small delay for DOM to settle after tab switch
    const timer = setTimeout(positionElements, 150)
    return () => clearTimeout(timer)
  }, [tourStep])

  const stepData = TOUR_TEXT[tourStep]
  if (!stepData) return null

  // Step 0: Welcome modal
  if (tourStep === 0) {
    return (
      <div className="tour-modal-overlay">
        <div className="tour-modal">
          <h2>{stepData.title[lang]}</h2>
          <p>{stepData.text[lang]}</p>
          <div className="tour-lang-sel">
            <button className={`tour-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => onSetLang('en')}>EN</button>
            <button className={`tour-lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => onSetLang('es')}>ES</button>
          </div>
          <div className="tour-modal-actions">
            <button className="btn btn-secondary" onClick={onSkip}>Skip</button>
            <button className="btn btn-primary" onClick={onNext}>{stepData.btn[lang]}</button>
          </div>
        </div>
      </div>
    )
  }

  // Step 8 (finish): modal-style
  if (tourStep === TOUR_TOTAL - 1) {
    return (
      <div className="tour-modal-overlay">
        <div className="tour-modal">
          <h2>{stepData.title[lang]}</h2>
          <p>{stepData.text[lang]}</p>
          <div className="tour-modal-actions">
            <button className="btn btn-primary" onClick={onSkip}>{stepData.btn[lang]}</button>
          </div>
        </div>
      </div>
    )
  }

  // Steps 1-7: spotlight + tooltip
  return (
    <>
      {spotlightStyle ? (
        <>
          <div className="tour-spotlight" style={spotlightStyle} />
          {/* clickable backdrop around spotlight */}
          <div className="tour-backdrop-fill" style={{ clipPath: `polygon(0% 0%, 0% 100%, ${spotlightStyle.left}px 100%, ${spotlightStyle.left}px ${spotlightStyle.top}px, ${spotlightStyle.left + spotlightStyle.width}px ${spotlightStyle.top}px, ${spotlightStyle.left + spotlightStyle.width}px ${spotlightStyle.top + spotlightStyle.height}px, ${spotlightStyle.left}px ${spotlightStyle.top + spotlightStyle.height}px, ${spotlightStyle.left}px 100%, 100% 100%, 100% 0%)` }} />
        </>
      ) : (
        <div className="tour-backdrop-fill" />
      )}
      {tooltipStyle && (
        <div className="tour-tooltip" style={
          tooltipStyle.fallback
            ? { position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', width: Math.min(400, window.innerWidth - 32), top: 'auto', zIndex: 10001 }
            : { top: tooltipStyle.top, left: tooltipStyle.left }
        }>
          <div className="tour-step-counter">Step {tourStep} of {TOUR_TOTAL - 1} &middot; <button className="tour-skip" onClick={onSkip}>{TOUR_SKIP[lang]}</button></div>
          <h3>{stepData.title[lang]}</h3>
          <p>{stepData.text[lang]}</p>
          <div className="tour-actions">
            <span />
            <button className="btn btn-primary btn-sm" onClick={onNext}>{stepData.btn[lang]}</button>
          </div>
        </div>
      )}
    </>
  )
}

/* ───────── Components ───────── */
function App() {
  const [lang, setLang] = useState('en')
  const [tab, setTab] = useState('chat')
  const [model, setModel] = useState('claude-sonnet')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [costs, setCosts] = useState({ requests: 0, tokens: 0, cost: 0, byModel: {}, byUseCase: {} })
  const t = T[lang]

  // Tour state — always starts active on every page load
  const [tourStep, setTourStep] = useState(0)
  const [tourActive, setTourActive] = useState(true)

  // Refs for tour auto-execute
  const analyzeRef = useRef(null)
  const compareRef = useRef(null)
  const translateRef = useRef(null)



  const trackCost = (m, inTok, outTok, costUsd, useCase) => {
    setCosts(prev => {
      const bm = { ...prev.byModel }
      bm[m] = bm[m] || { requests: 0, tokens: 0, cost: 0 }
      bm[m].requests++; bm[m].tokens += inTok + outTok; bm[m].cost += costUsd
      const bu = { ...prev.byUseCase }
      bu[useCase] = bu[useCase] || { requests: 0, cost: 0 }
      bu[useCase].requests++; bu[useCase].cost += costUsd
      return { requests: prev.requests + 1, tokens: prev.tokens + inTok + outTok, cost: prev.cost + costUsd, byModel: bm, byUseCase: bu }
    })
  }

  const tabs = [
    { id: 'chat', icon: '\u{1F4AC}' }, { id: 'analyze', icon: '\u{1F50D}' },
    { id: 'qa', icon: '\u{2753}' }, { id: 'generate', icon: '\u{270F}' },
    { id: 'extract', icon: '\u{1F4CB}' }, { id: 'translate', icon: '\u{1F310}' },
    { id: 'compare', icon: '\u{2696}' }
  ]

  const handleTourNext = useCallback(() => {
    const next = tourStep + 1
    if (next >= TOUR_TOTAL) {
      setTourActive(false)
      return
    }
    setTourStep(next)

    switch (next) {
      case 1:
        // Highlight sidebar + reset to chat tab
        setTab('chat')
        break
      case 2:
        // Switch to Analyze tab
        setTab('analyze')
        setTimeout(() => {
          const el = document.querySelector('[data-tour="analyze-panel"]')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
        break
      case 3:
        // Auto-trigger analysis with sample
        setTab('analyze')
        setTimeout(() => {
          if (analyzeRef.current) analyzeRef.current(SAMPLES.business)
        }, 200)
        break
      case 4:
        // Switch to Compare tab
        setTab('compare')
        break
      case 5:
        // Auto-trigger comparison
        setTab('compare')
        setTimeout(() => {
          if (compareRef.current) compareRef.current('Summarize this quarter\'s financial results')
        }, 200)
        break
      case 6:
        // Highlight cost tracker - scroll to metrics
        setTimeout(() => {
          const el = document.querySelector('[data-tour="cost-tracker"]')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
        break
      case 7:
        // Switch to Translate tab
        setTab('translate')
        setTimeout(() => {
          if (translateRef.current) translateRef.current('TechCorp reported strong Q4 results with 23% revenue growth.')
        }, 200)
        break
      case 8:
        // Finish step
        break
      default:
        break
    }
  }, [tourStep])

  const handleTourSkip = useCallback(() => {
    setTourActive(false)
  }, [])

  const handleTourSetLang = useCallback((l) => {
    setLang(l)
  }, [])

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? '\u2715' : '\u2630'}</button>
        <div className={`overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} data-tour="sidebar">
          <div className="logo">{t.title}</div>
          <div className="sub">{t.subtitle}</div>
          {tabs.map(({ id, icon }) => (
            <button key={id} className={`nav-btn ${tab === id ? 'active' : ''}`} onClick={() => { setTab(id); setSidebarOpen(false) }}>
              <span className="nav-icon">{icon}</span>{t[id]}
            </button>
          ))}
          <div className="divider" />
          <div className="model-sel">
            <label style={{ fontSize: '.75rem', color: '#9CA3AF' }}>{t.model}</label>
            <select value={model} onChange={e => setModel(e.target.value)}>
              <option value="claude-sonnet">Claude Sonnet</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="gemini-pro">Gemini Pro</option>
            </select>
          </div>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
          </div>
          <div className="cost-mini">
            <div>{t.costs_title}</div>
            <div className="cost-val">${costs.cost.toFixed(4)}</div>
            <div>{costs.requests} {t.requests} | {costs.tokens} {t.tokens}</div>
          </div>
        </aside>

        <main className="main" data-tour="main-panel">
          {tab === 'chat' && <ChatTab t={t} model={model} trackCost={trackCost} />}
          {tab === 'analyze' && <AnalyzeTab t={t} trackCost={trackCost} tourRunRef={analyzeRef} />}
          {tab === 'qa' && <QATab t={t} model={model} trackCost={trackCost} />}
          {tab === 'generate' && <GenerateTab t={t} model={model} trackCost={trackCost} />}
          {tab === 'extract' && <ExtractTab t={t} model={model} trackCost={trackCost} />}
          {tab === 'translate' && <TranslateTab t={t} model={model} trackCost={trackCost} tourRunRef={translateRef} />}
          {tab === 'compare' && <CompareTab t={t} trackCost={trackCost} tourRunRef={compareRef} />}
          <MetricsPanel t={t} costs={costs} />
        </main>

        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            {tabs.map(({ id, icon }) => (
              <button key={id} className={`bottom-btn ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{icon} {t[id]}</button>
            ))}
          </div>
        </nav>

      </div>

      {/* Fixed Skip Tour button — always accessible */}
      {tourActive && (
        <button onClick={handleTourSkip} style={{
          position: 'fixed', top: 16, right: 16, zIndex: 99999,
          background: 'rgba(30,41,59,0.95)', border: '1px solid #475569',
          color: '#94a3b8', padding: '8px 16px', borderRadius: 8,
          cursor: 'pointer', fontSize: 13, backdropFilter: 'blur(8px)',
        }}>
          {lang === 'en' ? '\u2715 Skip Tour' : '\u2715 Saltar Tour'}
        </button>
      )}
      {/* Tour overlay */}
      {tourActive && (
        <TourOverlay
          tourStep={tourStep}
          lang={lang}
          onNext={handleTourNext}
          onSkip={handleTourSkip}
          onSetLang={handleTourSetLang}
        />
      )}

      {/* Playground Assistant */}
      <PlaygroundAssistant lang={lang} />
    </>
  )
}

/* ── Chat ── */
function ChatTab({ t, model, trackCost }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    try {
      const apiMessages = [
        { role: 'system', content: 'You are a helpful business AI assistant. Answer in the same language the user writes in.' },
        ...msgs.slice(-6).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
        { role: 'user', content: msg },
      ]
      const r = await callAPI(apiMessages)
      trackCost(r.model || model, r.input_tokens, r.output_tokens, r.cost_usd, 'chat')
      setMsgs(prev => [...prev, { role: 'ai', content: r.text, model: r.provider ? `${r.provider}/${r.model}` : r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd, latency: r.latency_ms }])
    } catch (e) {
      const r = mockGenerate(msg, model, 'You are a helpful business AI assistant.')
      trackCost(model, r.input_tokens, r.output_tokens, r.cost_usd, 'chat')
      setMsgs(prev => [...prev, { role: 'ai', content: r.text, model: r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd, latency: r.latency_ms }])
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <div className="card-title">{'\u{1F4AC}'} {t.chat}</div>
      <div className="suggestions">
        {t.suggestions.map((s, i) => <button key={i} className="suggestion" onClick={() => send(s)}>{s}</button>)}
      </div>
      <div className="chat-msgs">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role === 'user' ? 'msg-user' : 'msg-ai'}`}>
            {m.content}
            {m.model && <div className="msg-meta">{m.model} | {m.tokens} {t.tokens} | ${m.cost?.toFixed(6)} | {m.latency}ms</div>}
          </div>
        ))}
        {loading && <div className="msg msg-ai"><span className="loading" /></div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input className="input" placeholder={t.type_message} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="btn btn-primary" onClick={() => send()}>{t.send}</button>
      </div>
    </div>
  )
}

/* ── Analyze ── */
function AnalyzeTab({ t, trackCost, tourRunRef }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [step, setStep] = useState(-1)
  const steps = t.pipeline_steps

  const run = useCallback((txt) => {
    const doc = txt || text
    if (!doc.trim()) return
    if (txt) setText(txt)
    setResult(null); setStep(0)
    let s = 0
    const iv = setInterval(() => { s++; setStep(s); if (s >= steps.length) { clearInterval(iv); const r = analyzeText(doc); setResult(r); trackCost('rule-based', doc.split(/\s+/).length, 0, 0, 'analyze') } }, 300)
  }, [text, steps, trackCost])

  // Expose run to parent for tour
  useEffect(() => {
    if (tourRunRef) tourRunRef.current = run
  }, [tourRunRef, run])

  return (
    <>
      <div className="card">
        <div className="card-title">{'\u{1F50D}'} {t.analyze}</div>
        <textarea placeholder={t.paste_doc} value={text} onChange={e => setText(e.target.value)} />
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => run()}>{t.analyze_btn}</button>
          <button className="btn btn-secondary btn-sm" onClick={() => { setText(SAMPLES.business); run(SAMPLES.business) }}>{t.sample_biz}</button>
          <button className="btn btn-secondary btn-sm" onClick={() => { setText(SAMPLES.legal); run(SAMPLES.legal) }}>{t.sample_legal}</button>
        </div>
        {step >= 0 && !result && (
          <div className="pipeline">{steps.map((s, i) => (<React.Fragment key={i}>{i > 0 && <span className="pipe-arrow">{'\u2192'}</span>}<span className={`pipe-step ${i <= step ? 'done' : ''}`}>{i === step && !result ? <span className="loading" /> : null} {s}</span></React.Fragment>))}</div>
        )}
      </div>
      {result && (
        <>
          <div className="grid-2">
            <div className="card"><div className="card-title">{t.summary}</div><p style={{ fontSize: '.875rem', lineHeight: 1.6, color: '#D1D5DB' }}>{result.summary}</p></div>
            <div className="card">
              <div className="card-title">{t.stats}</div>
              <div style={{ display: 'flex', gap: 24 }}>
                <div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366F1' }}>{result.stats.words}</div><div style={{ fontSize: '.7rem', color: '#9CA3AF' }}>{t.words}</div></div>
                <div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10B981' }}>{result.stats.sentences}</div><div style={{ fontSize: '.7rem', color: '#9CA3AF' }}>{t.sentences}</div></div>
                <div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F59E0B' }}>{result.stats.chars}</div><div style={{ fontSize: '.7rem', color: '#9CA3AF' }}>{t.chars}</div></div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">{t.keywords}</div>
            {result.keywords.map((k, i) => (
              <div key={i} className="kw-bar">
                <span className="kw-label">{k.word}</span>
                <div style={{ flex: 1, background: '#1A1F2E', borderRadius: 4, overflow: 'hidden' }}>
                  <div className="kw-bar-fill" style={{ width: `${(k.frequency / (result.keywords[0]?.frequency || 1)) * 100}%` }} />
                </div>
                <span className="kw-count">{k.count}</span>
              </div>
            ))}
          </div>
          <div className="grid-2">
            <div className="card">
              <div className="card-title">{t.sentiment}</div>
              <div className="sentiment-gauge">
                <span style={{ color: '#EF4444', fontSize: '.8rem' }}>NEG</span>
                <div className="gauge-bar">
                  <div className="gauge-fill" style={{ width: `${((result.sentiment.score + 1) / 2) * 100}%`, background: result.sentiment.score > 0.2 ? '#10B981' : result.sentiment.score < -0.2 ? '#EF4444' : '#F59E0B' }} />
                </div>
                <span style={{ color: '#10B981', fontSize: '.8rem' }}>POS</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '.85rem' }}>
                <span style={{ color: result.sentiment.label === 'positive' ? '#10B981' : result.sentiment.label === 'negative' ? '#EF4444' : '#F59E0B', fontWeight: 700 }}>{result.sentiment.label.toUpperCase()}</span>
                <span style={{ color: '#9CA3AF', marginLeft: 8 }}>({result.sentiment.score})</span>
              </div>
            </div>
            <div className="card">
              <div className="card-title">{t.entities}</div>
              <div className="entity-list">
                {result.entities.map((e, i) => <span key={i} className={`badge badge-${e.type}`}>{e.type}: {e.value}</span>)}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">{t.risk_flags}</div>
            {result.risk_flags.length === 0 ? <p style={{ color: '#9CA3AF', fontSize: '.85rem' }}>{t.no_risks}</p> : result.risk_flags.map((r, i) => (
              <div key={i} className="risk-item">{r.description} ({r.count}x)</div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

/* ── Q&A ── */
function QATab({ t, model, trackCost }) {
  const [doc, setDoc] = useState('')
  const [ready, setReady] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [docChunks, setDocChunks] = useState([])

  const ingest = (txt) => {
    const d = txt || doc; if (!d.trim()) return
    const chunked = chunkText(d, 500, 50)
    setDocChunks(chunked); setReady(true); setDoc(d)
  }

  const ask = async () => {
    if (!question.trim() || !ready) return
    setLoading(true); setAnswer(null)
    try {
      // Find relevant chunks via keyword matching
      const relevant = findRelevantChunks(docChunks, question, 3)
      const contextText = relevant.length > 0
        ? relevant.map((c, i) => `[Source ${i + 1}]: ${c.text}`).join('\n\n')
        : docChunks.slice(0, 2).map((c, i) => `[Source ${i + 1}]: ${c.text}`).join('\n\n')

      const sources = (relevant.length > 0 ? relevant : docChunks.slice(0, 2)).map((c, i) => ({
        text: c.text.length > 200 ? c.text.slice(0, 200) + '...' : c.text,
        relevance: relevant.length > 0 ? Math.max(0.5, Math.min(0.99, c.score / (relevant[0]?.score || 1))) : 0.5,
      }))

      const apiMessages = [
        { role: 'system', content: `You are a Q&A assistant. Answer the user's question ONLY based on the provided document context. If the context does not contain the answer, say so. Cite specific information from the sources.\n\nDocument context:\n${contextText}` },
        { role: 'user', content: question },
      ]
      const r = await callAPI(apiMessages, { max_tokens: 512 })
      trackCost(r.model || model, r.input_tokens, r.output_tokens, r.cost_usd, 'qa')
      setAnswer({ answer: r.text, model: r.provider ? `${r.provider}/${r.model}` : r.model, sources, cost_usd: r.cost_usd, tokens: r.input_tokens + r.output_tokens })
    } catch (e) {
      const r = mockGenerate(`Based on document: ${question}`, model)
      trackCost(model, r.input_tokens, r.output_tokens, r.cost_usd, 'qa')
      setAnswer({ answer: r.text, model: r.model, sources: [{ text: doc.slice(0, 200) + '...', relevance: 0.87 }], cost_usd: r.cost_usd, tokens: r.input_tokens + r.output_tokens })
    }
    setLoading(false)
  }

  return (
    <>
      <div className="card">
        <div className="card-title">{'\u{2753}'} {t.qa}</div>
        {!ready ? (
          <>
            <textarea placeholder={t.paste_doc} value={doc} onChange={e => setDoc(e.target.value)} />
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => ingest()}>{t.load_doc}</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setDoc(SAMPLES.business); ingest(SAMPLES.business) }}>{t.sample_biz}</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setDoc(SAMPLES.legal); ingest(SAMPLES.legal) }}>{t.sample_legal}</button>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '.8rem', marginTop: 8 }}>{t.ingest_first}</p>
          </>
        ) : (
          <>
            <p style={{ color: '#10B981', fontSize: '.85rem', marginBottom: 12 }}>{t.doc_ready} ({docChunks.length} chunks)</p>
            <div className="chat-input">
              <input className="input" placeholder={t.type_question} value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask()} />
              <button className="btn btn-primary" onClick={ask}>{t.ask}</button>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={() => { setReady(false); setAnswer(null); setDoc(''); setDocChunks([]) }}>{t.load_different}</button>
          </>
        )}
      </div>
      {loading && <div className="card"><span className="loading" /></div>}
      {answer && (
        <div className="card">
          <div className="card-title">{t.answer_title}</div>
          <p style={{ fontSize: '.875rem', lineHeight: 1.6, color: '#E2E8F0', whiteSpace: 'pre-wrap', marginBottom: 12 }}>{answer.answer}</p>
          <div style={{ fontSize: '.75rem', color: '#9CA3AF', marginBottom: 12 }}>{answer.model} | {answer.tokens} {t.tokens} | ${answer.cost_usd.toFixed(6)}</div>
          <div className="card-title" style={{ fontSize: '.85rem' }}>{t.sources}</div>
          {answer.sources.map((s, i) => (
            <div key={i} style={{ background: '#1A1F2E', padding: 10, borderRadius: 6, marginBottom: 6, fontSize: '.8rem', color: '#D1D5DB', borderLeft: '3px solid #6366F1' }}>
              <span style={{ color: '#818CF8', fontWeight: 600 }}>{t.relevance}: {(s.relevance * 100).toFixed(0)}%</span><br />{s.text}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Generate ── */
function GenerateTab({ t, model, trackCost }) {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('professional')
  const [fmt, setFmt] = useState('email')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const [loading, setLoading] = useState(false)

  const gen = async () => {
    if (!topic.trim()) return
    setLoading(true)
    try {
      const apiMessages = [
        { role: 'system', content: `You are a ${tone} content writer. Generate content in ${fmt} format. Write clear, well-structured content. If the user writes in Spanish, respond in Spanish.` },
        { role: 'user', content: `Generate ${fmt} content about: ${topic}` },
      ]
      const r = await callAPI(apiMessages, { max_tokens: 1024 })
      trackCost(r.model || model, r.input_tokens, r.output_tokens, r.cost_usd, 'generate')
      setResult({ content: r.text, tone, format: fmt, model: r.provider ? `${r.provider}/${r.model}` : r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd })
    } catch (e) {
      const r = mockGenerate(`Generate ${fmt} content about: ${topic}. Tone: ${tone}`, model, `You are a ${tone} content writer.`)
      trackCost(model, r.input_tokens, r.output_tokens, r.cost_usd, 'generate')
      setResult({ content: r.text, tone, format: fmt, model: r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd })
    }
    setLoading(false)
  }

  const copy = () => { navigator.clipboard.writeText(result.content); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <>
      <div className="card">
        <div className="card-title">{'\u270F\uFE0F'} {t.generate}</div>
        <input className="input" placeholder={t.topic} value={topic} onChange={e => setTopic(e.target.value)} style={{ marginBottom: 12 }} />
        <div className="sel-row">
          <label>{t.tone}:</label>
          <select value={tone} onChange={e => setTone(e.target.value)}>
            {['professional', 'casual', 'executive'].map(v => <option key={v} value={v}>{t[v]}</option>)}
          </select>
          <label>{t.format}:</label>
          <select value={fmt} onChange={e => setFmt(e.target.value)}>
            {['email', 'report', 'social', 'presentation'].map(v => <option key={v} value={v}>{t[v]}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={gen} disabled={loading}>{loading ? '...' : t.generate_btn}</button>
      </div>
      {loading && <div className="card"><span className="loading" /></div>}
      {result && !loading && (
        <div className="card">
          <div className="card-title" style={{ justifyContent: 'space-between' }}>
            <span>{t.generated_content}</span>
            <button className="btn btn-secondary btn-sm" onClick={copy}>{copied ? t.copied : t.copy}</button>
          </div>
          <div style={{ background: '#1A1F2E', padding: 16, borderRadius: 8, fontSize: '.875rem', lineHeight: 1.6, color: '#E2E8F0', whiteSpace: 'pre-wrap' }}>{result.content}</div>
          <div style={{ fontSize: '.75rem', color: '#9CA3AF', marginTop: 8 }}>{result.model} | {t.tone}: {result.tone} | {t.format}: {result.format} | {result.tokens} {t.tokens} | ${result.cost.toFixed(6)}</div>
        </div>
      )}
    </>
  )
}

/* ── Extract ── */
function ExtractTab({ t, model, trackCost }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)

  const run = (txt) => {
    const doc = txt || text; if (!doc.trim()) return
    const entities = []
    for (const m of doc.matchAll(/\$[\d,.]+[MBKmkb]?/g)) entities.push({ type: 'money', value: m[0] })
    for (const m of doc.matchAll(/\d+\.?\d*%/g)) entities.push({ type: 'percentage', value: m[0] })
    for (const m of doc.matchAll(/(?:Q[1-4]\s+\d{4}|\d{4}-\d{2}-\d{2})/g)) entities.push({ type: 'date', value: m[0] })
    for (const m of doc.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)) entities.push({ type: 'email', value: m[0] })
    for (const m of doc.matchAll(/\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g)) entities.push({ type: 'phone', value: m[0] })
    const facts = doc.split(/[.!?]+/).filter(s => s.trim()).filter(s => { const l = s.toLowerCase(); return ['increase','decrease','grew','growth','reached','achieved','revenue','profit','margin','improved'].some(w => l.includes(w)) }).slice(0, 10).map(s => s.trim())
    const r = mockGenerate(`Extract entities: ${doc.slice(0, 200)}`, model)
    trackCost(model, r.input_tokens, r.output_tokens, r.cost_usd, 'extract')
    let llm = {}; try { llm = JSON.parse(r.text) } catch { llm = { raw: r.text } }
    setResult({ entities, facts, llm, model: r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd })
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'extraction.json'; a.click()
  }

  return (
    <>
      <div className="card">
        <div className="card-title">{'\u{1F4CB}'} {t.extract}</div>
        <textarea placeholder={t.paste_doc} value={text} onChange={e => setText(e.target.value)} />
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => run()}>{t.extract_btn}</button>
          <button className="btn btn-secondary btn-sm" onClick={() => { setText(SAMPLES.business); run(SAMPLES.business) }}>{t.sample_biz}</button>
          <button className="btn btn-secondary btn-sm" onClick={() => { setText(SAMPLES.legal); run(SAMPLES.legal) }}>{t.sample_legal}</button>
        </div>
      </div>
      {result && (
        <>
          <div className="grid-2">
            <div className="card">
              <div className="card-title">{t.entities}</div>
              <div className="entity-list">
                {result.entities.map((e, i) => <span key={i} className={`badge badge-${e.type}`}>{e.type}: {e.value}</span>)}
              </div>
            </div>
            <div className="card">
              <div className="card-title">{t.key_facts}</div>
              <ul className="fact-list">
                {result.facts.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-title" style={{ justifyContent: 'space-between' }}>
              <span>{t.llm_extraction}</span>
              <button className="btn btn-secondary btn-sm" onClick={exportJson}>{t.export_json}</button>
            </div>
            <pre style={{ background: '#1A1F2E', padding: 12, borderRadius: 8, fontSize: '.8rem', color: '#D1D5DB', overflow: 'auto', maxHeight: 300 }}>{JSON.stringify(result.llm, null, 2)}</pre>
            <div style={{ fontSize: '.75rem', color: '#9CA3AF', marginTop: 8 }}>{result.model} | {result.tokens} {t.tokens} | ${result.cost.toFixed(6)}</div>
          </div>
        </>
      )}
    </>
  )
}

/* ── Translate ── */
function TranslateTab({ t, model, trackCost, tourRunRef }) {
  const [text, setText] = useState('')
  const [target, setTarget] = useState('es')
  const [source, setSource] = useState('en')
  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  const run = useCallback(async (overrideText) => {
    const txt = overrideText || text
    if (!txt.trim()) return
    if (overrideText) setText(overrideText)
    setLoading(true)
    try {
      const srcName = LANG_NAMES[source] || source
      const tgtName = LANG_NAMES[target] || target
      const apiMessages = [
        { role: 'system', content: `Translate the following text from ${srcName} to ${tgtName}. Only output the translation, nothing else.` },
        { role: 'user', content: txt },
      ]
      const r = await callAPI(apiMessages, { temperature: 0.3, max_tokens: 1024 })
      trackCost(r.model || model, r.input_tokens, r.output_tokens, r.cost_usd, 'translate')
      setResult({ original: txt, translated: r.text, source, target, model: r.provider ? `${r.provider}/${r.model}` : r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd })
    } catch (e) {
      // Improved mock fallback with per-language responses
      const translated = mockTranslate(txt, source, target)
      const r = mockGenerate(`Translate: ${txt}`, model)
      trackCost(model, r.input_tokens, r.output_tokens, r.cost_usd, 'translate')
      setResult({ original: txt, translated, source, target, model: r.model, tokens: r.input_tokens + r.output_tokens, cost: r.cost_usd })
    }
    setLoading(false)
  }, [text, target, source, model, trackCost])

  // Expose run to parent for tour
  useEffect(() => {
    if (tourRunRef) tourRunRef.current = run
  }, [tourRunRef, run])

  const swap = () => { const tmp = source; setSource(target); setTarget(tmp) }

  return (
    <>
      <div className="card">
        <div className="card-title">{'\u{1F310}'} {t.translate}</div>
        <textarea placeholder={t.source_text} value={text} onChange={e => setText(e.target.value)} />
        <div className="sel-row" style={{ marginTop: 12 }}>
          <select value={source} onChange={e => setSource(e.target.value)}>
            <option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option><option value="pt">Portuguese</option><option value="de">German</option>
          </select>
          <button className="btn btn-secondary btn-sm" onClick={swap}>{'\u21C4'}</button>
          <select value={target} onChange={e => setTarget(e.target.value)}>
            <option value="es">Spanish</option><option value="en">English</option><option value="fr">French</option><option value="pt">Portuguese</option><option value="de">German</option>
          </select>
          <button className="btn btn-primary" onClick={() => run()} disabled={loading}>{loading ? '...' : t.translate_btn}</button>
        </div>
      </div>
      {loading && <div className="card"><span className="loading" /></div>}
      {result && !loading && (
        <div className="translate-grid">
          <div className="source-box"><h4>{t.original} ({result.source.toUpperCase()})</h4><div className="target-text">{result.original}</div></div>
          <div className="target-box"><h4>{t.translated} ({result.target.toUpperCase()})</h4><div className="target-text">{result.translated}</div>
            <div style={{ fontSize: '.75rem', color: '#9CA3AF', marginTop: 8 }}>{result.model} | {result.tokens} {t.tokens} | ${result.cost.toFixed(6)}</div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Compare ── */
function CompareTab({ t, trackCost, tourRunRef }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  const run = useCallback(async (overridePrompt) => {
    const p = overridePrompt || prompt
    if (!p.trim()) return
    if (overridePrompt) setPrompt(overridePrompt)
    setLoading(true)

    const modelStyles = [
      { name: 'claude-sonnet', system: 'You are Claude, a thoughtful AI assistant. Provide a detailed, nuanced analysis with clear structure. Be thorough and analytical.' },
      { name: 'gpt-4o', system: 'You are GPT-4o, a concise AI assistant. Respond with bullet points and key highlights. Be direct and action-oriented.' },
      { name: 'gemini-pro', system: 'You are Gemini Pro, an efficient AI assistant. Give a brief, data-focused summary. Prioritize speed and clarity over detail.' },
    ]

    try {
      const startTimes = modelStyles.map(() => Date.now())
      const promises = modelStyles.map((style, idx) =>
        callAPI([
          { role: 'system', content: style.system },
          { role: 'user', content: p },
        ], { max_tokens: 512 }).then(r => {
          const elapsed = Date.now() - startTimes[idx]
          return { ...r, latency_ms: elapsed, model: style.name }
        })
      )
      const responses = await Promise.all(promises)
      const results = {}
      responses.forEach((r, i) => {
        const name = modelStyles[i].name
        results[name] = {
          text: r.text,
          model: name,
          provider: r.provider,
          input_tokens: r.input_tokens,
          output_tokens: r.output_tokens,
          latency_ms: r.latency_ms,
          cost_usd: r.cost_usd,
        }
        trackCost(name, r.input_tokens, r.output_tokens, r.cost_usd, 'compare')
      })
      const models = modelStyles.map(m => m.name)
      const fastest = models.reduce((a, b) => results[a].latency_ms < results[b].latency_ms ? a : b)
      const cheapest = models.reduce((a, b) => results[a].cost_usd < results[b].cost_usd ? a : b)
      const detailed = models.reduce((a, b) => results[a].output_tokens > results[b].output_tokens ? a : b)
      setResult({ models: results, rankings: { fastest, cheapest, most_detailed: detailed } })
    } catch (e) {
      // Fallback to mock
      const models = ['claude-sonnet', 'gpt-4o', 'gemini-pro']
      const results = {}
      models.forEach(m => {
        const r = mockGenerate(p, m)
        results[m] = r
        trackCost(m, r.input_tokens, r.output_tokens, r.cost_usd, 'compare')
      })
      const fastest = models.reduce((a, b) => results[a].latency_ms < results[b].latency_ms ? a : b)
      const cheapest = models.reduce((a, b) => results[a].cost_usd < results[b].cost_usd ? a : b)
      const detailed = models.reduce((a, b) => results[a].output_tokens > results[b].output_tokens ? a : b)
      setResult({ models: results, rankings: { fastest, cheapest, most_detailed: detailed } })
    }
    setLoading(false)
  }, [prompt, trackCost])

  // Expose run to parent for tour
  useEffect(() => {
    if (tourRunRef) tourRunRef.current = run
  }, [tourRunRef, run])

  return (
    <>
      <div className="card">
        <div className="card-title">{'\u2696\uFE0F'} {t.compare}</div>
        <textarea placeholder={t.prompt_placeholder} value={prompt} onChange={e => setPrompt(e.target.value)} style={{ minHeight: 80 }} />
        <div className="btn-row"><button className="btn btn-primary" onClick={() => run()} disabled={loading}>{loading ? '...' : t.compare_btn}</button></div>
      </div>
      {loading && <div className="card"><span className="loading" /></div>}
      {result && !loading && (
        <div className="grid-3" data-tour="compare-results">
          {Object.entries(result.models).map(([m, r]) => (
            <div key={m} className="compare-card">
              <h4>
                {m}
                {result.rankings.fastest === m && <span className="badge-winner">{t.fastest}</span>}
                {result.rankings.cheapest === m && <span className="badge-winner">{t.cheapest}</span>}
                {result.rankings.most_detailed === m && <span className="badge-winner">{t.most_detailed}</span>}
              </h4>
              <div className="compare-text">{r.text}</div>
              <div className="metric"><span>{t.latency}</span><span className="metric-val">{r.latency_ms}ms</span></div>
              <div className="metric"><span>{t.tokens}</span><span className="metric-val">{r.input_tokens + r.output_tokens}</span></div>
              <div className="metric"><span>{t.cost}</span><span className="metric-val">${r.cost_usd.toFixed(6)}</span></div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Metrics Panel ── */
function MetricsPanel({ t, costs }) {
  if (costs.requests === 0) return null
  const maxModelCost = Math.max(...Object.values(costs.byModel).map(v => v.cost), 0.000001)

  return (
    <div className="metrics-panel" data-tour="cost-tracker">
      <div className="card">
        <div className="card-title">{t.metrics}</div>
        <div className="metrics-grid">
          <div className="metric-card"><div className="mc-val">{costs.requests}</div><div className="mc-label">{t.total_requests}</div></div>
          <div className="metric-card"><div className="mc-val">{costs.tokens}</div><div className="mc-label">{t.total_tokens}</div></div>
          <div className="metric-card"><div className="mc-val" style={{ color: '#10B981' }}>${costs.cost.toFixed(4)}</div><div className="mc-label">{t.total_cost}</div></div>
        </div>
        <div className="grid-2">
          <div>
            <div style={{ fontSize: '.8rem', color: '#9CA3AF', marginBottom: 8 }}>{t.by_model}</div>
            <div className="mini-bar">
              {Object.entries(costs.byModel).map(([m, v]) => (
                <div key={m} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 60, display: 'flex', alignItems: 'flex-end' }}>
                    <div className="mini-bar-col" style={{ height: `${(v.cost / maxModelCost) * 100}%`, width: '100%' }} />
                  </div>
                  <div className="mini-bar-label">{m.split('-')[0]}</div>
                  <div style={{ fontSize: '.55rem', color: '#6B7280' }}>${v.cost.toFixed(4)}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '.8rem', color: '#9CA3AF', marginBottom: 8 }}>{t.by_usecase}</div>
            {Object.entries(costs.byUseCase).map(([uc, v]) => (
              <div key={uc} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #1F2937', fontSize: '.8rem' }}>
                <span style={{ color: '#D1D5DB' }}>{uc}</span>
                <span style={{ color: '#9CA3AF' }}>{v.requests} req | ${v.cost.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
