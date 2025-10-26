/**
 * Web Scraper Service
 * Fetches and parses real content from websites
 */

export interface ScrapedContent {
  url: string
  title: string
  content: string
  excerpt: string
  author?: string
  publishDate?: string
  images?: string[]
  links?: string[]
}

export interface DeepResearchResult {
  query: string
  sources: ScrapedContent[]
  synthesis: string
  keyInsights: string[]
  timestamp: Date
}

/**
 * CORS Proxy options for client-side web scraping
 */
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
]

class WebScraperService {
  private currentProxyIndex = 0

  /**
   * Fetch content from a URL using CORS proxy
   */
  async fetchURL(url: string): Promise<string> {
    const proxy = CORS_PROXIES[this.currentProxyIndex]
    const proxyUrl = `${proxy}${encodeURIComponent(url)}`

    try {
      const response = await fetch(proxyUrl, {
        headers: {
          'Accept': 'text/html,application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return await response.text()
    } catch (error) {
      console.error(`Proxy ${proxy} failed:`, error)
      
      // Try next proxy
      this.currentProxyIndex = (this.currentProxyIndex + 1) % CORS_PROXIES.length
      
      if (this.currentProxyIndex !== 0) {
        return this.fetchURL(url) // Retry with next proxy
      }
      
      throw new Error('All proxies failed')
    }
  }

  /**
   * Extract text content from HTML
   */
  private extractTextFromHTML(html: string): string {
    // Remove script and style tags
    let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    
    // Remove HTML tags
    text = text.replace(/<[^>]+>/g, ' ')
    
    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ')
    text = text.replace(/&amp;/g, '&')
    text = text.replace(/&lt;/g, '<')
    text = text.replace(/&gt;/g, '>')
    text = text.replace(/&quot;/g, '"')
    text = text.replace(/&#39;/g, "'")
    
    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim()
    
    return text
  }

  /**
   * Extract title from HTML
   */
  private extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
    if (titleMatch) {
      return this.extractTextFromHTML(titleMatch[1])
    }
    
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i)
    if (h1Match) {
      return this.extractTextFromHTML(h1Match[1])
    }
    
    return 'Untitled'
  }

  /**
   * Extract meta description
   */
  private extractDescription(html: string): string {
    const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)
    if (metaDesc) {
      return metaDesc[1]
    }
    
    const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i)
    if (ogDesc) {
      return ogDesc[1]
    }
    
    return ''
  }

  /**
   * Extract author from HTML
   */
  private extractAuthor(html: string): string | undefined {
    const authorMeta = html.match(/<meta\s+name=["']author["']\s+content=["'](.*?)["']/i)
    if (authorMeta) {
      return authorMeta[1]
    }
    
    const ogAuthor = html.match(/<meta\s+property=["']article:author["']\s+content=["'](.*?)["']/i)
    if (ogAuthor) {
      return ogAuthor[1]
    }
    
    return undefined
  }

  /**
   * Extract publish date
   */
  private extractPublishDate(html: string): string | undefined {
    const datePatterns = [
      /<meta\s+property=["']article:published_time["']\s+content=["'](.*?)["']/i,
      /<time\s+datetime=["'](.*?)["']/i,
      /<meta\s+name=["']date["']\s+content=["'](.*?)["']/i,
    ]
    
    for (const pattern of datePatterns) {
      const match = html.match(pattern)
      if (match) {
        return match[1]
      }
    }
    
    return undefined
  }

  /**
   * Extract main content from HTML
   */
  private extractMainContent(html: string): string {
    // Try to find article/main content
    const articleMatch = html.match(/<article[^>]*>(.*?)<\/article>/is)
    if (articleMatch) {
      return this.extractTextFromHTML(articleMatch[1])
    }
    
    const mainMatch = html.match(/<main[^>]*>(.*?)<\/main>/is)
    if (mainMatch) {
      return this.extractTextFromHTML(mainMatch[1])
    }
    
    // Fallback to body
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/is)
    if (bodyMatch) {
      return this.extractTextFromHTML(bodyMatch[1])
    }
    
    return this.extractTextFromHTML(html)
  }

  /**
   * Scrape a single URL
   */
  async scrapeURL(url: string): Promise<ScrapedContent> {
    try {
      const html = await this.fetchURL(url)
      
      const title = this.extractTitle(html)
      const description = this.extractDescription(html)
      const author = this.extractAuthor(html)
      const publishDate = this.extractPublishDate(html)
      const content = this.extractMainContent(html)
      
      // Create excerpt (first 300 chars of content or description)
      const excerpt = description || content.substring(0, 300) + '...'
      
      return {
        url,
        title,
        content: content.substring(0, 5000), // Limit to 5000 chars
        excerpt,
        author,
        publishDate,
      }
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error)
      return {
        url,
        title: 'Failed to load',
        content: '',
        excerpt: 'Unable to fetch content from this URL',
      }
    }
  }

  /**
   * Scrape multiple URLs in parallel
   */
  async scrapeMultipleURLs(urls: string[]): Promise<ScrapedContent[]> {
    const promises = urls.map(url => this.scrapeURL(url))
    return Promise.all(promises)
  }

  /**
   * Perform deep research on a topic
   * Searches, then scrapes top results for full content
   */
  async deepResearch(query: string, searchResults: { url: string; title: string }[]): Promise<DeepResearchResult> {
    // Scrape top 3 results
    const urlsToScrape = searchResults.slice(0, 3).map(r => r.url)
    const scrapedContent = await this.scrapeMultipleURLs(urlsToScrape)
    
    // Synthesize information
    const synthesis = this.synthesizeContent(query, scrapedContent)
    const keyInsights = this.extractKeyInsights(scrapedContent)
    
    return {
      query,
      sources: scrapedContent,
      synthesis,
      keyInsights,
      timestamp: new Date(),
    }
  }

  /**
   * Synthesize content from multiple sources
   */
  private synthesizeContent(query: string, sources: ScrapedContent[]): string {
    const validSources = sources.filter(s => s.content.length > 100)
    
    if (validSources.length === 0) {
      return `I attempted to research "${query}" but couldn't fetch detailed content from the available sources. This might be due to website restrictions or CORS policies. Try asking about topics from our knowledge base or use different sources.`
    }
    
    let synthesis = `Based on deep research from ${validSources.length} source(s):\n\n`
    
    validSources.forEach((source, index) => {
      const contentPreview = source.content.substring(0, 500)
      synthesis += `**${index + 1}. ${source.title}**\n`
      if (source.author) synthesis += `Author: ${source.author}\n`
      if (source.publishDate) synthesis += `Published: ${new Date(source.publishDate).toLocaleDateString()}\n`
      synthesis += `${contentPreview}...\n\n`
    })
    
    return synthesis
  }

  /**
   * Extract key insights from scraped content
   */
  private extractKeyInsights(sources: ScrapedContent[]): string[] {
    const insights: string[] = []
    
    sources.forEach(source => {
      if (!source.content) return
      
      // Extract sentences with numbers/statistics (likely key insights)
      const sentences = source.content.match(/[^.!?]+[.!?]+/g) || []
      const statSentences = sentences.filter(s => 
        /\d+%|\$[\d,]+|[\d,]+\s*(million|billion|thousand)/i.test(s)
      )
      
      statSentences.slice(0, 2).forEach(sentence => {
        const cleaned = sentence.trim()
        if (cleaned.length > 20 && cleaned.length < 200) {
          insights.push(cleaned)
        }
      })
    })
    
    return insights.slice(0, 5) // Top 5 insights
  }

  /**
   * Check if a URL is scrapeable (not blocked by common restrictions)
   */
  async checkURLAccessibility(url: string): Promise<boolean> {
    try {
      await this.fetchURL(url)
      return true
    } catch {
      return false
    }
  }
}

// Singleton instance
export const webScraperService = new WebScraperService()

