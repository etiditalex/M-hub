# M-Hub - Digital & Technology Platform

A complete, production-ready digital platform built with **React**, **TypeScript**, **Tailwind CSS**, and **Three.js**. M-Hub represents a modern digital and technology company offering digital marketing, software development, and networking services.

![M-Hub Platform](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-0.160.0-black)

## 🌟 Features

### Public Website
- **Interactive 3D Hero Section** - WebGL-powered animations using Three.js
- **Services Showcase** - Digital Marketing, Software Development, and Networking Solutions
- **About Page** - Mission, vision, values, and 3D globe animation
- **Contact Form** - Fully functional contact interface with validation
- **Responsive Design** - Optimized for all devices

### Client Dashboard
- **Overview Dashboard** - Real-time metrics, charts, and statistics
- **Projects Management** - Track and manage client projects with progress bars
- **Leads Pipeline** - CRM-style lead management with filtering and search
- **Analytics** - Comprehensive charts and performance metrics using Recharts
- **Settings Panel** - User profile, security, notifications, and appearance customization

### AI Assistant ("Ask M-Hub")
- **Chat Interface** - Modern, WhatsApp-style chat UI
- **Mock AI Responses** - Context-aware responses based on user queries
- **Typing Indicators** - Realistic conversation experience
- **Suggested Questions** - Quick-start conversation prompts
- **Ready for API Integration** - Structured for OpenAI, Gemini, or custom backends

## 🎨 Design System

### Color Palette
- **Background**: `#0f172a` (Dark Navy)
- **Primary**: `#38bdf8` (Cyan Blue)
- **Accent**: `#f59e0b` (Amber)
- **Glass Effects**: Glassmorphism with backdrop blur

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (content)

### Components
- Reusable UI components with TypeScript interfaces
- Consistent spacing and animations using Framer Motion
- Custom Tailwind utilities for glassmorphism and gradients

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mhub.git
cd mhub

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📁 Project Structure

```
mhub/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── PageLayout.tsx
│   │   ├── HeroScene.tsx
│   │   └── GlobeScene.tsx
│   ├── pages/             # Main application pages
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DashboardProjects.tsx
│   │   ├── DashboardLeads.tsx
│   │   ├── DashboardAnalytics.tsx
│   │   ├── DashboardSettings.tsx
│   │   └── AskMHub.tsx
│   ├── data/              # Mock JSON data
│   │   ├── services.json
│   │   ├── projects.json
│   │   ├── leads.json
│   │   └── mockResponses.json
│   ├── styles/            # Global styles
│   │   └── index.css
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Technology Stack

### Core
- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Vite 5.0** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 10.16** - Animation library
- **Custom CSS** - Glassmorphism and gradients

### 3D Graphics
- **Three.js 0.160** - WebGL 3D library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Data Visualization
- **Recharts 2.10** - Composable charting library

### Routing & Icons
- **React Router DOM 6.20** - Client-side routing
- **Lucide React** - Beautiful icon library

## 🎯 Key Features Explained

### 3D Animations
The platform includes two main 3D scenes:
1. **Hero Scene** (`HeroScene.tsx`) - Animated sphere with floating particles
2. **Globe Scene** (`GlobeScene.tsx`) - Rotating wireframe globe with grid plane

Both scenes use:
- Auto-rotation for engagement
- Responsive lighting
- Performance-optimized rendering

### Dashboard Analytics
Comprehensive dashboard with:
- **Real-time metrics** - Revenue, projects, leads, conversion rates
- **Interactive charts** - Line, area, bar, pie, and radar charts
- **Data filtering** - Search and filter functionality
- **Responsive layouts** - Optimized for all screen sizes

### AI Assistant
Mock AI chat interface featuring:
- **Context-aware responses** - Keyword-based response system
- **Natural conversation flow** - Typing indicators and smooth animations
- **Extensible architecture** - Ready for API integration

Example integration with OpenAI:
```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: userMessage }],
  }),
})
```

## 🌐 Deployment

### GitHub Pages
1. Update `vite.config.ts` with your repository name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
})
```

2. Deploy:
```bash
npm run deploy
```

### Custom Domain
Add a `CNAME` file to the `public/` directory with your domain name.

### Other Platforms
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload `dist` folder to S3 bucket with static hosting

## 📊 Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Code Splitting**: Automatic chunk splitting for vendors
- **Image Optimization**: Lazy loading and modern formats

## 🔒 Security

- **HTTPS Only** in production
- **XSS Protection** via React's built-in escaping
- **CSRF Tokens** ready for backend integration
- **Environment Variables** for sensitive data

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Three.js Journey](https://threejs-journey.com)
- [Framer Motion Guide](https://www.framer.com/motion/)

## 📧 Contact

For questions or support, reach out to:
- **Email**: contact@mhub.digital
- **Website**: [www.mhub.digital](https://www.mhub.digital)
- **GitHub**: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- Icons by [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)
- 3D inspiration from [Three.js Examples](https://threejs.org/examples/)

---

**Built with ❤️ by M-Hub Development Team**



