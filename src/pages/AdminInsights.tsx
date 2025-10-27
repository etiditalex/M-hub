import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Activity,
  Users,
  Clock,
  TrendingUp,
  Target,
  BarChart3,
  Eye,
  Power,
  RefreshCw,
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'
import SEO from '../components/SEO'
import { predictiveEngine } from '../predictiveAI/PredictiveEngine'
import dataCollector from '../predictiveAI/DataCollector'
import type { Prediction, EngagementMetrics } from '../predictiveAI/types'

const AdminInsights = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(true)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setPredictions(predictiveEngine.getAllPredictions())
      setMetrics(predictiveEngine.getEngagementMetrics())
      setIsRefreshing(false)
    }, 500)
  }

  useEffect(() => {
    refreshData()
    const interval = setInterval(refreshData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const COLORS = ['#38bdf8', '#f59e0b', '#22c55e', '#ef4444', '#a855f7']

  // Prepare chart data
  const peakHoursData = metrics?.peakHours.map(h => ({
    hour: `${h.hour}:00`,
    activity: h.activity,
  })) || []

  const topPagesData = metrics?.topPages.map(p => ({
    name: p.page.split('/').pop() || 'Home',
    visits: p.visits,
  })) || []

  const topServicesData = metrics?.topServices.map(s => ({
    name: s.service,
    views: s.views,
  })) || []

  const predictionConfidenceData = predictions.map(p => ({
    name: p.type.replace(/_/g, ' '),
    confidence: Math.round(p.confidence),
  }))

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${minutes}m ${secs}s`
  }

  return (
    <DashboardLayout>
      <SEO
        title="Admin Insights - Predictive AI Analytics | M-Hub"
        description="Real-time predictive analytics dashboard with AI-powered insights, user behavior tracking, and engagement metrics."
        url="https://etiditalex.github.io/M-hub/#/admin/insights"
      />

      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-semibold mb-2 flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary-500" />
              Predictive AI Insights
            </h1>
            <p className="text-gray-400">
              Real-time behavior analysis and intelligent predictions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className={`p-3 glass hover:bg-white/10 rounded-xl transition-all ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <RefreshCw className="w-5 h-5 text-primary-400" />
            </button>
            <button
              onClick={() => setIsAIEnabled(!isAIEnabled)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                isAIEnabled
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'glass text-gray-400'
              }`}
            >
              <Power className="w-5 h-5" />
              <span className="text-sm font-medium">
                AI {isAIEnabled ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-primary-500" />
                  <span className="text-2xl font-bold text-primary-400">
                    {metrics?.totalSessions || 0}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Total Sessions</h3>
                <p className="text-sm text-gray-400">Unique user visits</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-accent-500" />
                  <span className="text-2xl font-bold text-accent-400">
                    {metrics ? formatDuration(metrics.avgSessionDuration) : '0m 0s'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Avg Session</h3>
                <p className="text-sm text-gray-400">Duration per visit</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold text-green-400">
                    {metrics ? metrics.avgActionsPerSession.toFixed(1) : '0'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Engagement</h3>
                <p className="text-sm text-gray-400">Actions per session</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                  <span className="text-2xl font-bold text-purple-400">
                    {metrics ? metrics.conversionRate.toFixed(1) : '0'}%
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Conversion</h3>
                <p className="text-sm text-gray-400">Form submission rate</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* AI Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary-500" />
                  Live Predictions
                </h2>
                <p className="text-sm text-gray-400">AI-powered behavior predictions</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg">
                <Eye className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-gray-300">{predictions.length} Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map((prediction, index) => (
                <motion.div
                  key={`${prediction.type}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-light p-4 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold capitalize">
                      {prediction.type.replace(/_/g, ' ')}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-primary-400">
                        {Math.round(prediction.confidence)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{prediction.suggestion}</p>
                  {prediction.action && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        prediction.action.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        prediction.action.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {prediction.action.priority} priority
                      </span>
                      <span className="text-gray-400">{prediction.action.type}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Peak Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-500" />
                Peak Activity Hours
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      background: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ fill: '#38bdf8', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Prediction Confidence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-accent-500" />
                Prediction Confidence
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={predictionConfidenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      background: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="confidence" fill="#38bdf8" radius={[8, 8, 0, 0]}>
                    {predictionConfidenceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary-500" />
                Most Visited Pages
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={topPagesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visits"
                  >
                    {topPagesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Top Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-accent-500" />
                Popular Services
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topServicesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" width={150} />
                  <Tooltip
                    contentStyle={{
                      background: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="views" fill="#f59e0b" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <Activity className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Data Management</h3>
                <p className="text-gray-300 mb-4">
                  All data is stored locally in your browser for privacy. Clear data to reset tracking.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure? This will clear all tracking data.')) {
                      dataCollector.clearData()
                      refreshData()
                      alert('All data cleared!')
                    }
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-medium"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default AdminInsights

