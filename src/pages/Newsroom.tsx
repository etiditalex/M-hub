import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Newspaper,
  TrendingUp,
  Filter,
  Calendar,
  Tag,
  ExternalLink,
  AlertCircle,
  Award,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import SEO from '../components/SEO'
import newsroom from '../data/newsroom.json'
import industryTrends from '../data/industryTrends.json'

const Newsroom = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(newsroom.map((item) => item.category))]
    return cats
  }, [])

  // Filter news items
  const filteredNews = useMemo(() => {
    return newsroom.filter((item) => {
      const matchesType = selectedType === 'all' || item.type === selectedType
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      return matchesType && matchesCategory
    })
  }, [selectedType, selectedCategory])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'press-release':
        return <Newspaper className="w-5 h-5" />
      case 'partnership':
        return <Users className="w-5 h-5" />
      case 'award':
        return <Award className="w-5 h-5" />
      case 'company-update':
        return <Building2 className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-primary-400" />
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <PageLayout>
      <SEO
        title="Newsroom - Latest Updates & Industry Trends | M-Hub"
        description="Stay updated with M-Hub's latest news, industry updates, fintech trends in Kenya, and digital marketing announcements. Real-time industry insights."
        keywords={[
          'M-Hub news',
          'Kenya fintech news',
          'digital marketing updates',
          'industry trends Kenya',
          'business news Kenya',
          'tech announcements',
        ]}
        url="https://etiditalex.github.io/M-hub/#/newsroom"
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Newsroom</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Latest news, press releases, and industry insights from M-Hub and
              the technology sector
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Type Filter */}
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedType === 'all'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  All News
                </button>
                <button
                  onClick={() => setSelectedType('press-release')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedType === 'press-release'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Press Releases
                </button>
                <button
                  onClick={() => setSelectedType('industry-news')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedType === 'industry-news'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Industry News
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Trends Section */}
      <section className="pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-primary-400" />
              <h2 className="text-3xl font-bold">Industry Trends</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryTrends.map((trend, index) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-lg">{trend.keyword}</h3>
                      {getTrendIcon(trend.trend)}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className={`text-3xl font-bold ${
                          trend.trend === 'up'
                            ? 'text-primary-400'
                            : trend.trend === 'down'
                            ? 'text-red-400'
                            : 'text-gray-400'
                        }`}
                      >
                        {Math.abs(trend.changePercent)}%
                      </span>
                      <span className="text-sm text-gray-400">
                        {trend.trend === 'up'
                          ? 'increase'
                          : trend.trend === 'down'
                          ? 'decrease'
                          : 'stable'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {trend.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trend.relatedTopics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-white/5 text-xs rounded-full text-gray-400"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Timeline */}
      <section className="pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Latest Updates</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Filter className="w-5 h-5" />
                <span>{filteredNews.length} items</span>
              </div>
            </div>

            {filteredNews.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No news items found matching your criteria.
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/newsroom/${item.slug}`}>
                      <Card className="group cursor-pointer hover:scale-[1.02] transition-all duration-300">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image */}
                        <div className="lg:w-1/3 relative overflow-hidden rounded-xl">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {item.trending && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-full flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="lg:w-2/3 space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 border ${getPriorityColor(
                                item.priority
                              )}`}
                            >
                              {getTypeIcon(item.type)}
                              {getTypeLabel(item.type)}
                            </span>
                            <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-400">
                              <Calendar className="w-4 h-4" />
                              {formatDate(item.publishedAt)}
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold group-hover:text-primary-400 transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-gray-400 line-clamp-2">
                            {item.excerpt}
                          </p>

                          {item.source && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <ExternalLink className="w-4 h-4" />
                              <span>Source: {item.source}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/5 text-sm rounded-full text-gray-400 flex items-center gap-1 hover:bg-white/10 transition-colors"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Press Contact CTA */}
      <section className="pb-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="text-center p-12 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <Newspaper className="w-16 h-16 mx-auto mb-6 text-primary-400" />
              <h2 className="text-3xl font-bold mb-4">Press Inquiries</h2>
              <p className="text-gray-300 mb-8">
                For media inquiries, press releases, or partnership
                opportunities, please contact our communications team
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:press@mhub.digital"
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  Contact Press Team
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white/5 text-white rounded-lg font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  General Contact
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Newsroom


