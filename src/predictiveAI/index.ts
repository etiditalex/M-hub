/**
 * Predictive AI Module - Main Export
 */

// Core
export { default as dataCollector } from './DataCollector'
export { default as predictiveEngine } from './PredictiveEngine'

// Components
export { default as RecommendationsPanel } from './components/RecommendationsPanel'

// Hooks
export * from './hooks/usePredictiveAI'

// Tracking Functions
export {
  trackPageView,
  trackButtonClick,
  trackServiceView,
  trackChatOpen,
  trackChatMessage,
  trackFormStart,
  trackFormSubmit,
  trackDownload,
  trackExitIntent,
} from './DataCollector'

// Types
export type {
  UserAction,
  UserSession,
  Prediction,
  BehaviorPattern,
  EngagementMetrics,
  ActionType,
  PredictionType,
  RecommendedAction,
} from './types'

