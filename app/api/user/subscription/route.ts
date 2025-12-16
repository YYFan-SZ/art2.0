export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, pointsHistory } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '鏈巿鏉冭闂? },
        { status: 401 }
      )
    }

    // 鑾峰彇鐢ㄦ埛瀹屾暣淇℃伅锛堝寘鎷Н鍒嗕俊鎭級
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
      columns: {
        id: true,
        subscriptionStatus: true,
        subscriptionPlan: true,
        subscriptionCurrentPeriodEnd: true,
        stripeCustomerId: true,
        points: true,
        giftedPoints: true,
        purchasedPoints: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    // 妫€鏌ヨ闃呮槸鍚﹀凡鍒版湡
    const now = new Date()
    const isExpired = user.subscriptionCurrentPeriodEnd && user.subscriptionCurrentPeriodEnd < now
    const hasActiveSubscription = user.subscriptionStatus === 'active' && !isExpired

    // 濡傛灉璁㈤槄宸插埌鏈熶絾鐘舵€佷粛涓篴ctive锛岄渶瑕佹洿鏂扮姸鎬佸苟娓呴浂璧犻€佺Н鍒?
    if (isExpired && user.subscriptionStatus === 'active' && (user.giftedPoints || 0) > 0) {
      console.log('妫€娴嬪埌璁㈤槄宸插埌鏈燂紝娓呴浂璧犻€佺Н鍒?', {
        userId: user.id,
        鍒版湡鏃堕棿: user.subscriptionCurrentPeriodEnd,
        褰撳墠鏃堕棿: now,
        褰撳墠璧犻€佺Н鍒? user.giftedPoints
      })

      // 娓呴浂璧犻€佺Н鍒嗗苟鏇存柊璁㈤槄鐘舵€?
      await db
        .update(users)
        .set({
          subscriptionStatus: 'expired',
          subscriptionPlan: null,
          points: sql`${users.points} - ${user.giftedPoints || 0}`,
          giftedPoints: 0,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))

      // 璁板綍绉垎娓呴浂鍘嗗彶
      await db.insert(pointsHistory).values({
        id: uuidv4(),
        userId: user.id,
        points: -(user.giftedPoints || 0),
        pointsType: 'gifted',
        action: 'subscription_expired',
        description: `璁㈤槄鍒版湡鑷姩娓呴浂璧犻€佺Н鍒哷,
        createdAt: new Date(),
      })

      console.log(`璁㈤槄鍒版湡澶勭悊瀹屾垚: 鐢ㄦ埛 ${user.id}锛屾竻闆?${user.giftedPoints || 0} 璧犻€佺Н鍒哷)

      // 杩斿洖鏇存柊鍚庣殑鐘舵€?
      return NextResponse.json({
        subscriptionStatus: 'expired',
        subscriptionPlan: null,
        subscriptionCurrentPeriodEnd: user.subscriptionCurrentPeriodEnd?.toISOString() || null,
        stripeCustomerId: user.stripeCustomerId,
      })
    }

    // 濡傛灉璁㈤槄宸插埌鏈熶絾娌℃湁璧犻€佺Н鍒嗛渶瑕佹竻闆讹紝鍙洿鏂扮姸鎬?
    if (isExpired && user.subscriptionStatus === 'active') {
      await db
        .update(users)
        .set({
          subscriptionStatus: 'expired',
          subscriptionPlan: null,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))

      console.log(`璁㈤槄鍒版湡鐘舵€佹洿鏂? 鐢ㄦ埛 ${user.id}锛屾棤璧犻€佺Н鍒嗛渶瑕佹竻闆禶)

      return NextResponse.json({
        subscriptionStatus: 'expired',
        subscriptionPlan: null,
        subscriptionCurrentPeriodEnd: user.subscriptionCurrentPeriodEnd?.toISOString() || null,
        stripeCustomerId: user.stripeCustomerId,
      })
    }

    // 杩斿洖褰撳墠鐘舵€?
    return NextResponse.json({
      subscriptionStatus: user.subscriptionStatus,
      subscriptionPlan: user.subscriptionPlan,
      subscriptionCurrentPeriodEnd: user.subscriptionCurrentPeriodEnd?.toISOString() || null,
      stripeCustomerId: user.stripeCustomerId,
    })
  } catch (error) {
    console.error('鑾峰彇璁㈤槄淇℃伅澶辫触:', error)
    return NextResponse.json(
      { error: '鏈嶅姟鍣ㄩ敊璇? },
      { status: 500 }
    )
  }
} 

