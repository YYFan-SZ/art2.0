"use client"

import { useTranslations } from 'next-intl'

export function BlogHeader() {
  const t = useTranslations('blogPage')

  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-primary">
          {t('title')}
        </span>
      </h1>
      <p className="text-xl text-muted-foreground">
        {t('subtitle')}
      </p>
    </div>
  )
} 