"use client"

import { useParams } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function SaasWebsiteExamplesContent() {
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
                {isZh ? 'Get SaaS可以做哪些网站？' : 'What Websites Can Get SaaS Build?'}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isZh
                ? '深入了解Get SaaS模版的应用场景，从电商平台到企业管理系统，再到在线教育平台的完整解决方案'
                : 'Understand Get SaaS template application scenarios, from e-commerce platforms to enterprise management systems, to online education platforms'
              }
            </p>
          </div>

          <div className="prose prose-lg max-w-none prose-invert">
            <p className="text-muted-foreground mb-8">
              {isZh ? '发布时间：2025年7月1日' : 'Published: July 1, 2025'}
            </p>

            {/* 1. 电商平台 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '1. 电商平台' : '1. E-commerce Platforms'}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isZh
                  ? 'Get SaaS为构建现代化电商平台提供了完整的基础设施。从用户注册、产品展示到支付处理，所有核心功能都已集成。'
                  : 'Get SaaS delivers a comprehensive infrastructure foundation for building sophisticated e-commerce platforms. From seamless user registration and dynamic product catalogs to secure payment processing and order management, all essential e-commerce functionalities are pre-integrated and production-ready.'
                }
              </p>

              <div className="bg-secondary/50 border border-cyber-500/30 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {isZh ? '电商功能特性' : 'E-commerce Features'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '用户管理' : 'User Management'}</strong>：
                      {isZh ? '完整的用户注册、登录、个人资料管理系统' : 'Complete user registration, login, and profile management system'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '支付集成' : 'Payment Integration'}</strong>：
                      {isZh ? '内置Stripe支付系统，支持多种支付方式' : 'Built-in Stripe payment system supporting multiple payment methods'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground">
                      <strong className="text-primary">{isZh ? '多语言支持' : 'Multi-language Support'}</strong>：
                      {isZh ? '轻松进入全球市场，支持多种语言切换' : 'Easy global market entry with multiple language switching'}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. 企业管理系统 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '2. 企业管理系统' : '2. Enterprise Management Systems'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? 'CRM系统' : 'CRM Systems'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '客户管理' : 'Customer Management'}</strong>：{isZh ? '完整的客户信息管理' : 'Complete customer information management'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '销售跟踪' : 'Sales Tracking'}</strong>：{isZh ? '销售流程和业绩跟踪' : 'Sales process and performance tracking'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '数据分析' : 'Data Analytics'}</strong>：{isZh ? '客户行为和销售数据分析' : 'Customer behavior and sales data analysis'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? 'ERP系统' : 'ERP Systems'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '资源管理' : 'Resource Management'}</strong>：{isZh ? '企业资源统一管理' : 'Unified enterprise resource management'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '流程自动化' : 'Process Automation'}</strong>：{isZh ? '业务流程自动化处理' : 'Business process automation'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">
                        <strong className="text-primary">{isZh ? '权限控制' : 'Access Control'}</strong>：{isZh ? '细粒度的权限管理系统' : 'Fine-grained permission management system'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. 在线教育平台 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '3. 在线教育平台' : '3. Online Education Platforms'}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isZh
                  ? '教育科技是SaaS应用的重要领域。Get SaaS提供了构建在线教育平台所需的所有基础功能。'
                  : 'Educational technology represents one of the most dynamic and rapidly growing sectors in the SaaS ecosystem. Get SaaS provides a comprehensive foundation with all the essential building blocks needed to create sophisticated online education platforms, from course management and student enrollment to payment processing and progress tracking.'
                }
              </p>

              <div className="space-y-6">
                <div className="bg-secondary/50 p-6 rounded-lg border border-cyber-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {isZh ? '核心教育功能' : 'Core Education Features'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">📚</div>
                      <div className="font-semibold text-foreground">{isZh ? '课程管理' : 'Course Management'}</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '完整的课程创建和管理系统' : 'Complete course creation and management system'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">👥</div>
                      <div className="font-semibold text-foreground">{isZh ? '学员管理' : 'Student Management'}</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '学员注册、进度跟踪和成绩管理' : 'Student registration, progress tracking and grade management'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/70 rounded-lg border border-cyber-500/20">
                      <div className="text-2xl mb-2">💳</div>
                      <div className="font-semibold text-foreground">{isZh ? '订阅计费' : 'Subscription Billing'}</div>
                      <div className="text-sm text-muted-foreground">{isZh ? '灵活的课程定价和订阅模式' : 'Flexible course pricing and subscription models'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. 项目管理工具 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {isZh ? '4. 项目管理工具' : '4. Project Management Tools'}
              </h2>

              <div className="bg-gradient-to-r from-dark-600/50 to-dark-600/70 p-6 rounded-lg border border-cyber-500/30 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {isZh ? '团队协作功能' : 'Team Collaboration Features'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyber-400 mb-3">{isZh ? '任务管理' : 'Task Management'}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '任务创建和分配' : 'Task creation and assignment'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '进度跟踪和状态更新' : 'Progress tracking and status updates'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '截止日期和提醒' : 'Deadlines and reminders'}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyber-400 mb-3">{isZh ? '团队协作' : 'Team Collaboration'}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '实时评论和讨论' : 'Real-time comments and discussions'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '文件共享和版本控制' : 'File sharing and version control'}
                      </li>
                      <li className="flex items-center text-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {isZh ? '团队权限管理' : 'Team permission management'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12">
              <div className="bg-primary p-6 rounded-lg text-dark-900 cyber-glow">
                <h3 className="text-2xl font-semibold mb-4">
                  {isZh ? '开始构建您的SaaS产品' : 'Start Building Your SaaS Product'}
                </h3>
                <p className="mb-4">
                  {isZh
                    ? 'Get SaaS提供了构建各种类型SaaS产品的完整解决方案。无论您想要创建电商平台、企业管理系统还是在线教育平台，我们都有您需要的所有功能和工具。'
                    : 'Get SaaS provides complete solutions for building various types of SaaS products. Whether you want to create e-commerce platforms, enterprise management systems, or online education platforms, we have all the features and tools you need.'
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
