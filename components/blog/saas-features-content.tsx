"use client"

import { useParams } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function SaasFeaturesContent() {
  const params = useParams()
  const locale = params.locale as string
  const isZh = locale === 'zh'

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary">
                {isZh ? 'Get SaaS有什么功能？' : 'What Features Does Get SaaS Have?'}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isZh
                ? '深入了解Get SaaS模版提供的核心功能：用户认证、支付系统、多语言支持、SEO优化等完整解决方案'
                : 'Explore the core features provided by Get SaaS template: user authentication, payment systems, multi-language support, SEO optimization and more'
              }
            </p>
          </div>

          <div className="prose prose-lg max-w-none prose-invert">
            <p className="text-muted-foreground mb-8">
              {isZh ? '发布时间：2025年7月1日' : 'Published: July 1, 2025'}
            </p>

            {/* 1. 用户认证系统 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '1. 完整的用户认证系统' : '1. Complete User Authentication System'}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isZh
                  ? 'Get SaaS内置了企业级的用户认证系统，支持多种登录方式和安全特性，为您的SaaS产品提供可靠的用户管理基础。'
                  : 'Get SaaS features a robust, enterprise-grade user authentication system that seamlessly integrates multiple login methods and advanced security features. This comprehensive authentication infrastructure provides a rock-solid foundation for user management, ensuring both security and user experience excellence in your SaaS application.'
                }
              </p>

              <div className="bg-secondary/50 border border-cyber-500/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {isZh ? '认证功能特性' : 'Authentication Features'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '邮箱注册登录' : 'Email Registration & Login'}</strong>：
                      {isZh ? '支持邮箱验证、密码重置等完整流程' : 'Supports email verification, password reset and complete workflow'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '社交登录' : 'Social Login'}</strong>：
                      {isZh ? '集成Google、GitHub等第三方登录' : 'Integrated with Google, GitHub and other third-party logins'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '会话管理' : 'Session Management'}</strong>：
                      {isZh ? '安全的会话管理和自动过期处理' : 'Secure session management and automatic expiration handling'}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. 支付系统集成 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '2. Stripe支付系统集成' : '2. Stripe Payment System Integration'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '支付功能' : 'Payment Features'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '订阅计费' : 'Subscription Billing'}</strong>：{isZh ? '月付、年付等灵活计费模式' : 'Flexible billing models like monthly, yearly'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '一次性支付' : 'One-time Payments'}</strong>：{isZh ? '支持产品购买和服务费用' : 'Support product purchases and service fees'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '发票管理' : 'Invoice Management'}</strong>：{isZh ? '自动生成和发送发票' : 'Automatic invoice generation and sending'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '安全特性' : 'Security Features'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? 'PCI合规' : 'PCI Compliance'}</strong>：{isZh ? '符合支付行业安全标准' : 'Compliant with payment industry security standards'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '欺诈检测' : 'Fraud Detection'}</strong>：{isZh ? '内置欺诈检测和风险管理' : 'Built-in fraud detection and risk management'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '数据加密' : 'Data Encryption'}</strong>：{isZh ? '端到端数据加密保护' : 'End-to-end data encryption protection'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. 多语言国际化 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '3. 多语言国际化支持' : '3. Multi-language Internationalization Support'}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isZh
                  ? '基于next-intl构建的完整国际化解决方案，让您的SaaS产品轻松进入全球市场。'
                  : 'Built on the powerful next-intl framework, Get SaaS delivers a comprehensive internationalization solution that enables your SaaS product to seamlessly expand into global markets. This sophisticated i18n implementation handles everything from dynamic content translation to locale-specific formatting, ensuring your application feels native to users worldwide.'
                }
              </p>

              <div className="space-y-6">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '国际化功能' : 'Internationalization Features'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-semibold text-foreground">{isZh ? '多语言切换' : 'Language Switching'}</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '支持中英文等多种语言' : 'Support Chinese, English and more languages'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">🔄</div>
                      <div className="font-semibold text-foreground">{isZh ? '动态加载' : 'Dynamic Loading'}</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '按需加载语言包，优化性能' : 'Load language packs on demand, optimize performance'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-semibold text-foreground">{isZh ? 'SEO友好' : 'SEO Friendly'}</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '多语言URL和元数据优化' : 'Multi-language URL and metadata optimization'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SEO优化 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '4. 完整的SEO优化' : '4. Complete SEO Optimization'}
              </h2>

              <div className="bg-gradient-to-r from-dark-600/50 to-dark-600/70 p-6 rounded-lg border border-cyber-500/30 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {isZh ? 'SEO功能特性' : 'SEO Features'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyber-400 mb-3">{isZh ? '技术SEO' : 'Technical SEO'}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '服务端渲染(SSR)' : 'Server-side Rendering (SSR)'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '自动生成sitemap' : 'Automatic sitemap generation'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '结构化数据标记' : 'Structured data markup'}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyber-400 mb-3">{isZh ? '内容SEO' : 'Content SEO'}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '动态meta标签' : 'Dynamic meta tags'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? 'Open Graph优化' : 'Open Graph optimization'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? 'Twitter Cards支持' : 'Twitter Cards support'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. 现代化技术栈 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '5. 现代化技术栈' : '5. Modern Technology Stack'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '前端技术' : 'Frontend Technologies'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚛️</span>
                      <div>
                        <div className="font-semibold text-foreground">Next.js</div>
                        <div className="text-sm text-muted-foreground">{isZh ? '现代化React框架' : 'Modern React framework'}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🎨</span>
                      <div>
                        <div className="font-semibold text-foreground">Tailwind CSS</div>
                        <div className="text-sm text-muted-foreground">{isZh ? '实用优先的CSS框架' : 'Utility-first CSS framework'}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📘</span>
                      <div>
                        <div className="font-semibold text-foreground">TypeScript</div>
                        <div className="text-sm text-muted-foreground">{isZh ? '类型安全的JavaScript' : 'Type-safe JavaScript'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '后端与数据' : 'Backend & Data'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🗄️</span>
                      <div>
                        <div className="font-semibold text-foreground">PostgreSQL</div>
                        <div className="text-sm text-muted-foreground">{isZh ? '企业级关系数据库' : 'Enterprise-grade relational database'}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🔐</span>
                      <div>
                        <div className="font-semibold text-foreground">NextAuth.js</div>
                        <div className="text-sm text-muted-foreground">{isZh ? '完整的认证解决方案' : 'Complete authentication solution'}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">💳</span>
                      <div>
                        <div className="font-semibold text-foreground">Stripe</div>
                        <div className="text-sm text-muted-foreground">{isZh ? '全球领先的支付平台' : 'Leading global payment platform'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <div className="bg-primary p-6 rounded-lg text-dark-900 cyber-glow">
                <h3 className="text-2xl font-semibold mb-4">
                  {isZh ? '立即体验Get SaaS' : 'Experience Get SaaS Now'}
                </h3>
                <p className="mb-4">
                  {isZh
                    ? 'Get SaaS提供了构建现代化SaaS产品所需的所有核心功能。从用户认证到支付处理，从多语言支持到SEO优化，我们为您准备了一切。'
                    : 'Get SaaS provides all the core features needed to build modern SaaS products. From user authentication to payment processing, from multi-language support to SEO optimization, we have everything ready for you.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`/${locale}/#pricing`}
                    className="inline-flex items-center px-6 py-3 bg-background text-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
                  >
                    {isZh ? '立即开始' : 'Get Started'}
                  </a>
                  <a
                    href={`/${locale}/#features`}
                    className="inline-flex items-center px-6 py-3 border border-border text-dark-900 font-semibold rounded-lg hover:bg-background hover:text-primary transition-colors"
                  >
                    {isZh ? '了解更多' : 'Learn More'}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
