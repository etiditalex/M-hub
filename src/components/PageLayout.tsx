import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import RecommendationsPanel from '../predictiveAI/components/RecommendationsPanel'

interface PageLayoutProps {
  children: ReactNode
  showAI?: boolean
}

const PageLayout = ({ children, showAI = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
      {showAI && <RecommendationsPanel />}
    </div>
  )
}

export default PageLayout



