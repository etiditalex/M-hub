# Real-Time Analytics Setup Guide

## Overview

M-Hub has **real-time analytics tracking** integrated for monitoring visitor behavior, device types, locations, and user interactions. The system uses **Google Analytics 4 (GA4)** for comprehensive tracking with a client-side fallback for basic metrics.

---

## Features

### ✅ What's Tracked:

1. **Page Views** - Every route change and page visit
2. **User Sessions** - Unique visitors and returning users
3. **Device Information** - Desktop, Mobile, or Tablet
4. **Browser Type** - Chrome, Firefox, Safari, Edge, etc.
5. **Screen Resolution** - Display dimensions
6. **Referral Source** - How users found your site
7. **Location Data** - Country, region, and city (via GA4)
8. **Real-Time Events**:
   - Button clicks
   - Form submissions
   - WhatsApp contact clicks
   - Research mode toggles
   - Service views
   - Blog/news article reads
   - Outbound link clicks
   - File downloads

---

## Setup Instructions

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Property**, click **Create Property**
4. Enter your property details:
   - Property name: `M-Hub`
   - Reporting timezone: `(GMT+03:00) East Africa Time - Nairobi`
   - Currency: `Kenyan Shilling (KES)`
5. Click **Next** and fill in business details
6. Accept the terms and click **Create**

### 2. Get Your Measurement ID

1. In Google Analytics, go to **Admin** > **Data Streams**
2. Click **Add stream** > **Web**
3. Enter your website URL: `https://etiditalex.github.io/M-hub/`
4. Enter stream name: `M-Hub Website`
5. Click **Create stream**
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Add Your Measurement ID to M-Hub

Open `src/components/Analytics.tsx` and replace the placeholder:

```typescript
// Replace with your Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // TODO: Replace with actual GA4 ID
```

**Example:**
```typescript
const GA_MEASUREMENT_ID = 'G-ABC123XYZ'
```

### 4. Deploy Your Changes

```bash
npm run build
npm run deploy
```

---

## Viewing Real-Time Analytics

### In Google Analytics 4:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your **M-Hub** property
3. Click **Reports** > **Realtime**

You'll see:
- **Active users right now**
- **Views by page**
- **Traffic by source**
- **Device breakdown**
- **Location map**
- **Event count by event name**

### Local Analytics (Fallback):

Even without GA4 setup, M-Hub tracks basic metrics locally:

- Open browser console (F12)
- Navigate through the site
- Check `localStorage` and `sessionStorage` for analytics data

**Example Console Output:**
```javascript
Analytics Data: {
  pageViews: 5,
  uniqueVisitors: 1,
  deviceType: "Desktop",
  browser: "Chrome",
  screenResolution: "1920x1080",
  referrer: "Direct",
  sessionStart: 1698420000000
}
```

---

## Custom Event Tracking

### Built-in Events:

M-Hub automatically tracks these events:

| Event Name | Trigger |
|-----------|---------|
| `page_view` | Every page navigation |
| `button_click` | Any button click with tracking |
| `form_submit` | Contact form submissions |
| `whatsapp_contact` | WhatsApp form opens |
| `research_mode_change` | AI research mode toggle |
| `service_view` | Service page visits |
| `file_download` | File downloads |
| `search` | Blog/news search queries |
| `outbound_link` | External link clicks |

### Adding Custom Events:

Import the tracking functions in any component:

```typescript
import { trackEvent, trackButtonClick } from '../components/Analytics'

// Basic event
trackEvent('custom_event_name', {
  custom_param: 'value'
})

// Button click with context
trackButtonClick('Start Project', 'Hero Section')
```

**Example:**
```typescript
// Track when user clicks "Start Your Project"
<button onClick={() => {
  trackButtonClick('Start Project', 'Services Page')
  openWhatsAppForm()
}}>
  Start Your Project
</button>
```

---

## Privacy & Compliance

### GDPR/Data Protection:

- Analytics run **client-side only**
- No personal data is stored by M-Hub
- Google Analytics anonymizes IP addresses
- Users can disable tracking via browser settings

### Best Practices:

1. Add a **Cookie Consent Banner** (optional but recommended):
   ```tsx
   // Install: npm install react-cookie-consent
   import CookieConsent from "react-cookie-consent";
   
   <CookieConsent>
     This website uses cookies to enhance user experience.
   </CookieConsent>
   ```

2. Add a **Privacy Policy** page explaining data collection
3. Include opt-out instructions for users

---

## Troubleshooting

### Analytics Not Working?

**Check:**
1. ✅ Measurement ID is correct in `Analytics.tsx`
2. ✅ Site is deployed (analytics load after deployment)
3. ✅ Ad blockers are disabled (GA4 may be blocked)
4. ✅ Browser console for errors (F12 > Console)

**Test Locally:**
```bash
npm run dev
# Open http://localhost:5173
# Open browser console (F12)
# Navigate through pages
# Check for "Analytics Data:" logs
```

### Real-Time Not Showing?

- GA4 real-time can take **30-60 seconds** to show data
- Refresh the Real-time report page
- Try opening the site in an **incognito window**

### IP Addresses Not Tracked?

- **Client-side apps cannot track IP addresses directly**
- GA4 handles this server-side and provides **location data** instead
- You'll see: Country, Region, City (not exact IP)

---

## Advanced: Dashboard Integration

Want to show analytics **inside M-Hub**?

Use the **Google Analytics Data API**:

```bash
npm install @google-analytics/data
```

Create a dashboard component:

```typescript
// src/pages/DashboardAnalytics.tsx
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Fetch real-time metrics
const analyticsDataClient = new BetaAnalyticsDataClient();
const [response] = await analyticsDataClient.runRealtimeReport({
  property: `properties/${PROPERTY_ID}`,
  metrics: [{ name: 'activeUsers' }],
});
```

---

## Reporting & Insights

### Recommended Reports:

1. **Traffic Sources**: Where visitors come from
2. **Device Category**: Mobile vs Desktop usage
3. **Popular Pages**: Most visited pages
4. **User Flow**: Navigation patterns
5. **Conversion Tracking**: Form submissions, WhatsApp clicks

### Weekly Report Setup:

1. In GA4, go to **Library** > **Reports**
2. Click **Create Report**
3. Add metrics you want to track
4. Schedule **weekly email reports**

---

## Support

For analytics questions:
- 📧 Email: contact@mhub.digital
- 📱 WhatsApp: +254 796 988686

For GA4 help:
- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

---

Built by **Alex Etidit** | M-Hub 2025

