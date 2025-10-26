import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Code, Network, Check } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import HeroScene from '../components/HeroScene'
import SocialMediaDrive from '../components/SocialMediaDrive'
import Card from '../components/Card'

const Home = () => {
  const services = [
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic campaigns that drive growth and engagement',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom solutions built with cutting-edge technology',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: Network,
      title: 'Networking Solutions',
      description: 'Robust infrastructure for seamless connectivity',
      color: 'from-primary-400 to-primary-500',
    },
  ]

  const stats = [
    { value: '200+', label: 'Projects Completed' },
    { value: '150+', label: 'Happy Clients' },
    { value: '50+', label: 'Team Members' },
    { value: '99%', label: 'Success Rate' },
  ]

  const features = [
    'Cutting-edge Technology Stack',
    '24/7 Customer Support',
    'Scalable Solutions',
    'Data-Driven Strategies',
    'Expert Consultation',
    'Transparent Communication',
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Suspense fallback={<div className="w-full h-full bg-dark-800" />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Empowering{' '}
                <span className="gradient-text">Digital, Software</span>
                <br />
                & Networking Solutions
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Transform your business with innovative technology solutions. We deliver
              excellence in digital marketing, software development, and networking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/services" className="btn-primary flex items-center justify-center space-x-2">
                <span>Explore Services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Contact Us
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Social Media 3D Animation */}
      <SocialMediaDrive />

      {/* Services Preview */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Why Choose <span className="gradient-text">M-Hub</span>?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We combine expertise, innovation, and dedication to deliver
                exceptional results that drive your business forward.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8">
                <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-4">10+</div>
                    <p className="text-xl text-gray-300">Years of Excellence</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fintech AI Solutions Section */}
      <section className="section-padding bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Revolutionizing <span className="gradient-text">Kenya's Fintech Marketing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kenya processes over $2 billion monthly in fintech transactions. Our AI platform solves the unique challenges marketers face in Africa's digital finance leader.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center p-8 hover:scale-105 transition-transform">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">45% Lower CAC</h3>
                <p className="text-gray-400 mb-4">
                  AI-powered predictive targeting reduces customer acquisition costs by an average of 45% for fintech companies
                </p>
                <Link to="/blog/fintech-marketing-challenges-kenya-ai-solutions" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center p-8 hover:scale-105 transition-transform">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent-500 to-primary-600 rounded-2xl flex items-center justify-center">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Multi-Channel Attribution</h3>
                <p className="text-gray-400 mb-4">
                  Track the entire customer journey across M-Pesa, USSD, apps, social media, and SMS with AI-powered attribution
                </p>
                <Link to="/newsroom/kenya-fintech-2-billion-transactions" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center p-8 hover:scale-105 transition-transform">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-600 to-accent-400 rounded-2xl flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">CBK Compliance</h3>
                <p className="text-gray-400 mb-4">
                  Automated compliance checking ensures all fintech marketing meets Central Bank of Kenya regulations
                </p>
                <Link to="/newsroom/mhub-fintech-ai-marketing-suite" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2">
                  Discover <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Kenya's Fintech Challenges</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-white">Market Saturation:</strong>
                        <span className="text-gray-400"> 50+ fintechs competing, CAC increased 180% in 3 years</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-white">Complex Attribution:</strong>
                        <span className="text-gray-400"> Multi-channel journeys across mobile money, USSD, apps</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-white">Data Fragmentation:</strong>
                        <span className="text-gray-400"> Customer data siloed across M-Pesa, banks, CRMs, social</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-white">Trust Deficit:</strong>
                        <span className="text-gray-400"> Building trust quickly in a market with fraud concerns</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-6">M-Hub's AI Solutions</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-white">Predictive Targeting:</strong>
                        <span className="text-gray-400"> AI identifies high-value prospects, reduces CAC 45%</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-white">Smart Attribution:</strong>
                        <span className="text-gray-400"> Track every touchpoint with ML-powered attribution engine</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-white">Unified Data:</strong>
                        <span className="text-gray-400"> Integrate M-Pesa APIs, banks, social—one customer view</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-white">Trust AI:</strong>
                        <span className="text-gray-400"> Personalized security messaging and social proof</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center pt-8 border-t border-white/10">
                <Link to="/blog/kenya-marketing-challenges-ai-solutions" className="btn-primary inline-flex items-center gap-2">
                  See How It Works <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600/20 to-accent-600/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Get Started Today
              </Link>
              <Link to="/ask-mhub" className="btn-secondary">
                Ask Our AI Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Home



