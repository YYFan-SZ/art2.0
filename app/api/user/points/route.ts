export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, pointsHistory } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    // 楠岃瘉鐢ㄦ埛鐧诲綍鐘舵€?
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: '鐢ㄦ埛鏈櫥褰? },
        { status: 401 }
      )
    }

    // 鏌ユ壘鐢ㄦ埛瀹屾暣淇℃伅锛堝寘鎷闃呬俊鎭級
    const userList = await db
      .select({
        id: users.id,
        points: users.points,
        giftedPoints: users.giftedPoints,
        purchasedPoints: users.purchasedPoints,
        name: users.name,
        email: users.email,
        subscriptionStatus: users.subscriptionStatus,
        subscriptionCurrentPeriodEnd: users.subscriptionCurrentPeriodEnd,
        subscriptionPlan: users.subscriptionPlan,
      })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1)

    const user = userList[0]
    if (!user) {
      return NextResponse.json(
        { success: false, error: '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    // 妫€鏌ヨ闃呮槸鍚﹀凡鍒版湡骞跺鐞嗙Н鍒嗘竻闆?
    const now = new Date()
    const isExpired = user.subscriptionCurrentPeriodEnd && user.subscriptionCurrentPeriodEnd < now
    let currentPoints = user.points || 0

    // 濡傛灉璁㈤槄宸插埌鏈熶絾鐘舵€佷粛涓篴ctive锛岄渶瑕佹竻闆惰禒閫佺Н鍒?
    if (isExpired && user.subscriptionStatus === 'active' && (user.giftedPoints || 0) > 0) {
      console.log('绉垎API妫€娴嬪埌璁㈤槄宸插埌鏈燂紝娓呴浂璧犻€佺Н鍒?', {
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

      // 鏇存柊褰撳墠绉垎鍊?
      currentPoints = currentPoints - (user.giftedPoints || 0)

      console.log(`绉垎API璁㈤槄鍒版湡澶勭悊瀹屾垚: 鐢ㄦ埛 ${user.id}锛屾竻闆?${user.giftedPoints || 0} 璧犻€佺Н鍒哷)
    }

    return NextResponse.json({
      success: true,
      data: {
        points: currentPoints,
        userId: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.error('鑾峰彇鐢ㄦ埛绉垎澶辫触:', error)
    return NextResponse.json(
      { success: false, error: '鏈嶅姟鍣ㄥ唴閮ㄩ敊璇? },
      { status: 500 }
    )
  }
}

