import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Zap,
  DollarSign,
  Activity,
  Award,
  AlertCircle,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  BarChart3,
  PieChart,
  Sparkles,
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'
import SEO from '../components/SEO'
import {
  calculateAttribution,
  batchPredict,
  generateInsights,
  type Lead,
} from '../services/predictiveEngine'

// Mock lead data
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Kimani',
    email: 'sarah.kimani@safaricom.co.ke',
    company: 'Safaricom PLC',
    industry: 'Fintech',
    companySize: 'Enterprise (500+)',
    budget: '$50k+',
    engagementScore: 9.5,
    source: 'LinkedIn Campaign',
    createdAt: '2025-10-25T10:30:00Z',
    touchpoints: [
      { id: '1', type: 'website_visit', timestamp: '2025-10-20T14:00:00Z', page: '/services', value: 5 },
      { id: '2', type: 'blog_read', timestamp: '2025-10-21T09:15:00Z', page: '/blog/fintech-marketing-kenya', duration: 420, value: 8 },
      { id: '3', type: 'content_download', timestamp: '2025-10-22T11:30:00Z', page: '/resources/fintech-guide', value: 12 },
      { id: '4', type: 'email_open', timestamp: '2025-10-23T08:00:00Z', campaign: 'Fintech Solutions', value: 6 },
      { id: '5', type: 'email_click', timestamp: '2025-10-23T08:05:00Z', campaign: 'Fintech Solutions', value: 10 },
      { id: '6', type: 'whatsapp_contact', timestamp: '2025-10-25T10:30:00Z', value: 20 },
    ],
  },
  {
    id: '2',
    name: 'John Mwangi',
    email: 'j.mwangi@eastafricatech.com',
    company: 'East Africa Tech Hub',
    industry: 'Technology',
    companySize: 'Medium (50-100)',
    budget: '$20k-$50k',
    engagementScore: 7.8,
    source: 'Google Search',
    createdAt: '2025-10-22T15:00:00Z',
    touchpoints: [
      { id: '7', type: 'website_visit', timestamp: '2025-10-22T15:00:00Z', page: '/', value: 5 },
      { id: '8', type: 'website_visit', timestamp: '2025-10-22T15:10:00Z', page: '/services', value: 5 },
      { id: '9', type: 'form_submit', timestamp: '2025-10-24T14:00:00Z', page: '/contact', value: 18 },
      { id: '10', type: 'email_open', timestamp: '2025-10-25T09:00:00Z', campaign: 'Welcome Series', value: 6 },
    ],
  },
  {
    id: '3',
    name: 'Amina Hassan',
    email: 'amina@coastcommerce.co.ke',
    company: 'Coast Commerce Ltd',
    industry: 'E-commerce',
    companySize: 'Small (10-50)',
    budget: '$10k-$20k',
    engagementScore: 6.2,
    source: 'Facebook Ads',
    createdAt: '2025-10-18T12:00:00Z',
    touchpoints: [
      { id: '11', type: 'social_engagement', timestamp: '2025-10-18T12:00:00Z', value: 4 },
      { id: '12', type: 'website_visit', timestamp: '2025-10-19T10:00:00Z', page: '/', value: 5 },
      { id: '13', type: 'blog_read', timestamp: '2025-10-20T14:30:00Z', page: '/blog/social-media-roi', duration: 180, value: 8 },
      { id: '14', type: 'email_open', timestamp: '2025-10-24T08:00:00Z', campaign: 'E-commerce Guide', value: 6 },
    ],
  },
  {
    id: '4',
    name: 'David Omondi',
    email: 'domondi@nairobistartup.ke',
    company: 'Nairobi Startup Hub',
    industry: 'Technology',
    companySize: 'Startup (1-10)',
    budget: '$5k-$10k',
    engagementScore: 8.5,
    source: 'Referral',
    createdAt: '2025-10-23T09:00:00Z',
    touchpoints: [
      { id: '15', type: 'website_visit', timestamp: '2025-10-23T09:00:00Z', page: '/', value: 5 },
      { id: '16', type: 'website_visit', timestamp: '2025-10-23T09:15:00Z', page: '/services', value: 5 },
      { id: '17', type: 'website_visit', timestamp: '2025-10-23T09:30:00Z', page: '/about', value: 5 },
      { id: '18', type: 'demo_request', timestamp: '2025-10-25T11:00:00Z', value: 22 },
    ],
  },
  {
    id: '5',
    name: 'Grace Wanjiku',
    email: 'g.wanjiku@healthplus.co.ke',
    company: 'HealthPlus Kenya',
    industry: 'Healthcare',
    companySize: 'Large (100-500)',
    budget: '$20k-$50k',
    engagementScore: 7.0,
    source: 'LinkedIn Campaign',
    createdAt: '2025-10-19T14:00:00Z',
    touchpoints: [
      { id: '19', type: 'website_visit', timestamp: '2025-10-19T14:00:00Z', page: '/', value: 5 },
      { id: '20', type: 'blog_read', timestamp: '2025-10-21T10:00:00Z', page: '/blog/marketing-challenges-kenya', duration: 300, value: 8 },
      { id: '21', type: 'content_download', timestamp: '2025-10-23T15:00:00Z', page: '/resources/case-study', value: 12 },
    ],
  },
]

const PredictiveAnalytics = () => {
  const [selectedLead, setSelectedLead] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'score' | 'clv' | 'urgency'>('score')

  // Calculate predictions for all leads
  const predictions = useMemo(() => batchPredict(mockLeads), [])

  // Generate insights
  const insights = useMemo(() => generateInsights(predictions), [predictions])

  // Sort predictions
  const sortedPredictions = useMemo(() => {
    return [...predictions].sort((a, b) => {
      if (sortBy === 'score') return b.conversionProbability - a.conversionProbability
      if (sortBy === 'clv') return b.predictedCLV - a.predictedCLV
      // urgency
      const urgencyOrder = { High: 3, Medium: 2, Low: 1 }
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
    })
  }, [predictions, sortBy])

  const getLeadById = (id: string) => mockLeads.find(l => l.id === id)
  const getPredictionForLead = (id: string) => predictions.find(p => p.leadId === id)

  const selectedLeadData = selectedLead ? getLeadById(selectedLead) : null
  const selectedPrediction = selectedLead ? getPredictionForLead(selectedLead) : null

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Hot': return 'text-red-500'
      case 'Warm': return 'text-orange-500'
      case 'Cold': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <DashboardLayout>
      <SEO
        title="Predictive Analytics - AI-Powered Lead Scoring | M-Hub"
        description="AI-powered predictive targeting with lead scoring, CLV prediction, and multi-touch attribution for reducing CAC by 45%."
        url="https://etiditalex.github.io/M-hub/#/predictive-analytics"
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
              <Target className="w-8 h-8 text-primary-500" />
              Predictive Analytics
            </h1>
            <p className="text-gray-400">
              AI identifies high-value prospects • Reduces CAC 45%
            </p>
          </div>
          <div className="flex items-center gap-2 glass-strong px-4 py-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium">ML-Powered</span>
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="w-8 h-8 text-red-500" />
                  <span className="text-2xl font-bold text-red-500">{insights.hotLeads}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Hot Leads</h3>
                <p className="text-sm text-gray-400">70%+ conversion probability</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-500">{insights.warmLeads}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Warm Leads</h3>
                <p className="text-sm text-gray-400">45-70% conversion probability</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-primary-500" />
                  <span className="text-2xl font-bold text-primary-500">
                    KSh {(insights.avgCLV / 1000).toFixed(0)}K
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Avg Predicted CLV</h3>
                <p className="text-sm text-gray-400">Customer Lifetime Value</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold text-green-500">
                    {insights.avgCACReduction}%
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">CAC Reduction</h3>
                <p className="text-sm text-gray-400">Customer Acquisition Cost</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* AI Insights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <Award className="w-6 h-6 text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">🎯 AI Recommendation</h3>
                <p className="text-gray-300 mb-3">
                  Focus on <strong className="text-primary-400">{insights.hotLeads} hot leads</strong> with{' '}
                  <strong className="text-green-400">{insights.highUrgencyCount} high-urgency</strong> prospects.
                  Potential revenue: <strong className="text-accent-400">KSh {(insights.totalPotentialRevenue / 1000000).toFixed(1)}M</strong>
                </p>
                <div className="text-sm text-gray-400">
                  💡 By prioritizing high-scoring leads, reduce wasted spend and improve conversion rates by up to 45%
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Lead Scoring Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Lead Predictions</h2>
                <p className="text-sm text-gray-400">AI-powered scoring and targeting</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('score')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'score' ? 'bg-primary-500 text-white' : 'glass text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Score
                </button>
                <button
                  onClick={() => setSortBy('clv')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'clv' ? 'bg-primary-500 text-white' : 'glass text-gray-300 hover:bg-white/10'
                  }`}
                >
                  CLV
                </button>
                <button
                  onClick={() => setSortBy('urgency')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'urgency' ? 'bg-primary-500 text-white' : 'glass text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Urgency
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {sortedPredictions.map((prediction, index) => {
                const lead = getLeadById(prediction.leadId)!
                const isSelected = selectedLead === prediction.leadId

                return (
                  <motion.div
                    key={prediction.leadId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedLead(isSelected ? null : prediction.leadId)}
                    className={`glass-light p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
                      isSelected ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Lead Quality Badge */}
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(prediction.leadQuality)}`}>
                          <Zap className="w-4 h-4" />
                          {prediction.leadQuality}
                        </div>

                        {/* Lead Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold">{lead.name}</h3>
                            <span className="text-sm text-gray-400">{lead.company}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{lead.industry}</span>
                            <span>•</span>
                            <span>{lead.companySize}</span>
                            <span>•</span>
                            <span className={`px-2 py-0.5 rounded border ${getUrgencyColor(prediction.urgency)}`}>
                              {prediction.urgency} Urgency
                            </span>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-400">
                              {prediction.conversionProbability}%
                            </div>
                            <div className="text-xs text-gray-400">Conversion</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                              KSh {(prediction.predictedCLV / 1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-gray-400">Predicted CLV</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent-400">
                              {prediction.cacReduction}%
                            </div>
                            <div className="text-xs text-gray-400">CAC ↓</div>
                          </div>
                        </div>

                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isSelected && selectedPrediction && selectedLeadData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-white/10 space-y-6"
                      >
                        {/* Recommended Action */}
                        <div className="glass-strong p-4 rounded-xl">
                          <div className="flex items-center gap-3 mb-3">
                            <AlertCircle className="w-5 h-5 text-primary-500" />
                            <h4 className="font-semibold">Recommended Action</h4>
                          </div>
                          <p className="text-lg mb-4">{selectedPrediction.recommendedAction}</p>
                          <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                              <Phone className="w-4 h-4" />
                              Call Now
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 glass hover:bg-white/10 rounded-lg transition-colors">
                              <Mail className="w-4 h-4" />
                              Send Email
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 glass hover:bg-white/10 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              WhatsApp
                            </button>
                          </div>
                        </div>

                        {/* Scoring Factors */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary-500" />
                            Scoring Factors
                          </h4>
                          <div className="grid grid-cols-5 gap-4">
                            {Object.entries(selectedPrediction.factors).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="relative h-24 w-full mb-2">
                                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg"
                                    style={{ height: `${value}%` }}
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold">{Math.round(value)}</span>
                                  </div>
                                </div>
                                <div className="text-sm capitalize text-gray-400">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Attribution Analysis */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-primary-500" />
                            Multi-Touch Attribution
                          </h4>
                          <div className="space-y-2">
                            {calculateAttribution(selectedLeadData.touchpoints).map((attr) => (
                              <div key={attr.touchpointId} className="flex items-center gap-4 glass-light p-3 rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium capitalize">
                                      {attr.touchpointType.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 glass rounded text-gray-400">
                                      {attr.contribution}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {new Date(attr.timestamp).toLocaleDateString()} • ROI: {attr.roi}%
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary-400">
                                    {attr.attributionValue.toFixed(1)}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary-500" />
                            Engagement Timeline
                          </h4>
                          <div className="space-y-3">
                            {selectedLeadData.touchpoints.map((tp, idx) => (
                              <div key={tp.id} className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  idx === selectedLeadData.touchpoints.length - 1 ? 'bg-primary-500' : 'bg-gray-500'
                                }`} />
                                <div className="flex-1">
                                  <div className="font-medium capitalize">
                                    {tp.type.replace(/_/g, ' ')}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {new Date(tp.timestamp).toLocaleString()}
                                  </div>
                                </div>
                                <div className="text-sm text-primary-400">
                                  Value: {tp.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default PredictiveAnalytics

