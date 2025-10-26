import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import Button from '../components/Button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'contact@mhub.digital',
      link: 'mailto:contact@mhub.digital',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '0796988686 / 0780460617',
      link: 'tel:+254796988686',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Nyali, Along Links Road, Mombasa',
      link: 'https://maps.google.com/?q=Nyali,Links+Road,Mombasa',
    },
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Have a question or ready to start your project? We'd love to hear from
              you. Reach out and let's create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                    <a
                      href={info.link}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {info.content}
                    </a>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <Card>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400">
                      Thank you for contacting us. We'll be in touch soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="textarea-field"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Why Choose M-Hub?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Fast Response Time',
                    desc: 'We typically respond to inquiries within 24 hours',
                  },
                  {
                    title: 'Expert Consultation',
                    desc: 'Get professional advice tailored to your needs',
                  },
                  {
                    title: 'Transparent Pricing',
                    desc: 'No hidden fees, just honest and fair pricing',
                  },
                  {
                    title: 'Ongoing Support',
                    desc: 'Dedicated support throughout your project journey',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Our Location</h3>
                <p className="text-gray-400">Nyali, Along Links Road</p>
                <p className="text-gray-400">Mombasa, Kenya</p>
                <a
                  href="https://maps.google.com/?q=Nyali,Links+Road,Mombasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-primary-400 hover:text-primary-300 underline"
                >
                  View on Google Maps →
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Contact



