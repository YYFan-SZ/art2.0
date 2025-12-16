export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SUBSCRIPTION_PRODUCTS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.CREEM_API_KEY) {
      return NextResponse.json({ error: 'Creem not configured' }, { status: 500 })
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType, priceId, locale = 'en' } = await request.json()

    if (planType === 'enterprise') {
      return NextResponse.json({ error: 'Enterprise plan requires contact sales' }, { status: 400 })
    }

    const validLocales = ['en', 'zh']
    const validLocale = validLocales.includes(locale) ? locale : 'en'

    const planMap: Record<string, any> = SUBSCRIPTION_PRODUCTS as any
    const plan = planMap[planType] || SUBSCRIPTION_PRODUCTS.pro

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${validLocale}/dashboard`
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${validLocale}/#pricing`

    const body: any = {
      units: 1,
      customer: {
        email: session.user.email!,
      },
      success_url: successUrl,
      metadata: {
        userId: session.user.id,
        planType,
        locale: validLocale,
        giftedPoints: plan.giftedPoints,
        interval: plan.interval,
        type: 'subscription'
      },
    }

    if (priceId && priceId.trim() !== '') {
      body.product_id = priceId
    } else if (plan.priceId && String(plan.priceId).trim() !== '') {
      body.product_id = plan.priceId
    } else {
      body.amount = Math.round(Number(plan.price) * 100)
      body.currency = 'USD'
      body.product = plan.name
    }

    const creemResponse = await fetch('https://api.creem.io/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CREEM_API_KEY!,
      },
      body: JSON.stringify(body),
    })

    if (!creemResponse.ok) {
      const errText = await creemResponse.text()
      console.error('Creem checkout error:', errText)
      return NextResponse.json({ error: 'Failed to create Creem checkout' }, { status: 500 })
    }

    const checkout = await creemResponse.json()
    return NextResponse.json({ checkoutUrl: checkout.checkout_url })
  } catch (error) {
    console.error('Creem checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

