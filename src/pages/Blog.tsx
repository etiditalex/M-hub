import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Calendar,
  Clock,
  Heart,
  Eye,
  TrendingUp,
  Filter,
  ArrowRight,
} from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import SEO from '../components/SEO'
import blogPosts from '../data/blogPosts.json'

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map((post) => post.category))]
    return cats
  }, [])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort posts
    if (sortBy === 'latest') {
      filtered.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    } else {
      filtered.sort((a, b) => b.views - a.views)
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const featuredPosts = blogPosts.filter((post) => post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <PageLayout>
      <SEO
        title="Blog - Digital Marketing Insights & AI Trends | M-Hub"
        description="Read M-Hub's latest blog posts on digital marketing, AI automation, fintech in Kenya, social media strategies, and business growth tips."
        keywords={[
          'digital marketing blog Kenya',
          'AI marketing trends',
          'fintech Kenya blog',
          'social media marketing tips',
          'business growth strategies',
          'M-Hub blog',
        ]}
        url="https://etiditalex.github.io/M-hub/#/blog"
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
              <span className="gradient-text">M-Hub Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and stories about technology, digital
              transformation, and innovation
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
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

              {/* Sort */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    sortBy === 'latest'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Latest
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    sortBy === 'popular'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Popular
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'All' && searchQuery === '' && (
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
                <h2 className="text-3xl font-bold">Featured Articles</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="group cursor-pointer h-full hover:scale-105 transition-transform duration-300">
                      <div className="relative overflow-hidden rounded-xl mb-6">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime} min read
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.views.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary-400 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="pb-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
              </h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Filter className="w-5 h-5" />
                <span>{filteredPosts.length} articles</span>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No articles found matching your criteria.
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="group cursor-pointer h-full hover:scale-105 transition-transform duration-300">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="px-2 py-1 bg-primary-500/10 text-primary-400 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 pt-3 border-t border-white/10 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
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

      {/* Newsletter CTA */}
      <section className="pb-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="text-center p-12 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <h2 className="text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-300 mb-8">
                Get the latest articles and insights delivered directly to your
                inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Blog


