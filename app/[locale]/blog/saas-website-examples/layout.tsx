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
  const blogImage = `${baseUrl}/images/saas-examples.png`

  return {
    title: isZh
      ? 'Get SaaS可以做哪些网站？ - SaaS模版应用场景和案例详解'
      : 'What Websites Can Get SaaS Build? - SaaS Template Use Cases and Examples',
    description: isZh
      ? '深入了解Get SaaS模版的应用场景，从电商平台到企业管理系统，再到在线教育平台的完整解决方案。探索SaaS模版在不同行业的实际应用案例。'
      : 'Understand Get SaaS template application scenarios, from e-commerce platforms to enterprise management systems, to online education platforms. Explore real-world SaaS template use cases across different industries.',
    keywords: isZh
      ? 'SaaS模版,SaaS应用场景,电商平台,企业管理系统,在线教育平台,项目管理工具,CRM系统,ERP系统,SaaS网站案例,SaaS开发,Get SaaS'
      : 'SaaS Template,SaaS Use Cases,E-commerce Platform,Enterprise Management System,Online Education Platform,Project Management Tool,CRM System,ERP System,SaaS Website Examples,SaaS Development,Get SaaS',
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
        ? 'Get SaaS可以做哪些网站？ - SaaS模版应用场景和案例详解'
        : 'What Websites Can Get SaaS Build? - SaaS Template Use Cases and Examples',
      description: isZh
        ? '深入了解Get SaaS模版的应用场景，从电商平台到企业管理系统，再到在线教育平台的完整解决方案。探索SaaS模版在不同行业的实际应用案例。'
        : 'Understand Get SaaS template application scenarios, from e-commerce platforms to enterprise management systems, to online education platforms. Explore real-world SaaS template use cases across different industries.',
      url: `${baseUrl}/${locale}/blog/saas-website-examples`,
      siteName: 'Get SaaS',
      locale: locale,
      type: 'article',
      publishedTime: '2025-07-01T00:00:00.000Z',
      authors: ['Get SaaS'],
      tags: isZh
        ? ['SaaS模版', '电商平台', '企业管理系统', '在线教育平台', '项目管理工具']
        : ['SaaS Template', 'E-commerce Platform', 'Enterprise Management System', 'Online Education Platform', 'Project Management Tool'],
      images: [
        {
          url: blogImage,
          width: 1200,
          height: 630,
          alt: isZh ? 'Get SaaS - SaaS模版应用场景和网站案例详解' : 'Get SaaS - SaaS Template Use Cases and Website Examples',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh
        ? 'Get SaaS可以做哪些网站？ - SaaS模版应用场景和案例详解'
        : 'What Websites Can Get SaaS Build? - SaaS Template Use Cases and Examples',
      description: isZh
        ? '深入了解Get SaaS模版的应用场景，从电商平台到企业管理系统，再到在线教育平台的完整解决方案。探索SaaS模版在不同行业的实际应用案例。'
        : 'Understand Get SaaS template application scenarios, from e-commerce platforms to enterprise management systems, to online education platforms. Explore real-world SaaS template use cases across different industries.',
      creator: 'Get SaaS',
      images: [blogImage],
    },
    alternates: {
      canonical: `/blog/saas-website-examples`,
      languages: {
        'zh': '/zh/blog/saas-website-examples',
        'en': '/en/blog/saas-website-examples',
      },
    },
  }
}

export default function SaasWebsiteExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
