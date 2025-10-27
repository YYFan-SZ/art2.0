"use client"

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Blog() {
  const params = useParams()
  const t = useTranslations('blogPage.otherPosts')
  const locale = params.locale as string

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* 第一篇文章 - 音频总结智能体是如何工作的 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-secondary/90 backdrop-blur-sm hover:bg-secondary/95 cyber-glow-subtle">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="border-cyber-500 text-primary">
                  {t('post1.category')}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {t('post1.date')}
                </span>
              </div>
              <Link href={`/${locale}/blog/saas-website-examples`} target="_blank" rel="noopener noreferrer" className="block">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 cursor-pointer hover:text-primary line-clamp-2 text-foreground">
                  {t('post1.title')}
                </CardTitle>
              </Link>
              <CardDescription className="text-muted-foreground leading-relaxed mt-3 text-sm line-clamp-3">
                {t('post1.excerpt')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={`/${locale}/blog/saas-website-examples`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="group p-0 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg transition-all duration-300 cyber-glow-subtle">
                  {t('readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 第二篇文章 - ITSAI Agent提供哪些声音AI智能体 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-secondary/90 backdrop-blur-sm hover:bg-secondary/95 cyber-glow-subtle">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="border-cyber-500 text-primary">
                  {t('post2.category')}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {t('post2.date')}
                </span>
              </div>
              <Link href={`/${locale}/blog/saas-features`} target="_blank" rel="noopener noreferrer" className="block">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 cursor-pointer hover:text-primary line-clamp-2 text-foreground">
                  {t('post2.title')}
                </CardTitle>
              </Link>
              <CardDescription className="text-muted-foreground leading-relaxed mt-3 text-sm line-clamp-3">
                {t('post2.excerpt')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={`/${locale}/blog/saas-features`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="group p-0 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg transition-all duration-300 cyber-glow-subtle">
                  {t('readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 第三篇文章 - 什么是AI智能体 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-secondary/90 backdrop-blur-sm hover:bg-secondary/95 cyber-glow-subtle">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="border-cyber-500 text-primary">
                  {t('post3.category')}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {t('post3.date')}
                </span>
              </div>
              <Link href={`/${locale}/blog/what-is-saas`} target="_blank" rel="noopener noreferrer" className="block">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 cursor-pointer hover:text-primary line-clamp-2 text-foreground">
                  {t('post3.title')}
                </CardTitle>
              </Link>
              <CardDescription className="text-muted-foreground leading-relaxed mt-3 text-sm line-clamp-3">
                {t('post3.excerpt')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={`/${locale}/blog/what-is-saas`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="group p-0 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg transition-all duration-300 cyber-glow-subtle">
                  {t('readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 