import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, User, Bot, Home, Globe, ExternalLink, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import mockResponses from '../data/mockResponses.json'
import { webSearchService, SearchResult } from '../services/webSearch'

// Lazy load accessibility component
const SignLanguageMode = lazy(() => import('../accessibility/SignLanguageMode'))

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  sources?: SearchResult[]
  isResearch?: boolean
}

const AskMHub = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: mockResponses.greetings[0],
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [researchMode, setResearchMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = async (userMessage: string, useResearch: boolean = false): Promise<{ text: string; sources?: SearchResult[] }> => {
    const lowerMessage = userMessage.toLowerCase()

    // Check if user is asking for research/data/statistics
    const needsResearch = useResearch || 
      lowerMessage.includes('research') ||
      lowerMessage.includes('data') ||
      lowerMessage.includes('statistic') ||
      lowerMessage.includes('latest') ||
      lowerMessage.includes('current') ||
      lowerMessage.includes('trend') ||
      lowerMessage.includes('news') ||
      lowerMessage.includes('what is') ||
      lowerMessage.includes('tell me about')

    // If research is needed, perform web search
    if (needsResearch) {
      try {
        const results = await webSearchService.search(userMessage, 5)
        
        if (results.length > 0) {
          let responseText = `Based on recent research, here's what I found:\n\n`
          
          // Add main insights from top 3 results
          results.slice(0, 3).forEach((result, index) => {
            responseText += `${index + 1}. **${result.title}**\n${result.description}\n\n`
          })
          
          responseText += `I've found ${results.length} sources to help answer your question. Click on the sources below to learn more.`
          
          return { text: responseText, sources: results }
        }
      } catch (error) {
        console.error('Research error:', error)
        // Fall through to standard responses
      }
    }

    // Standard response logic
    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return {
        text: mockResponses.greetings[
          Math.floor(Math.random() * mockResponses.greetings.length)
        ]
      }
    }

    if (lowerMessage.includes('service') || lowerMessage.includes('what do you')) {
      return {
        text: mockResponses.services[
          Math.floor(Math.random() * mockResponses.services.length)
        ]
      }
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return {
        text: mockResponses.pricing[
          Math.floor(Math.random() * mockResponses.pricing.length)
        ]
      }
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return {
        text: mockResponses.contact[
          Math.floor(Math.random() * mockResponses.contact.length)
        ]
      }
    }

    if (
      lowerMessage.includes('portfolio') ||
      lowerMessage.includes('project') ||
      lowerMessage.includes('work')
    ) {
      return {
        text: mockResponses.portfolio[
          Math.floor(Math.random() * mockResponses.portfolio.length)
        ]
      }
    }

    if (
      lowerMessage.includes('technology') ||
      lowerMessage.includes('tech') ||
      lowerMessage.includes('stack')
    ) {
      return {
        text: mockResponses.technology[
          Math.floor(Math.random() * mockResponses.technology.length)
        ]
      }
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('you')) {
      return {
        text: mockResponses.ai[Math.floor(Math.random() * mockResponses.ai.length)]
      }
    }

    return {
      text: mockResponses.default[
        Math.floor(Math.random() * mockResponses.default.length)
      ] + (useResearch ? '\n\nTip: Try asking me about Kenya fintech, marketing trends, or social media statistics!' : '')
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Get AI response with optional research
    const response = await getAIResponse(currentInput, researchMode)

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: 'ai',
      timestamp: new Date(),
      sources: response.sources,
      isResearch: researchMode && !!response.sources,
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = researchMode ? [
    'What is the latest fintech news in Kenya?',
    'Tell me about social media marketing trends',
    'What are current digital marketing statistics?',
    'Research AI in marketing automation',
  ] : [
    'What services do you offer?',
    'Tell me about your pricing',
    'How can I contact you?',
    'What technologies do you use?',
  ]

  const handleSignLanguageMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const response = await getAIResponse(message, researchMode)
    
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: 'ai',
      timestamp: new Date(),
      sources: response.sources,
      isResearch: researchMode && !!response.sources,
    }
    
    setMessages((prev) => [...prev, aiResponse])
    setIsTyping(false)
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Header */}
      <header className="glass-strong border-b border-white/10 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 group">
                <Sparkles className="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="text-2xl font-display font-bold gradient-text">
                  M-Hub
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {/* Research Mode Toggle */}
              <button
                onClick={() => setResearchMode(!researchMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  researchMode
                    ? 'bg-primary-500/20 border-2 border-primary-500 text-primary-400'
                    : 'bg-white/5 border-2 border-white/10 text-gray-400 hover:border-white/20'
                }`}
                title="Enable web research mode"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {researchMode ? 'Research ON' : 'Research OFF'}
                </span>
              </button>
              <Link to="/" className="btn-ghost flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 container-custom py-8 flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
          {/* Research Mode Banner */}
          {researchMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-primary-400 mb-1">
                    Research Mode Enabled
                  </h3>
                  <p className="text-xs text-gray-300">
                    M-Hub will search the web for real-time data and provide cited sources. 
                    Perfect for Kenya fintech trends, marketing statistics, and industry insights.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar mb-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                          : 'bg-gradient-to-br from-accent-500 to-accent-600'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-6 py-4 ${
                        message.sender === 'user'
                          ? 'bg-primary-500/20 border border-primary-500/30'
                          : 'glass border border-white/10'
                      }`}
                    >
                      {message.isResearch && (
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
                          <Search className="w-4 h-4 text-primary-400" />
                          <span className="text-xs text-primary-400 font-medium">
                            Web Research Result
                          </span>
                        </div>
                      )}
                      <p className="text-gray-100 whitespace-pre-wrap">
                        {message.text}
                      </p>
                      
                      {/* Display sources if available */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-400 mb-2 font-medium">
                            Sources:
                          </p>
                          <div className="space-y-2">
                            {message.sources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                              >
                                <ExternalLink className="w-3 h-3 text-primary-400 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-200 group-hover:text-primary-400 transition-colors line-clamp-1">
                                    {source.title}
                                  </p>
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    {source.url}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="glass border border-white/10 rounded-2xl px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <p className="text-gray-400 text-sm mb-3">Suggested questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="text-left p-4 glass rounded-xl border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <p className="text-sm text-gray-300">{question}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="glass-strong border border-white/20 rounded-2xl p-4">
            <div className="flex items-end space-x-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about M-Hub..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none max-h-32"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="btn-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            M-Hub AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </main>

      {/* Sign-Language Accessibility Mode */}
      <Suspense fallback={null}>
        <SignLanguageMode onSendMessage={handleSignLanguageMessage} />
      </Suspense>
    </div>
  )
}

export default AskMHub



