import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

const SEO = ({
  title = 'M-Hub - Digital Marketing & AI Solutions in Kenya',
  description = 'Leading digital marketing platform in Kenya offering AI-powered solutions, social media management, SEO, fintech integration, and custom software development. Transform your business with M-Hub.',
  keywords = [
    'digital marketing Kenya',
    'AI marketing automation',
    'social media management',
    'SEO services Kenya',
    'M-Pesa integration',
    'fintech marketing',
    'software development Kenya',
    'web development Mombasa',
    'TikTok Shop Kenya',
    'WhatsApp Business API',
  ],
  image = 'https://etiditalex.github.io/M-hub/og-image.png',
  url = 'https://etiditalex.github.io/M-hub/',
  type = 'website',
  author = 'Alex Etidit',
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const siteTitle = title.includes('M-Hub') ? title : `${title} | M-Hub`

  // Structured Data for Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'M-Hub',
    description:
      'Digital marketing and AI solutions platform in Kenya specializing in fintech, social media, and custom software development.',
    url: 'https://etiditalex.github.io/M-hub/',
    logo: 'https://etiditalex.github.io/M-hub/logo.svg',
    founder: {
      '@type': 'Person',
      name: 'Alex Etidit',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Along Links Road',
      addressLocality: 'Nyali',
      addressRegion: 'Mombasa',
      addressCountry: 'KE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-796-988686',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Swahili'],
    },
    sameAs: [
      'https://github.com/etiditalex/M-hub',
      // Add social media links here
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    serviceType: [
      'Digital Marketing',
      'AI Marketing Automation',
      'Software Development',
      'Social Media Management',
      'SEO Services',
      'Fintech Integration',
    ],
  }

  // Service structured data
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Marketing Services',
    provider: {
      '@type': 'Organization',
      name: 'M-Hub',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Marketing Automation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Management',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO & Content Strategy',
          },
        },
      ],
    },
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="M-Hub" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@mhubke" />

      {/* Article Meta (if applicable) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#27ae60" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Geo Tags */}
      <meta name="geo.region" content="KE-MBA" />
      <meta name="geo.placename" content="Mombasa" />
      <meta name="geo.position" content="-4.043477;39.668206" />
      <meta name="ICBM" content="-4.043477, 39.668206" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">{JSON.stringify(serviceData)}</script>
    </Helmet>
  )
}

export default SEO

