import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface PageLayoutProps {
  children: ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default PageLayout



