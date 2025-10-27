/**
 * Data Collector - Tracks user behavior and stores it locally
 */

import type { UserAction, UserSession, ActionType } from './types'

const STORAGE_KEY = 'mhub_user_sessions'
const SESSION_KEY = 'mhub_current_session'
const MAX_SESSIONS = 50 // Keep last 50 sessions

class DataCollector {
  private currentSession: UserSession | null = null
  private sessionTimeout: NodeJS.Timeout | null = null
  private SESSION_DURATION = 30 * 60 * 1000 // 30 minutes

  constructor() {
    this.initSession()
    this.setupListeners()
  }

  /**
   * Initialize or resume session
   */
  private initSession() {
    const stored = localStorage.getItem(SESSION_KEY)
    
    if (stored) {
      try {
        const session = JSON.parse(stored) as UserSession
        
        // Check if session is still active (within 30 min)
        if (Date.now() - session.startTime < this.SESSION_DURATION) {
          this.currentSession = session
          this.resetSessionTimeout()
          return
        }
      } catch (e) {
        console.error('Failed to restore session:', e)
      }
    }

    // Create new session
    this.createNewSession()
  }

  /**
   * Create a new session
   */
  private createNewSession() {
    this.currentSession = {
      id: this.generateId(),
      startTime: Date.now(),
      actions: [],
      predictedInterests: [],
      engagementScore: 0,
    }

    this.saveSession()
    this.resetSessionTimeout()
  }

  /**
   * Setup event listeners for automatic tracking
   */
  private setupListeners() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.endSession()
      } else {
        this.initSession()
      }
    })

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.endSession()
    })

    // Track scroll depth
    let maxScroll = 0
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        if (maxScroll > 75) {
          this.trackAction('scroll_depth', { depth: maxScroll })
        }
      }
    })

    // Track time on page
    let timeOnPage = 0
    setInterval(() => {
      if (!document.hidden && this.currentSession) {
        timeOnPage += 10
        if (timeOnPage % 30 === 0) { // Every 30 seconds
          this.trackAction('time_on_page', { seconds: timeOnPage })
        }
      }
    }, 10000) // Check every 10 seconds
  }

  /**
   * Reset session timeout
   */
  private resetSessionTimeout() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout)
    }

    this.sessionTimeout = setTimeout(() => {
      this.endSession()
    }, this.SESSION_DURATION)
  }

  /**
   * End current session
   */
  private endSession() {
    if (!this.currentSession) return

    this.currentSession.endTime = Date.now()
    this.archiveSession(this.currentSession)
    
    localStorage.removeItem(SESSION_KEY)
    this.currentSession = null

    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout)
      this.sessionTimeout = null
    }
  }

  /**
   * Archive session to history
   */
  private archiveSession(session: UserSession) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      let sessions: UserSession[] = stored ? JSON.parse(stored) : []

      sessions.push(session)

      // Keep only last MAX_SESSIONS
      if (sessions.length > MAX_SESSIONS) {
        sessions = sessions.slice(-MAX_SESSIONS)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
    } catch (e) {
      console.error('Failed to archive session:', e)
    }
  }

  /**
   * Track a user action
   */
  trackAction(type: ActionType, details?: Record<string, any>) {
    if (!this.currentSession) {
      this.createNewSession()
    }

    const action: UserAction = {
      id: this.generateId(),
      type,
      timestamp: Date.now(),
      page: window.location.pathname,
      details,
      sessionId: this.currentSession!.id,
    }

    this.currentSession!.actions.push(action)
    this.updateEngagementScore()
    this.saveSession()
    this.resetSessionTimeout()

    // Emit event for real-time updates
    window.dispatchEvent(new CustomEvent('mhub:action', { detail: action }))
  }

  /**
   * Update engagement score based on actions
   */
  private updateEngagementScore() {
    if (!this.currentSession) return

    const actions = this.currentSession.actions
    let score = 0

    // Calculate score based on action types
    actions.forEach(action => {
      switch (action.type) {
        case 'page_view':
          score += 1
          break
        case 'service_view':
          score += 3
          break
        case 'button_click':
          score += 2
          break
        case 'chat_open':
          score += 5
          break
        case 'chat_message':
          score += 7
          break
        case 'form_start':
          score += 10
          break
        case 'form_submit':
          score += 20
          break
        case 'download':
          score += 15
          break
        default:
          score += 1
      }
    })

    // Normalize to 0-100
    this.currentSession.engagementScore = Math.min(100, (score / actions.length) * 5)
  }

  /**
   * Save current session to localStorage
   */
  private saveSession() {
    if (this.currentSession) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.currentSession))
    }
  }

  /**
   * Get current session
   */
  getCurrentSession(): UserSession | null {
    return this.currentSession
  }

  /**
   * Get all sessions
   */
  getAllSessions(): UserSession[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  /**
   * Get all actions across sessions
   */
  getAllActions(): UserAction[] {
    const sessions = this.getAllSessions()
    const currentActions = this.currentSession?.actions || []
    
    return [
      ...sessions.flatMap(s => s.actions),
      ...currentActions
    ]
  }

  /**
   * Clear all data
   */
  clearData() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(SESSION_KEY)
    this.currentSession = null
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Singleton instance
export const dataCollector = new DataCollector()

// Convenience tracking functions
export const trackPageView = (page?: string) => {
  dataCollector.trackAction('page_view', { page: page || window.location.pathname })
}

export const trackButtonClick = (buttonName: string, location: string) => {
  dataCollector.trackAction('button_click', { buttonName, location })
}

export const trackServiceView = (serviceName: string) => {
  dataCollector.trackAction('service_view', { serviceName })
}

export const trackChatOpen = () => {
  dataCollector.trackAction('chat_open')
}

export const trackChatMessage = (message: string) => {
  dataCollector.trackAction('chat_message', { message })
}

export const trackFormStart = (formName: string) => {
  dataCollector.trackAction('form_start', { formName })
}

export const trackFormSubmit = (formName: string) => {
  dataCollector.trackAction('form_submit', { formName })
}

export const trackDownload = (fileName: string) => {
  dataCollector.trackAction('download', { fileName })
}

export const trackExitIntent = () => {
  dataCollector.trackAction('exit_intent')
}

export default dataCollector

