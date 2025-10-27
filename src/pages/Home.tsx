import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Code, Network, Check } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import CarouselHero from '../components/CarouselHero'
import SocialMediaDrive from '../components/SocialMediaDrive'
import Card from '../components/Card'
import WhatsAppContactForm from '../components/WhatsAppContactForm'
import SEO from '../components/SEO'

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
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
      <SEO
        title="M-Hub - Digital Marketing & AI Solutions in Kenya"
        description="Transform your business with M-Hub's AI-powered digital marketing, social media management, fintech integration, and custom software development services in Kenya."
        keywords={[
          'digital marketing Kenya',
          'AI marketing automation',
          'social media management Kenya',
          'SEO services Mombasa',
          'fintech marketing Kenya',
          'M-Pesa integration',
          'TikTok Shop Kenya',
          'software development Kenya',
          'WhatsApp Business API',
          'web development Mombasa',
        ]}
        url="https://etiditalex.github.io/M-hub/"
      />
      {/* Carousel Hero Section */}
      <CarouselHero />

      {/* Social Media 3D Animation */}
      <SocialMediaDrive />

      {/* Services Preview */}
      <section className="section-padding bg-white text-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-dark-900">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
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
                  <div className="card-white-hover h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-dark-900">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
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
      <section className="section-padding bg-gradient-to-b from-white/5 to-transparent">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
                Why Choose <span className="gradient-text">M-Hub</span>?
              </h2>
              <p className="text-base text-gray-400 mb-8">
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
      <section className="section-padding bg-white text-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-dark-900">
              Revolutionizing <span className="gradient-text">Kenya's Fintech Marketing</span>
            </h2>
            <p className="text-base text-gray-700 max-w-3xl mx-auto">
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
              <div className="card-white-hover h-full text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">45% Lower CAC</h3>
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered predictive targeting reduces customer acquisition costs by an average of 45% for fintech companies
                </p>
                <Link to="/blog/fintech-marketing-challenges-kenya-ai-solutions" className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 font-medium">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-white-hover h-full text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent-500 to-primary-600 rounded-2xl flex items-center justify-center">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Multi-Channel Attribution</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Track the entire customer journey across M-Pesa, USSD, apps, social media, and SMS with AI-powered attribution
                </p>
                <Link to="/newsroom/kenya-fintech-2-billion-transactions" className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 font-medium">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="card-white-hover h-full text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-600 to-accent-400 rounded-2xl flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">CBK Compliance</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Automated compliance checking ensures all fintech marketing meets Central Bank of Kenya regulations
                </p>
                <Link to="/newsroom/mhub-fintech-ai-marketing-suite" className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 font-medium">
                  Discover <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-white p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-dark-900">Kenya's Fintech Challenges</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-dark-900">Market Saturation:</strong>
                        <span className="text-gray-600"> 50+ fintechs competing, CAC increased 180% in 3 years</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-dark-900">Complex Attribution:</strong>
                        <span className="text-gray-600"> Multi-channel journeys across mobile money, USSD, apps</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-dark-900">Data Fragmentation:</strong>
                        <span className="text-gray-600"> Customer data siloed across M-Pesa, banks, CRMs, social</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 text-sm">✗</span>
                      </div>
                      <div>
                        <strong className="text-dark-900">Trust Deficit:</strong>
                        <span className="text-gray-600"> Building trust quickly in a market with fraud concerns</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-dark-900">M-Hub's AI Solutions</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-dark-900">Predictive Targeting:</strong>
                        <span className="text-gray-600"> AI identifies high-value prospects, reduces CAC 45%</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-dark-900">Smart Attribution:</strong>
                        <span className="text-gray-600"> Track every touchpoint with ML-powered attribution engine</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-dark-900">Unified Data:</strong>
                        <span className="text-gray-600"> Integrate M-Pesa APIs, banks, social—one customer view</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <strong className="text-dark-900">Trust AI:</strong>
                        <span className="text-gray-600"> Personalized security messaging and social proof</span>
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600/10 to-accent-600/10 backdrop-blur-sm">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsFormOpen(true)} 
                className="btn-primary"
              >
                Get Started Today
              </button>
              <Link to="/ask-mhub" className="btn-secondary">
                Ask Our AI Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Contact Form Modal */}
      <WhatsAppContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </PageLayout>
  )
}

export default Home



