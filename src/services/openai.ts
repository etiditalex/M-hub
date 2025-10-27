/**
 * OpenAI API Service
 * Handles text and image generation
 */

interface TextGenerationParams {
  prompt: string
  tone?: 'professional' | 'friendly' | 'creative' | 'technical'
  maxTokens?: number
}

interface ImageGenerationParams {
  prompt: string
  size?: '256x256' | '512x512' | '1024x1024'
  n?: number
}

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * Generate text content using OpenAI
 */
export const generateText = async ({
  prompt,
  tone = 'professional',
  maxTokens = 500,
}: TextGenerationParams): Promise<string> => {
  try {
    // Add tone context to the prompt
    const toneContext = {
      professional: 'Write in a professional, business-appropriate tone.',
      friendly: 'Write in a friendly, conversational, and approachable tone.',
      creative: 'Write in a creative, imaginative, and engaging tone.',
      technical: 'Write in a technical, precise, and detailed tone.',
    }

    const enhancedPrompt = `${toneContext[tone]}\n\n${prompt}`

    // Call backend API proxy (for security)
    const response = await fetch(`${API_BASE_URL}/generate-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        maxTokens,
      }),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.text || data.content || 'No content generated.'
  } catch (error) {
    console.error('Text generation error:', error)
    
    // Fallback for demo/development
    if (import.meta.env.DEV) {
      return generateMockText(prompt, tone)
    }
    
    throw new Error('Failed to generate text. Please check your API configuration.')
  }
}

/**
 * Generate images using OpenAI DALL-E
 */
export const generateImage = async ({
  prompt,
  size = '512x512',
  n = 1,
}: ImageGenerationParams): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
        n,
      }),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Image generation error:', error)
    
    // Fallback for demo/development
    if (import.meta.env.DEV) {
      return generateMockImages(n)
    }
    
    throw new Error('Failed to generate images. Please check your API configuration.')
  }
}

/**
 * Mock text generation for development/demo
 */
const generateMockText = (prompt: string, tone: string): string => {
  const mockResponses = {
    professional: `Based on your request: "${prompt}"

I'd like to present a comprehensive analysis of this topic. In today's rapidly evolving digital landscape, it's crucial to maintain a strategic approach that aligns with both short-term objectives and long-term vision.

Key considerations include:
• Market positioning and competitive advantage
• Customer engagement and retention strategies
• ROI optimization and performance metrics
• Scalability and sustainable growth potential

By implementing these strategic initiatives, we can achieve measurable results while maintaining operational excellence and stakeholder satisfaction.`,
    
    friendly: `Hey there! So you asked about: "${prompt}"

Let me break this down for you in a way that's easy to understand! 😊

The cool thing about this is that it's actually pretty straightforward once you get the hang of it. Think of it like this - it's all about making things work better for you and your audience.

Here's what makes it awesome:
• It's super flexible and adapts to your needs
• You get results pretty quickly
• It actually makes life easier (not harder!)
• Plus, it's designed with you in mind

Hope this helps! Feel free to dive deeper into any part you're curious about! 🚀`,
    
    creative: `✨ Imagine this: "${prompt}"

Picture a world where possibilities are limitless, where innovation dances with imagination, and where every idea has the power to transform reality. This isn't just a concept—it's an invitation to explore the extraordinary.

Like a canvas waiting for bold strokes of genius, or a symphony composed of cutting-edge solutions, this represents the convergence of art and science, creativity and logic.

🎨 The Journey Begins:
• Where vision meets execution
• Where dreams become digital realities
• Where every click sparks inspiration
• Where innovation knows no bounds

The future isn't something we await—it's something we create, one brilliant idea at a time.`,
    
    technical: `Technical Analysis: "${prompt}"

SYSTEM ARCHITECTURE:
The implementation follows a modular, component-based architecture utilizing TypeScript for type safety and React for declarative UI rendering. The system employs a client-server model with RESTful API endpoints for data exchange.

TECHNICAL SPECIFICATIONS:
• Framework: React 18.x with TypeScript 5.x
• State Management: React Hooks (useState, useEffect, useContext)
• Styling: Tailwind CSS with custom utility classes
• Build Tool: Vite 5.x for optimized bundling
• Deployment: Static hosting via GitHub Pages

PERFORMANCE METRICS:
- Initial Load Time: < 2.5s
- Time to Interactive (TTI): < 3s
- Bundle Size: Optimized chunks < 500KB
- Lighthouse Score: 95+ (Performance, Accessibility, SEO)

ERROR HANDLING:
Implements try-catch blocks with fallback mechanisms and user-friendly error messages. All async operations include timeout handling and retry logic.`,
  }

  return mockResponses[tone as keyof typeof mockResponses] || mockResponses.professional
}

/**
 * Mock image generation for development/demo
 */
const generateMockImages = (count: number): string[] => {
  // Return placeholder images
  return Array.from({ length: count }, (_, i) => 
    `https://via.placeholder.com/512/4fd573/000000?text=AI+Generated+Image+${i + 1}`
  )
}

export default {
  generateText,
  generateImage,
}

