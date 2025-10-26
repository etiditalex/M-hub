import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
} from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import blogPosts from '../data/blogPosts.json'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === slug)
    if (foundPost) {
      setPost(foundPost)
      
      // Get related posts
      const related = blogPosts.filter((p) =>
        foundPost.relatedPosts?.includes(p.id)
      )
      setRelatedPosts(related)
      
      // Scroll to top
      window.scrollTo(0, 0)
    } else {
      // Post not found, redirect to blog
      navigate('/blog')
    }
  }, [slug, navigate])

  if (!post) {
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

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = post.title
    
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
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
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
            <div className="mb-6">
              <span className="px-4 py-2 bg-primary-500/10 text-primary-400 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8">{post.excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views.toLocaleString()} views
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  liked
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments || 0}</span>
              </button>

              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>

                {/* Share Dropdown */}
                <div className="absolute top-full mt-2 right-0 glass rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 z-10">
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
              src={post.featuredImage}
              alt={post.title}
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
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="blog-content"
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
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-1">{post.author.name}</h3>
                <p className="text-primary-400 text-sm mb-3">{post.author.role}</p>
                <p className="text-gray-400">{post.author.bio}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20 section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <Card className="group cursor-pointer h-full hover:scale-105 transition-transform duration-300">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="px-2 py-1 bg-primary-500/10 text-primary-400 rounded-full">
                            {relatedPost.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedPost.readTime} min
                          </div>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {relatedPost.excerpt}
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
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Get in touch with our team to discuss how we can help you achieve your digital goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="primary">Get Started</Button>
                </Link>
                <Link to="/services">
                  <Button variant="secondary">View Services</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}

export default BlogPost

