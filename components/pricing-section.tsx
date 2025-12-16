"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { SUBSCRIPTION_PRICE_IDS } from "@/lib/stripe"
import { RegularPriceDisplay } from "./discount-price-display"

export function PricingSection() {
  const locale = useLocale()
  const t = useTranslations("pricing")

  const plans = [
    {
      name: t("free.name"),
      price: t("free.price"),
      description: t("free.description"),
      features: [t("free.features.template"), t("free.features.auth"), t("free.features.support")],
      cta: t("free.cta"),
      popular: false,
      priceId: null,
      planType: 'free',
    },
    {
      name: '月度订阅',
      price: '$6.88',
      description: '每月获得300积分（限量）',
      features: [
        '每月300积分',
        '积分用完可单独充值',
        '基础技术支持',
      ],
      cta: '立即订阅',
      popular: true,
      priceId: SUBSCRIPTION_PRICE_IDS.pro,
      planType: 'pro',
      hasDiscount: false,
    },
    {
      name: '季度订阅',
      price: '$15.88',
      description: '三个月获得1000积分（限量）',
      features: [
        '三个月总计1000积分',
        '积分用完可单独充值',
        '优先技术支持',
      ],
      cta: '立即订阅',
      popular: false,
      priceId: (process.env.CREEM_SUBSCRIPTION_3M_PRICE_ID || ''),
      planType: 'pro_3m',
      hasDiscount: false,
    },
    {
      name: '半年订阅',
      price: '$29.88',
      description: '半年获得3000积分（限量）',
      features: [
        '半年总计3000积分',
        '积分用完可单独充值',
        '优先技术支持',
      ],
      cta: '立即订阅',
      popular: false,
      priceId: (process.env.CREEM_SUBSCRIPTION_6M_PRICE_ID || ''),
      planType: 'pro_6m',
      hasDiscount: false,
    },
    {
      name: t("enterprise.name"),
      price: t("enterprise.price"),
      description: t("enterprise.description"),
      features: [
        t("enterprise.features.custom"),
        t("enterprise.features.deployment"),
        t("enterprise.features.support"),
        t("enterprise.features.training"),
      ],
      cta: t("enterprise.cta"),
      popular: false,
      priceId: null,
      planType: 'enterprise',
    },
  ]

  return (
    <section id="pricing" className="relative py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t("title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? plan.hasDiscount
                    ? "border-cyber-500 shadow-xl scale-105 bg-gradient-to-br from-dark-600 to-dark-600 cyber-glow"
                    : "border-cyber-500 shadow-lg scale-105 cyber-glow-subtle"
                  : "border-border bg-secondary/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground cyber-glow">
                  {t("recommended")}
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>

                {/* 价格显示区域 */}
                <div className="mb-4">
                  <RegularPriceDisplay price={plan.price} />
                </div>

                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* 根据计划类型显示不同的按钮 */}
                {plan.planType === 'free' ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.location.href = '/auth/signup'}
                  >
                    {plan.cta}
                  </Button>
                ) : plan.planType === 'enterprise' ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.location.href = 'mailto:support@itsai-agent.com'}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link
                    href={`/${locale}/pricing`}
                    className={`w-full inline-flex items-center justify-center rounded-md border ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"} px-4 py-2`}
                  >
                    查看套餐
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
