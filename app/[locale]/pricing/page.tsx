"use client"

import { useLocale, useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { SUBSCRIPTION_PRODUCTS, POINTS_PRODUCTS } from '@/lib/stripe'

export default function PricingExplainPage() {
  const locale = useLocale()
  const t = useTranslations('pricingExplain')

  const subscriptionPlans = [
    { key: 'pro', data: SUBSCRIPTION_PRODUCTS.pro },
    { key: 'pro_3m', data: SUBSCRIPTION_PRODUCTS.pro_3m },
    { key: 'pro_6m', data: SUBSCRIPTION_PRODUCTS.pro_6m },
  ]

  const pointsPackages = [
    POINTS_PRODUCTS.small,
    POINTS_PRODUCTS.medium,
  ]

  const getLocalizedPath = (path: string) => `/${locale}${path}`

  const handlePointsCheckout = async (points: number, amount: number, priceId: string) => {
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points, amount: Math.round(amount * 100), priceId }),
    })
    const data = await res.json()
    if (data?.url) window.location.href = data.url
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t('sections.subscriptionsTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionPlans.map((item) => (
              <Card key={item.key} className="border">
                <CardHeader>
                  <CardTitle className="text-foreground">{t(`planNames.${item.key}`)}</CardTitle>
                  <CardDescription>{t('subscriptions.giftedPointsPerCycle', { points: item.data.giftedPoints })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-4">${item.data.price}</div>
                  <ul className="text-sm space-y-2 mb-6 text-muted-foreground">
                    {[
                      t(`features.${item.key}.item1`),
                      t(`features.${item.key}.item2`, { count: item.data.giftedPoints }),
                      t(`features.${item.key}.item3`),
                    ].map((f: string, idx: number) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                  <StripeCheckoutButton
                    priceId={(item.data.priceId as string) || ''}
                    planType={item.key}
                    className="w-full"
                    variant="default"
                  >
                    {t('buttons.subscribeNow')}
                  </StripeCheckoutButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t('sections.pointsTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pointsPackages.map((pkg) => (
              <Card key={pkg.id} className="border">
                <CardHeader>
                  <CardTitle className="text-foreground">{t('points.packageName')}</CardTitle>
                  <CardDescription>{t('points.itemDescription', { count: pkg.points })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-4">${pkg.price}</div>
                  <Button className="w-full" onClick={() => handlePointsCheckout(pkg.points, pkg.price, pkg.priceId)}>
                    {t('buttons.buyNow')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" onClick={() => (window.location.href = getLocalizedPath('/'))}>{t('buttons.backHome')}</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
