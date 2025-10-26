import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'

interface WhatsAppContactFormProps {
  isOpen: boolean
  onClose: () => void
}

const WhatsAppContactForm = ({ isOpen, onClose }: WhatsAppContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const services = [
    'Digital Marketing',
    'Software Development',
    'Social Media Management',
    'SEO & Content Strategy',
    'E-commerce Solutions',
    'AI Marketing Automation',
    'Fintech Integration',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format WhatsApp message
    const message = `
*New Project Inquiry from M-Hub Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service Interested:* ${formData.service}

*Message:*
${formData.message}

---
Sent from M-Hub Contact Form
    `.trim()

    // WhatsApp phone number (format: country code + number without + or spaces)
    // Kenya: 254796988686 or 254780460617
    const whatsappNumber = '254796988686'

    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappUrl, '_blank')

    // Close modal after a short delay
    setTimeout(() => {
      onClose()
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })
    }, 500)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl bg-dark-800 rounded-2xl shadow-2xl overflow-hidden border border-primary-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Start Your Project</h2>
                  <p className="text-sm text-white/80">We'll connect via WhatsApp</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="+254 700 000 000"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                Service Needed *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="">Select a service...</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                placeholder="Tell us about your project, goals, timeline, and budget..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send to WhatsApp
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-400 text-center">
              By submitting this form, you'll be redirected to WhatsApp to continue the conversation with our team.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WhatsAppContactForm

