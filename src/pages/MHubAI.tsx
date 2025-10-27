import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Image, Type, Box, ArrowRight } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import PageLayout from '../components/PageLayout'
import SEO from '../components/SEO'

/**
 * Animated particle background
 */
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  
  const particlesCount = 2000
  const positions = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4fd573"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Glowing orb
 */
function GlowingSphere({ position }: { position: [number, number, number] }) {
  return (
    <Sphere args={[1, 32, 32]} position={position}>
      <meshStandardMaterial
        color="#4fd573"
        emissive="#4fd573"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
      />
    </Sphere>
  )
}

/**
 * 3D Background Scene
 */
function BackgroundScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ParticleField />
      <GlowingSphere position={[-5, 2, -5]} />
      <GlowingSphere position={[5, -2, -5]} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

/**
 * M-Hub AI Dashboard - Main landing page
 */
export default function MHubAI() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Type,
      title: 'Text Generator',
      description: 'Create compelling marketing content, blog posts, and copy with AI-powered text generation.',
      path: '/mhub-ai/text',
      color: 'from-primary-400 to-primary-500',
      stats: ['4 Tone Options', 'Instant Output', 'Copy & Export'],
    },
    {
      icon: Image,
      title: 'Image Generator',
      description: 'Generate stunning visuals and marketing graphics from text descriptions using AI.',
      path: '/mhub-ai/image',
      color: 'from-primary-500 to-primary-600',
      stats: ['DALL-E Powered', 'Multiple Sizes', 'HD Quality'],
    },
    {
      icon: Box,
      title: '3D Creative Studio',
      description: 'Design and visualize interactive 3D scenes, animations, and creative experiences.',
      path: '/mhub-ai/3d',
      color: 'from-primary-600 to-primary-700',
      stats: ['WebGL Rendering', 'Real-Time', 'Interactive'],
    },
  ]

  const benefits = [
    { label: 'Content Created', value: '10,000+' },
    { label: 'Time Saved', value: '85%' },
    { label: 'User Satisfaction', value: '98%' },
    { label: 'AI Accuracy', value: '95%' },
  ]

  return (
    <PageLayout>
      <SEO
        title="M-Hub AI - Generative AI Platform"
        description="Create marketing content, visuals, and 3D designs with M-Hub's AI-powered generative platform. Text generation, image creation, and 3D studio in one place."
        keywords={["AI content generation", "DALL-E", "text generator", "image generator", "3D studio", "marketing AI", "creative AI"]}
        url="https://etiditalex.github.io/M-hub/mhub-ai"
      />

      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-20">
          <BackgroundScene />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-400">
                Powered by OpenAI
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">M-Hub AI</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Create. Visualize. Evolve.
            </p>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Your digital co-creator for text, images, and 3D experiences. 
              Harness the power of generative AI to transform your creative workflow.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="card-white text-center"
                >
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {benefit.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {benefit.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4"
            >
              Explore AI Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              AI-Powered Creative Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three powerful tools to accelerate your creative process and bring your ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  onClick={() => navigate(feature.path)}
                  className="card-white-hover h-full group"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {feature.stats.map((stat) => (
                      <span
                        key={stat}
                        className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <button className="btn-primary w-full group-hover:shadow-lg group-hover:shadow-primary-500/30">
                    Launch Tool
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How M-Hub AI Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to creation in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Vision',
                description: 'Enter your creative brief, description, or idea in plain language',
              },
              {
                step: '02',
                title: 'AI Generates',
                description: 'Our AI processes your input and creates content, images, or 3D scenes',
              },
              {
                step: '03',
                title: 'Refine & Export',
                description: 'Review, iterate, and download your AI-generated creations',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create with AI?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start generating content, images, and 3D experiences today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/mhub-ai/text')}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="btn-ghost text-lg px-8 py-4"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

