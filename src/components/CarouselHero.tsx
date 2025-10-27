import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Target, Rocket, TrendingUp, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    title: 'AI-Powered Digital Marketing',
    subtitle: 'Transform Your Business with Intelligence',
    description: 'Leverage cutting-edge AI technology to optimize campaigns, predict trends, and drive unprecedented growth.',
    icon: Sparkles,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    stats: [
      { value: '45%', label: 'CAC Reduction' },
      { value: '3x', label: 'ROI Increase' },
      { value: '24/7', label: 'AI Support' },
    ],
  },
  {
    id: 2,
    title: 'Predictive Analytics Platform',
    subtitle: 'Know What Happens Before It Does',
    description: 'Our ML-powered engine predicts customer behavior, conversion likelihood, and optimal engagement times.',
    icon: Target,
    cta: 'View Analytics',
    ctaLink: '/predictive-analytics',
    stats: [
      { value: '92%', label: 'Accuracy' },
      { value: '1000+', label: 'Predictions/Day' },
      { value: '50%', label: 'Time Saved' },
    ],
  },
  {
    id: 3,
    title: 'Scale Your Business Fast',
    subtitle: 'From Startup to Industry Leader',
    description: 'Complete digital transformation suite: Marketing, Development, AI Integration, and Real-time Analytics.',
    icon: Rocket,
    cta: 'Explore Services',
    ctaLink: '/services',
    stats: [
      { value: '200+', label: 'Projects' },
      { value: '150+', label: 'Clients' },
      { value: '99%', label: 'Success Rate' },
    ],
  },
  {
    id: 4,
    title: 'Real-Time AI Insights',
    subtitle: 'Make Data-Driven Decisions Instantly',
    description: 'Get live predictions on user behavior, conversion probability, and engagement patterns powered by our AI engine.',
    icon: TrendingUp,
    cta: 'See Insights',
    ctaLink: '/admin/insights',
    stats: [
      { value: '100%', label: 'Client-Side' },
      { value: 'Real-Time', label: 'Updates' },
      { value: 'Privacy', label: 'First' },
    ],
  },
]

const CarouselHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #4fd573 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Main Content Container */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                {/* Small Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-500 text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>Slide {currentSlide + 1} of {slides.length}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-sm md:text-base font-semibold text-primary-500 uppercase tracking-wider">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                    {slide.description}
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/50"
                  >
                    {slide.cta}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
                >
                  {slide.stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-3xl md:text-4xl font-bold text-primary-500">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Side - White Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary-500/20 border-2 border-primary-500/20">
                  {/* Icon */}
                  <div className="inline-flex p-6 bg-primary-500/10 rounded-2xl mb-6">
                    <Icon className="w-16 h-16 text-primary-500" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-3xl font-bold text-black mb-4">
                    {slide.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    {slide.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-black font-medium">
                          {stat.label}: <span className="text-primary-500 font-bold">{stat.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card CTA */}
                  <Link
                    to={slide.ctaLink}
                    className="block w-full text-center px-6 py-3 bg-black hover:bg-primary-500 text-white hover:text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.cta}
                  </Link>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-3 bg-white/10 hover:bg-primary-500 text-white rounded-full transition-all duration-300 border border-white/20 hover:border-primary-500"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-primary-500'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-3 bg-white/10 hover:bg-primary-500 text-white rounded-full transition-all duration-300 border border-white/20 hover:border-primary-500"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </section>
  )
}

export default CarouselHero

