export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
// 浣跨敤 Creem 浣滀负鏀粯鎻愪緵鍟?import { getServerSession } from 'next-auth'
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

    const { points, amount, priceId } = await request.json()

    if (!points || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile?payment=success`
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile?payment=cancelled`

    // 濡傛灉鎻愪緵浜?Creem 浜у搧ID锛岀洿鎺ュ垱寤?Checkout锛涘惁鍒欐牴鎹噾棰濆垱寤轰竴娆℃€ц鍗?    const body: any = {
      units: 1,
      customer: {
        email: session.user.email,
      },
      success_url: successUrl,
      metadata: {
        userId: session.user.id || '',
        points: points.toString(),
        type: 'points_purchase',
        amount,
      },
    }

    if (priceId && priceId.trim() !== '') {
      body.product_id = priceId
    } else {
      body.amount = amount
      body.currency = 'USD'
      body.product = `${points.toLocaleString()} Points`
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
      console.error('Creem checkout session creation error:', errText)
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    const checkout = await creemResponse.json()
    return NextResponse.json({ url: checkout.checkout_url })
  } catch (error) {
    console.error('Creem checkout session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

