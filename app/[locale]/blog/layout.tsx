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
  const blogImage = `${baseUrl}/images/bloghaibao.png`

  return {
    title: isZh ? 'Get SaaS 博客 - SaaS开发技术分享' : 'Get SaaS Blog - SaaS Development Technology Insights',
    description: isZh
      ? '探索SaaS开发的最新技术动态，了解用户认证、支付系统、多语言支持、SEO优化等现代化SaaS产品开发的前沿应用。获取专业SaaS模版服务支持。'
      : 'Explore the latest SaaS development technology trends, learn about cutting-edge applications in user authentication, payment systems, multi-language support, SEO optimization and modern SaaS product development. Get professional SaaS template services.',
    keywords: isZh
      ? 'SaaS模版, 用户认证, 支付系统, 多语言支持, SEO优化, 技术博客, SaaS开发'
      : 'SaaS Template, User Authentication, Payment System, Multi-language Support, SEO Optimization, Tech Blog, SaaS Development',
    openGraph: {
      title: isZh ? 'Get SaaS 博客 - SaaS开发技术分享' : 'Get SaaS Blog - SaaS Development Technology',
      description: isZh
        ? '探索SaaS开发的无限可能，获取最新SaaS技术动态和专业服务支持'
        : 'Explore the limitless possibilities of SaaS development, get latest SaaS tech updates and professional service support',
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/blog`,
      siteName: 'Get SaaS',
      images: [
        {
          url: blogImage,
          width: 1200,
          height: 630,
          alt: isZh ? 'Get SaaS 博客 - SaaS开发技术分享' : 'Get SaaS Blog - SaaS Development Technology',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? 'Get SaaS 博客' : 'Get SaaS Blog',
      description: isZh
        ? '探索SaaS开发的最新技术动态和应用案例'
        : 'Explore the latest SaaS development technology trends and use cases',
      creator: 'Get SaaS',
      images: [blogImage],
    },
    alternates: {
      canonical: `/blog`,
      languages: {
        'zh': '/zh/blog',
        'en': '/en/blog',
      },
    },
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 