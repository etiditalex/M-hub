/**
 * Predictive Engine - Analyzes user behavior and makes predictions
 */

import type { Prediction, BehaviorPattern, EngagementMetrics } from './types'
import dataCollector from './DataCollector'

class PredictiveEngine {
  private patterns: Map<string, BehaviorPattern> = new Map()
  private ANALYSIS_INTERVAL = 60000 // Analyze every minute

  constructor() {
    this.startContinuousLearning()
  }

  /**
   * Start continuous learning in background
   */
  private startContinuousLearning() {
    setInterval(() => {
      this.analyzePatterns()
    }, this.ANALYSIS_INTERVAL)

    // Initial analysis
    this.analyzePatterns()
  }

  /**
   * Analyze user behavior patterns
   */
  private analyzePatterns() {
    const actions = dataCollector.getAllActions()
    if (actions.length === 0) return

    // Find sequences of actions
    for (let i = 0; i < actions.length - 1; i++) {
      const current = actions[i]
      const next = actions[i + 1]

      const patternKey = `${current.type}:${current.page}`
      const nextKey = `${next.type}:${next.page}`

      let pattern = this.patterns.get(patternKey)
      if (!pattern) {
        pattern = {
          pattern: patternKey,
          frequency: 0,
          lastOccurrence: current.timestamp,
          predictedNext: [],
          confidence: 0,
        }
        this.patterns.set(patternKey, pattern)
      }

      pattern.frequency++
      pattern.lastOccurrence = Math.max(pattern.lastOccurrence, current.timestamp)
      
      if (!pattern.predictedNext.includes(nextKey)) {
        pattern.predictedNext.push(nextKey)
      }

      // Calculate confidence based on frequency
      pattern.confidence = Math.min(100, (pattern.frequency / actions.length) * 100)
    }
  }

  /**
   * Predict next service user might be interested in
   */
  predictNextService(): Prediction {
    const session = dataCollector.getCurrentSession()
    if (!session) {
      return {
        type: 'next_service',
        confidence: 0,
        suggestion: 'Start exploring our services',
      }
    }

    // Analyze viewed services
    const serviceViews = session.actions.filter(a => a.type === 'service_view')
    const services = serviceViews.map(a => a.details?.serviceName).filter(Boolean)

    // Service recommendation logic
    const serviceMap: Record<string, string[]> = {
      'Digital Marketing': ['SEO Services', 'Social Media Management', 'Content Marketing'],
      'SEO Services': ['Content Marketing', 'Social Media Management'],
      'Social Media Management': ['Digital Marketing', 'Content Marketing'],
      'Software Development': ['AI Integration', 'Custom Solutions'],
      'AI Integration': ['Software Development', 'Data Analytics'],
      'Content Marketing': ['Digital Marketing', 'SEO Services'],
    }

    // Find most viewed service
    const serviceCounts: Record<string, number> = {}
    services.forEach(service => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1
    })

    const mostViewed = Object.keys(serviceCounts).sort((a, b) => serviceCounts[b] - serviceCounts[a])[0]

    if (mostViewed && serviceMap[mostViewed]) {
      const recommended = serviceMap[mostViewed][0]
      const confidence = Math.min(95, serviceCounts[mostViewed] * 25 + 50)

      return {
        type: 'next_service',
        confidence,
        suggestion: `Based on your interest in ${mostViewed}, we recommend ${recommended}`,
        action: {
          type: 'suggest_service',
          priority: confidence > 75 ? 'high' : 'medium',
          content: `Explore our ${recommended} solutions`,
          cta: `View ${recommended}`,
          ctaLink: `/services#${recommended.toLowerCase().replace(/\s+/g, '-')}`,
        },
      }
    }

    // Default recommendation
    return {
      type: 'next_service',
      confidence: 50,
      suggestion: 'Explore our Digital Marketing services',
      action: {
        type: 'suggest_service',
        priority: 'low',
        content: 'Discover how we can help grow your business',
        cta: 'View Services',
        ctaLink: '/services',
      },
    }
  }

  /**
   * Predict conversion likelihood
   */
  predictConversion(): Prediction {
    const session = dataCollector.getCurrentSession()
    if (!session) {
      return {
        type: 'conversion_likelihood',
        confidence: 0,
        suggestion: 'User just arrived',
      }
    }

    const engagementScore = session.engagementScore
    const hasFormInteraction = session.actions.some(a => a.type === 'form_start' || a.type === 'form_submit')
    const hasChatInteraction = session.actions.some(a => a.type === 'chat_message')
    const sessionDuration = Date.now() - session.startTime

    let likelihood = engagementScore

    // Boost likelihood based on high-intent actions
    if (session.actions.some(a => a.type === 'form_submit')) likelihood = Math.min(100, likelihood + 40)
    if (hasChatInteraction) likelihood = Math.min(100, likelihood + 20)
    if (hasFormInteraction) likelihood = Math.min(100, likelihood + 15)
    if (sessionDuration > 5 * 60 * 1000) likelihood = Math.min(100, likelihood + 10) // 5+ minutes

    let suggestion = ''
    let action = null

    if (likelihood > 75) {
      suggestion = 'High conversion probability - Engage with personalized offer'
      action = {
        type: 'offer_discount' as const,
        priority: 'high' as const,
        content: 'Special offer for engaged visitors',
        cta: 'Claim 20% Off',
        ctaLink: '/contact',
      }
    } else if (likelihood > 50) {
      suggestion = 'Medium conversion potential - Provide more information'
      action = {
        type: 'show_guide' as const,
        priority: 'medium' as const,
        content: 'Learn more about our solutions',
        cta: 'Download Guide',
        ctaLink: '/resources',
      }
    } else if (likelihood > 25) {
      suggestion = 'Low engagement - Consider exit-intent offer'
      action = {
        type: 'start_chat' as const,
        priority: 'medium' as const,
        content: 'Have questions? We\'re here to help',
        cta: 'Chat with Us',
        ctaLink: '/ask-mhub',
      }
    } else {
      suggestion = 'Very early stage - Continue monitoring'
    }

    return {
      type: 'conversion_likelihood',
      confidence: likelihood,
      suggestion,
      action: action || undefined,
    }
  }

  /**
   * Detect exit intent
   */
  detectExitIntent(): Prediction {
    const session = dataCollector.getCurrentSession()
    if (!session) {
      return {
        type: 'exit_intent',
        confidence: 0,
        suggestion: 'No active session',
      }
    }

    const recentActions = session.actions.slice(-5)
    const hasExitIntent = recentActions.some(a => a.type === 'exit_intent')
    const sessionDuration = Date.now() - session.startTime
    const actionFrequency = session.actions.length / (sessionDuration / 60000) // actions per minute

    let exitProbability = 0

    if (hasExitIntent) exitProbability += 50
    if (actionFrequency < 1) exitProbability += 20 // Low activity
    if (sessionDuration < 60000) exitProbability += 15 // Less than 1 minute
    if (!recentActions.some(a => a.type === 'button_click')) exitProbability += 15 // No recent clicks

    exitProbability = Math.min(100, exitProbability)

    if (exitProbability > 60) {
      return {
        type: 'exit_intent',
        confidence: exitProbability,
        suggestion: 'User likely to leave - Show retention offer',
        action: {
          type: 'offer_discount',
          priority: 'high',
          content: 'Wait! Before you go...',
          cta: 'Get Free Consultation',
          ctaLink: '/contact',
        },
      }
    }

    return {
      type: 'exit_intent',
      confidence: exitProbability,
      suggestion: 'User engaged, exit risk low',
    }
  }

  /**
   * Predict peak activity hours
   */
  predictPeakActivity(): Prediction {
    const actions = dataCollector.getAllActions()
    
    const hourCounts: Record<number, number> = {}
    actions.forEach(action => {
      const hour = new Date(action.timestamp).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })

    const hours = Object.keys(hourCounts).map(Number)
    const avgCount = Object.values(hourCounts).reduce((a, b) => a + b, 0) / hours.length

    const peakHours = hours.filter(hour => hourCounts[hour] > avgCount * 1.5).sort((a, b) => hourCounts[b] - hourCounts[a])

    if (peakHours.length > 0) {
      return {
        type: 'peak_activity',
        confidence: 85,
        suggestion: `Peak activity hours: ${peakHours.slice(0, 3).join(', ')}:00`,
        data: { peakHours, hourCounts },
      }
    }

    return {
      type: 'peak_activity',
      confidence: 30,
      suggestion: 'Insufficient data to determine peak hours',
      data: { hourCounts },
    }
  }

  /**
   * Predict content interest
   */
  predictContentInterest(): Prediction {
    const session = dataCollector.getCurrentSession()
    if (!session) {
      return {
        type: 'content_interest',
        confidence: 0,
        suggestion: 'No active session',
      }
    }

    const pageViews = session.actions.filter(a => a.type === 'page_view')
    const pages = pageViews.map(a => a.page)

    // Categorize pages
    const interests: Record<string, number> = {
      marketing: 0,
      development: 0,
      ai: 0,
      analytics: 0,
      general: 0,
    }

    pages.forEach(page => {
      if (page.includes('marketing') || page.includes('seo')) interests.marketing++
      else if (page.includes('development') || page.includes('software')) interests.development++
      else if (page.includes('ai') || page.includes('predictive')) interests.ai++
      else if (page.includes('analytics') || page.includes('dashboard')) interests.analytics++
      else interests.general++
    })

    const maxInterest = Object.keys(interests).reduce((a, b) => interests[a] > interests[b] ? a : b)
    const confidence = Math.min(95, (interests[maxInterest] / pages.length) * 100)

    return {
      type: 'content_interest',
      confidence,
      suggestion: `Primary interest: ${maxInterest}`,
      data: { interests },
    }
  }

  /**
   * Get all predictions
   */
  getAllPredictions(): Prediction[] {
    return [
      this.predictNextService(),
      this.predictConversion(),
      this.detectExitIntent(),
      this.predictPeakActivity(),
      this.predictContentInterest(),
    ]
  }

  /**
   * Get engagement metrics
   */
  getEngagementMetrics(): EngagementMetrics {
    const sessions = [...dataCollector.getAllSessions()]
    const currentSession = dataCollector.getCurrentSession()
    if (currentSession) sessions.push(currentSession)

    const totalSessions = sessions.length
    const avgSessionDuration = sessions.reduce((sum, s) => {
      const duration = s.endTime ? s.endTime - s.startTime : Date.now() - s.startTime
      return sum + duration
    }, 0) / totalSessions / 1000 // in seconds

    const avgActionsPerSession = sessions.reduce((sum, s) => sum + s.actions.length, 0) / totalSessions

    // Top pages
    const pageCounts: Record<string, number> = {}
    sessions.forEach(s => {
      s.actions.forEach(a => {
        if (a.type === 'page_view') {
          pageCounts[a.page] = (pageCounts[a.page] || 0) + 1
        }
      })
    })
    const topPages = Object.keys(pageCounts)
      .map(page => ({ page, visits: pageCounts[page] }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)

    // Top services
    const serviceCounts: Record<string, number> = {}
    sessions.forEach(s => {
      s.actions.forEach(a => {
        if (a.type === 'service_view' && a.details?.serviceName) {
          const service = a.details.serviceName
          serviceCounts[service] = (serviceCounts[service] || 0) + 1
        }
      })
    })
    const topServices = Object.keys(serviceCounts)
      .map(service => ({ service, views: serviceCounts[service] }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    // Peak hours
    const hourCounts: Record<number, number> = {}
    sessions.forEach(s => {
      s.actions.forEach(a => {
        const hour = new Date(a.timestamp).getHours()
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
      })
    })
    const peakHours = Object.keys(hourCounts)
      .map(hour => ({ hour: parseInt(hour), activity: hourCounts[parseInt(hour)] }))
      .sort((a, b) => b.activity - a.activity)
      .slice(0, 5)

    // Conversion rate (form submits / total sessions)
    const conversions = sessions.filter(s => s.actions.some(a => a.type === 'form_submit')).length
    const conversionRate = (conversions / totalSessions) * 100

    return {
      totalSessions,
      avgSessionDuration,
      avgActionsPerSession,
      topPages,
      topServices,
      peakHours,
      conversionRate,
    }
  }
}

export const predictiveEngine = new PredictiveEngine()
export default predictiveEngine

