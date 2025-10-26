import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
  Tag,
  ExternalLink,
  TrendingUp,
} from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import newsroom from '../data/newsroom.json'

const NewsArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState<any>(null)
  const [relatedNews, setRelatedNews] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const foundArticle = newsroom.find((n) => n.slug === slug)
    if (foundArticle) {
      setArticle(foundArticle)
      
      // Get related news
      const related = newsroom.filter((n) =>
        foundArticle.relatedNews?.includes(n.id)
      )
      setRelatedNews(related)
      
      // Scroll to top
      window.scrollTo(0, 0)
    } else {
      // Article not found, redirect to newsroom
      navigate('/newsroom')
    }
  }, [slug, navigate])

  if (!article) {
    return (
      <PageLayout>
        <div className="pt-32 pb-20 section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = article.title
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <PageLayout>
      {/* Back Button */}
      <section className="pt-32 pb-8 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/newsroom"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Newsroom
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-12 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${getPriorityColor(
                  article.priority
                )}`}
              >
                {getTypeLabel(article.type)}
              </span>
              <span className="px-4 py-2 bg-primary-500/10 text-primary-400 rounded-full text-sm font-medium">
                {article.category}
              </span>
              {article.trending && (
                <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8">{article.excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </div>

              {article.source && (
                <div className="flex items-center gap-2 text-gray-400">
                  <ExternalLink className="w-4 h-4" />
                  Source: {article.source}
                </div>
              )}
            </div>

            {/* Share Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-primary-500/50 rounded-lg transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>

                {/* Share Dropdown */}
                <div className="absolute top-full mt-2 left-0 glass rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 z-10">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-all text-left"
                    >
                      <Facebook className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-all text-left"
                    >
                      <Twitter className="w-4 h-4 text-sky-400" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-all text-left"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-all text-left"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-primary-400" />
                          <span className="text-sm text-primary-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4" />
                          <span className="text-sm">Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="prose prose-invert prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="news-content"
              />
            </Card>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="pb-20 section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Related News</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedNews.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/newsroom/${relatedArticle.slug}`}
                  >
                    <Card className="group cursor-pointer h-full hover:scale-105 transition-transform duration-300">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {relatedArticle.trending && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-full flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className={`px-2 py-1 rounded-full ${getPriorityColor(
                              relatedArticle.priority
                            )}`}
                          >
                            {getTypeLabel(relatedArticle.type)}
                          </span>
                          <span className="text-gray-400">
                            {formatDate(relatedArticle.publishedAt)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="text-center p-12 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest news, updates, and industry insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
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

export default NewsArticle

