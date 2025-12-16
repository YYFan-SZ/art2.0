export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { newsletterSubscriptions } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import crypto from 'crypto'
import { isAdmin } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { email, locale = 'zh' } = await request.json()

    // 楠岃瘉閭鏍煎紡
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: locale === 'zh' ? '璇疯緭鍏ユ湁鏁堢殑閭鍦板潃' : 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // 妫€鏌ユ槸鍚﹀凡缁忚闃?
    const existingSubscription = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email))
      .limit(1)

    if (existingSubscription.length > 0) {
      const subscription = existingSubscription[0]
      
      // 濡傛灉宸茬粡鏄椿璺冭闃?
      if (subscription.isActive) {
        return NextResponse.json(
          { message: locale === 'zh' ? '鎮ㄥ凡缁忚闃呬簡鎴戜滑鐨勯偖浠跺垪琛? : 'You are already subscribed to our newsletter' },
          { status: 200 }
        )
      } else {
        // 閲嶆柊婵€娲昏闃?
        await db
          .update(newsletterSubscriptions)
          .set({
            isActive: true,
            subscribedAt: new Date(),
            unsubscribedAt: null,
            locale: locale,
          })
          .where(eq(newsletterSubscriptions.email, email))

        return NextResponse.json({
          message: locale === 'zh' ? '娆㈣繋鍥炴潵锛佹偍宸查噸鏂拌闃呮垚鍔? : 'Welcome back! You have successfully resubscribed'
        })
      }
    }

    // 鍒涘缓鏂拌闃?
    const subscriptionId = nanoid()
    const unsubscribeToken = crypto.randomBytes(32).toString('hex')

    await db.insert(newsletterSubscriptions).values({
      id: subscriptionId,
      email: email,
      locale: locale,
      unsubscribeToken: unsubscribeToken,
    })

    // TODO: 杩欓噷鍙互鍙戦€佹杩庨偖浠?
    // await sendWelcomeEmail(email, locale, unsubscribeToken)

    return NextResponse.json({
      message: locale === 'zh' ? '璁㈤槄鎴愬姛锛佹劅璋㈡偍鐨勫叧娉? : 'Successfully subscribed! Thank you for your interest'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // 鑾峰彇璁㈤槄缁熻淇℃伅锛堜粎鐢ㄤ簬绠＄悊锛?
  try {
    // 楠岃瘉绠＄悊鍛樻潈闄?
    const adminAccess = await isAdmin()
    if (!adminAccess) {
      return NextResponse.json(
        { error: '闇€瑕佺鐞嗗憳鏉冮檺' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'stats') {
      const totalSubscriptions = await db
        .select()
        .from(newsletterSubscriptions)
        .where(eq(newsletterSubscriptions.isActive, true))

      return NextResponse.json({
        total: totalSubscriptions.length,
        zh: totalSubscriptions.filter(sub => sub.locale === 'zh').length,
        en: totalSubscriptions.filter(sub => sub.locale === 'en').length,
      })
    }

    if (action === 'list') {
      const allSubscriptions = await db
        .select({
          id: newsletterSubscriptions.id,
          email: newsletterSubscriptions.email,
          locale: newsletterSubscriptions.locale,
          isActive: newsletterSubscriptions.isActive,
          subscribedAt: newsletterSubscriptions.subscribedAt,
          unsubscribedAt: newsletterSubscriptions.unsubscribedAt,
        })
        .from(newsletterSubscriptions)
        .orderBy(newsletterSubscriptions.subscribedAt)

      return NextResponse.json({
        subscriptions: allSubscriptions
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Newsletter stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 

