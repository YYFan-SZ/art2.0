export const runtime = 'edge';
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

    // 鑾峰彇瀹為檯鐨勪环鏍糏D
    const actualPriceIds = getActualPriceIds()

    // 娣诲姞璋冭瘯鏃ュ織
    console.log('=== Creem Checkout Debug ===')
    console.log('鏀跺埌鐨勪环鏍糏D:', priceId)
    console.log('璁″垝绫诲瀷:', planType)
    console.log('璇█:', locale)
    console.log('瀹為檯鐨勪环鏍糏D閰嶇疆:', actualPriceIds)

    // 浼佷笟鐗堜笉鏀寔鍦ㄧ嚎鏀粯
    if (planType === 'enterprise') {
      return NextResponse.json({ error: 'Enterprise plan requires contact sales' }, { status: 400 })
    }

    // 纭畾瑕佷娇鐢ㄧ殑浠锋牸ID
    let finalPriceId = priceId
    
    // 濡傛灉鍓嶇浼犻€掔殑浠锋牸ID涓虹┖鎴栨棤鏁堬紝浣跨敤鏈嶅姟绔殑閰嶇疆
    if (!priceId || priceId.trim() === '') {
      if (planType === 'pro') {
        finalPriceId = actualPriceIds.pro
      } else {
        return NextResponse.json({ error: 'Missing price ID for plan type' }, { status: 400 })
      }
    }

    // 楠岃瘉鏈€缁堢殑浠锋牸ID
    if (!finalPriceId || finalPriceId.trim() === '') {
      console.error('浠锋牸ID楠岃瘉澶辫触!')
      console.error('璁″垝绫诲瀷:', planType)
      console.error('鏈€缁堜环鏍糏D:', finalPriceId)
      console.error('鍙敤鐨勪环鏍糏D:', actualPriceIds)
      return NextResponse.json({ error: 'Price ID not configured for this plan' }, { status: 400 })
    }

    console.log('浣跨敤鐨勬渶缁堜环鏍糏D:', finalPriceId)

    // 楠岃瘉locale骞舵瀯寤烘垚鍔烾RL
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

