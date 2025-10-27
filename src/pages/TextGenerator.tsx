import { useState } from 'react'
import { motion } from 'framer-motion'
import { Type, Copy, Download, Sparkles, RefreshCw, Check } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import SEO from '../components/SEO'
import { generateText } from '../services/openai'

type Tone = 'professional' | 'friendly' | 'creative' | 'technical'

/**
 * Text Generator - AI-powered content creation
 */
export default function TextGenerator() {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState<Tone>('professional')
  const [generatedText, setGeneratedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const tones: { value: Tone; label: string; description: string }[] = [
    { value: 'professional', label: 'Professional', description: 'Business-appropriate, formal' },
    { value: 'friendly', label: 'Friendly', description: 'Conversational, approachable' },
    { value: 'creative', label: 'Creative', description: 'Imaginative, engaging' },
    { value: 'technical', label: 'Technical', description: 'Precise, detailed' },
  ]

  const examples = [
    'Write a product description for a new AI-powered marketing tool',
    'Create a blog post introduction about digital transformation',
    'Write a social media caption for a tech company launch',
    'Generate an email template for client outreach',
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setLoading(true)
    setError('')
    setGeneratedText('')

    try {
      const text = await generateText({ prompt, tone })
      setGeneratedText(text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate text')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-content.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <PageLayout>
      <SEO
        title="AI Text Generator - M-Hub AI"
        description="Generate marketing content, blog posts, and copy with AI-powered text generation. Choose from multiple tones and styles."
        keywords={["AI text generator", "content creation", "copywriting AI", "marketing content", "blog post generator"]}
        url="https://etiditalex.github.io/M-hub/mhub-ai/text"
      />

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center mx-auto mb-6">
              <Type className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Text Generator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create compelling marketing content, blog posts, and copy in seconds
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Prompt Input */}
              <div className="card-white">
                <label className="block text-sm font-semibold text-black mb-3">
                  What would you like to create?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to generate..."
                  className="w-full h-40 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  aria-label="Content prompt"
                />
              </div>

              {/* Tone Selector */}
              <div className="card-white">
                <label className="block text-sm font-semibold text-black mb-3">
                  Select Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        tone === t.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 bg-gray-50 hover:border-primary-300'
                      }`}
                      aria-pressed={tone === t.value}
                    >
                      <div className="font-semibold text-black mb-1">
                        {t.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {t.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Generate content"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Content
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
                >
                  {error}
                </motion.div>
              )}

              {/* Example Prompts */}
              <div className="card-white">
                <h3 className="text-sm font-semibold text-black mb-3">
                  Example Prompts
                </h3>
                <div className="space-y-2">
                  {examples.map((example) => (
                    <button
                      key={example}
                      onClick={() => setPrompt(example)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg text-sm text-gray-700 hover:text-primary-700 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="card-white h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-black">
                    Generated Content
                  </h3>
                  {generatedText && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                        aria-label="Copy to clipboard"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-primary-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                        aria-label="Download text"
                        title="Download as text file"
                      >
                        <Download className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                    <RefreshCw className="w-12 h-12 animate-spin text-primary-500 mb-4" />
                    <p>Generating your content...</p>
                  </div>
                ) : generatedText ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-lg max-w-none"
                  >
                    <div className="p-4 bg-gray-50 rounded-xl whitespace-pre-wrap text-gray-800 leading-relaxed min-h-96 max-h-96 overflow-y-auto">
                      {generatedText}
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                    <Type className="w-16 h-16 mb-4 opacity-20" />
                    <p>Your generated content will appear here</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 card-white"
          >
            <h3 className="text-xl font-bold text-black mb-4">
              Tips for Better Results
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-600">
              <div>
                <div className="font-semibold text-primary-600 mb-2">
                  Be Specific
                </div>
                <p className="text-sm">
                  Include details about your target audience, key points, and desired length
                </p>
              </div>
              <div>
                <div className="font-semibold text-primary-600 mb-2">
                  Choose the Right Tone
                </div>
                <p className="text-sm">
                  Select a tone that matches your brand voice and audience expectations
                </p>
              </div>
              <div>
                <div className="font-semibold text-primary-600 mb-2">
                  Iterate & Refine
                </div>
                <p className="text-sm">
                  Try different variations and prompts to find the perfect result
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}

