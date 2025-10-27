import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Analytics, { initializeLocalAnalytics } from './components/Analytics'
import Home from './pages/Home'
import Services from './pages/Services'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Newsroom from './pages/Newsroom'
import NewsArticle from './pages/NewsArticle'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import DashboardProjects from './pages/DashboardProjects'
import DashboardLeads from './pages/DashboardLeads'
import DashboardAnalytics from './pages/DashboardAnalytics'
import DashboardSettings from './pages/DashboardSettings'
import PredictiveAnalytics from './pages/PredictiveAnalytics'
import AskMHub from './pages/AskMHub'

function App() {
  useEffect(() => {
    // Initialize local analytics on app mount
    initializeLocalAnalytics()
  }, [])

  return (
    <Router basename="/M-hub">
      <Analytics />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/newsroom" element={<Newsroom />} />
          <Route path="/newsroom/:slug" element={<NewsArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/projects" element={<DashboardProjects />} />
          <Route path="/dashboard/leads" element={<DashboardLeads />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
          <Route path="/ask-mhub" element={<AskMHub />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App



