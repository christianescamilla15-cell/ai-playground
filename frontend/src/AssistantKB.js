// AssistantKB.js — Exhaustive knowledge base for the AI Playground Assistant
// 40+ topics, bilingual EN/ES, with question patterns for fuzzy matching

export const PLAYGROUND_KB = {

  // ───────── GETTING STARTED ─────────

  what_is_playground: {
    question_patterns: [
      'what is this', 'what is ai playground', 'que es esto', 'que es el playground',
      'what does this do', 'para que sirve', 'what is this app', 'que hace esta app',
      'tell me about this', 'cuentame sobre esto', 'overview', 'descripcion general',
      'what can i do here', 'que puedo hacer aqui'
    ],
    answer_en: 'AI Playground is an interactive demo showcasing 7 AI use cases: Chat, Document Analysis, Q&A with RAG, Content Generation, Data Extraction, Translation, and Model Comparison. Built with React + Vite and powered by Groq LLM API (Llama 3.3 70B). You can explore each feature with sample data and track costs in real time.',
    answer_es: 'AI Playground es una demo interactiva con 7 casos de uso de IA: Chat, Analisis de Documentos, Q&A con RAG, Generacion de Contenido, Extraccion de Datos, Traduccion y Comparacion de Modelos. Construido con React + Vite y potenciado por Groq LLM API (Llama 3.3 70B). Puedes explorar cada funcion con datos de ejemplo y rastrear costos en tiempo real.'
  },

  how_to_use: {
    question_patterns: [
      'how to use', 'como usar', 'getting started', 'como empiezo', 'how do i start',
      'primeros pasos', 'tutorial', 'guide', 'guia', 'where do i begin',
      'por donde empiezo', 'how does it work', 'como funciona esto'
    ],
    answer_en: 'Getting started is easy! 1) Pick a tab from the sidebar (Chat, Analyze, Q&A, etc.). 2) Each tab has sample data buttons so you can try features instantly. 3) Select a model (Claude, GPT-4o, or Gemini Pro) from the sidebar. 4) Use the language toggle (EN/ES) to switch the entire UI. 5) Watch the Cost Tracker at the bottom to see token usage and estimated costs.',
    answer_es: 'Empezar es facil! 1) Elige una pestana de la barra lateral (Chat, Analizar, P&R, etc.). 2) Cada pestana tiene botones de datos de ejemplo para probar funciones al instante. 3) Selecciona un modelo (Claude, GPT-4o o Gemini Pro) desde la barra lateral. 4) Usa el toggle de idioma (EN/ES) para cambiar toda la interfaz. 5) Observa el Rastreador de Costos en la parte inferior para ver el uso de tokens y costos estimados.'
  },

  features_overview: {
    question_patterns: [
      'features', 'funciones', 'capabilities', 'capacidades', 'what features',
      'que funciones tiene', 'all features', 'todas las funciones', 'list features',
      'lista de funciones', 'what can it do', 'que puede hacer'
    ],
    answer_en: 'The 7 features are: 1) **Chat** — Conversational AI with suggestion chips. 2) **Analyze** — Client-side NLP: keywords, sentiment, entities, risk flags. 3) **Q&A** — RAG pipeline: load a document, ask questions, get cited answers. 4) **Generate** — Content creation with tone and format options. 5) **Extract** — Pull structured data (amounts, dates, emails) from text. 6) **Translate** — 5-language translation with side-by-side view. 7) **Compare** — Side-by-side model comparison with winner badges.',
    answer_es: 'Las 7 funciones son: 1) **Chat** — IA conversacional con sugerencias. 2) **Analizar** — NLP en el cliente: palabras clave, sentimiento, entidades, alertas de riesgo. 3) **P&R** — Pipeline RAG: carga un documento, haz preguntas, obtien respuestas con citas. 4) **Generar** — Creacion de contenido con opciones de tono y formato. 5) **Extraer** — Extrae datos estructurados (montos, fechas, emails) del texto. 6) **Traducir** — Traduccion a 5 idiomas con vista lado a lado. 7) **Comparar** — Comparacion de modelos lado a lado con insignias de ganador.'
  },

  // ───────── CHAT TAB ─────────

  chat_feature: {
    question_patterns: [
      'chat', 'chat feature', 'funcion chat', 'how does chat work', 'como funciona el chat',
      'chatbot', 'talk to ai', 'hablar con ia', 'conversation', 'conversacion',
      'chat tab', 'pestana chat', 'messaging', 'mensajeria'
    ],
    answer_en: 'The Chat tab lets you have a conversation with an AI assistant. Type a message or click a suggestion chip to start. The AI responds based on the selected model (Claude Sonnet, GPT-4o, or Gemini Pro). Each response shows the model used, token count, cost, and latency. Conversation context is maintained within the session.',
    answer_es: 'La pestana Chat te permite conversar con un asistente de IA. Escribe un mensaje o haz clic en una sugerencia para empezar. La IA responde segun el modelo seleccionado (Claude Sonnet, GPT-4o o Gemini Pro). Cada respuesta muestra el modelo usado, cantidad de tokens, costo y latencia. El contexto de la conversacion se mantiene dentro de la sesion.'
  },

  chat_tips: {
    question_patterns: [
      'chat tips', 'consejos chat', 'best prompts', 'mejores prompts',
      'how to get better answers', 'como obtener mejores respuestas',
      'suggestion chips', 'sugerencias', 'chat suggestions'
    ],
    answer_en: 'Tips for better chat results: 1) Be specific in your questions. 2) Use the suggestion chips for common business queries like "Summarize this quarter\'s results" or "Draft an email to stakeholders." 3) Try different models — Claude tends to be more analytical, GPT-4o more structured, and Gemini more concise. 4) Context from earlier messages is maintained, so you can ask follow-up questions.',
    answer_es: 'Consejos para mejores resultados en chat: 1) Se especifico en tus preguntas. 2) Usa las sugerencias para consultas comunes como "Resume los resultados del trimestre" o "Redacta un email para stakeholders." 3) Prueba diferentes modelos — Claude tiende a ser mas analitico, GPT-4o mas estructurado y Gemini mas conciso. 4) El contexto de mensajes anteriores se mantiene, asi que puedes hacer preguntas de seguimiento.'
  },

  // ───────── DOCUMENT ANALYSIS ─────────

  analyze_feature: {
    question_patterns: [
      'analyze', 'analysis', 'analisis', 'analizar', 'document analysis',
      'analisis de documentos', 'text analysis', 'analisis de texto',
      'analyze tab', 'pestana analizar', 'how does analysis work',
      'como funciona el analisis', 'que es el analysis', 'what is analyze'
    ],
    answer_en: 'The Analyze tab processes any text to extract: keyword frequency (shown as a bar chart), sentiment analysis (positive/negative gauge), named entity recognition (people, organizations, dates, monetary amounts), risk flags (legal/financial clauses), and text statistics (characters, words, sentences). It uses rule-based NLP — no API call needed, so it works instantly and 100% client-side.',
    answer_es: 'La pestana Analizar procesa cualquier texto para extraer: frecuencia de palabras clave (mostrada como grafico de barras), analisis de sentimiento (medidor positivo/negativo), reconocimiento de entidades (personas, organizaciones, fechas, montos), alertas de riesgo (clausulas legales/financieras) y estadisticas del texto (caracteres, palabras, oraciones). Usa NLP basado en reglas — no necesita llamada API, funciona al instante y 100% en el cliente.'
  },

  analyze_keywords: {
    question_patterns: [
      'keywords', 'palabras clave', 'keyword extraction', 'extraccion de palabras clave',
      'how keywords work', 'como funcionan las palabras clave', 'word frequency',
      'frecuencia de palabras', 'bar chart', 'grafico de barras'
    ],
    answer_en: 'Keyword extraction works by: 1) Tokenizing the text into words. 2) Removing stop words (the, a, is, etc.). 3) Counting word frequency. 4) Ranking the top 10 most frequent terms. Results are displayed as a horizontal bar chart showing each keyword and its count. This is entirely rule-based — no AI model is used.',
    answer_es: 'La extraccion de palabras clave funciona asi: 1) Tokeniza el texto en palabras. 2) Elimina palabras vacias (el, la, es, etc.). 3) Cuenta la frecuencia de cada palabra. 4) Clasifica los 10 terminos mas frecuentes. Los resultados se muestran como un grafico de barras horizontal con cada palabra clave y su conteo. Es completamente basado en reglas — no se usa ningun modelo de IA.'
  },

  analyze_sentiment: {
    question_patterns: [
      'sentiment', 'sentimiento', 'sentiment analysis', 'analisis de sentimiento',
      'how sentiment works', 'como funciona el sentimiento', 'positive negative',
      'positivo negativo', 'sentiment score', 'puntuacion de sentimiento',
      'sentiment gauge', 'medidor de sentimiento'
    ],
    answer_en: 'Sentiment analysis uses two curated word lists: positive words (growth, increase, improved, success, profit, etc.) and negative words (risk, decline, loss, threat, penalty, etc.). The score is calculated as (positive_count - negative_count) / total. A score above 0.2 = positive, below -0.2 = negative, otherwise mixed. The gauge visualization shows this score from -1 to +1.',
    answer_es: 'El analisis de sentimiento usa dos listas de palabras curadas: positivas (crecimiento, aumento, mejora, exito, ganancia, etc.) y negativas (riesgo, declive, perdida, amenaza, penalidad, etc.). La puntuacion se calcula como (conteo_positivo - conteo_negativo) / total. Una puntuacion mayor a 0.2 = positivo, menor a -0.2 = negativo, de lo contrario mixto. La visualizacion de medidor muestra esta puntuacion de -1 a +1.'
  },

  analyze_entities: {
    question_patterns: [
      'entities', 'entidades', 'entity recognition', 'reconocimiento de entidades',
      'ner', 'named entities', 'entidades nombradas', 'how entities work',
      'como funcionan las entidades', 'what entities', 'que entidades detecta'
    ],
    answer_en: 'Named Entity Recognition (NER) uses regex patterns to detect: monetary amounts ($4.2M, $500,000), percentages (23%, 18%), dates (Q4 2025, 2024-01-15), email addresses, and phone numbers. Entities are displayed as color-coded badges grouped by type. This is a rule-based approach that works without any API calls.',
    answer_es: 'El Reconocimiento de Entidades Nombradas (NER) usa patrones regex para detectar: montos monetarios ($4.2M, $500,000), porcentajes (23%, 18%), fechas (Q4 2025, 2024-01-15), direcciones de email y numeros de telefono. Las entidades se muestran como insignias de colores agrupadas por tipo. Es un enfoque basado en reglas que funciona sin llamadas API.'
  },

  analyze_risk: {
    question_patterns: [
      'risk', 'riesgo', 'risk flags', 'alertas de riesgo', 'risk detection',
      'deteccion de riesgos', 'legal risk', 'riesgo legal', 'financial risk',
      'riesgo financiero', 'risk analysis', 'analisis de riesgo',
      'clause detection', 'deteccion de clausulas'
    ],
    answer_en: 'Risk flag detection scans for legal and financial clause patterns including: termination clauses, liability clauses, penalty clauses, indemnification, force majeure, confidentiality, non-compete, and arbitration clauses. Each detected risk shows its type and count of occurrences. Try it with the "Sample: Legal Document" button for a full demo.',
    answer_es: 'La deteccion de alertas de riesgo busca patrones de clausulas legales y financieras incluyendo: clausulas de terminacion, responsabilidad, penalidades, indemnizacion, fuerza mayor, confidencialidad, no competencia y arbitraje. Cada riesgo detectado muestra su tipo y cantidad de ocurrencias. Pruebalo con el boton "Muestra: Documento Legal" para una demo completa.'
  },

  analyze_pipeline: {
    question_patterns: [
      'pipeline', 'analysis pipeline', 'pipeline de analisis', 'processing steps',
      'pasos de procesamiento', 'how analysis runs', 'como corre el analisis',
      'animation', 'animacion', 'progress', 'progreso'
    ],
    answer_en: 'When you click Analyze, a 5-step pipeline runs visually: 1) Chunking — splits text into segments. 2) Keywords — extracts top terms. 3) Sentiment — scores positive/negative. 4) Entities — finds dates, amounts, emails. 5) Risks — detects legal clauses. Each step animates to show progress, then the full results panel appears.',
    answer_es: 'Cuando haces clic en Analizar, un pipeline de 5 pasos se ejecuta visualmente: 1) Fragmentacion — divide el texto en segmentos. 2) Palabras clave — extrae los terminos principales. 3) Sentimiento — puntua positivo/negativo. 4) Entidades — encuentra fechas, montos, emails. 5) Riesgos — detecta clausulas legales. Cada paso se anima para mostrar progreso, luego aparece el panel completo de resultados.'
  },

  // ───────── Q&A / RAG ─────────

  qa_feature: {
    question_patterns: [
      'qa', 'q&a', 'question answer', 'preguntas y respuestas', 'rag',
      'retrieval augmented', 'como funciona el rag', 'how does qa work',
      'how does rag work', 'document qa', 'qa tab', 'pestana qa',
      'ask questions', 'hacer preguntas', 'question answering'
    ],
    answer_en: 'The Q&A tab implements a RAG (Retrieval-Augmented Generation) pipeline. First, paste or load a document. The system chunks your text into segments, then when you ask a question, it finds relevant chunks using keyword matching and generates an answer with source citations showing relevance scores. Try loading a sample document and asking "What are the key risks?"',
    answer_es: 'La pestana P&R implementa un pipeline RAG (Generacion Aumentada por Recuperacion). Primero, pega o carga un documento. El sistema fragmenta tu texto en segmentos, luego cuando haces una pregunta, encuentra fragmentos relevantes usando coincidencia de palabras clave y genera una respuesta con citas de fuente mostrando puntuaciones de relevancia. Prueba cargando un documento de ejemplo y preguntando "Cuales son los riesgos clave?"'
  },

  qa_how_rag_works: {
    question_patterns: [
      'what is rag', 'que es rag', 'explain rag', 'explica rag',
      'retrieval augmented generation', 'generacion aumentada por recuperacion',
      'how rag works', 'como funciona rag', 'rag explained', 'rag explicado'
    ],
    answer_en: 'RAG (Retrieval-Augmented Generation) is a technique that combines document retrieval with AI generation. Instead of relying solely on the model\'s training data, RAG: 1) Splits your document into searchable chunks. 2) Finds the most relevant chunks for your question. 3) Feeds those chunks as context to the LLM. 4) The LLM generates an answer grounded in your actual document. This reduces hallucination and provides traceable sources.',
    answer_es: 'RAG (Generacion Aumentada por Recuperacion) es una tecnica que combina recuperacion de documentos con generacion de IA. En lugar de depender solo de los datos de entrenamiento del modelo, RAG: 1) Divide tu documento en fragmentos buscables. 2) Encuentra los fragmentos mas relevantes para tu pregunta. 3) Alimenta esos fragmentos como contexto al LLM. 4) El LLM genera una respuesta basada en tu documento real. Esto reduce la alucinacion y proporciona fuentes rastreables.'
  },

  qa_chunking: {
    question_patterns: [
      'chunking', 'fragmentacion', 'text chunking', 'fragmentacion de texto',
      'how chunking works', 'como funciona la fragmentacion', 'chunks',
      'fragmentos', 'split document', 'dividir documento', 'segments', 'segmentos'
    ],
    answer_en: 'Text chunking splits your document into smaller, searchable segments. The system divides the text by word count (approximately 50 words per chunk). Each chunk becomes a searchable unit. When you ask a question, chunks are scored by keyword overlap with your query, and the most relevant ones are used as context for generating the answer.',
    answer_es: 'La fragmentacion de texto divide tu documento en segmentos mas pequenos y buscables. El sistema divide el texto por cantidad de palabras (aproximadamente 50 palabras por fragmento). Cada fragmento se convierte en una unidad buscable. Cuando haces una pregunta, los fragmentos se puntuan por coincidencia de palabras clave con tu consulta, y los mas relevantes se usan como contexto para generar la respuesta.'
  },

  qa_citations: {
    question_patterns: [
      'citations', 'citas', 'sources', 'fuentes', 'source attribution',
      'atribucion de fuentes', 'how citations work', 'como funcionan las citas',
      'relevance score', 'puntuacion de relevancia', 'where does answer come from',
      'de donde viene la respuesta'
    ],
    answer_en: 'Each Q&A answer includes source citations from the original document. Sources show the relevant text passage and a relevance score (0-100%). Higher scores mean stronger keyword match with your question. This lets you verify the AI\'s answer against the original text and understand which parts of the document informed the response.',
    answer_es: 'Cada respuesta de P&R incluye citas de fuente del documento original. Las fuentes muestran el pasaje de texto relevante y una puntuacion de relevancia (0-100%). Puntuaciones mas altas significan mayor coincidencia de palabras clave con tu pregunta. Esto te permite verificar la respuesta de la IA contra el texto original y entender que partes del documento informaron la respuesta.'
  },

  // ───────── CONTENT GENERATION ─────────

  generate_feature: {
    question_patterns: [
      'generate', 'generar', 'content generation', 'generacion de contenido',
      'generate tab', 'pestana generar', 'create content', 'crear contenido',
      'how does generate work', 'como funciona generar', 'writing', 'escritura',
      'ai writing', 'escritura ia'
    ],
    answer_en: 'The Generate tab creates AI-powered content. Enter a topic, select a tone (Professional, Casual, or Executive), and choose a format (Email, Report, Social Post, or Presentation). Click Generate to create content tailored to your specifications. You can copy the result to clipboard with one click. Each generation shows the model, token usage, and cost.',
    answer_es: 'La pestana Generar crea contenido potenciado por IA. Ingresa un tema, selecciona un tono (Profesional, Casual o Ejecutivo) y elige un formato (Email, Reporte, Social o Presentacion). Haz clic en Generar para crear contenido adaptado a tus especificaciones. Puedes copiar el resultado al portapapeles con un clic. Cada generacion muestra el modelo, uso de tokens y costo.'
  },

  generate_tones: {
    question_patterns: [
      'tones', 'tonos', 'what tones', 'que tonos', 'tone options', 'opciones de tono',
      'professional tone', 'tono profesional', 'casual tone', 'tono casual',
      'executive tone', 'tono ejecutivo', 'tone difference', 'diferencia de tonos'
    ],
    answer_en: 'Three tone options are available: **Professional** — formal, structured, suitable for business communications. **Casual** — relaxed, conversational, good for social media or informal updates. **Executive** — concise, high-level, designed for C-suite briefings and board presentations. The tone affects vocabulary, sentence structure, and overall formality of the generated content.',
    answer_es: 'Hay tres opciones de tono: **Profesional** — formal, estructurado, adecuado para comunicaciones empresariales. **Casual** — relajado, conversacional, bueno para redes sociales o actualizaciones informales. **Ejecutivo** — conciso, de alto nivel, disenado para briefings de directivos y presentaciones de junta. El tono afecta el vocabulario, estructura de oraciones y formalidad general del contenido generado.'
  },

  generate_formats: {
    question_patterns: [
      'formats', 'formatos', 'what formats', 'que formatos', 'format options',
      'opciones de formato', 'email format', 'formato email', 'report format',
      'formato reporte', 'social format', 'formato social', 'presentation format',
      'formato presentacion'
    ],
    answer_en: 'Four format options shape the output structure: **Email** — complete email with subject, greeting, body, and sign-off. **Report** — structured document with sections, bullet points, and analysis. **Social** — short-form content optimized for social media platforms. **Presentation** — slide-ready content with headlines, key points, and talking notes.',
    answer_es: 'Cuatro opciones de formato dan forma a la estructura del resultado: **Email** — email completo con asunto, saludo, cuerpo y despedida. **Reporte** — documento estructurado con secciones, puntos clave y analisis. **Social** — contenido corto optimizado para redes sociales. **Presentacion** — contenido listo para slides con titulares, puntos clave y notas de presentacion.'
  },

  // ───────── DATA EXTRACTION ─────────

  extract_feature: {
    question_patterns: [
      'extract', 'extraer', 'extraction', 'extraccion', 'data extraction',
      'extraccion de datos', 'extract tab', 'pestana extraer',
      'how does extract work', 'como funciona extraer', 'structured data',
      'datos estructurados', 'pull data', 'extraer datos'
    ],
    answer_en: 'The Extract tab automatically pulls structured data from unstructured text. It detects: monetary amounts ($4.2M, $500K), percentages (23%, 18%), dates (Q4 2025, 2024-01-15), email addresses, phone numbers, and key facts (sentences mentioning growth, revenue, margins). Results are displayed as color-coded entity badges, and you can export everything as JSON.',
    answer_es: 'La pestana Extraer obtiene automaticamente datos estructurados de texto no estructurado. Detecta: montos monetarios ($4.2M, $500K), porcentajes (23%, 18%), fechas (Q4 2025, 2024-01-15), direcciones de email, numeros de telefono y hechos clave (oraciones que mencionan crecimiento, ingresos, margenes). Los resultados se muestran como insignias de entidad con colores, y puedes exportar todo como JSON.'
  },

  extract_entities: {
    question_patterns: [
      'entity types', 'tipos de entidad', 'what entities extracted',
      'que entidades se extraen', 'supported entities', 'entidades soportadas',
      'money extraction', 'extraccion de dinero', 'date extraction',
      'extraccion de fechas', 'email extraction', 'extraccion de emails'
    ],
    answer_en: 'Supported entity types: 1) **Money** — amounts like $4.2M, $500,000. 2) **Percentage** — values like 23%, 18%. 3) **Date** — formats like Q4 2025, 2024-01-15. 4) **Email** — valid email addresses. 5) **Phone** — phone numbers with various formats. 6) **Key Facts** — sentences containing business keywords like revenue, growth, profit. All extraction uses regex patterns, no API call needed.',
    answer_es: 'Tipos de entidad soportados: 1) **Dinero** — montos como $4.2M, $500,000. 2) **Porcentaje** — valores como 23%, 18%. 3) **Fecha** — formatos como Q4 2025, 2024-01-15. 4) **Email** — direcciones de email validas. 5) **Telefono** — numeros de telefono en varios formatos. 6) **Hechos Clave** — oraciones con palabras clave de negocio como ingresos, crecimiento, ganancia. Toda la extraccion usa patrones regex, no necesita llamada API.'
  },

  extract_export: {
    question_patterns: [
      'export', 'exportar', 'export json', 'exportar json', 'download data',
      'descargar datos', 'save results', 'guardar resultados', 'json export',
      'exportacion json', 'how to export', 'como exportar'
    ],
    answer_en: 'After running extraction, click the "Export JSON" button to download all extracted entities and facts as a structured JSON file. The file includes entity types, values, key facts, and the LLM extraction results. This is useful for feeding extracted data into other systems or for further analysis.',
    answer_es: 'Despues de ejecutar la extraccion, haz clic en el boton "Exportar JSON" para descargar todas las entidades y hechos extraidos como un archivo JSON estructurado. El archivo incluye tipos de entidad, valores, hechos clave y los resultados de extraccion LLM. Esto es util para alimentar datos extraidos a otros sistemas o para analisis adicional.'
  },

  // ───────── TRANSLATION ─────────

  translate_feature: {
    question_patterns: [
      'translate', 'traducir', 'translation', 'traduccion', 'translate tab',
      'pestana traducir', 'how does translate work', 'como funciona traducir',
      'language translation', 'traduccion de idiomas', 'translate text',
      'traducir texto'
    ],
    answer_en: 'The Translate tab lets you translate text between 5 languages: English, Spanish, French, Portuguese, and German. Type or paste your text, select source and target languages, and click Translate. Results appear side-by-side with the original and translated text. You can swap languages with the arrow button for quick reverse translation.',
    answer_es: 'La pestana Traducir te permite traducir texto entre 5 idiomas: ingles, espanol, frances, portugues y aleman. Escribe o pega tu texto, selecciona idiomas de origen y destino, y haz clic en Traducir. Los resultados aparecen lado a lado con el texto original y traducido. Puedes intercambiar idiomas con el boton de flecha para traduccion inversa rapida.'
  },

  translate_languages: {
    question_patterns: [
      'languages', 'idiomas', 'supported languages', 'idiomas soportados',
      'what languages', 'que idiomas', 'language pairs', 'pares de idiomas',
      'which languages', 'cuales idiomas', 'french', 'frances', 'portuguese',
      'portugues', 'german', 'aleman'
    ],
    answer_en: 'Five languages are supported: English (EN), Spanish (ES), French (FR), Portuguese (PT), and German (DE). You can translate between any pair — that\'s 20 possible direction combinations. The swap button lets you quickly reverse the translation direction without retyping.',
    answer_es: 'Se soportan cinco idiomas: Ingles (EN), Espanol (ES), Frances (FR), Portugues (PT) y Aleman (DE). Puedes traducir entre cualquier par — son 20 combinaciones de direccion posibles. El boton de intercambio te permite invertir rapidamente la direccion de traduccion sin volver a escribir.'
  },

  translate_tips: {
    question_patterns: [
      'translate tips', 'consejos traduccion', 'better translations',
      'mejores traducciones', 'translation quality', 'calidad de traduccion',
      'translate best practices', 'mejores practicas traduccion'
    ],
    answer_en: 'Tips for better translations: 1) Use clear, simple sentences for more accurate results. 2) Avoid slang or highly idiomatic expressions. 3) For long documents, translate paragraph by paragraph. 4) Try different models — each has different strengths for different language pairs. 5) Use the side-by-side view to quickly verify key terms.',
    answer_es: 'Consejos para mejores traducciones: 1) Usa oraciones claras y simples para resultados mas precisos. 2) Evita jerga o expresiones muy idiomaticas. 3) Para documentos largos, traduce parrafo por parrafo. 4) Prueba diferentes modelos — cada uno tiene fortalezas diferentes para diferentes pares de idiomas. 5) Usa la vista lado a lado para verificar rapidamente terminos clave.'
  },

  // ───────── MODEL COMPARISON ─────────

  compare_feature: {
    question_patterns: [
      'compare', 'comparar', 'model comparison', 'comparacion de modelos',
      'compare tab', 'pestana comparar', 'how does compare work',
      'como funciona comparar', 'side by side', 'lado a lado',
      'compare models', 'comparar modelos'
    ],
    answer_en: 'The Compare tab sends your prompt to all 3 models simultaneously: Claude Sonnet, GPT-4o, and Gemini Pro. Results appear side-by-side showing each model\'s response, latency (ms), token count, and cost. Winner badges highlight the Fastest, Cheapest, and Most Detailed model. This helps you choose the best model for your specific use case.',
    answer_es: 'La pestana Comparar envia tu prompt a los 3 modelos simultaneamente: Claude Sonnet, GPT-4o y Gemini Pro. Los resultados aparecen lado a lado mostrando la respuesta de cada modelo, latencia (ms), cantidad de tokens y costo. Las insignias de ganador resaltan el modelo Mas Rapido, Mas Barato y Mas Detallado. Esto te ayuda a elegir el mejor modelo para tu caso de uso especifico.'
  },

  compare_metrics: {
    question_patterns: [
      'metrics', 'metricas', 'what metrics', 'que metricas', 'comparison metrics',
      'metricas de comparacion', 'latency', 'latencia', 'token count',
      'conteo de tokens', 'winner badges', 'insignias de ganador',
      'fastest cheapest', 'mas rapido mas barato'
    ],
    answer_en: 'Three metrics are tracked per model: **Latency** — response time in milliseconds (Gemini ~500ms, GPT-4o ~650ms, Claude ~800ms). **Tokens** — total input + output tokens used. **Cost** — estimated USD cost based on each model\'s pricing. Winner badges: Fastest (lowest latency), Cheapest (lowest cost), and Most Detailed (highest token output).',
    answer_es: 'Se rastrean tres metricas por modelo: **Latencia** — tiempo de respuesta en milisegundos (Gemini ~500ms, GPT-4o ~650ms, Claude ~800ms). **Tokens** — total de tokens de entrada + salida usados. **Costo** — costo estimado en USD basado en el precio de cada modelo. Insignias de ganador: Mas Rapido (menor latencia), Mas Barato (menor costo) y Mas Detallado (mayor salida de tokens).'
  },

  compare_models: {
    question_patterns: [
      'models', 'modelos', 'which models', 'cuales modelos', 'available models',
      'modelos disponibles', 'claude', 'gpt', 'gemini', 'model differences',
      'diferencias entre modelos', 'best model', 'mejor modelo'
    ],
    answer_en: 'Three models are available: **Claude Sonnet** (Anthropic) — excellent at analysis and nuanced reasoning, priced at $3/$15 per million tokens (input/output). **GPT-4o** (OpenAI) — strong at structured output and creative tasks, priced at $5/$15 per million tokens. **Gemini Pro** (Google) — fast and cost-effective, priced at $1.25/$5 per million tokens. Each model has different strengths depending on the task.',
    answer_es: 'Tres modelos estan disponibles: **Claude Sonnet** (Anthropic) — excelente en analisis y razonamiento matizado, precio de $3/$15 por millon de tokens (entrada/salida). **GPT-4o** (OpenAI) — fuerte en salida estructurada y tareas creativas, precio de $5/$15 por millon de tokens. **Gemini Pro** (Google) — rapido y economico, precio de $1.25/$5 por millon de tokens. Cada modelo tiene fortalezas diferentes segun la tarea.'
  },

  // ───────── TECHNICAL ─────────

  tech_stack: {
    question_patterns: [
      'tech stack', 'stack tecnologico', 'technology', 'tecnologia',
      'what is it built with', 'con que esta construido', 'react', 'vite',
      'groq', 'llama', 'framework', 'architecture stack', 'stack de arquitectura'
    ],
    answer_en: 'The tech stack includes: **Frontend** — React 18 with Vite 5 for fast builds. **LLM API** — Groq API running Llama 3.3 70B for ultra-fast inference. **Deployment** — Vercel serverless functions for API routing. **NLP** — Rule-based client-side processing for analysis and extraction (no API needed). **Styling** — All inline CSS with a dark theme. The entire app is a single-page application with no backend database.',
    answer_es: 'El stack tecnologico incluye: **Frontend** — React 18 con Vite 5 para builds rapidos. **LLM API** — Groq API ejecutando Llama 3.3 70B para inferencia ultra-rapida. **Despliegue** — Funciones serverless de Vercel para routing de API. **NLP** — Procesamiento client-side basado en reglas para analisis y extraccion (no necesita API). **Estilos** — Todo CSS inline con tema oscuro. Toda la app es una single-page application sin base de datos backend.'
  },

  cost_tracking: {
    question_patterns: [
      'cost tracker', 'rastreador de costos', 'cost tracking', 'seguimiento de costos',
      'how much does it cost', 'cuanto cuesta', 'pricing', 'precios',
      'token pricing', 'precio de tokens', 'cost panel', 'panel de costos',
      'how costs work', 'como funcionan los costos'
    ],
    answer_en: 'The Cost Tracker monitors every API call showing: total requests, total tokens, and total cost in USD. Pricing per model (per million tokens): Claude Sonnet — $3 input / $15 output. GPT-4o — $5 input / $15 output. Gemini Pro — $1.25 input / $5 output. The metrics panel also breaks down costs by model and by use case, visualized with bar charts.',
    answer_es: 'El Rastreador de Costos monitorea cada llamada API mostrando: total de solicitudes, total de tokens y costo total en USD. Precio por modelo (por millon de tokens): Claude Sonnet — $3 entrada / $15 salida. GPT-4o — $5 entrada / $15 salida. Gemini Pro — $1.25 entrada / $5 salida. El panel de metricas tambien desglosa costos por modelo y por caso de uso, visualizado con graficos de barras.'
  },

  architecture: {
    question_patterns: [
      'architecture', 'arquitectura', 'how is it built', 'como esta construido',
      'system design', 'diseno del sistema', 'frontend backend', 'client server',
      'cliente servidor', 'serverless', 'vercel'
    ],
    answer_en: 'The architecture is frontend-first with serverless API calls. The React SPA handles all UI logic. Document analysis and data extraction run 100% client-side using rule-based NLP. Chat, generation, translation, and comparison make API calls to Vercel serverless functions, which proxy requests to the Groq API. No data is stored server-side — everything is ephemeral.',
    answer_es: 'La arquitectura es frontend-first con llamadas API serverless. La SPA de React maneja toda la logica de UI. El analisis de documentos y extraccion de datos corren 100% en el cliente usando NLP basado en reglas. Chat, generacion, traduccion y comparacion hacen llamadas API a funciones serverless de Vercel, que redirigen solicitudes a la API de Groq. No se almacenan datos en el servidor — todo es efimero.'
  },

  privacy: {
    question_patterns: [
      'privacy', 'privacidad', 'data privacy', 'privacidad de datos',
      'is my data safe', 'estan seguros mis datos', 'do you store data',
      'almacenan datos', 'security', 'seguridad', 'data storage',
      'almacenamiento de datos', 'where is my data', 'donde estan mis datos'
    ],
    answer_en: 'Your data stays in your browser. Document analysis is 100% client-side — text never leaves your device. Chat and generation go through our serverless API to the LLM, but we don\'t store conversations or documents. There\'s no database, no user accounts, and no persistent storage. When you close the tab, everything is gone.',
    answer_es: 'Tus datos permanecen en tu navegador. El analisis de documentos es 100% client-side — el texto nunca sale de tu dispositivo. Chat y generacion pasan por nuestra API serverless al LLM, pero no almacenamos conversaciones ni documentos. No hay base de datos, no hay cuentas de usuario y no hay almacenamiento persistente. Cuando cierras la pestana, todo desaparece.'
  },

  // ───────── ABOUT ─────────

  about_creator: {
    question_patterns: [
      'who made this', 'quien hizo esto', 'creator', 'creador', 'developer',
      'desarrollador', 'who built this', 'quien construyo esto', 'christian',
      'author', 'autor', 'about the developer', 'sobre el desarrollador'
    ],
    answer_en: 'AI Playground was built by Christian Hernandez Escamilla, an AI Engineer at Scale AI. Christian has built 15+ production AI systems and specializes in LLM integration, multi-agent architectures, and full-stack AI applications. This project is part of a larger portfolio showcasing real-world AI capabilities.',
    answer_es: 'AI Playground fue construido por Christian Hernandez Escamilla, Ingeniero de IA en Scale AI. Christian ha construido 15+ sistemas de IA en produccion y se especializa en integracion de LLMs, arquitecturas multi-agente y aplicaciones full-stack de IA. Este proyecto es parte de un portafolio mas grande que muestra capacidades de IA del mundo real.'
  },

  about_project: {
    question_patterns: [
      'about project', 'sobre el proyecto', 'project info', 'info del proyecto',
      'portfolio', 'portafolio', 'what project is this', 'que proyecto es este',
      'part of what', 'parte de que', 'other projects', 'otros proyectos'
    ],
    answer_en: 'AI Playground is one of several AI projects in Christian\'s portfolio, which includes 861+ tests across 15 production systems. Other projects include multi-agent chatbots, content studios, financial dashboards, HR screening tools, and client portals — all leveraging different AI architectures from RAG to multi-agent systems.',
    answer_es: 'AI Playground es uno de varios proyectos de IA en el portafolio de Christian, que incluye 861+ tests en 15 sistemas de produccion. Otros proyectos incluyen chatbots multi-agente, estudios de contenido, dashboards financieros, herramientas de screening de HR y portales de clientes — todos aprovechando diferentes arquitecturas de IA desde RAG hasta sistemas multi-agente.'
  },

  // ───────── FUN / SURPRISE ─────────

  easter_egg: {
    question_patterns: [
      'easter egg', 'huevo de pascua', 'secret', 'secreto', 'hidden feature',
      'funcion oculta', 'surprise me', 'sorprendeme', 'trick', 'truco',
      'fun fact about this', 'dato curioso'
    ],
    answer_en: 'You found a hidden feature! Here\'s a fun fact: the Document Analysis tab runs entirely in your browser with zero API calls. Try pasting this conversation into the Analyze tab and see what keywords and sentiment it detects! Also, the Cost Tracker counts rule-based analysis as $0.00 — because client-side processing is truly free.',
    answer_es: 'Encontraste una funcion oculta! Dato curioso: la pestana de Analisis de Documentos corre completamente en tu navegador sin ninguna llamada API. Intenta pegar esta conversacion en la pestana Analizar y ve que palabras clave y sentimiento detecta! Ademas, el Rastreador de Costos cuenta el analisis basado en reglas como $0.00 — porque el procesamiento client-side es verdaderamente gratis.'
  },

  best_feature: {
    question_patterns: [
      'best feature', 'mejor funcion', 'what should i try', 'que deberia probar',
      'recommend', 'recomienda', 'favorite feature', 'funcion favorita',
      'most impressive', 'mas impresionante', 'coolest feature',
      'funcion mas genial', 'where to start', 'por donde empezar'
    ],
    answer_en: 'I recommend starting with the **Compare** tab — it\'s the most visual and impressive. Enter any prompt and instantly see three AI models race against each other with real metrics. After that, try **Analyze** with the legal document sample to see risk detection in action. Then explore **Q&A** to experience RAG firsthand.',
    answer_es: 'Recomiendo empezar con la pestana **Comparar** — es la mas visual e impresionante. Ingresa cualquier prompt y ve instantaneamente tres modelos de IA competir entre si con metricas reales. Despues, prueba **Analizar** con el documento legal de ejemplo para ver la deteccion de riesgos en accion. Luego explora **P&R** para experimentar RAG de primera mano.'
  },

  compare_playground_vs_chatgpt: {
    question_patterns: [
      'chatgpt', 'vs chatgpt', 'different from chatgpt', 'diferente de chatgpt',
      'why not just use chatgpt', 'por que no usar chatgpt',
      'how is this different', 'como es diferente', 'playground vs chatgpt',
      'chatgpt comparison', 'comparacion con chatgpt'
    ],
    answer_en: 'Unlike ChatGPT, AI Playground: 1) Lets you compare 3 models side-by-side in real time. 2) Shows transparent cost tracking for every interaction. 3) Offers specialized tools (analysis, extraction, RAG) beyond just chat. 4) Runs analysis 100% client-side for privacy. 5) Is designed as a demo of multiple AI patterns, not just a chatbot. Think of it as an AI capabilities showcase rather than a single-model chat.',
    answer_es: 'A diferencia de ChatGPT, AI Playground: 1) Te permite comparar 3 modelos lado a lado en tiempo real. 2) Muestra seguimiento transparente de costos para cada interaccion. 3) Ofrece herramientas especializadas (analisis, extraccion, RAG) mas alla del chat. 4) Ejecuta analisis 100% en el cliente para privacidad. 5) Esta disenado como demo de multiples patrones de IA, no solo un chatbot. Piensalo como una vitrina de capacidades de IA en lugar de un chat de un solo modelo.'
  },

  future_features: {
    question_patterns: [
      'future', 'futuro', 'coming next', 'que viene', 'roadmap', 'hoja de ruta',
      'planned features', 'funciones planeadas', 'what\'s next', 'que sigue',
      'upcoming', 'proximo', 'new features', 'nuevas funciones',
      'will you add', 'van a agregar'
    ],
    answer_en: 'Coming soon: 1) **Image Generation** — DALL-E and Stable Diffusion integration. 2) **Voice Input** — speak your prompts instead of typing. 3) **File Upload** — drag-and-drop PDF/DOCX for analysis and Q&A. 4) **Streaming Responses** — real-time token-by-token output. 5) **Custom Prompts Library** — save and reuse your best prompts. Stay tuned!',
    answer_es: 'Proximamente: 1) **Generacion de Imagenes** — integracion con DALL-E y Stable Diffusion. 2) **Entrada de Voz** — habla tus prompts en vez de escribir. 3) **Carga de Archivos** — arrastra y suelta PDF/DOCX para analisis y P&R. 4) **Respuestas en Streaming** — salida token por token en tiempo real. 5) **Biblioteca de Prompts** — guarda y reutiliza tus mejores prompts. Mantente atento!'
  },

  guided_tour: {
    question_patterns: [
      'tour', 'guided tour', 'tour guiado', 'take a tour', 'hacer un tour',
      'show me around', 'muestrame', 'walkthrough', 'recorrido',
      'how to start tour', 'como iniciar el tour'
    ],
    answer_en: 'The Guided Tour starts automatically when you first visit the app. It walks you through all 7 features with live demos — including auto-running analysis, comparison, and translation. If you missed it, just refresh the page to restart the tour. You can skip it anytime with the "Skip Tour" button in the top-right corner.',
    answer_es: 'El Tour Guiado inicia automaticamente cuando visitas la app por primera vez. Te guia por las 7 funciones con demos en vivo — incluyendo analisis, comparacion y traduccion automaticos. Si te lo perdiste, solo recarga la pagina para reiniciar el tour. Puedes saltarlo en cualquier momento con el boton "Saltar Tour" en la esquina superior derecha.'
  },

  bilingual: {
    question_patterns: [
      'bilingual', 'bilingue', 'language switch', 'cambiar idioma',
      'english spanish', 'ingles espanol', 'how to change language',
      'como cambiar idioma', 'language toggle', 'toggle de idioma',
      'en es', 'idioma'
    ],
    answer_en: 'The entire UI is bilingual (English/Spanish). Use the EN/ES toggle in the sidebar to switch all labels, buttons, placeholders, and messages. The Guided Tour also adapts to your selected language. This assistant also responds in both languages — try asking me something in Spanish!',
    answer_es: 'Toda la interfaz es bilingue (Ingles/Espanol). Usa el toggle EN/ES en la barra lateral para cambiar todas las etiquetas, botones, placeholders y mensajes. El Tour Guiado tambien se adapta al idioma seleccionado. Este asistente tambien responde en ambos idiomas — intenta preguntarme algo en ingles!'
  },

  sample_data: {
    question_patterns: [
      'sample data', 'datos de ejemplo', 'sample documents', 'documentos de ejemplo',
      'business report', 'reporte de negocio', 'legal document', 'documento legal',
      'demo data', 'datos de demo', 'try with sample', 'probar con ejemplo'
    ],
    answer_en: 'Two sample documents are available in several tabs: **Business Report** — TechCorp Q4 2025 financials with revenue, margins, satisfaction scores, and LATAM expansion data. **Legal Document** — a service agreement with liability, termination, confidentiality, non-compete, and arbitration clauses. Click "Sample: Business Report" or "Sample: Legal Document" in the Analyze, Extract, or Q&A tabs.',
    answer_es: 'Dos documentos de ejemplo estan disponibles en varias pestanas: **Reporte de Negocio** — Financieros Q4 2025 de TechCorp con ingresos, margenes, puntuaciones de satisfaccion y datos de expansion LATAM. **Documento Legal** — un acuerdo de servicio con clausulas de responsabilidad, terminacion, confidencialidad, no competencia y arbitraje. Haz clic en "Muestra: Reporte de Negocio" o "Muestra: Documento Legal" en las pestanas Analizar, Extraer o P&R.'
  },

  models_pricing: {
    question_patterns: [
      'pricing', 'precios', 'how much', 'cuanto cuesta', 'model pricing',
      'precio de modelos', 'token cost', 'costo de tokens', 'input output price',
      'precio entrada salida', 'cost per token', 'costo por token'
    ],
    answer_en: 'Model pricing (per million tokens): **Claude Sonnet** — $3.00 input / $15.00 output. **GPT-4o** — $5.00 input / $15.00 output. **Gemini Pro** — $1.25 input / $5.00 output. Gemini Pro is the cheapest option, while Claude and GPT-4o offer more advanced reasoning at a higher cost. The Cost Tracker shows real-time spending across all interactions.',
    answer_es: 'Precios de modelos (por millon de tokens): **Claude Sonnet** — $3.00 entrada / $15.00 salida. **GPT-4o** — $5.00 entrada / $15.00 salida. **Gemini Pro** — $1.25 entrada / $5.00 salida. Gemini Pro es la opcion mas economica, mientras Claude y GPT-4o ofrecen razonamiento mas avanzado a mayor costo. El Rastreador de Costos muestra el gasto en tiempo real en todas las interacciones.'
  },

  keyboard_shortcuts: {
    question_patterns: [
      'shortcuts', 'atajos', 'keyboard', 'teclado', 'keyboard shortcuts',
      'atajos de teclado', 'hotkeys', 'teclas rapidas', 'enter to send',
      'enter para enviar'
    ],
    answer_en: 'Keyboard shortcuts: **Enter** — send message in Chat, ask question in Q&A, or submit in any input field. **Tab navigation** — use the sidebar buttons or bottom navigation bar on mobile to switch between features. There are no complex keyboard shortcuts — the app is designed for simplicity.',
    answer_es: 'Atajos de teclado: **Enter** — enviar mensaje en Chat, hacer pregunta en P&R, o enviar en cualquier campo de entrada. **Navegacion por pestanas** — usa los botones de la barra lateral o la barra de navegacion inferior en movil para cambiar entre funciones. No hay atajos de teclado complejos — la app esta disenada para la simplicidad.'
  },

  mobile_support: {
    question_patterns: [
      'mobile', 'movil', 'responsive', 'phone', 'telefono', 'tablet',
      'small screen', 'pantalla pequena', 'mobile support', 'soporte movil',
      'works on phone', 'funciona en telefono'
    ],
    answer_en: 'Yes, AI Playground is fully responsive. On mobile devices, the sidebar collapses into a hamburger menu, and a bottom navigation bar appears for quick tab switching. All features work on mobile — from chat to document analysis to model comparison. The layout adapts to any screen size.',
    answer_es: 'Si, AI Playground es completamente responsive. En dispositivos moviles, la barra lateral se colapsa en un menu hamburguesa y aparece una barra de navegacion inferior para cambio rapido de pestanas. Todas las funciones funcionan en movil — desde chat hasta analisis de documentos hasta comparacion de modelos. El diseno se adapta a cualquier tamano de pantalla.'
  },

  performance: {
    question_patterns: [
      'performance', 'rendimiento', 'speed', 'velocidad', 'how fast',
      'que tan rapido', 'loading time', 'tiempo de carga', 'optimization',
      'optimizacion', 'fast', 'rapido'
    ],
    answer_en: 'The app is optimized for speed: Vite 5 provides sub-second hot reloading during development and optimized production builds. Client-side analysis runs instantly (no network latency). LLM calls go through Groq API which offers the fastest inference available (Llama 3.3 70B at 500+ tokens/second). The entire app is a single JavaScript bundle under 100KB.',
    answer_es: 'La app esta optimizada para velocidad: Vite 5 proporciona recarga en caliente de menos de un segundo durante desarrollo y builds de produccion optimizados. El analisis client-side corre instantaneamente (sin latencia de red). Las llamadas LLM van a traves de Groq API que ofrece la inferencia mas rapida disponible (Llama 3.3 70B a 500+ tokens/segundo). Toda la app es un solo bundle JavaScript de menos de 100KB.'
  },

  no_api_key: {
    question_patterns: [
      'api key', 'clave api', 'do i need an api key', 'necesito una clave api',
      'setup', 'configuracion', 'credentials', 'credenciales', 'login',
      'iniciar sesion', 'account', 'cuenta', 'sign up', 'registrarse'
    ],
    answer_en: 'No API key or account needed! The demo uses pre-configured API access through Vercel serverless functions. Document analysis and data extraction work entirely client-side with zero API calls. Chat, generation, and translation use a shared API configuration. Just open the app and start exploring.',
    answer_es: 'No necesitas clave API ni cuenta! La demo usa acceso API preconfigurado a traves de funciones serverless de Vercel. El analisis de documentos y extraccion de datos funcionan completamente en el cliente sin llamadas API. Chat, generacion y traduccion usan una configuracion API compartida. Solo abre la app y empieza a explorar.'
  },

  llm_models_explained: {
    question_patterns: [
      'what is an llm', 'que es un llm', 'large language model',
      'modelo de lenguaje grande', 'how do llms work', 'como funcionan los llms',
      'ai model', 'modelo de ia', 'what is a model', 'que es un modelo'
    ],
    answer_en: 'An LLM (Large Language Model) is an AI trained on vast amounts of text to understand and generate language. The models in this playground — Claude, GPT-4o, and Gemini — are among the most advanced. They can analyze text, answer questions, write content, and translate languages. Each model has different strengths: Claude excels at analysis, GPT-4o at structured tasks, and Gemini at speed.',
    answer_es: 'Un LLM (Modelo de Lenguaje Grande) es una IA entrenada con grandes cantidades de texto para entender y generar lenguaje. Los modelos en este playground — Claude, GPT-4o y Gemini — estan entre los mas avanzados. Pueden analizar texto, responder preguntas, escribir contenido y traducir idiomas. Cada modelo tiene fortalezas diferentes: Claude sobresale en analisis, GPT-4o en tareas estructuradas y Gemini en velocidad.'
  },

  error_handling: {
    question_patterns: [
      'error', 'not working', 'no funciona', 'broken', 'roto', 'bug',
      'problem', 'problema', 'issue', 'something wrong', 'algo mal',
      'help it broke', 'se rompio', 'fix', 'arreglar'
    ],
    answer_en: 'If something isn\'t working: 1) Try refreshing the page. 2) Make sure you\'ve entered text before clicking action buttons. 3) The Analyze and Extract tabs require text input — use the sample document buttons. 4) For Q&A, load a document first before asking questions. 5) If API features aren\'t responding, the serverless function might be cold-starting — wait a few seconds and retry.',
    answer_es: 'Si algo no funciona: 1) Intenta recargar la pagina. 2) Asegurate de haber ingresado texto antes de hacer clic en los botones de accion. 3) Las pestanas Analizar y Extraer requieren texto — usa los botones de documento de ejemplo. 4) Para P&R, carga un documento primero antes de hacer preguntas. 5) Si las funciones API no responden, la funcion serverless puede estar iniciando — espera unos segundos y reintenta.'
  },

  accessibility: {
    question_patterns: [
      'accessibility', 'accesibilidad', 'screen reader', 'lector de pantalla',
      'a11y', 'aria', 'accessible', 'accesible', 'keyboard navigation',
      'navegacion por teclado'
    ],
    answer_en: 'The app includes accessibility features: ARIA labels on interactive elements, keyboard navigable buttons and inputs, high contrast dark theme with readable font sizes, and proper semantic HTML structure. The bilingual toggle also helps non-English speakers access all features in Spanish.',
    answer_es: 'La app incluye funciones de accesibilidad: etiquetas ARIA en elementos interactivos, botones e inputs navegables por teclado, tema oscuro de alto contraste con tamanos de fuente legibles y estructura HTML semantica adecuada. El toggle bilingue tambien ayuda a hablantes no ingleses a acceder a todas las funciones en espanol.'
  },

  client_side_vs_api: {
    question_patterns: [
      'client side', 'lado del cliente', 'which features are client side',
      'cuales funciones son client side', 'offline', 'sin conexion',
      'api vs client', 'api vs cliente', 'which need internet',
      'cuales necesitan internet'
    ],
    answer_en: 'Two types of processing: **Client-side (no API)** — Document Analysis and Data Extraction run entirely in your browser using rule-based NLP. They work offline and cost $0. **API-based** — Chat, Q&A, Content Generation, Translation, and Model Comparison send requests to the Groq API through Vercel serverless functions. These require internet and incur token costs tracked by the Cost Tracker.',
    answer_es: 'Dos tipos de procesamiento: **Client-side (sin API)** — Analisis de Documentos y Extraccion de Datos corren completamente en tu navegador usando NLP basado en reglas. Funcionan offline y cuestan $0. **Basado en API** — Chat, P&R, Generacion de Contenido, Traduccion y Comparacion de Modelos envian solicitudes a la API de Groq a traves de funciones serverless de Vercel. Estos requieren internet y generan costos de tokens rastreados por el Rastreador de Costos.'
  },

  use_cases: {
    question_patterns: [
      'use cases', 'casos de uso', 'real world', 'mundo real',
      'practical applications', 'aplicaciones practicas', 'when to use',
      'cuando usar', 'business use', 'uso empresarial', 'examples',
      'ejemplos de uso'
    ],
    answer_en: 'Real-world use cases: **Chat** — customer support, brainstorming. **Analyze** — contract review, report analysis, due diligence. **Q&A** — knowledge base queries, document search. **Generate** — marketing emails, executive briefings, social posts. **Extract** — invoice processing, data entry automation. **Translate** — international communication, document localization. **Compare** — model selection, cost optimization.',
    answer_es: 'Casos de uso del mundo real: **Chat** — soporte al cliente, brainstorming. **Analizar** — revision de contratos, analisis de reportes, due diligence. **P&R** — consultas de base de conocimiento, busqueda de documentos. **Generar** — emails de marketing, briefings ejecutivos, posts sociales. **Extraer** — procesamiento de facturas, automatizacion de entrada de datos. **Traducir** — comunicacion internacional, localizacion de documentos. **Comparar** — seleccion de modelos, optimizacion de costos.'
  },

  groq_api: {
    question_patterns: [
      'groq', 'groq api', 'what is groq', 'que es groq', 'groq llm',
      'llama 3', 'llama model', 'modelo llama', 'groq speed', 'velocidad groq'
    ],
    answer_en: 'Groq is an AI inference company that provides the fastest LLM API available. This playground uses Groq\'s API running Llama 3.3 70B — Meta\'s open-source model with 70 billion parameters. Groq\'s custom LPU (Language Processing Unit) hardware achieves 500+ tokens per second, making responses feel nearly instant compared to traditional GPU-based inference.',
    answer_es: 'Groq es una empresa de inferencia de IA que proporciona la API de LLM mas rapida disponible. Este playground usa la API de Groq ejecutando Llama 3.3 70B — el modelo open-source de Meta con 70 mil millones de parametros. El hardware LPU (Unidad de Procesamiento de Lenguaje) personalizado de Groq alcanza 500+ tokens por segundo, haciendo que las respuestas se sientan casi instantaneas comparado con la inferencia basada en GPU tradicional.'
  },

  dark_theme: {
    question_patterns: [
      'dark theme', 'tema oscuro', 'dark mode', 'modo oscuro', 'colors',
      'colores', 'theme', 'tema', 'light mode', 'modo claro',
      'change theme', 'cambiar tema'
    ],
    answer_en: 'The app uses a carefully designed dark theme with a deep navy background (#0A0F1A), card backgrounds (#111827, #1A1F2E), indigo accents (#6366F1), and light text (#E2E8F0). This reduces eye strain and is optimized for long coding/analysis sessions. Currently there\'s no light mode option — the dark theme is the default and only theme.',
    answer_es: 'La app usa un tema oscuro cuidadosamente disenado con fondo azul marino profundo (#0A0F1A), fondos de tarjeta (#111827, #1A1F2E), acentos indigo (#6366F1) y texto claro (#E2E8F0). Esto reduce la fatiga visual y esta optimizado para sesiones largas de programacion/analisis. Actualmente no hay opcion de modo claro — el tema oscuro es el unico tema predeterminado.'
  },

  open_source: {
    question_patterns: [
      'open source', 'codigo abierto', 'github', 'repository', 'repositorio',
      'source code', 'codigo fuente', 'can i use this', 'puedo usar esto',
      'license', 'licencia', 'fork', 'contribute', 'contribuir'
    ],
    answer_en: 'This project is part of Christian Hernandez\'s professional portfolio. The source code demonstrates production-quality patterns for LLM integration, client-side NLP, and serverless architecture. If you\'re interested in the code or collaboration, reach out to Christian through his portfolio or LinkedIn.',
    answer_es: 'Este proyecto es parte del portafolio profesional de Christian Hernandez. El codigo fuente demuestra patrones de calidad de produccion para integracion de LLM, NLP client-side y arquitectura serverless. Si te interesa el codigo o colaboracion, contacta a Christian a traves de su portafolio o LinkedIn.'
  },

  azure_ai: {
    question_patterns: ['azure', 'microsoft', 'azure openai', 'document intelligence', 'azure ai'],
    answer_en: 'The AI Playground supports Azure OpenAI as a fallback provider alongside Groq. When configured, requests route through Azure\'s GPT-4o-mini deployment. We also integrate Azure Document Intelligence for document analysis and Azure AI Search for semantic search capabilities.',
    answer_es: 'El AI Playground soporta Azure OpenAI como proveedor alternativo junto a Groq. Cuando está configurado, las solicitudes se enrutan por el deployment GPT-4o-mini de Azure. También integramos Azure Document Intelligence para análisis de documentos y Azure AI Search para búsqueda semántica.',
  },
}

// Follow-up suggestions for each topic
export const FOLLOWUPS = {
  what_is_playground: { en: ['How do I use it?', 'Show features', 'Best feature?'], es: ['Como lo uso?', 'Mostrar funciones', 'Mejor funcion?'] },
  how_to_use: { en: ['Show features', 'What models?', 'Start tour'], es: ['Mostrar funciones', 'Que modelos?', 'Iniciar tour'] },
  features_overview: { en: ['Tell me about Chat', 'How does Analysis work?', 'What is RAG?'], es: ['Cuentame del Chat', 'Como funciona Analisis?', 'Que es RAG?'] },
  chat_feature: { en: ['Chat tips', 'What models?', 'Compare models'], es: ['Consejos chat', 'Que modelos?', 'Comparar modelos'] },
  chat_tips: { en: ['What models?', 'Other features', 'Try Compare'], es: ['Que modelos?', 'Otras funciones', 'Probar Comparar'] },
  analyze_feature: { en: ['How keywords work?', 'Sentiment analysis?', 'Risk detection?'], es: ['Como funcionan palabras clave?', 'Analisis de sentimiento?', 'Deteccion de riesgos?'] },
  analyze_keywords: { en: ['Sentiment analysis?', 'Entity detection?', 'Sample data?'], es: ['Analisis de sentimiento?', 'Deteccion de entidades?', 'Datos de ejemplo?'] },
  analyze_sentiment: { en: ['Keyword extraction?', 'Risk flags?', 'Sample data?'], es: ['Extraccion de palabras clave?', 'Alertas de riesgo?', 'Datos de ejemplo?'] },
  analyze_entities: { en: ['Risk detection?', 'Extract tab?', 'Export data?'], es: ['Deteccion de riesgos?', 'Pestana Extraer?', 'Exportar datos?'] },
  analyze_risk: { en: ['Sample legal doc?', 'Entity detection?', 'All features'], es: ['Documento legal de ejemplo?', 'Deteccion de entidades?', 'Todas las funciones'] },
  analyze_pipeline: { en: ['How keywords work?', 'Sentiment?', 'Entities?'], es: ['Como funcionan palabras clave?', 'Sentimiento?', 'Entidades?'] },
  qa_feature: { en: ['How RAG works?', 'Chunking?', 'Citations?'], es: ['Como funciona RAG?', 'Fragmentacion?', 'Citas?'] },
  qa_how_rag_works: { en: ['How chunking works?', 'How citations work?', 'Try Q&A'], es: ['Como funciona fragmentacion?', 'Como funcionan citas?', 'Probar P&R'] },
  qa_chunking: { en: ['RAG explained?', 'Citations?', 'Sample data?'], es: ['RAG explicado?', 'Citas?', 'Datos de ejemplo?'] },
  qa_citations: { en: ['RAG explained?', 'Chunking?', 'Other features'], es: ['RAG explicado?', 'Fragmentacion?', 'Otras funciones'] },
  generate_feature: { en: ['What tones?', 'What formats?', 'Chat tips?'], es: ['Que tonos?', 'Que formatos?', 'Consejos de chat?'] },
  generate_tones: { en: ['What formats?', 'Generate content', 'Other features'], es: ['Que formatos?', 'Generar contenido', 'Otras funciones'] },
  generate_formats: { en: ['What tones?', 'Try Generate', 'Compare models'], es: ['Que tonos?', 'Probar Generar', 'Comparar modelos'] },
  extract_feature: { en: ['Entity types?', 'Export JSON?', 'Sample data?'], es: ['Tipos de entidad?', 'Exportar JSON?', 'Datos de ejemplo?'] },
  extract_entities: { en: ['Export data?', 'Analysis vs Extract?', 'Sample data?'], es: ['Exportar datos?', 'Analisis vs Extraer?', 'Datos de ejemplo?'] },
  extract_export: { en: ['Entity types?', 'Other features', 'Try Extract'], es: ['Tipos de entidad?', 'Otras funciones', 'Probar Extraer'] },
  translate_feature: { en: ['Supported languages?', 'Translation tips?', 'Compare models'], es: ['Idiomas soportados?', 'Consejos de traduccion?', 'Comparar modelos'] },
  translate_languages: { en: ['Translation tips?', 'Try Translate', 'Other features'], es: ['Consejos de traduccion?', 'Probar Traducir', 'Otras funciones'] },
  translate_tips: { en: ['Supported languages?', 'Compare models', 'Other features'], es: ['Idiomas soportados?', 'Comparar modelos', 'Otras funciones'] },
  compare_feature: { en: ['What metrics?', 'Model details?', 'Pricing?'], es: ['Que metricas?', 'Detalles de modelos?', 'Precios?'] },
  compare_metrics: { en: ['Model details?', 'Pricing?', 'Try Compare'], es: ['Detalles de modelos?', 'Precios?', 'Probar Comparar'] },
  compare_models: { en: ['Pricing?', 'Compare metrics?', 'Best model?'], es: ['Precios?', 'Metricas de comparacion?', 'Mejor modelo?'] },
  tech_stack: { en: ['Architecture?', 'Privacy?', 'Performance?'], es: ['Arquitectura?', 'Privacidad?', 'Rendimiento?'] },
  cost_tracking: { en: ['Model pricing?', 'Compare models', 'Architecture?'], es: ['Precios de modelos?', 'Comparar modelos', 'Arquitectura?'] },
  architecture: { en: ['Tech stack?', 'Privacy?', 'Client vs API?'], es: ['Stack tecnologico?', 'Privacidad?', 'Cliente vs API?'] },
  privacy: { en: ['Architecture?', 'Client-side features?', 'Security?'], es: ['Arquitectura?', 'Funciones client-side?', 'Seguridad?'] },
  about_creator: { en: ['About the project?', 'Tech stack?', 'Other projects?'], es: ['Sobre el proyecto?', 'Stack tecnologico?', 'Otros proyectos?'] },
  about_project: { en: ['About creator?', 'Tech stack?', 'All features'], es: ['Sobre el creador?', 'Stack tecnologico?', 'Todas las funciones'] },
  easter_egg: { en: ['Best feature?', 'Future features?', 'Fun fact!'], es: ['Mejor funcion?', 'Funciones futuras?', 'Dato curioso!'] },
  best_feature: { en: ['Try Compare', 'Try Analysis', 'All features'], es: ['Probar Comparar', 'Probar Analisis', 'Todas las funciones'] },
  compare_playground_vs_chatgpt: { en: ['What models?', 'Pricing?', 'All features'], es: ['Que modelos?', 'Precios?', 'Todas las funciones'] },
  future_features: { en: ['Current features?', 'Tech stack?', 'About creator'], es: ['Funciones actuales?', 'Stack tecnologico?', 'Sobre el creador'] },
  guided_tour: { en: ['All features', 'How to use?', 'Best feature?'], es: ['Todas las funciones', 'Como usar?', 'Mejor funcion?'] },
  bilingual: { en: ['How to use?', 'All features', 'Accessibility?'], es: ['Como usar?', 'Todas las funciones', 'Accesibilidad?'] },
  voice_widget: { en: ['All features', 'How to use?', 'Tech stack?'], es: ['Todas las funciones', 'Como usar?', 'Stack tecnologico?'] },
  sample_data: { en: ['Try Analysis', 'Try Q&A', 'Try Extract'], es: ['Probar Analisis', 'Probar P&R', 'Probar Extraer'] },
  models_pricing: { en: ['Compare models', 'Cost tracker?', 'Best model?'], es: ['Comparar modelos', 'Rastreador de costos?', 'Mejor modelo?'] },
  keyboard_shortcuts: { en: ['Mobile support?', 'Accessibility?', 'How to use?'], es: ['Soporte movil?', 'Accesibilidad?', 'Como usar?'] },
  mobile_support: { en: ['Accessibility?', 'All features', 'Dark theme?'], es: ['Accesibilidad?', 'Todas las funciones', 'Tema oscuro?'] },
  performance: { en: ['Tech stack?', 'Groq API?', 'Architecture?'], es: ['Stack tecnologico?', 'API de Groq?', 'Arquitectura?'] },
  no_api_key: { en: ['How to use?', 'Privacy?', 'All features'], es: ['Como usar?', 'Privacidad?', 'Todas las funciones'] },
  llm_models_explained: { en: ['What models?', 'Compare models', 'Pricing?'], es: ['Que modelos?', 'Comparar modelos', 'Precios?'] },
  error_handling: { en: ['How to use?', 'Sample data?', 'Help'], es: ['Como usar?', 'Datos de ejemplo?', 'Ayuda'] },
  accessibility: { en: ['Mobile support?', 'Bilingual?', 'All features'], es: ['Soporte movil?', 'Bilingue?', 'Todas las funciones'] },
  client_side_vs_api: { en: ['Privacy?', 'Cost tracking?', 'Architecture?'], es: ['Privacidad?', 'Rastreador de costos?', 'Arquitectura?'] },
  use_cases: { en: ['Best feature?', 'All features', 'Try Compare'], es: ['Mejor funcion?', 'Todas las funciones', 'Probar Comparar'] },
  groq_api: { en: ['Tech stack?', 'Model pricing?', 'Performance?'], es: ['Stack tecnologico?', 'Precios de modelos?', 'Rendimiento?'] },
  dark_theme: { en: ['Accessibility?', 'Mobile?', 'All features'], es: ['Accesibilidad?', 'Movil?', 'Todas las funciones'] },
  open_source: { en: ['About creator', 'About project', 'Tech stack?'], es: ['Sobre el creador', 'Sobre el proyecto', 'Stack tecnologico?'] },
  azure_ai: { en: ['Tech stack?', 'All features', 'Groq API?'], es: ['Stack tecnologico?', 'Todas las funciones', 'API de Groq?'] },
}
