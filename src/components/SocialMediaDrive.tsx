import { Suspense, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3
} from 'lucide-react'
import SocialMediaScene from './SocialMediaScene'
import Card from './Card'
import { Link } from 'react-router-dom'

export default function SocialMediaDrive() {
  const [activeMetric, setActiveMetric] = useState(0)

  const metrics = [
    {
      icon: Users,
      value: '3.2M',
      label: 'Reach Generated',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: ShoppingCart,
      value: '156%',
      label: 'Conversion Increase',
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10',
    },
    {
      icon: DollarSign,
      value: 'KES 4.2M',
      label: 'Sales Generated',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: TrendingUp,
      value: '387%',
      label: 'ROI Achieved',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ]

  const socialPlatforms = [
    { name: 'Facebook', color: '#1877f2', percentage: 32, sales: 'KES 1.3M' },
    { name: 'Instagram', color: '#e4405f', percentage: 28, sales: 'KES 1.2M' },
    { name: 'LinkedIn', color: '#0077b5', percentage: 18, sales: 'KES 756K' },
    { name: 'Twitter/X', color: '#1da1f2', percentage: 12, sales: 'KES 504K' },
    { name: 'WhatsApp', color: '#25d366', percentage: 6, sales: 'KES 252K' },
    { name: 'YouTube', color: '#ff0000', percentage: 4, sales: 'KES 168K' },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 font-semibold text-sm">AI-Powered Social Media Marketing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Watch Your <span className="gradient-text">Sales Soar</span> with Social Media
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Our AI platform connects all your social channels into one intelligent system that drives real revenue
          </p>
        </motion.div>

        {/* 3D Animation Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden p-0 border-primary-500/20">
            <Suspense fallback={
              <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-primary-500/5 to-accent-500/5">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading 3D Experience...</p>
                </div>
              </div>
            }>
              <SocialMediaScene />
            </Suspense>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 glass rounded-full">
              <p className="text-sm text-primary-400 font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                All Channels Connected & Optimized
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setActiveMetric(index)}
            >
              <Card className={`text-center p-6 cursor-pointer transition-all duration-300 ${
                activeMetric === index ? 'scale-105 border-primary-500/50' : ''
              }`}>
                <div className={`w-16 h-16 mx-auto mb-4 ${metric.bgColor} rounded-2xl flex items-center justify-center`}>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                <div className={`text-3xl font-semibold mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Breakdown */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Platform Performance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary-400" />
                Sales by Platform
              </h3>
              <div className="space-y-4">
                {socialPlatforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: platform.color }}
                        />
                        <span className="font-semibold">{platform.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-primary-400 font-semibold">{platform.sales}</span>
                        <span className="text-gray-500 text-sm ml-2">({platform.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${platform.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right: How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-8 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <h3 className="text-xl font-semibold mb-6">How M-Hub Drives Social Sales</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">AI-Powered Targeting</h4>
                    <p className="text-gray-400 text-sm">
                      Machine learning identifies your highest-value prospects across all platforms
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Unified Attribution</h4>
                    <p className="text-gray-400 text-sm">
                      Track every customer touchpoint from first ad to final purchase across channels
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-Time Optimization</h4>
                    <p className="text-gray-400 text-sm">
                      AI automatically adjusts budgets, creative, and targeting to maximize sales
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Conversion Tracking</h4>
                    <p className="text-gray-400 text-sm">
                      Direct integration with M-Pesa, online stores, and CRMs for accurate ROI
                    </p>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-500/30">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to 3X Your Social Media ROI?
            </h3>
            <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 150+ Kenyan businesses using M-Hub's AI to turn social media followers into paying customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/blog/kenya-marketing-challenges-ai-solutions" className="btn-secondary inline-flex items-center gap-2">
                See Case Studies <TrendingUp className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeMetric !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

