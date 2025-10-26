# M-Hub AI Web Search Setup Guide

## Overview

M-Hub AI now includes **Research Mode** - a powerful web search integration that allows users to get real-time data from across the internet. When enabled, the AI can search for current statistics, trends, news, and insights to answer user queries.

## Features

✅ **Real-time Web Search** - Fetch current data from the internet  
✅ **Intelligent Fallback** - Built-in knowledge base with Kenya-specific data  
✅ **Source Citations** - All research results include clickable sources  
✅ **Smart Detection** - Automatically triggers research for data-related queries  
✅ **Privacy-Focused** - All searches run client-side in the browser  

## How It Works

### Research Mode Toggle

Users can enable Research Mode using the toggle button in the chat header:
- **OFF** (Default): Standard AI responses using built-in knowledge
- **ON**: Web search enabled for real-time data

### Automatic Research Triggers

Research Mode automatically activates when users ask about:
- Statistics and data (`"What is the latest fintech data?"`)
- Current trends (`"Tell me about marketing trends"`)
- News (`"Latest news on Kenya fintech"`)
- General knowledge (`"What is blockchain?"`, `"Tell me about AI"`)

### Knowledge Base (No API Required)

M-Hub includes a comprehensive built-in knowledge base with:
- Kenya fintech sector overview ($2B+ market)
- M-Pesa integration statistics
- Marketing challenges for Kenyan businesses
- Social media ROI data
- Digital marketing trends 2024
- Data protection compliance (Kenya DPA 2019)
- E-commerce growth in East Africa
- WhatsApp Business API benefits
- SEO best practices for Kenya

This knowledge base works **without any API key** and provides instant responses.

## API Integration (Optional)

For **live web search**, you can integrate the Brave Search API.

### Why Brave Search API?

- ✅ **Free Tier**: 2,000 queries/month
- ✅ **No Credit Card Required** for free tier
- ✅ **Privacy-Focused**: No user tracking
- ✅ **Developer-Friendly**: Simple REST API
- ✅ **High Quality Results**: Powered by Brave's independent search index

### Setup Instructions

#### Step 1: Get API Key

1. Visit: [https://brave.com/search/api/](https://brave.com/search/api/)
2. Sign up for a free account
3. Go to your dashboard
4. Copy your API key (starts with `BSA...`)

#### Step 2: Configure Environment Variable

**For Local Development:**

1. Create a `.env` file in the project root:
```bash
VITE_BRAVE_API_KEY=YOUR_API_KEY_HERE
```

2. Restart your development server:
```bash
npm run dev
```

**For Production (GitHub Pages):**

Since GitHub Pages is static hosting, there are two approaches:

**Option A: Client-Side Config (Quick)**

Create `public/config.js`:
```javascript
window.ENV = {
  VITE_BRAVE_API_KEY: 'YOUR_API_KEY_HERE'
}
```

Then update `index.html` to load this before the app:
```html
<script src="/M-hub/config.js"></script>
```

⚠️ **Security Note**: This exposes your API key publicly. Only use with keys that have:
- Rate limiting enabled
- Domain restrictions (if supported)
- Monitoring for abuse

**Option B: Proxy Server (Recommended for Production)**

For production, it's better to:
1. Set up a simple proxy server (e.g., on Vercel/Netlify Functions)
2. Store the API key server-side
3. Route search requests through your proxy

Example proxy endpoint:
```javascript
// api/search.js (Vercel Serverless Function)
export default async function handler(req, res) {
  const { query } = req.query
  const apiKey = process.env.BRAVE_API_KEY // Server-side only
  
  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        'X-Subscription-Token': apiKey,
      }
    }
  )
  
  const data = await response.json()
  res.json(data)
}
```

#### Step 3: Test Research Mode

1. Open M-Hub AI chat
2. Enable "Research ON" toggle
3. Ask: *"What is the latest fintech news in Kenya?"*
4. You should see:
   - "Web Research Result" badge
   - AI response with data
   - Clickable source links

## Usage Examples

### Good Research Queries

✅ **Statistics & Data**
- "What is the current fintech market size in Kenya?"
- "Show me social media marketing statistics 2024"
- "How much does M-Pesa process monthly?"

✅ **Trends & News**
- "Latest digital marketing trends in Africa"
- "Current AI marketing automation trends"
- "Recent news about Kenya Data Protection Act"

✅ **How-To & Explanations**
- "How does WhatsApp Business API work?"
- "What are the best SEO practices for Kenya?"
- "Tell me about e-commerce growth in East Africa"

### Standard Queries (No Research Needed)

🔵 **M-Hub Services**
- "What services do you offer?"
- "How can I contact M-Hub?"
- "Tell me about your pricing"

These will use standard AI responses for faster performance.

## Monitoring & Limits

### Free Tier Limits
- **2,000 queries/month** with Brave Search API
- Resets on the 1st of each month

### Fallback Behavior
- If API limit is reached → Falls back to knowledge base
- If API is down → Falls back to knowledge base
- If no API key → Uses knowledge base only

### Rate Limit Tracking
Monitor your usage at: [https://brave.com/search/api/dashboard](https://brave.com/search/api/dashboard)

## Customization

### Adding to Knowledge Base

Edit `src/services/webSearch.ts` → `getKnowledgeBase()` method:

```typescript
{
  title: 'Your Custom Topic',
  url: 'https://yourdomain.com/topic',
  description: 'Detailed information about your topic...',
  keywords: ['keyword1', 'keyword2', 'kenya'],
  date: '2024-10',
}
```

### Adjusting Search Count

Change the number of results returned:

```typescript
// In src/pages/AskMHub.tsx
const results = await webSearchService.search(userMessage, 10) // Default: 5
```

### Custom Search Providers

To integrate other search APIs (Google Custom Search, Bing, etc.):

1. Edit `src/services/webSearch.ts`
2. Update the `search()` method with your API endpoint
3. Adjust `parseSearchResults()` for the new response format

## Troubleshooting

### "Research Mode not working"

**Check:**
1. Is the toggle switched to "Research ON"?
2. Is your query data-related? (Try "latest trends" or "statistics")
3. Check browser console for errors (F12 → Console)

### "No sources showing"

**Possible causes:**
- No API key configured → Using knowledge base (sources still shown)
- API rate limit reached → Fallback active
- Network error → Check internet connection

### "API Key not working"

**Solutions:**
1. Verify key starts with `BSA...`
2. Check for extra spaces in `.env` file
3. Restart development server after adding key
4. Verify at Brave dashboard that key is active

## Privacy & Security

- ✅ **No User Data Stored**: All searches are ephemeral
- ✅ **Client-Side Execution**: Searches run in the user's browser
- ✅ **No Tracking**: We don't log queries or results
- ⚠️ **API Key Exposure**: Use proxy for production (see Option B above)

## Support

For issues or questions:
- Check `docs/` folder for more documentation
- Raise an issue on GitHub
- Contact: contact@mhub.digital

---

**Built with ❤️ by M-Hub**  
*Empowering Kenya's digital transformation*

