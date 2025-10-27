/**
 * Vercel Serverless Function for OpenAI Image Generation (DALL-E)
 * This securely handles API calls without exposing your API key
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, size, n } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    // Validate size
    const validSizes = ['256x256', '512x512', '1024x1024']
    const imageSize = validSizes.includes(size) ? size : '1024x1024'

    // Call OpenAI DALL-E API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        size: imageSize,
        n: n || 1,
        quality: 'standard',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API Error:', error)
      return res.status(response.status).json({
        error: error.error?.message || 'Failed to generate image',
      })
    }

    const data = await response.json()
    const images = data.data.map(img => img.url)

    res.status(200).json({ images })
  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

