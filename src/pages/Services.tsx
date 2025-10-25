import { motion } from 'framer-motion'
import { TrendingUp, Code, Network, Check } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import servicesData from '../data/services.json'

const Services = () => {
  const iconMap: Record<string, any> = {
    TrendingUp,
    Code,
    Network,
  }

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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive digital solutions designed to elevate your business and
              drive sustainable growth in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-20">
            {servicesData.map((service, index) => {
              const Icon = iconMap[service.icon]
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <Card hover className="h-full">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${
                          service.color === 'primary'
                            ? 'from-primary-500 to-primary-600'
                            : 'from-accent-500 to-accent-600'
                        } rounded-2xl flex items-center justify-center mb-6 glow-${service.color}`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                      <p className="text-gray-400 text-lg mb-6">
                        {service.description}
                      </p>
                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div
                              className={`w-6 h-6 ${
                                service.color === 'primary'
                                  ? 'bg-primary-500/20'
                                  : 'bg-accent-500/20'
                              } rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                            >
                              <Check
                                className={`w-4 h-4 ${
                                  service.color === 'primary'
                                    ? 'text-primary-400'
                                    : 'text-accent-400'
                                }`}
                              />
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          service.color === 'primary'
                            ? 'from-primary-500/30 to-primary-600/10'
                            : 'from-accent-500/30 to-accent-600/10'
                        } flex items-center justify-center glass`}
                      >
                        <Icon
                          className={`w-32 h-32 ${
                            service.color === 'primary'
                              ? 'text-primary-400'
                              : 'text-accent-400'
                          } opacity-50`}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A proven methodology that ensures success at every stage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your goals' },
              { step: '02', title: 'Strategy', desc: 'Planning the roadmap' },
              { step: '03', title: 'Execution', desc: 'Building solutions' },
              { step: '04', title: 'Growth', desc: 'Continuous optimization' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Ready to take your business to the next level? Get in touch and
                let's discuss your project.
              </p>
              <a href="/contact" className="btn-primary">
                Start Your Project
              </a>
            </motion.div>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}

export default Services



