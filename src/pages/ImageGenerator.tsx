import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Sparkles, RefreshCw, Download, Zap } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import SEO from '../components/SEO'
import { generateImage } from '../services/openai'

/**
 * Animated loading spinner with Three.js-style neon glow
 */
function NeonSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-4 border-primary-500/20 border-t-primary-500"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary-400/20 border-b-primary-400"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary-500 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

/**
 * Image Generator - AI-powered image creation
 */
export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState<'256x256' | '512x512' | '1024x1024'>('512x512')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sizes = [
    { value: '256x256' as const, label: 'Small', description: '256x256px' },
    { value: '512x512' as const, label: 'Medium', description: '512x512px' },
    { value: '1024x1024' as const, label: 'Large', description: '1024x1024px' },
  ]

  const examples = [
    'A futuristic office space with holographic displays',
    'Abstract digital marketing concept with vibrant colors',
    'Modern tech startup team in a creative workspace',
    'Cyberpunk-style data visualization dashboard',
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description')
      return
    }

    setLoading(true)
    setError('')
    setGeneratedImages([])

    try {
      const images = await generateImage({ prompt, size, n: 1 })
      setGeneratedImages(images)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate images')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (imageUrl: string, index: number) => {
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = `mhub-ai-image-${index + 1}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <PageLayout>
      <SEO
        title="AI Image Generator - M-Hub AI"
        description="Generate stunning visuals and marketing graphics from text descriptions using AI. DALL-E powered image creation."
        keywords={["AI image generator", "DALL-E", "image creation", "visual content", "marketing graphics"]}
        url="https://etiditalex.github.io/M-hub/mhub-ai/image"
      />

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Image Generator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create stunning visuals from text descriptions
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="card-white max-w-4xl mx-auto">
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-3">
                  Describe your image
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic digital marketing dashboard with neon colors..."
                  className="w-full h-32 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  aria-label="Image description"
                />
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-3">
                  Image Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSize(s.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        size === s.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 bg-gray-50 hover:border-primary-300'
                      }`}
                      aria-pressed={size === s.value}
                    >
                      <div className="font-semibold text-black mb-1">
                        {s.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {s.description}
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
                aria-label="Generate image"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Image
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
                >
                  {error}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Output Section */}
          <div className="mb-12">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-white text-center"
                >
                  <NeonSpinner />
                  <p className="text-gray-600">Creating your image...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    This may take 10-30 seconds
                  </p>
                </motion.div>
              )}

              {!loading && generatedImages.length > 0 && (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {generatedImages.map((imageUrl, index) => (
                    <div key={index} className="card-white group">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={imageUrl}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => handleDownload(imageUrl, index)}
                            className="btn-primary"
                            aria-label="Download image"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Image {index + 1} • {size}
                        </span>
                        <button
                          onClick={() => handleDownload(imageUrl, index)}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {!loading && generatedImages.length === 0 && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-white text-center py-20"
                >
                  <ImageIcon className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                  <p className="text-gray-400 text-lg">
                    Your generated images will appear here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Example Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-white"
          >
            <h3 className="text-lg font-semibold text-black mb-4">
              Example Prompts
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {examples.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="text-left p-4 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg text-sm text-gray-700 hover:text-primary-700 transition-colors"
                >
                  <Zap className="w-4 h-4 inline mr-2 text-primary-500" />
                  {example}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 card-white"
          >
            <h3 className="text-xl font-bold text-black mb-4">
              Tips for Better Images
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-600">
              <div>
                <div className="font-semibold text-primary-600 mb-2">
                  Be Descriptive
                </div>
                <p className="text-sm">
                  Include colors, style, mood, and key elements you want in the image
                </p>
              </div>
              <div>
                <div className="font-semibold text-primary-600 mb-2">
                  Specify Style
                </div>
                <p className="text-sm">
                  Mention artistic styles like "photorealistic", "minimalist", or "abstract"
                </p>
              </div>
              <div>
                <div className="font-semibold text-primary-600 mb-2">
                  Add Context
                </div>
                <p className="text-sm">
                  Include setting, lighting, and perspective for more accurate results
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}

