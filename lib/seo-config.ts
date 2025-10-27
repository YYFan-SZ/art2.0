export const seoConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  siteName: 'Get SaaS',
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
  
  // 默认SEO设置
  defaultSEO: {
    zh: {
      title: 'Get SaaS - 专为出海设计的现代化SaaS模版',
      description: 'Get SaaS是专为出海设计的现代化SaaS模版，集成完整的用户认证、支付系统、多语言支持、SEO优化等功能。基于Next.js构建，帮助开发者快速启动SaaS产品。',
      keywords: 'SaaS模版,出海SaaS,Next.js模版,SaaS启动模版,多语言SaaS,支付集成,用户认证,SEO优化,现代化UI,响应式设计,TypeScript,Tailwind CSS,SaaS开发,快速启动,云原生,企业软件',
    },
    en: {
      title: 'Get SaaS - Modern SaaS Template Designed for Global Markets',
      description: 'Get SaaS is a modern SaaS template designed for global markets, featuring complete user authentication, payment systems, multi-language support, and SEO optimization. Built with Next.js to help developers launch SaaS products quickly.',
      keywords: 'SaaS Template,Global SaaS,Next.js Template,SaaS Starter,Multi-language SaaS,Payment Integration,User Authentication,SEO Optimization,Modern UI,Responsive Design,TypeScript,Tailwind CSS,SaaS Development,Quick Launch,Cloud Native,Enterprise Software',
    }
  },

  // 页面特定SEO设置
  pages: {
    blog: {
      zh: {
        title: 'Get SaaS 博客 - SaaS开发技术分享与最佳实践',
        description: '探索SaaS开发的最新技术动态和最佳实践，深入了解Next.js、用户认证、支付集成、多语言支持等SaaS产品开发的核心技术。',
        keywords: 'SaaS开发博客,Next.js技术,用户认证,支付集成,多语言支持,SaaS架构,前端开发,全栈开发,TypeScript,Tailwind CSS',
      },
      en: {
        title: 'Get SaaS Blog - SaaS Development Insights & Best Practices',
        description: 'Explore the latest SaaS development trends and best practices, learn about Next.js, user authentication, payment integration, multi-language support and other core technologies for SaaS product development.',
        keywords: 'SaaS Development Blog,Next.js Technology,User Authentication,Payment Integration,Multi-language Support,SaaS Architecture,Frontend Development,Full-stack Development,TypeScript,Tailwind CSS',
      }
    },
    terms: {
      zh: {
        title: '服务条款 - ITSAI Agent',
        description: '查看ITSAI Agent声音AI智能体服务的使用条款，了解音频识别、声音生成等服务的使用规则、用户权利和责任。',
        keywords: '服务条款,使用协议,用户协议,声音AI服务条款,音频处理服务规则,智能体服务协议',
      },
      en: {
        title: 'Terms of Service - ITSAI Agent',
        description: 'View ITSAI Agent\'s Terms of Service for voice AI agent services, understanding usage rules, user rights and responsibilities for audio recognition, voice generation and other services.',
        keywords: 'Terms of Service,User Agreement,Service Agreement,Voice AI Service Terms,Audio Processing Service Rules,Agent Service Agreement',
      }
    },
    privacy: {
      zh: {
        title: '隐私政策 - ITSAI Agent',
        description: '了解ITSAI Agent如何收集、使用和保护您的音频数据和个人信息，保障您的隐私权益。',
        keywords: '隐私政策,数据保护,个人信息,音频数据安全,隐私权,声音数据保护',
      },
      en: {
        title: 'Privacy Policy - ITSAI Agent',
        description: 'Learn how ITSAI Agent collects, uses and protects your audio data and personal information to safeguard your privacy rights.',
        keywords: 'Privacy Policy,Data Protection,Personal Information,Audio Data Security,Privacy Rights,Voice Data Protection',
      }
    },
    cookies: {
      zh: {
        title: 'Cookie政策 - ITSAI Agent',
        description: '了解ITSAI Agent如何使用Cookie和相关技术来优化声音AI智能体服务体验。',
        keywords: 'Cookie政策,网站Cookie,用户体验,数据收集,声音AI服务优化,网站分析',
      },
      en: {
        title: 'Cookie Policy - ITSAI Agent',
        description: 'Learn how ITSAI Agent uses cookies and related technologies to optimize voice AI agent service experience.',
        keywords: 'Cookie Policy,Website Cookies,User Experience,Data Collection,Voice AI Service Optimization,Website Analytics',
      }
    },

    'what-is-saas': {
      zh: {
        title: '什么是SaaS？ - SaaS定义、商业模式和技术架构详解',
        description: '深入了解SaaS的定义、商业模式和技术架构，以及如何快速构建现代化SaaS产品。从订阅模式到云原生架构，提供完整的SaaS开发指南。',
        keywords: 'SaaS,软件即服务,SaaS定义,SaaS商业模式,SaaS技术架构,云计算,订阅模式,多租户架构,SaaS开发,现代化SaaS,云原生,企业软件',
      },
      en: {
        title: 'What is SaaS? - SaaS Definition, Business Model and Technical Architecture Explained',
        description: 'Understand the definition, business model, and technical architecture of SaaS, and how to rapidly build modern SaaS products. From subscription models to cloud-native architecture, providing complete SaaS development guide.',
        keywords: 'SaaS,Software as a Service,SaaS Definition,SaaS Business Model,SaaS Architecture,Cloud Computing,Subscription Model,Multi-tenant Architecture,SaaS Development,Modern SaaS,Cloud Native,Enterprise Software',
      }
    },
    'saas-website-examples': {
      zh: {
        title: 'Get SaaS可以做哪些网站？ - SaaS模版应用场景和案例详解',
        description: '深入了解Get SaaS模版的应用场景，从电商平台到企业管理系统，再到在线教育平台的完整解决方案。探索SaaS模版在不同行业的实际应用案例。',
        keywords: 'SaaS模版,SaaS应用场景,电商平台,企业管理系统,在线教育平台,项目管理工具,CRM系统,ERP系统,SaaS网站案例,SaaS开发,Get SaaS',
      },
      en: {
        title: 'What Websites Can Get SaaS Build? - SaaS Template Use Cases and Examples',
        description: 'Understand Get SaaS template application scenarios, from e-commerce platforms to enterprise management systems, to online education platforms. Explore real-world SaaS template use cases across different industries.',
        keywords: 'SaaS Template,SaaS Use Cases,E-commerce Platform,Enterprise Management System,Online Education Platform,Project Management Tool,CRM System,ERP System,SaaS Website Examples,SaaS Development,Get SaaS',
      }
    },
    'saas-features': {
      zh: {
        title: 'Get SaaS有什么功能？ - SaaS模版核心功能和技术特性详解',
        description: '深入了解Get SaaS模版提供的核心功能：用户认证、支付系统、多语言支持、SEO优化等完整解决方案。探索现代化SaaS开发的技术栈和最佳实践。',
        keywords: 'SaaS模版功能,用户认证系统,Stripe支付集成,多语言国际化,SEO优化,Next.js,TypeScript,PostgreSQL,SaaS开发,现代化技术栈,Get SaaS',
      },
      en: {
        title: 'What Features Does Get SaaS Have? - SaaS Template Core Features and Technical Specifications',
        description: 'Explore the core features provided by Get SaaS template: user authentication, payment systems, multi-language support, SEO optimization and more. Discover modern SaaS development technology stack and best practices.',
        keywords: 'SaaS Template Features,User Authentication System,Stripe Payment Integration,Multi-language Internationalization,SEO Optimization,Next.js,TypeScript,PostgreSQL,SaaS Development,Modern Tech Stack,Get SaaS',
      }
    }
  },

  // 社交媒体设置
  social: {
    twitter: '@zyailive',
    email: 'app@itusi.cn',
    wechat: 'zyailive01',
  },

  // 验证码设置
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    baidu: process.env.BAIDU_SITE_VERIFICATION,
  },

  // 分析工具设置
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    baiduAnalytics: process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID,
  },

  // 图片设置
  images: {
    logo: '/logo.png',
    ogImage: '/logo.png',
    favicon: '/favicon.ico',
  },

  // 结构化数据设置
  organization: {
    name: 'Get SaaS',
    foundingDate: '2025',
    industry: 'Software Development',
    numberOfEmployees: '1-10',
    contactEmail: 'app@itusi.cn',
    url: 'https://getsaaspro.com',
    description: 'Modern SaaS template designed for global markets with complete authentication, payment systems, and multi-language support.',
    keywords: ['SaaS Template', 'Next.js', 'TypeScript', 'Global Markets', 'Multi-language'],
    sameAs: [
      'https://github.com/ItusiAI',
      'https://twitter.com/zyailive'
    ]
  }
}

// 获取页面SEO配置的辅助函数
export function getPageSEO(page: string, locale: string) {
  const pageSEO = seoConfig.pages[page as keyof typeof seoConfig.pages]
  const defaultSEO = seoConfig.defaultSEO[locale as keyof typeof seoConfig.defaultSEO]
  
  if (pageSEO && pageSEO[locale as keyof typeof pageSEO]) {
    return pageSEO[locale as keyof typeof pageSEO]
  }
  
  return defaultSEO
}

// 生成完整URL的辅助函数
export function getFullUrl(path: string, locale?: string) {
  const localePrefix = locale ? `/${locale}` : ''
  return `${seoConfig.baseUrl}${localePrefix}${path}`
}

// 生成多语言链接的辅助函数
export function getAlternateLinks(path: string) {
  return seoConfig.locales.reduce((acc, locale) => {
    acc[locale] = getFullUrl(path, locale)
    return acc
  }, {} as Record<string, string>)
}
