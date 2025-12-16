export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserPoints, addPoints, deductPoints, PointsAction } from '@/lib/points'
import { isAdmin } from '@/lib/auth-utils'

// 鑾峰彇褰撳墠鐢ㄦ埛绉垎
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '鏈櫥褰? },
        { status: 401 }
      )
    }

    const points = await getUserPoints(session.user.id)
    
    return NextResponse.json({
      points,
      userId: session.user.id,
      email: session.user.email,
    })
  } catch (error) {
    console.error('鑾峰彇绉垎澶辫触:', error)
    return NextResponse.json(
      { error: '鑾峰彇绉垎澶辫触' },
      { status: 500 }
    )
  }
}

// 绠＄悊鍛樻搷浣滐細娣诲姞鎴栨墸闄ょН鍒?
export async function POST(request: NextRequest) {
  try {
    // 楠岃瘉绠＄悊鍛樻潈闄?
    const adminAccess = await isAdmin()
    if (!adminAccess) {
      return NextResponse.json(
        { error: '闇€瑕佺鐞嗗憳鏉冮檺' },
        { status: 403 }
      )
    }

    const { userId, points, action, operation } = await request.json()
    
    if (!userId || !points || !operation) {
      return NextResponse.json(
        { error: '缂哄皯蹇呰鍙傛暟' },
        { status: 400 }
      )
    }

    let result
    if (operation === 'add') {
      result = await addPoints(userId, points, action || PointsAction.MANUAL)
    } else if (operation === 'deduct') {
      result = await deductPoints(userId, points)
    } else {
      return NextResponse.json(
        { error: '鏃犳晥鐨勬搷浣滅被鍨? },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: `绉垎鎿嶄綔鎴愬姛`,
      newPoints: result,
      success: true
    })
  } catch (error) {
    console.error('绉垎鎿嶄綔澶辫触:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '绉垎鎿嶄綔澶辫触'
      },
      { status: 500 }
    )
  }
} 

