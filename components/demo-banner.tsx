"use client"

import { useLocale, useTranslations } from 'next-intl'

export function DemoBanner() {
  const locale = useLocale()
  const t = useTranslations('demoBanner')

  const purchaseUrl = locale === 'zh' 
    ? 'https://getmoney.wang/zh/products/get-saas-pro'
    : 'https://getmoney.wang/en/products/get-saas-pro'

  return (
    <div className="w-full bg-primary text-primary-foreground py-2.5 px-4 text-center text-sm relative z-50 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="animate-pulse text-base">🚀</span>
          <span className="font-medium">
            {t('prefix')} <strong className="font-bold">{t('productName')}</strong> {t('suffix')}
          </span>
          <a 
            href={purchaseUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 ml-1 px-3 py-1 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 border border-primary-foreground/20"
          >
            {t('cta')}
            <span className="text-xs">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

