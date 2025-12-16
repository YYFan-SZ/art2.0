import { NextRequest, NextResponse } from 'next/server'
import { getActualPriceIds } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.CREEM_API_KEY) {
      return NextResponse.json({ error: 'Creem not configured' }, { status: 500 })
    }

    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { priceId, planType, locale = 'en' } = await request.json()

    // 获取实际的价格ID
    const actualPriceIds = getActualPriceIds()

    // 添加调试日志
    console.log('=== Creem Checkout Debug ===')
    console.log('收到的价格ID:', priceId)
    console.log('计划类型:', planType)
    console.log('语言:', locale)
    console.log('实际的价格ID配置:', actualPriceIds)

    // 企业版不支持在线支付
    if (planType === 'enterprise') {
      return NextResponse.json({ error: 'Enterprise plan requires contact sales' }, { status: 400 })
    }

    // 确定要使用的价格ID
    let finalPriceId = priceId
    
    // 如果前端传递的价格ID为空或无效，使用服务端的配置
    if (!priceId || priceId.trim() === '') {
      if (planType === 'pro') {
        finalPriceId = actualPriceIds.pro
      } else {
        return NextResponse.json({ error: 'Missing price ID for plan type' }, { status: 400 })
      }
    }

    // 验证最终的价格ID
    if (!finalPriceId || finalPriceId.trim() === '') {
      console.error('价格ID验证失败!')
      console.error('计划类型:', planType)
      console.error('最终价格ID:', finalPriceId)
      console.error('可用的价格ID:', actualPriceIds)
      return NextResponse.json({ error: 'Price ID not configured for this plan' }, { status: 400 })
    }

    console.log('使用的最终价格ID:', finalPriceId)

    // 验证locale并构建成功URL
    const validLocales = ['en', 'zh']
    const validLocale = validLocales.includes(locale) ? locale : 'en'
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${validLocale}/dashboard`
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${validLocale}/#pricing`

    const creemResponse = await fetch('https://api.creem.io/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CREEM_API_KEY!,
      },
      body: JSON.stringify({
        product_id: finalPriceId,
        units: 1,
        customer: {
          email: session.user.email,
        },
        success_url: successUrl,
        metadata: {
          userId: session.user.id || '',
          planType,
          locale: validLocale,
        },
      }),
    })

    if (!creemResponse.ok) {
      const errText = await creemResponse.text()
      console.error('Creem checkout error:', errText)
      return NextResponse.json(
        { error: 'Failed to create Creem checkout' },
        { status: 500 }
      )
    }

    const checkout = await creemResponse.json()
    return NextResponse.json({ url: checkout.checkout_url })
  } catch (error) {
    console.error('Creem checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
