"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, Twitter, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function ContactPost() {
  const t = useTranslations('blogPage.contactPost')

  return (
    <article className="mb-16">
      <Card className="overflow-hidden border-0 shadow-lg bg-secondary/90 cyber-glow-subtle">
        <div className="bg-primary p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-sm text-primary-foreground/90">
              <Calendar className="w-4 h-4 mr-1" />
              2025.7.1
            </div>
            <div className="flex items-center text-sm text-primary-foreground/90">
              <User className="w-4 h-4 mr-1" />
              {t('author')}
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
            {t('title')}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-6">
            {t('description')}
          </p>
        </div>
        
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-center text-primary">
                {t('contactMethods.title')}
              </h3>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Twitter */}
                <div className="text-center p-6 rounded-lg bg-secondary/50 border border-primary/30 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 cyber-glow">
                    <Twitter className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2 text-dark-100">{t('contactMethods.twitter.title')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('contactMethods.twitter.description')}
                  </p>
                  <Link
                    href="https://x.com/zyailive"
                    target="_blank"
                    className="text-primary hover:text-cyber-400 font-medium"
                  >
                    {t('contactMethods.twitter.handle')}
                  </Link>
                </div>

                {/* Email */}
                <div className="text-center p-6 rounded-lg bg-secondary/50 border border-primary/30 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 cyber-glow">
                    <Mail className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2 text-dark-100">{t('contactMethods.email.title')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('contactMethods.email.description')}
                  </p>
                  <Link
                    href="mailto:app@itusi.cn"
                    className="text-primary hover:text-cyber-400 font-medium"
                  >
                    {t('contactMethods.email.address')}
                  </Link>
                </div>

                {/* WeChat */}
                <div className="text-center p-6 rounded-lg bg-secondary/50 border border-primary/30 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 cyber-glow">
                    <MessageCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2 text-dark-100">{t('contactMethods.wechat.title')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('contactMethods.wechat.description')}
                  </p>
                  <span className="text-primary font-medium">
                    {t('contactMethods.wechat.id')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  )
} 