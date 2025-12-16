export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, pointsHistory } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    // 楠岃瘉鐢ㄦ埛鐧诲綍鐘舵€?
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: '鐢ㄦ埛鏈櫥褰? },
        { status: 401 }
      )
    }

    const { points, description, type } = await request.json()

    // 楠岃瘉鍙傛暟
    if (!points || points <= 0) {
      return NextResponse.json(
        { success: false, error: '绉垎鏁伴噺鏃犳晥' },
        { status: 400 }
      )
    }

    if (!description || !type) {
      return NextResponse.json(
        { success: false, error: '缂哄皯蹇呰鍙傛暟' },
        { status: 400 }
      )
    }

    // 鏌ユ壘鐢ㄦ埛
    const userList = await db
      .select({
        id: users.id,
        points: users.points
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

    // 妫€鏌ョН鍒嗘槸鍚﹁冻澶?
    if ((user.points || 0) < points) {
      return NextResponse.json(
        { success: false, error: '绉垎涓嶈冻' },
        { status: 400 }
      )
    }

    // 鎵ｉ櫎绉垎骞惰褰曞巻鍙诧紙涓嶄娇鐢ㄤ簨鍔★紝鍥犱负neon-http涓嶆敮鎸侊級
    const newPoints = (user.points || 0) - points

    // 1. 鎵ｉ櫎绉垎
    await db
      .update(users)
      .set({
        points: newPoints,
        updatedAt: new Date()
      })
      .where(eq(users.id, user.id))

    // 2. 璁板綍绉垎鍘嗗彶
    await db.insert(pointsHistory).values({
      id: nanoid(),
      userId: user.id,
      points: -points, // 璐熸暟琛ㄧず鎵ｉ櫎
      pointsType: 'purchased', // 榛樿鎵ｉ櫎璐拱鐨勭Н鍒?
      action: type,
      description: description,
      createdAt: new Date()
    })

    const result = { points: newPoints }

    return NextResponse.json({
      success: true,
      message: '绉垎鎵ｉ櫎鎴愬姛',
      data: {
        deductedPoints: points,
        remainingPoints: result.points,
        description: description
      }
    })

  } catch (error) {
    console.error('绉垎鎵ｉ櫎澶辫触:', error)
    return NextResponse.json(
      { success: false, error: '鏈嶅姟鍣ㄥ唴閮ㄩ敊璇? },
      { status: 500 }
    )
  }
}

