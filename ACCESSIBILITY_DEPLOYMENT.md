# Deploying M-Hub with Accessibility Features

Complete guide for deploying M-Hub with Sign-Language accessibility features to GitHub Pages.

---

## 📋 Pre-Deployment Checklist

### ✅ Dependencies Installed

```bash
npm install
```

Verify these packages are installed:
- `@tensorflow/tfjs`
- `@tensorflow-models/handpose`
- `@mediapipe/hands`
- `react-webcam`

### ✅ Local Testing Complete

```bash
npm run dev
```

Test all features locally:
- [ ] Sign-Language Mode toggle works
- [ ] Camera permissions granted
- [ ] Gestures detected correctly
- [ ] 3D avatar renders
- [ ] Voice output works
- [ ] Instructions modal displays

---

## 🚀 Deployment Steps

### Step 1: Build for Production

```bash
npm run build
```

**Expected output:**
```
✓ 3097+ modules transformed
✓ Built in ~30-40s
dist/index.html
dist/assets/*.js
dist/assets/*.css
```

### Step 2: Test Production Build

```bash
npm run preview
```

Visit `http://localhost:4173/M-hub/` and verify:
- All pages load correctly
- Accessibility mode works
- No console errors
- Assets load properly

### Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Run `npm run build`
2. Push to `gh-pages` branch
3. Deploy to GitHub Pages

**Expected output:**
```
> gh-pages -d dist
Published
```

### Step 4: Verify Deployment

Visit: `https://etiditalex.github.io/M-hub/ask-mhub`

1. Wait 2-3 minutes for deployment
2. Hard refresh browser (Ctrl+Shift+R)
3. Test accessibility button appears
4. Enable Sign-Language Mode
5. Grant camera permissions
6. Test gesture detection

---

## 🔍 Post-Deployment Verification

### Functionality Tests

| Feature | Test | Status |
|---------|------|--------|
| Toggle Button | Appears bottom-right | ⬜ |
| Camera Access | Permission prompt shows | ⬜ |
| Gesture Detection | Hand recognized | ⬜ |
| Text Accumulation | Letters added to box | ⬜ |
| Send Message | Integrates with chat | ⬜ |
| 3D Avatar | Renders and animates | ⬜ |
| Voice Output | Speaks responses | ⬜ |
| Subtitles | Display with highlighting | ⬜ |
| Instructions | Modal opens/closes | ⬜ |

### Browser Testing

Test on multiple browsers:

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✅ | ✅ | Best performance |
| Edge | ✅ | ✅ | Chromium-based |
| Firefox | ⚠️ | ⚠️ | Limited MediaPipe |
| Safari | ⚠️ | ✅ | WebGL limitations |

### Performance Checks

Use Chrome DevTools:

```
1. Open DevTools (F12)
2. Go to Performance tab
3. Record while using accessibility mode
4. Check for:
   - FPS > 30 (ideally 60)
   - No memory leaks
   - Smooth animations
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Assets Not Loading

**Symptoms**: 404 errors in console, broken styles/scripts

**Fix**:
```bash
# Check vite.config.ts base path
base: '/M-hub/'  # Must match repo name

# Rebuild and redeploy
npm run deploy
```

### Issue 2: Camera Not Working

**Symptoms**: Permission denied or camera doesn't start

**Fix**:
- Ensure HTTPS (GitHub Pages uses HTTPS automatically)
- Check browser permissions
- Verify camera not in use by another app
- Try incognito mode to test fresh permissions

### Issue 3: TensorFlow.js Not Loading

**Symptoms**: "Model failed to load" error

**Fix**:
```javascript
// Check network tab for failed requests
// Ensure @tensorflow/tfjs loads correctly
// May need to increase timeout for slower connections
```

### Issue 4: 3D Avatar Not Rendering

**Symptoms**: Black box or no avatar

**Fix**:
- Check WebGL support: `chrome://gpu/`
- Update graphics drivers
- Test on different device
- Check console for Three.js errors

### Issue 5: Voice Not Working

**Symptoms**: No speech output

**Fix**:
- Check browser supports Web Speech API
- Verify device not muted
- Test with different browser
- Check speakers/headphones connected

---

## 🔧 Configuration for Production

### Environment Variables

Create `.env.production`:

```env
# Optional: Analytics
VITE_GA_TRACKING_ID=your_tracking_id

# Optional: Error tracking
VITE_SENTRY_DSN=your_sentry_dsn
```

### Performance Optimization

#### 1. Lazy Loading

Already implemented:
```typescript
const SignLanguageMode = lazy(() => import('./accessibility/SignLanguageMode'))
```

#### 2. Code Splitting

Configure in `vite.config.ts`:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'accessibility-vendor': [
          '@tensorflow/tfjs',
          '@tensorflow-models/handpose',
          'react-webcam'
        ]
      }
    }
  }
}
```

#### 3. Asset Compression

```bash
# Install compression plugin
npm install vite-plugin-compression -D

# Add to vite.config.ts
import viteCompression from 'vite-plugin-compression'

plugins: [
  react(),
  viteCompression()
]
```

---

## 📊 Monitoring & Analytics

### Track Accessibility Usage

Add analytics to `SignLanguageMode.tsx`:

```typescript
const handleToggleMode = () => {
  if (!isActive) {
    // Track feature usage
    if (window.gtag) {
      window.gtag('event', 'accessibility_enabled', {
        event_category: 'Accessibility',
        event_label: 'Sign Language Mode'
      })
    }
  }
  setIsActive(!isActive)
}
```

### Error Tracking

Implement error boundary:

```typescript
import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary
  fallback={<AccessibilityError />}
  onError={(error) => console.error('Accessibility error:', error)}
>
  <SignLanguageMode />
</ErrorBoundary>
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Already Configured)

Workflow file: `.github/workflows/deploy.yml`

Automatic deployment on push to `main`:

```yaml
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout
      - Install dependencies
      - Build
      - Deploy to GitHub Pages
```

### Manual Deployment

If automatic fails:

```bash
# 1. Build locally
npm run build

# 2. Deploy manually
npx gh-pages -d dist

# 3. Force push if needed
npx gh-pages -d dist -f
```

---

## 📱 Mobile Optimization

### Tips for Better Mobile Experience

1. **Touch Targets**: Buttons are 44x44px minimum
2. **Viewport**: Responsive design included
3. **Performance**: Lazy loading reduces initial load
4. **Camera**: Rear camera recommended on mobile

### Mobile-Specific Configuration

```typescript
// Detect mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// Adjust detection interval for mobile
const detectionInterval = isMobile ? 750 : 500
```

---

## 🌐 Custom Domain Setup

### Option 1: GitHub Pages Custom Domain

1. Add `CNAME` file to `public/`:
```
mhub.yourdomain.com
```

2. Configure DNS:
```
CNAME   mhub   etiditalex.github.io
```

### Option 2: Cloudflare Pages

1. Connect GitHub repo to Cloudflare
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy!

---

## 📈 Performance Benchmarks

### Target Metrics

| Metric | Target | Accessibility Mode |
|--------|--------|-------------------|
| First Load | < 3s | < 5s (with TF.js) |
| FPS | 60 | 30-60 |
| Memory | < 100MB | < 200MB |
| Bundle Size | < 500KB | < 2MB (lazy loaded) |

### Optimization Results

Before optimization:
- Initial bundle: 1.6MB
- TensorFlow.js: 12MB

After optimization:
- Initial bundle: 800KB
- TF.js lazy loaded: Only when needed

---

## 🎯 Launch Checklist

### Pre-Launch

- [ ] All features tested locally
- [ ] Browser compatibility verified
- [ ] Mobile responsive checked
- [ ] Accessibility documentation complete
- [ ] Performance optimized
- [ ] Error handling implemented
- [ ] Analytics configured (optional)

### Launch Day

- [ ] Deploy to production
- [ ] Verify live site
- [ ] Test on multiple devices
- [ ] Monitor for errors
- [ ] Announce feature release

### Post-Launch

- [ ] Monitor analytics
- [ ] Collect user feedback
- [ ] Fix reported bugs
- [ ] Plan feature enhancements
- [ ] Update documentation

---

## 🎓 User Education

### Announce the Feature

**Example announcement:**

```markdown
🎉 New Feature: Sign-Language Mode!

M-Hub now includes real-time ASL gesture recognition!

✨ Features:
- Webcam-based sign detection
- 3D avatar responses
- Voice output with subtitles
- Complete privacy (runs locally)

Try it now: https://etiditalex.github.io/M-hub/ask-mhub

Click the ♿ button to get started!
```

### Create Tutorial Video

**Topics to cover:**
1. Enabling accessibility mode
2. Granting camera permissions
3. Making ASL signs
4. Sending messages
5. Avatar responses
6. Voice controls

---

## 📞 Support & Maintenance

### User Support

Set up support channels:
- Email: accessibility@mhub.digital
- GitHub Issues: Bug reports
- FAQ: Common questions

### Maintenance Schedule

**Weekly:**
- Check error logs
- Monitor performance
- Review user feedback

**Monthly:**
- Update dependencies
- Add new gestures
- Improve detection accuracy

**Quarterly:**
- Major feature updates
- Security audits
- Performance reviews

---

## 🏆 Success Metrics

Track these KPIs:

1. **Adoption Rate**: % of users enabling accessibility mode
2. **Engagement**: Average session duration
3. **Accuracy**: Gesture detection success rate
4. **Performance**: FPS and load times
5. **Satisfaction**: User feedback and ratings

---

## 🎊 Congratulations!

You've successfully deployed M-Hub with comprehensive accessibility features!

**Next Steps:**
1. Share with the community
2. Gather feedback
3. Iterate and improve
4. Expand gesture library
5. Add more sign languages

---

**Built with ❤️ for inclusive digital access**

*Questions?* Contact: accessibility@mhub.digital

