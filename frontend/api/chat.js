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
    } catch (e) { /* fall through to mock */ }
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
