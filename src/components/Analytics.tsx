import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Analytics 4 Integration
 * Tracks page views, user sessions, device info, and real-time analytics
 */

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

// Replace with your Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // TODO: Replace with actual GA4 ID

export const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Initialize Google Analytics 4
    if (typeof window !== 'undefined' && !window.gtag) {
      // Load GA4 script
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script1)

      // Initialize gtag
      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          send_page_view: false
        });
      `
      document.head.appendChild(script2)
    }
  }, [])

  useEffect(() => {
    // Track page views on route change
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [location])

  return null
}

/**
 * Custom Event Tracking Functions
 */

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  })
}

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  })
}

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_contact', {
    method: 'contact_form',
  })
}

export const trackResearchMode = (mode: 'standard' | 'research' | 'deep') => {
  trackEvent('research_mode_change', {
    research_mode: mode,
  })
}

export const trackServiceView = (serviceName: string) => {
  trackEvent('service_view', {
    service_name: serviceName,
  })
}

export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName,
  })
}

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
  })
}

export const trackOutboundLink = (url: string) => {
  trackEvent('outbound_link', {
    link_url: url,
  })
}

/**
 * Basic Client-Side Analytics (Fallback)
 * Tracks basic metrics when GA4 is not available
 */

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  deviceType: string
  browser: string
  screenResolution: string
  referrer: string
  sessionStart: number
}

export const initializeLocalAnalytics = () => {
  if (typeof window === 'undefined') return

  const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent)
    ? 'Mobile'
    : /Tablet|iPad/i.test(navigator.userAgent)
    ? 'Tablet'
    : 'Desktop'

  const browser = getBrowserName()
  const screenResolution = `${window.screen.width}x${window.screen.height}`
  const referrer = document.referrer || 'Direct'

  // Check if this is a unique visitor
  const visitorId = localStorage.getItem('visitor_id')
  if (!visitorId) {
    localStorage.setItem('visitor_id', generateVisitorId())
  }

  // Track session
  const sessionData: AnalyticsData = {
    pageViews: getPageViews() + 1,
    uniqueVisitors: visitorId ? 0 : 1,
    deviceType,
    browser,
    screenResolution,
    referrer,
    sessionStart: Date.now(),
  }

  // Store session data
  sessionStorage.setItem('analytics_session', JSON.stringify(sessionData))
  localStorage.setItem('page_views', sessionData.pageViews.toString())

  // Log to console (for development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Data:', sessionData)
  }
}

const getBrowserName = (): string => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

const generateVisitorId = (): string => {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const getPageViews = (): number => {
  const views = localStorage.getItem('page_views')
  return views ? parseInt(views, 10) : 0
}

export default Analytics

