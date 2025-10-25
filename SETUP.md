# M-Hub Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Tailwind CSS
- Three.js & React Three Fiber
- Framer Motion
- Recharts
- React Router DOM
- Lucide Icons

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Step 3: Explore the Platform

#### Public Website
- **Home** (`/`) - Hero with 3D animations, services preview, stats
- **Services** (`/services`) - Detailed service offerings
- **About** (`/about`) - Company information with 3D globe
- **Contact** (`/contact`) - Contact form and information

#### Dashboard (Private)
- **Dashboard** (`/dashboard`) - Overview with charts and metrics
- **Projects** (`/dashboard/projects`) - Project management
- **Leads** (`/dashboard/leads`) - Lead tracking and CRM
- **Analytics** (`/dashboard/analytics`) - Performance analytics
- **Settings** (`/dashboard/settings`) - User preferences

#### AI Assistant
- **Ask M-Hub** (`/ask-mhub`) - AI chat interface with mock responses

## 🎨 Customization

### Update Branding
1. **Logo**: Replace `public/logo.svg` with your logo
2. **Colors**: Edit `tailwind.config.js` color scheme
3. **Fonts**: Update Google Fonts link in `index.html`

### Modify Content
- **Services**: Edit `src/data/services.json`
- **Projects**: Edit `src/data/projects.json`
- **Leads**: Edit `src/data/leads.json`
- **AI Responses**: Edit `src/data/mockResponses.json`

### Add Pages
1. Create new component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

## 🔌 Integrations

### Email Integration (EmailJS)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create service and template
3. Add credentials to `.env`:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
4. Update `src/pages/Contact.tsx` to use EmailJS

### AI Integration (OpenAI)
1. Get API key from [OpenAI](https://platform.openai.com/)
2. Add to `.env`:
```env
VITE_OPENAI_API_KEY=your_api_key
```
3. Update `src/pages/AskMHub.tsx`:
```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: userMessage }],
  }),
})
```

### Analytics (Google Analytics)
1. Get tracking ID from Google Analytics
2. Add to `.env`:
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```
3. Add script to `index.html`

## 📦 Building for Production

### Build
```bash
npm run build
```
Output in `dist/` folder

### Preview Build
```bash
npm run preview
```

## 🌐 Deployment

### GitHub Pages
1. Update `base` in `vite.config.ts`:
```typescript
base: '/your-repo-name/',
```
2. Deploy:
```bash
npm run deploy
```

### Vercel
1. Connect GitHub repo to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Type check
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## 📝 Development Tips

### Hot Module Replacement
- Changes auto-reload during development
- No need to refresh browser

### TypeScript
- All components are fully typed
- Use `Ctrl + Space` for autocomplete
- Hover over props for type information

### Responsive Testing
- Use browser dev tools (F12)
- Test on multiple breakpoints:
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1024px+

## 🎯 Next Steps

1. **Customize Content** - Update with your company information
2. **Add Backend** - Connect to your API endpoints
3. **Set Up Analytics** - Add tracking and monitoring
4. **SEO Optimization** - Add meta tags and sitemap
5. **Performance Testing** - Run Lighthouse audits
6. **Security Review** - Implement auth and data protection

## 📚 Additional Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js Docs](https://threejs.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)

## 💡 Pro Tips

1. **Component Organization**: Keep components small and reusable
2. **State Management**: Use Context API for global state
3. **Code Splitting**: Import pages dynamically for better performance
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **Testing**: Add unit tests with Jest and React Testing Library

---

Need help? Check the [README.md](README.md) or open an issue on GitHub!



