"use client"

import { useParams } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function WhatIsSaasContent() {
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
                {isZh ? '什么是SaaS？' : 'What is SaaS?'}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isZh
                ? '深入了解SaaS的定义、商业模式和技术架构，以及如何快速构建现代化SaaS产品'
                : 'Understand the definition, business model, and technical architecture of SaaS, and how to rapidly build modern SaaS products'
              }
            </p>
          </div>

          <div className="prose prose-lg max-w-none prose-invert">
            <p className="text-muted-foreground mb-8">
              {isZh ? '发布时间：2025年7月1日' : 'Published: July 1, 2025'}
            </p>

            {/* 1. SaaS定义 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '1. SaaS的定义' : '1. Definition of SaaS'}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isZh
                  ? 'SaaS（Software as a Service，软件即服务）是一种云计算服务模式，用户通过互联网访问和使用软件应用程序，而无需在本地安装或维护软件。这种模式彻底改变了传统软件的交付和使用方式。'
                  : 'SaaS (Software as a Service) is a revolutionary cloud computing service model that allows users to access and utilize software applications over the internet without the need for local installation or maintenance. This paradigm has fundamentally transformed how traditional software is delivered, consumed, and managed in the modern digital landscape.'
                }
              </p>

              <div className="bg-secondary/50 border border-cyber-500/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {isZh ? '核心特征' : 'Core Characteristics'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '按需访问' : 'On-demand Access'}</strong>：
                      {isZh ? '用户可以随时随地通过网络访问软件' : 'Users can access software anytime, anywhere via the internet'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '订阅付费' : 'Subscription-based'}</strong>：
                      {isZh ? '通常采用月付或年付的订阅模式' : 'Typically uses monthly or annual subscription models'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '多租户架构' : 'Multi-tenant Architecture'}</strong>：
                      {isZh ? '多个用户共享同一套软件实例' : 'Multiple users share the same software instance'}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. SaaS商业模式 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '2. SaaS商业模式' : '2. SaaS Business Model'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '收入模式' : 'Revenue Models'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '订阅费' : 'Subscription Fees'}</strong>：{isZh ? '月度或年度订阅' : 'Monthly or annual subscriptions'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '使用量计费' : 'Usage-based Billing'}</strong>：{isZh ? '按实际使用量收费' : 'Charge based on actual usage'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '增值服务' : 'Value-added Services'}</strong>：{isZh ? '高级功能和支持' : 'Premium features and support'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '优势特点' : 'Key Advantages'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '低初始成本' : 'Low Initial Cost'}</strong>：{isZh ? '无需大额前期投资' : 'No large upfront investment required'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '快速部署' : 'Rapid Deployment'}</strong>：{isZh ? '即开即用，快速上线' : 'Ready to use, quick to deploy'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '自动更新' : 'Automatic Updates'}</strong>：{isZh ? '持续功能改进和安全更新' : 'Continuous feature improvements and security updates'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. 技术架构 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '3. SaaS技术架构' : '3. SaaS Technical Architecture'}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isZh
                  ? '现代SaaS应用通常采用云原生架构，具备高可用性、可扩展性和安全性。以下是典型的SaaS技术栈：'
                  : 'Modern SaaS applications leverage cloud-native architectures designed for high availability, horizontal scalability, and enterprise-grade security. These applications are built using cutting-edge technology stacks that enable rapid development, seamless deployment, and efficient maintenance. Here are the key components of a typical SaaS technology stack:'
                }
              </p>

              <div className="space-y-6">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '前端技术' : 'Frontend Technologies'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">⚛️</div>
                      <div className="font-semibold text-foreground">React/Next.js</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '现代化前端框架' : 'Modern frontend framework'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">🎨</div>
                      <div className="font-semibold text-foreground">Tailwind CSS</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '实用优先的CSS框架' : 'Utility-first CSS framework'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-semibold text-foreground">PWA</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '渐进式Web应用' : 'Progressive Web App'}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '后端技术' : 'Backend Technologies'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">🟢</div>
                      <div className="font-semibold text-foreground">Node.js</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '高性能JavaScript运行时' : 'High-performance JavaScript runtime'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">🗄️</div>
                      <div className="font-semibold text-foreground">PostgreSQL</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '企业级关系数据库' : 'Enterprise-grade relational database'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">🔐</div>
                      <div className="font-semibold text-foreground">Auth</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '身份认证和授权' : 'Authentication and authorization'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <div className="bg-primary p-6 rounded-lg text-dark-900 cyber-glow">
                <h3 className="text-2xl font-semibold mb-4">
                  {isZh ? '体验Get SaaS' : 'Experience Get SaaS'}
                </h3>
                <p className="mb-4">
                  {isZh
                    ? 'Get SaaS是一个现代化的SaaS模版，专为出海产品设计。我们提供完整的用户认证、支付系统、多语言支持等功能，帮助您快速构建和部署SaaS产品。'
                    : 'Get SaaS is a modern SaaS template designed for global products. We provide complete user authentication, payment systems, multi-language support and other features to help you quickly build and deploy SaaS products.'
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
