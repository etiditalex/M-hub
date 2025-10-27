import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  TrendingUp,
  Target,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react'
import { predictiveEngine } from '../PredictiveEngine'
import type { Prediction } from '../types'

const RecommendationsPanel = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[]>([])

  useEffect(() => {
    // Update predictions every 30 seconds
    const updatePredictions = () => {
      const allPredictions = predictiveEngine.getAllPredictions()
      // Filter only predictions with confidence > 40
      const relevantPredictions = allPredictions.filter(p => p.confidence > 40)
      setPredictions(relevantPredictions.slice(0, 3)) // Show top 3
    }

    updatePredictions()
    const interval = setInterval(updatePredictions, 30000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
      >
        <Eye className="w-6 h-6 text-white" />
      </motion.button>
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'next_service':
        return Target
      case 'conversion_likelihood':
        return TrendingUp
      case 'exit_intent':
        return Sparkles
      default:
        return Brain
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'text-green-400'
    if (confidence >= 50) return 'text-yellow-400'
    return 'text-blue-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
    >
      <div className="glass-strong border border-primary-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <Brain className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Insights</h3>
                <p className="text-xs text-gray-400">Real-time predictions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <EyeOff className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {predictions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Learning your behavior...</p>
                    <p className="text-xs mt-1">Interact with the site to get predictions</p>
                  </div>
                ) : (
                  predictions.map((prediction, index) => {
                    const Icon = getIcon(prediction.type)
                    return (
                      <motion.div
                        key={`${prediction.type}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-light p-3 rounded-xl border border-white/5 hover:border-primary-500/30 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary-500/10 rounded-lg shrink-0">
                            <Icon className="w-4 h-4 text-primary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-300 capitalize">
                                {prediction.type.replace(/_/g, ' ')}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-16 bg-dark-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500`}
                                    style={{ width: `${prediction.confidence}%` }}
                                  />
                                </div>
                                <span className={`text-xs font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                                  {Math.round(prediction.confidence)}%
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{prediction.suggestion}</p>
                            {prediction.action && prediction.action.cta && (
                              <a
                                href={prediction.action.ctaLink}
                                className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
                              >
                                {prediction.action.cta}
                                <ChevronRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Powered by M-Hub AI</span>
                  <a
                    href="/predictive-analytics"
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    View Dashboard
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized view */}
        {!isExpanded && predictions.length > 0 && (
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-300 line-clamp-1">
                  {predictions[0].suggestion}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 flex-1 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                      style={{ width: `${predictions[0].confidence}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${getConfidenceColor(predictions[0].confidence)}`}>
                    {Math.round(predictions[0].confidence)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default RecommendationsPanel

