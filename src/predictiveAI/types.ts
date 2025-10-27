/**
 * Type definitions for Predictive AI System
 */

export interface UserAction {
  id: string
  type: ActionType
  timestamp: number
  page: string
  details?: Record<string, any>
  sessionId: string
}

export type ActionType =
  | 'page_view'
  | 'button_click'
  | 'service_view'
  | 'chat_open'
  | 'chat_message'
  | 'form_start'
  | 'form_submit'
  | 'scroll_depth'
  | 'time_on_page'
  | 'download'
  | 'exit_intent'

export interface UserSession {
  id: string
  startTime: number
  endTime?: number
  actions: UserAction[]
  predictedInterests: string[]
  engagementScore: number
}

export interface Prediction {
  type: PredictionType
  confidence: number // 0-100
  suggestion: string
  action?: RecommendedAction
  data?: any
}

export type PredictionType =
  | 'next_service'
  | 'conversion_likelihood'
  | 'exit_intent'
  | 'engagement_level'
  | 'peak_activity'
  | 'content_interest'

export interface RecommendedAction {
  type: 'show_popup' | 'offer_discount' | 'suggest_service' | 'start_chat' | 'show_guide'
  priority: 'high' | 'medium' | 'low'
  content: string
  cta?: string
  ctaLink?: string
}

export interface BehaviorPattern {
  pattern: string
  frequency: number
  lastOccurrence: number
  predictedNext: string[]
  confidence: number
}

export interface EngagementMetrics {
  totalSessions: number
  avgSessionDuration: number
  avgActionsPerSession: number
  topPages: { page: string; visits: number }[]
  topServices: { service: string; views: number }[]
  peakHours: { hour: number; activity: number }[]
  conversionRate: number
}

export interface InsightData {
  timestamp: number
  predictions: Prediction[]
  metrics: EngagementMetrics
  patterns: BehaviorPattern[]
}

