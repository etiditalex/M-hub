import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, Award, Zap } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import GlobeScene from '../components/GlobeScene'

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technology',
    },
    {
      icon: Heart,
      title: 'Excellence',
      description: 'Committed to delivering exceptional quality',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building strong partnerships for success',
    },
    {
      icon: Zap,
      title: 'Agility',
      description: 'Adapting quickly to evolving needs',
    },
  ]

  const team = [
    {
      name: 'Leadership Team',
      count: '10+',
      description: 'Years of industry experience',
    },
    {
      name: 'Developers',
      count: '30+',
      description: 'Expert engineers and designers',
    },
    {
      name: 'Digital Marketers',
      count: '15+',
      description: 'Strategic marketing specialists',
    },
    {
      name: 'IT Consultants',
      count: '10+',
      description: 'Network and security experts',
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
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About <span className="gradient-text">M-Hub</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We are a team of passionate professionals dedicated to transforming
              businesses through innovative digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Globe Section */}
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
                Global Impact,{' '}
                <span className="gradient-text">Local Expertise</span>
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Founded in 2014, M-Hub has grown from a small startup to a leading
                digital solutions provider. We've helped over 150 clients across 30
                countries achieve their digital transformation goals.
              </p>
              <p className="text-lg text-gray-400 mb-6">
                Our mission is to empower businesses with technology that drives
                growth, efficiency, and innovation. We believe in building lasting
                partnerships and delivering solutions that make a real difference.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-dark-900"
                    />
                  ))}
                </div>
                <span className="text-gray-400">50+ Team Members</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-[500px]"
            >
              <Suspense fallback={<div className="w-full h-full glass rounded-2xl" />}>
                <GlobeScene />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-400 text-lg">
                  To empower businesses worldwide with innovative digital solutions
                  that drive sustainable growth and create meaningful impact in the
                  digital landscape.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-400 text-lg">
                  To be the most trusted digital transformation partner, recognized
                  for excellence, innovation, and our commitment to client success
                  in an ever-evolving digital world.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Talented professionals driving innovation and excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {member.count}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-400">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Award className="w-20 h-20 text-primary-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Award-Winning Excellence
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Recognized by industry leaders for our innovation, quality, and
              commitment to client success.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Best Digital Agency 2023', 'Top Software Developer', 'Innovation Award'].map(
                (award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-6 py-3 glass rounded-full text-primary-400 font-semibold"
                  >
                    {award}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

export default About



