/**
 * Custom hooks for Predictive AI functionality
 */

import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import dataCollector, { trackPageView } from '../DataCollector'
import { predictiveEngine } from '../PredictiveEngine'
import type { Prediction, UserSession, EngagementMetrics } from '../types'

/**
 * Hook for tracking user behavior
 */
export const useUserTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname)
  }, [location])

  return {
    trackPageView,
    dataCollector,
  }
}

/**
 * Hook for getting predictions
 */
export const usePredictions = (refreshInterval: number = 30000) => {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(() => {
    const allPredictions = predictiveEngine.getAllPredictions()
    setPredictions(allPredictions)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval, refresh])

  return { predictions, isLoading, refresh }
}

/**
 * Hook for getting engagement metrics
 */
export const useEngagementMetrics = (refreshInterval: number = 30000) => {
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(() => {
    const currentMetrics = predictiveEngine.getEngagementMetrics()
    setMetrics(currentMetrics)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval, refresh])

  return { metrics, isLoading, refresh }
}

/**
 * Hook for getting current session
 */
export const useCurrentSession = (refreshInterval: number = 10000) => {
  const [session, setSession] = useState<UserSession | null>(null)

  const refresh = useCallback(() => {
    const currentSession = dataCollector.getCurrentSession()
    setSession(currentSession)
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, refreshInterval)

    // Listen for action events
    const handleAction = () => refresh()
    window.addEventListener('mhub:action', handleAction)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mhub:action', handleAction)
    }
  }, [refreshInterval, refresh])

  return { session, refresh }
}

/**
 * Hook for specific prediction types
 */
export const usePrediction = (type: Prediction['type']) => {
  const { predictions } = usePredictions()
  return predictions.find(p => p.type === type) || null
}

/**
 * Hook for monitoring real-time activity
 */
export const useRealTimeActivity = () => {
  const [recentActions, setRecentActions] = useState<any[]>([])

  useEffect(() => {
    const handleAction = (event: Event) => {
      const customEvent = event as CustomEvent
      setRecentActions(prev => {
        const newActions = [customEvent.detail, ...prev].slice(0, 10) // Keep last 10
        return newActions
      })
    }

    window.addEventListener('mhub:action', handleAction)
    return () => window.removeEventListener('mhub:action', handleAction)
  }, [])

  return { recentActions }
}

export default {
  useUserTracking,
  usePredictions,
  useEngagementMetrics,
  useCurrentSession,
  usePrediction,
  useRealTimeActivity,
}

