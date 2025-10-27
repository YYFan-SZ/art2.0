import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const locales = ['en', 'zh']

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // 验证locale是否有效
  if (!locales.includes(locale)) {
    notFound()
  }
  const isZh = locale === 'zh'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const blogImage = `${baseUrl}/images/saas-blog.png`

  return {
    title: isZh
      ? '什么是SaaS？ - SaaS定义、商业模式和技术架构详解'
      : 'What is SaaS? - SaaS Definition, Business Model and Technical Architecture Explained',
    description: isZh
      ? '深入了解SaaS的定义、商业模式和技术架构，以及如何快速构建现代化SaaS产品。从订阅模式到云原生架构，提供完整的SaaS开发指南。'
      : 'Understand the definition, business model, and technical architecture of SaaS, and how to rapidly build modern SaaS products. From subscription models to cloud-native architecture, providing complete SaaS development guide.',
    keywords: isZh
      ? 'SaaS,软件即服务,SaaS定义,SaaS商业模式,SaaS技术架构,云计算,订阅模式,多租户架构,SaaS开发,现代化SaaS,云原生,企业软件'
      : 'SaaS,Software as a Service,SaaS Definition,SaaS Business Model,SaaS Architecture,Cloud Computing,Subscription Model,Multi-tenant Architecture,SaaS Development,Modern SaaS,Cloud Native,Enterprise Software',
    authors: [{ name: 'Get SaaS' }],
    creator: 'Get SaaS',
    publisher: 'Get SaaS',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: isZh
        ? '什么是SaaS？ - SaaS定义、商业模式和技术架构详解'
        : 'What is SaaS? - SaaS Definition, Business Model and Technical Architecture Explained',
      description: isZh
        ? '深入了解SaaS的定义、商业模式和技术架构，以及如何快速构建现代化SaaS产品。从订阅模式到云原生架构，提供完整的SaaS开发指南。'
        : 'Understand the definition, business model, and technical architecture of SaaS, and how to rapidly build modern SaaS products. From subscription models to cloud-native architecture, providing complete SaaS development guide.',
      url: `${baseUrl}/${locale}/blog/what-is-saas`,
      siteName: 'Get SaaS',
      locale: locale,
      type: 'article',
      publishedTime: '2025-07-01T00:00:00.000Z',
      authors: ['Get SaaS'],
      tags: isZh
        ? ['SaaS', '软件即服务', 'SaaS定义', 'SaaS商业模式', 'SaaS技术架构']
        : ['SaaS', 'Software as a Service', 'SaaS Definition', 'SaaS Business Model', 'SaaS Architecture'],
      images: [
        {
          url: blogImage,
          width: 1200,
          height: 630,
          alt: isZh ? 'Get SaaS - 什么是SaaS？SaaS定义和技术架构详解' : 'Get SaaS - What is SaaS? SaaS Definition and Architecture Explained',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh
        ? '什么是SaaS？ - SaaS定义、商业模式和技术架构详解'
        : 'What is SaaS? - SaaS Definition, Business Model and Technical Architecture Explained',
      description: isZh
        ? '深入了解SaaS的定义、商业模式和技术架构，以及如何快速构建现代化SaaS产品。从订阅模式到云原生架构，提供完整的SaaS开发指南。'
        : 'Understand the definition, business model, and technical architecture of SaaS, and how to rapidly build modern SaaS products. From subscription models to cloud-native architecture, providing complete SaaS development guide.',
      creator: 'Get SaaS',
      images: [blogImage],
    },
    alternates: {
      canonical: `/blog/what-is-saas`,
      languages: {
        'zh': '/zh/blog/what-is-saas',
        'en': '/en/blog/what-is-saas',
      },
    },
  }
}

export default function WhatIsSaasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
