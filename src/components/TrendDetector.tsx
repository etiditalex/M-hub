import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Sparkles,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'
import industryTrends from '../data/industryTrends.json'

interface TrendDetectorProps {
  compact?: boolean
  maxTrends?: number
  showNotification?: boolean
}

const TrendDetector = ({
  compact = false,
  maxTrends = 4,
  showNotification = true,
}: TrendDetectorProps) => {
  const [activeTrends, setActiveTrends] = useState(industryTrends.slice(0, maxTrends))
  const [showNotificationBanner, setShowNotificationBanner] = useState(false)
  const [latestTrend, setLatestTrend] = useState(industryTrends[0])

  useEffect(() => {
    // Simulate real-time trend updates every 10 seconds
    const interval = setInterval(() => {
      const randomTrend = industryTrends[Math.floor(Math.random() * industryTrends.length)]
      setLatestTrend(randomTrend)
      
      if (showNotification) {
        setShowNotificationBanner(true)
        setTimeout(() => setShowNotificationBanner(false), 5000)
      }

      // Update active trends
      setActiveTrends((prev) => {
        const newTrends = [...prev]
        const randomIndex = Math.floor(Math.random() * newTrends.length)
        newTrends[randomIndex] = randomTrend
        return newTrends
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [showNotification])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4" />
      case 'down':
        return <ArrowDownRight className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-primary-400 bg-primary-500/10'
      case 'down':
        return 'text-red-400 bg-red-500/10'
      default:
        return 'text-gray-400 bg-gray-500/10'
    }
  }

  if (compact) {
    return (
      <div className="relative">
        <AnimatePresence>
          {showNotificationBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-24 right-6 z-50 max-w-sm"
            >
              <div className="glass rounded-xl p-4 border-l-4 border-primary-500 shadow-2xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">
                      Trending Now: {latestTrend.keyword}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {latestTrend.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getTrendColor(
                          latestTrend.trend
                        )}`}
                      >
                        {getTrendIcon(latestTrend.trend)}
                        {Math.abs(latestTrend.changePercent)}%
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotificationBanner(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold">Industry Pulse</h3>
          </div>
          <div className="space-y-2">
            {activeTrends.map((trend) => (
              <motion.div
                key={trend.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg ${getTrendColor(trend.trend)}`}
                  >
                    {getTrendIcon(trend.trend)}
                  </span>
                  <span className="text-sm font-medium">{trend.keyword}</span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    trend.trend === 'up'
                      ? 'text-primary-400'
                      : trend.trend === 'down'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {trend.changePercent > 0 ? '+' : ''}
                  {trend.changePercent}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showNotificationBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 right-6 z-50 max-w-md"
          >
            <div className="glass rounded-xl p-6 border-l-4 border-primary-500 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-2">
                    🔥 Trending: {latestTrend.keyword}
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {latestTrend.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 ${getTrendColor(
                        latestTrend.trend
                      )}`}
                    >
                      {getTrendIcon(latestTrend.trend)}
                      {Math.abs(latestTrend.changePercent)}%
                      {latestTrend.trend === 'up' ? ' increase' : latestTrend.trend === 'down' ? ' decrease' : ' stable'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {latestTrend.relatedTopics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-white/5 text-xs rounded-full text-gray-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setShowNotificationBanner(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Industry Pulse</h3>
              <p className="text-sm text-gray-400">Real-time trend analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {activeTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold group-hover:text-primary-400 transition-colors">
                  {trend.keyword}
                </h4>
                <span
                  className={`p-2 rounded-lg ${getTrendColor(trend.trend)}`}
                >
                  {getTrendIcon(trend.trend)}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className={`text-2xl font-bold ${
                    trend.trend === 'up'
                      ? 'text-primary-400'
                      : trend.trend === 'down'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {trend.changePercent > 0 ? '+' : ''}
                  {trend.changePercent}%
                </span>
                <span className="text-sm text-gray-400">
                  {trend.trend === 'up'
                    ? 'growth'
                    : trend.trend === 'down'
                    ? 'decline'
                    : 'stable'}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{trend.description}</p>
              <div className="flex flex-wrap gap-2">
                {trend.relatedTopics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-white/5 text-xs rounded-full text-gray-400 hover:bg-white/10 transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendDetector


