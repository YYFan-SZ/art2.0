export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { newsletterSubscriptions } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, token, locale = 'zh' } = await request.json()

    if (!email && !token) {
      return NextResponse.json(
        { error: locale === 'zh' ? '璇锋彁渚涢偖绠卞湴鍧€鎴栧彇娑堣闃呬护鐗? : 'Please provide email address or unsubscribe token' },
        { status: 400 }
      )
    }

    let whereCondition
    if (token) {
      whereCondition = eq(newsletterSubscriptions.unsubscribeToken, token)
    } else {
      whereCondition = eq(newsletterSubscriptions.email, email)
    }

    // 鏌ユ壘璁㈤槄璁板綍
    const existingSubscription = await db
      .select()
      .from(newsletterSubscriptions)
      .where(whereCondition)
      .limit(1)

    if (existingSubscription.length === 0) {
      return NextResponse.json(
        { error: locale === 'zh' ? '鏈壘鍒拌闃呰褰? : 'Subscription not found' },
        { status: 404 }
      )
    }

    const subscription = existingSubscription[0]

    if (!subscription.isActive) {
      return NextResponse.json(
        { message: locale === 'zh' ? '鎮ㄥ凡缁忓彇娑堜簡璁㈤槄' : 'You have already unsubscribed' },
        { status: 200 }
      )
    }

    // 鍙栨秷璁㈤槄
    await db
      .update(newsletterSubscriptions)
      .set({
        isActive: false,
        unsubscribedAt: new Date(),
      })
      .where(whereCondition)

    return NextResponse.json({
      message: locale === 'zh' ? '鍙栨秷璁㈤槄鎴愬姛' : 'Successfully unsubscribed'
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET璇锋眰鐢ㄤ簬閫氳繃閾炬帴鍙栨秷璁㈤槄
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const locale = searchParams.get('locale') || 'zh'

    if (!token) {
      return NextResponse.json(
        { error: locale === 'zh' ? '鏃犳晥鐨勫彇娑堣闃呴摼鎺? : 'Invalid unsubscribe link' },
        { status: 400 }
      )
    }

    // 鏌ユ壘璁㈤槄璁板綍
    const existingSubscription = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.unsubscribeToken, token))
      .limit(1)

    if (existingSubscription.length === 0) {
      return NextResponse.json(
        { error: locale === 'zh' ? '鏈壘鍒拌闃呰褰? : 'Subscription not found' },
        { status: 404 }
      )
    }

    const subscription = existingSubscription[0]

    if (!subscription.isActive) {
      return NextResponse.json(
        { message: locale === 'zh' ? '鎮ㄥ凡缁忓彇娑堜簡璁㈤槄' : 'You have already unsubscribed' },
        { status: 200 }
      )
    }

    // 鍙栨秷璁㈤槄
    await db
      .update(newsletterSubscriptions)
      .set({
        isActive: false,
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscriptions.unsubscribeToken, token))

    return NextResponse.json({
      message: locale === 'zh' ? '鍙栨秷璁㈤槄鎴愬姛' : 'Successfully unsubscribed'
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 

