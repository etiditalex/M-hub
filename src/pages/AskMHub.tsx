import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, User, Bot, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import mockResponses from '../data/mockResponses.json'

// Lazy load accessibility component
const SignLanguageMode = lazy(() => import('../accessibility/SignLanguageMode'))

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return mockResponses.greetings[
        Math.floor(Math.random() * mockResponses.greetings.length)
      ]
    }

    if (lowerMessage.includes('service') || lowerMessage.includes('what do you')) {
      return mockResponses.services[
        Math.floor(Math.random() * mockResponses.services.length)
      ]
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return mockResponses.pricing[
        Math.floor(Math.random() * mockResponses.pricing.length)
      ]
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return mockResponses.contact[
        Math.floor(Math.random() * mockResponses.contact.length)
      ]
    }

    if (
      lowerMessage.includes('portfolio') ||
      lowerMessage.includes('project') ||
      lowerMessage.includes('work')
    ) {
      return mockResponses.portfolio[
        Math.floor(Math.random() * mockResponses.portfolio.length)
      ]
    }

    if (
      lowerMessage.includes('technology') ||
      lowerMessage.includes('tech') ||
      lowerMessage.includes('stack')
    ) {
      return mockResponses.technology[
        Math.floor(Math.random() * mockResponses.technology.length)
      ]
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('you')) {
      return mockResponses.ai[Math.floor(Math.random() * mockResponses.ai.length)]
    }

    return mockResponses.default[
      Math.floor(Math.random() * mockResponses.default.length)
    ]
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
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(inputValue),
      sender: 'ai',
      timestamp: new Date(),
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

  const suggestedQuestions = [
    'What services do you offer?',
    'Tell me about your pricing',
    'How can I contact you?',
    'What technologies do you use?',
  ]

  const handleSignLanguageMessage = (message: string) => {
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
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(message),
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
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
            <Link to="/" className="btn-ghost flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 container-custom py-8 flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
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
                      <p className="text-gray-100 whitespace-pre-wrap">
                        {message.text}
                      </p>
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



