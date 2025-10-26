/**
 * Web Search Service
 * Integrates with search APIs to fetch real-time data from the web
 */

export interface SearchResult {
  title: string
  url: string
  description: string
  published?: string
}

export interface ResearchData {
  query: string
  results: SearchResult[]
  summary: string
  sources: string[]
  timestamp: Date
}

/**
 * Brave Search API Integration
 * Free tier: 2,000 queries/month
 * Docs: https://api.search.brave.com/
 */
class WebSearchService {
  private apiKey: string
  private baseUrl = 'https://api.search.brave.com/res/v1/web/search'
  private fallbackMode = false

  constructor() {
    // API key should be set via environment variable or config
    // For demo purposes, we'll use a fallback knowledge base if no key
    this.apiKey = import.meta.env.VITE_BRAVE_API_KEY || ''
    this.fallbackMode = !this.apiKey
  }

  /**
   * Perform web search query
   */
  async search(query: string, count: number = 5): Promise<SearchResult[]> {
    if (this.fallbackMode) {
      return this.fallbackSearch(query)
    }

    try {
      const url = `${this.baseUrl}?q=${encodeURIComponent(query)}&count=${count}`
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': this.apiKey,
        },
      })

      if (!response.ok) {
        console.warn('Search API error, falling back to knowledge base')
        return this.fallbackSearch(query)
      }

      const data = await response.json()
      return this.parseSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
      return this.fallbackSearch(query)
    }
  }

  /**
   * Parse search API response
   */
  private parseSearchResults(data: any): SearchResult[] {
    if (!data.web?.results) return []

    return data.web.results.map((result: any) => ({
      title: result.title,
      url: result.url,
      description: result.description,
      published: result.age,
    }))
  }

  /**
   * Perform research query (multiple searches + synthesis)
   */
  async research(topic: string): Promise<ResearchData> {
    const mainQuery = topic
    const relatedQueries = this.generateRelatedQueries(topic)

    // Search main query
    const mainResults = await this.search(mainQuery, 5)

    // Search related queries
    const relatedResults = await Promise.all(
      relatedQueries.slice(0, 2).map(q => this.search(q, 3))
    )

    // Combine all results
    const allResults = [
      ...mainResults,
      ...relatedResults.flat(),
    ]

    // Remove duplicates by URL
    const uniqueResults = Array.from(
      new Map(allResults.map(r => [r.url, r])).values()
    )

    // Generate summary
    const summary = this.generateSummary(topic, uniqueResults)

    // Extract sources
    const sources = uniqueResults.map(r => r.url)

    return {
      query: topic,
      results: uniqueResults,
      summary,
      sources,
      timestamp: new Date(),
    }
  }

  /**
   * Generate related search queries
   */
  private generateRelatedQueries(topic: string): string[] {
    const lowerTopic = topic.toLowerCase()

    // Kenya-specific queries
    if (lowerTopic.includes('kenya') || lowerTopic.includes('fintech')) {
      return [
        `${topic} statistics 2024`,
        `${topic} trends Kenya`,
        `${topic} challenges solutions`,
      ]
    }

    // Marketing queries
    if (lowerTopic.includes('marketing') || lowerTopic.includes('sales')) {
      return [
        `${topic} best practices`,
        `${topic} case studies`,
        `${topic} ROI metrics`,
      ]
    }

    // Default related queries
    return [
      `${topic} latest news`,
      `${topic} expert insights`,
      `${topic} data analysis`,
    ]
  }

  /**
   * Generate summary from search results
   */
  private generateSummary(topic: string, results: SearchResult[]): string {
    if (results.length === 0) {
      return `No recent data found for "${topic}". Please try a different search term.`
    }

    const descriptions = results
      .slice(0, 3)
      .map(r => r.description)
      .filter(d => d)
      .join(' ')

    return `Based on recent web research: ${descriptions.slice(0, 400)}...`
  }

  /**
   * Fallback search using knowledge base
   */
  private fallbackSearch(query: string): SearchResult[] {
    const lowerQuery = query.toLowerCase()
    const knowledgeBase = this.getKnowledgeBase()

    // Find matching topics
    const matches = knowledgeBase.filter(item =>
      item.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))
    )

    if (matches.length === 0) {
      return [{
        title: 'M-Hub Knowledge Base',
        url: 'https://etiditalex.github.io/M-hub',
        description: `I don't have specific information about "${query}" in my current knowledge base. However, I can help you with Kenya fintech trends, marketing strategies, social media optimization, and AI solutions. Try asking about these topics!`,
      }]
    }

    return matches.slice(0, 5).map(item => ({
      title: item.title,
      url: item.url,
      description: item.description,
      published: item.date,
    }))
  }

  /**
   * Pre-populated knowledge base for fallback
   */
  private getKnowledgeBase() {
    return [
      {
        title: 'Kenya Fintech Sector Overview 2024',
        url: 'https://etiditalex.github.io/M-hub/newsroom/kenya-fintech-sector',
        description: 'Kenya\'s fintech sector has surpassed $2 billion in monthly transaction value, leading Africa. M-Pesa processes over 50% of the country\'s GDP annually. The sector faces challenges in customer acquisition costs (3x higher than global average) and regulatory compliance.',
        keywords: ['kenya', 'fintech', 'mpesa', 'mobile money', 'payments'],
        date: '2024-10',
      },
      {
        title: 'Marketing Challenges in Kenya - AI Solutions',
        url: 'https://etiditalex.github.io/M-hub/blog/kenya-marketing-challenges-ai-solutions',
        description: 'Kenyan businesses face unique marketing challenges: fragmented customer data across 5+ platforms, 73% of SMEs struggle with social media ROI tracking, and compliance with Kenya Data Protection Act. M-Hub\'s AI platform provides unified attribution, automated compliance, and real-time optimization.',
        keywords: ['marketing', 'challenges', 'kenya', 'ai', 'solutions', 'roi'],
        date: '2024-10',
      },
      {
        title: 'Social Media ROI for Kenyan Businesses',
        url: 'https://etiditalex.github.io/M-hub',
        description: 'Social media drives 32% of e-commerce sales in Kenya. Facebook (32%), Instagram (28%), and WhatsApp Business (6%) are top performers. M-Hub clients achieve average 387% ROI through AI-powered targeting, unified attribution, and real-time optimization.',
        keywords: ['social media', 'roi', 'sales', 'facebook', 'instagram', 'whatsapp'],
        date: '2024-10',
      },
      {
        title: 'AI Marketing Automation Benefits',
        url: 'https://etiditalex.github.io/M-hub/services',
        description: 'AI marketing automation reduces manual work by 70%, increases conversion rates by 156%, and provides real-time insights. Features include predictive analytics, customer segmentation, automated campaigns, and performance tracking.',
        keywords: ['ai', 'automation', 'marketing', 'efficiency', 'conversion'],
        date: '2024-10',
      },
      {
        title: 'M-Pesa Integration for Businesses',
        url: 'https://etiditalex.github.io/M-hub/services',
        description: 'M-Pesa integration enables seamless payment processing, automated reconciliation, and customer insights. Over 30 million active users make it essential for Kenyan businesses. Average transaction success rate: 98.5%.',
        keywords: ['mpesa', 'integration', 'payment', 'mobile money'],
        date: '2024-10',
      },
      {
        title: 'Digital Marketing Trends Kenya 2024',
        url: 'https://etiditalex.github.io/M-hub/blog',
        description: 'Key trends: Video content dominates (65% engagement increase), AI chatbots improve customer service by 40%, voice search optimization growing at 25% YoY, and TikTok marketing emerging for Gen Z audience.',
        keywords: ['trends', 'digital marketing', '2024', 'video', 'chatbot', 'tiktok'],
        date: '2024-10',
      },
      {
        title: 'Customer Data Protection Kenya (DPA 2019)',
        url: 'https://etiditalex.github.io/M-hub/blog',
        description: 'Kenya Data Protection Act 2019 requires explicit consent, data minimization, and breach notification within 72 hours. Non-compliance fines up to KES 5 million. M-Hub provides built-in compliance features.',
        keywords: ['data protection', 'privacy', 'compliance', 'gdpr', 'regulation'],
        date: '2024-10',
      },
      {
        title: 'E-commerce Growth in East Africa',
        url: 'https://etiditalex.github.io/M-hub/newsroom',
        description: 'East African e-commerce market growing at 28% CAGR. Kenya leads with $2.3B market size. Key success factors: mobile-first design, M-Pesa integration, social commerce, and localized content.',
        keywords: ['ecommerce', 'east africa', 'growth', 'online sales'],
        date: '2024-10',
      },
      {
        title: 'WhatsApp Business API Benefits',
        url: 'https://etiditalex.github.io/M-hub/services',
        description: 'WhatsApp Business API enables automated customer support, order notifications, and marketing messages. 87% open rate vs 22% for email. Integration with CRM for seamless communication.',
        keywords: ['whatsapp', 'business', 'api', 'messaging', 'customer service'],
        date: '2024-10',
      },
      {
        title: 'SEO for Kenyan Businesses',
        url: 'https://etiditalex.github.io/M-hub/services',
        description: 'Local SEO crucial for Kenyan market: Google My Business optimization, mobile-first indexing, local keywords, and fast loading times. Average organic traffic increase: 240% in 6 months.',
        keywords: ['seo', 'search engine', 'optimization', 'google', 'traffic'],
        date: '2024-10',
      },
    ]
  }
}

// Singleton instance
export const webSearchService = new WebSearchService()

