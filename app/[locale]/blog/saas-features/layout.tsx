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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getsaaspro.com'
  const blogImage = `${baseUrl}/images/saas-features.png`

  return {
    title: isZh
      ? 'Get SaaS有什么功能？ - SaaS模版核心功能和技术特性详解'
      : 'What Features Does Get SaaS Have? - SaaS Template Core Features and Technical Specifications',
    description: isZh
      ? '深入了解Get SaaS模版提供的核心功能：用户认证、支付系统、多语言支持、SEO优化等完整解决方案。探索现代化SaaS开发的技术栈和最佳实践。'
      : 'Explore the core features provided by Get SaaS template: user authentication, payment systems, multi-language support, SEO optimization and more. Discover modern SaaS development technology stack and best practices.',
    keywords: isZh
      ? 'SaaS模版功能,用户认证系统,Stripe支付集成,多语言国际化,SEO优化,Next.js,TypeScript,PostgreSQL,SaaS开发,现代化技术栈,Get SaaS'
      : 'SaaS Template Features,User Authentication System,Stripe Payment Integration,Multi-language Internationalization,SEO Optimization,Next.js,TypeScript,PostgreSQL,SaaS Development,Modern Tech Stack,Get SaaS',
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
        ? 'Get SaaS有什么功能？ - SaaS模版核心功能和技术特性详解'
        : 'What Features Does Get SaaS Have? - SaaS Template Core Features and Technical Specifications',
      description: isZh
        ? '深入了解Get SaaS模版提供的核心功能：用户认证、支付系统、多语言支持、SEO优化等完整解决方案。探索现代化SaaS开发的技术栈和最佳实践。'
        : 'Explore the core features provided by Get SaaS template: user authentication, payment systems, multi-language support, SEO optimization and more. Discover modern SaaS development technology stack and best practices.',
      url: `${baseUrl}/${locale}/blog/saas-features`,
      siteName: 'Get SaaS',
      locale: locale,
      type: 'article',
      publishedTime: '2025-07-01T00:00:00.000Z',
      authors: ['Get SaaS'],
      tags: isZh
        ? ['SaaS模版功能', '用户认证', 'Stripe支付', '多语言支持', 'SEO优化']
        : ['SaaS Template Features', 'User Authentication', 'Stripe Payment', 'Multi-language Support', 'SEO Optimization'],
      images: [
        {
          url: blogImage,
          width: 1200,
          height: 630,
          alt: isZh ? 'Get SaaS - SaaS模版核心功能和技术特性详解' : 'Get SaaS - SaaS Template Core Features and Technical Specifications',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh
        ? 'Get SaaS有什么功能？ - SaaS模版核心功能和技术特性详解'
        : 'What Features Does Get SaaS Have? - SaaS Template Core Features and Technical Specifications',
      description: isZh
        ? '深入了解Get SaaS模版提供的核心功能：用户认证、支付系统、多语言支持、SEO优化等完整解决方案。探索现代化SaaS开发的技术栈和最佳实践。'
        : 'Explore the core features provided by Get SaaS template: user authentication, payment systems, multi-language support, SEO optimization and more. Discover modern SaaS development technology stack and best practices.',
      creator: 'Get SaaS',
      images: [blogImage],
    },
    alternates: {
      canonical: `/blog/saas-features`,
      languages: {
        'zh': '/zh/blog/saas-features',
        'en': '/en/blog/saas-features',
      },
    },
  }
}

export default function SaasFeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
