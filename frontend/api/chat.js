export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages, model = 'groq', temperature = 0.7, max_tokens = 1024 } = req.body

  // Try Groq first (free, fast)
  const GROQ_KEY = process.env.GROQ_API_KEY
  if (GROQ_KEY) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature,
          max_tokens,
        }),
      })
      if (response.ok) {
        const data = await response.json()
        return res.json({
          text: data.choices[0].message.content,
          provider: 'groq',
          model: 'llama-3.3-70b',
          tokens: { input: data.usage?.prompt_tokens || 0, output: data.usage?.completion_tokens || 0 },
        })
      }
    } catch (e) { /* fall through */ }
  }

  // Try Azure OpenAI (if configured)
  const AZURE_KEY = process.env.AZURE_OPENAI_KEY
  const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || 'https://nexusforge.openai.azure.com'
  const AZURE_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini'

  if (AZURE_KEY) {
    try {
      const azureRes = await fetch(
        `${AZURE_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT}/chat/completions?api-version=2024-02-01`,
        {
          method: 'POST',
          headers: { 'api-key': AZURE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages, temperature, max_tokens }),
        }
      )
      if (azureRes.ok) {
        const data = await azureRes.json()
        return res.json({
          text: data.choices[0].message.content,
          provider: 'azure-openai',
          model: AZURE_DEPLOYMENT,
          tokens: { input: data.usage?.prompt_tokens || 0, output: data.usage?.completion_tokens || 0 },
        })
      }
    } catch (e) { /* fall through */ }
  }

  // Fallback to mock
  return res.json({
    text: generateMockResponse(messages[messages.length - 1]?.content || ''),
    provider: 'demo',
    model: 'mock',
    tokens: { input: 0, output: 0 },
  })
}

function generateMockResponse(input) {
  return `I understand your question about "${input.slice(0, 50)}...". In a production environment, this would be processed by Llama 3.3 70B or Claude. The analysis would cover key aspects of your query with detailed, contextual responses.`
}
