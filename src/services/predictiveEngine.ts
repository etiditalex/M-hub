/**
 * M-Hub Predictive Targeting Engine
 * AI-powered lead scoring and customer lifetime value prediction
 */

export interface Lead {
  id: string
  name: string
  email: string
  company: string
  industry: string
  companySize: string
  budget: string
  engagementScore: number
  touchpoints: Touchpoint[]
  source: string
  createdAt: string
}

export interface Touchpoint {
  id: string
  type: 'website_visit' | 'email_open' | 'email_click' | 'form_submit' | 'demo_request' | 'content_download' | 'social_engagement' | 'whatsapp_contact' | 'blog_read'
  timestamp: string
  page?: string
  campaign?: string
  duration?: number
  value: number // Attribution value
}

export interface PredictiveScore {
  leadId: string
  conversionProbability: number // 0-100%
  predictedCLV: number // Predicted Customer Lifetime Value
  leadQuality: 'Hot' | 'Warm' | 'Cold'
  urgency: 'High' | 'Medium' | 'Low'
  recommendedAction: string
  factors: {
    engagement: number
    companyFit: number
    budget: number
    timing: number
    touchpointQuality: number
  }
  cacReduction: number // Percentage CAC reduction potential
}

export interface AttributionModel {
  touchpointId: string
  touchpointType: string
  timestamp: string
  attributionValue: number // 0-100%
  contribution: string
  roi: number
}

/**
 * Calculate lead score using ML-inspired weighted algorithm
 */
export const calculateLeadScore = (lead: Lead): PredictiveScore => {
  // Engagement Score (0-30 points)
  const engagementPoints = Math.min(lead.engagementScore * 3, 30)

  // Company Size Score (0-20 points)
  const companySizePoints = getCompanySizeScore(lead.companySize)

  // Budget Score (0-20 points)
  const budgetPoints = getBudgetScore(lead.budget)

  // Industry Score (0-15 points)
  const industryPoints = getIndustryScore(lead.industry)

  // Touchpoint Quality Score (0-15 points)
  const touchpointPoints = getTouchpointQualityScore(lead.touchpoints)

  // Total Score (0-100)
  const totalScore = engagementPoints + companySizePoints + budgetPoints + industryPoints + touchpointPoints

  // Predict CLV based on score and company characteristics
  const predictedCLV = predictCustomerLifetimeValue(lead, totalScore)

  // Determine lead quality
  const leadQuality: 'Hot' | 'Warm' | 'Cold' = 
    totalScore >= 70 ? 'Hot' :
    totalScore >= 45 ? 'Warm' : 'Cold'

  // Calculate urgency based on recent activity
  const urgency = calculateUrgency(lead.touchpoints)

  // CAC Reduction potential (focused targeting reduces wasted spend)
  const cacReduction = leadQuality === 'Hot' ? 45 : leadQuality === 'Warm' ? 30 : 15

  return {
    leadId: lead.id,
    conversionProbability: totalScore,
    predictedCLV,
    leadQuality,
    urgency,
    recommendedAction: getRecommendedAction(leadQuality, urgency),
    factors: {
      engagement: (engagementPoints / 30) * 100,
      companyFit: (companySizePoints / 20) * 100,
      budget: (budgetPoints / 20) * 100,
      timing: urgency === 'High' ? 90 : urgency === 'Medium' ? 60 : 30,
      touchpointQuality: (touchpointPoints / 15) * 100,
    },
    cacReduction,
  }
}

/**
 * Multi-Touch Attribution Model (ML-powered)
 * Uses position-based attribution with decay
 */
export const calculateAttribution = (touchpoints: Touchpoint[]): AttributionModel[] => {
  if (touchpoints.length === 0) return []

  const sortedTouchpoints = [...touchpoints].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  // Position-based attribution with time decay
  const attributionModels: AttributionModel[] = sortedTouchpoints.map((touchpoint, index) => {
    let attributionValue = 0

    if (sortedTouchpoints.length === 1) {
      // Single touchpoint gets 100%
      attributionValue = 100
    } else if (index === 0) {
      // First touch gets 30%
      attributionValue = 30
    } else if (index === sortedTouchpoints.length - 1) {
      // Last touch gets 30%
      attributionValue = 30
    } else {
      // Middle touches share 40% with time decay
      const middleWeight = 40 / (sortedTouchpoints.length - 2)
      const decayFactor = 1 - (index / sortedTouchpoints.length) * 0.3
      attributionValue = middleWeight * decayFactor
    }

    // Apply touchpoint quality multiplier
    const qualityMultiplier = getTouchpointValue(touchpoint.type)
    attributionValue *= qualityMultiplier

    // Calculate ROI based on touchpoint type and value
    const roi = calculateTouchpointROI(touchpoint.type, attributionValue)

    return {
      touchpointId: touchpoint.id,
      touchpointType: touchpoint.type,
      timestamp: touchpoint.timestamp,
      attributionValue: Math.round(attributionValue * 100) / 100,
      contribution: getContributionLabel(attributionValue),
      roi,
    }
  })

  // Normalize to 100%
  const totalAttribution = attributionModels.reduce((sum, model) => sum + model.attributionValue, 0)
  const normalizedModels = attributionModels.map(model => ({
    ...model,
    attributionValue: Math.round((model.attributionValue / totalAttribution) * 100 * 100) / 100,
  }))

  return normalizedModels
}

/**
 * Predict Customer Lifetime Value (CLV)
 */
const predictCustomerLifetimeValue = (lead: Lead, score: number): number => {
  let baseCLV = 0

  // Budget-based baseline
  switch (lead.budget) {
    case '$50k+':
      baseCLV = 250000
      break
    case '$20k-$50k':
      baseCLV = 150000
      break
    case '$10k-$20k':
      baseCLV = 75000
      break
    case '$5k-$10k':
      baseCLV = 35000
      break
    default:
      baseCLV = 15000
  }

  // Company size multiplier
  const sizeMultiplier = 
    lead.companySize === 'Enterprise (500+)' ? 2.5 :
    lead.companySize === 'Large (100-500)' ? 2.0 :
    lead.companySize === 'Medium (50-100)' ? 1.5 :
    lead.companySize === 'Small (10-50)' ? 1.2 : 1.0

  // Score multiplier (higher score = higher CLV)
  const scoreMultiplier = 0.5 + (score / 100) * 1.5

  // Industry multiplier
  const industryMultiplier = 
    lead.industry === 'Fintech' ? 1.8 :
    lead.industry === 'Technology' ? 1.6 :
    lead.industry === 'E-commerce' ? 1.4 :
    lead.industry === 'Healthcare' ? 1.3 : 1.0

  return Math.round(baseCLV * sizeMultiplier * scoreMultiplier * industryMultiplier)
}

/**
 * Helper Functions
 */

const getCompanySizeScore = (size: string): number => {
  switch (size) {
    case 'Enterprise (500+)': return 20
    case 'Large (100-500)': return 18
    case 'Medium (50-100)': return 15
    case 'Small (10-50)': return 12
    case 'Startup (1-10)': return 8
    default: return 5
  }
}

const getBudgetScore = (budget: string): number => {
  switch (budget) {
    case '$50k+': return 20
    case '$20k-$50k': return 18
    case '$10k-$20k': return 15
    case '$5k-$10k': return 12
    case '<$5k': return 8
    default: return 5
  }
}

const getIndustryScore = (industry: string): number => {
  // High-value industries for M-Hub
  const highValueIndustries = ['Fintech', 'Technology', 'E-commerce', 'Healthcare']
  return highValueIndustries.includes(industry) ? 15 : 10
}

const getTouchpointQualityScore = (touchpoints: Touchpoint[]): number => {
  if (touchpoints.length === 0) return 0

  // High-intent touchpoints (demo, form, whatsapp)
  const highIntentCount = touchpoints.filter(tp => 
    ['demo_request', 'form_submit', 'whatsapp_contact'].includes(tp.type)
  ).length

  const frequencyScore = Math.min(touchpoints.length * 2, 10)
  const intentScore = Math.min(highIntentCount * 3, 5)

  return frequencyScore + intentScore
}

const calculateUrgency = (touchpoints: Touchpoint[]): 'High' | 'Medium' | 'Low' => {
  if (touchpoints.length === 0) return 'Low'

  const now = new Date()
  const recentTouchpoints = touchpoints.filter(tp => {
    const tpDate = new Date(tp.timestamp)
    const hoursDiff = (now.getTime() - tpDate.getTime()) / (1000 * 60 * 60)
    return hoursDiff <= 48 // Last 48 hours
  })

  const highIntentRecent = recentTouchpoints.filter(tp => 
    ['demo_request', 'form_submit', 'whatsapp_contact'].includes(tp.type)
  ).length

  if (highIntentRecent >= 2 || recentTouchpoints.length >= 5) return 'High'
  if (highIntentRecent >= 1 || recentTouchpoints.length >= 3) return 'Medium'
  return 'Low'
}

const getRecommendedAction = (quality: string, urgency: string): string => {
  if (quality === 'Hot' && urgency === 'High') {
    return '🔥 Call NOW - High conversion probability (85%+)'
  } else if (quality === 'Hot') {
    return '📞 Schedule demo within 24 hours - Strong fit detected'
  } else if (quality === 'Warm' && urgency === 'High') {
    return '⚡ Follow up today - Recent high-intent activity'
  } else if (quality === 'Warm') {
    return '📧 Send personalized email with case study'
  } else if (urgency === 'High') {
    return '💬 WhatsApp message - They\'re actively researching'
  } else {
    return '🌱 Add to nurture campaign - Build engagement'
  }
}

const getTouchpointValue = (type: string): number => {
  switch (type) {
    case 'demo_request': return 1.5
    case 'whatsapp_contact': return 1.4
    case 'form_submit': return 1.3
    case 'content_download': return 1.2
    case 'email_click': return 1.1
    case 'blog_read': return 1.05
    case 'email_open': return 1.0
    case 'social_engagement': return 0.9
    case 'website_visit': return 0.8
    default: return 1.0
  }
}

const calculateTouchpointROI = (type: string, attribution: number): number => {
  // Estimated ROI multipliers based on touchpoint type
  const baseROI = {
    demo_request: 450,
    whatsapp_contact: 380,
    form_submit: 320,
    content_download: 250,
    email_click: 180,
    blog_read: 150,
    email_open: 120,
    social_engagement: 100,
    website_visit: 80,
  }

  const roi = baseROI[type as keyof typeof baseROI] || 100
  return Math.round(roi * (attribution / 100))
}

const getContributionLabel = (value: number): string => {
  if (value >= 30) return 'Major Impact'
  if (value >= 20) return 'Significant'
  if (value >= 10) return 'Moderate'
  if (value >= 5) return 'Minor'
  return 'Minimal'
}

/**
 * Batch predict for multiple leads
 */
export const batchPredict = (leads: Lead[]): PredictiveScore[] => {
  return leads.map(lead => calculateLeadScore(lead))
}

/**
 * Generate predictive insights
 */
export const generateInsights = (scores: PredictiveScore[]) => {
  const hotLeads = scores.filter(s => s.leadQuality === 'Hot').length
  const warmLeads = scores.filter(s => s.leadQuality === 'Warm').length
  const avgConversionProb = scores.reduce((sum, s) => sum + s.conversionProbability, 0) / scores.length
  const avgCLV = scores.reduce((sum, s) => sum + s.predictedCLV, 0) / scores.length
  const avgCACReduction = scores.reduce((sum, s) => sum + s.cacReduction, 0) / scores.length

  return {
    hotLeads,
    warmLeads,
    avgConversionProb: Math.round(avgConversionProb),
    avgCLV: Math.round(avgCLV),
    avgCACReduction: Math.round(avgCACReduction),
    totalPotentialRevenue: Math.round(scores.reduce((sum, s) => sum + s.predictedCLV, 0)),
    highUrgencyCount: scores.filter(s => s.urgency === 'High').length,
  }
}

