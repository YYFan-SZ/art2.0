export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, sessions } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '鏈巿鏉冭闂? },
        { status: 401 }
      )
    }

    // 鑾峰彇鐢ㄦ埛璇︾粏淇℃伅
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)

    if (!user[0]) {
      return NextResponse.json(
        { error: '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    // 鑾峰彇鐢ㄦ埛鏈€鍚庣櫥褰曟椂闂达紙浠巗essions琛ㄤ腑鑾峰彇鏈€鏂扮殑session锛?
    const lastSession = await db
      .select({
        expires: sessions.expires,
      })
      .from(sessions)
      .where(eq(sessions.userId, session.user.id))
      .orderBy(desc(sessions.expires))
      .limit(1)

    return NextResponse.json({
      success: true,
      user: {
        ...user[0],
        lastLoginAt: lastSession[0]?.expires || user[0].createdAt
      }
    })
  } catch (error) {
    console.error('鑾峰彇鐢ㄦ埛淇℃伅澶辫触:', error)
    return NextResponse.json(
      { error: '鏈嶅姟鍣ㄩ敊璇? },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '鏈巿鏉冭闂? },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name } = body

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: '濮撳悕涓嶈兘涓虹┖' },
        { status: 400 }
      )
    }

    // 鏇存柊鐢ㄦ埛淇℃伅
    await db
      .update(users)
      .set({
        name: name.trim(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))

    return NextResponse.json({
      success: true,
      message: '涓汉淇℃伅鏇存柊鎴愬姛',
    })
  } catch (error) {
    console.error('鏇存柊涓汉淇℃伅澶辫触:', error)
    return NextResponse.json(
      { error: '鏈嶅姟鍣ㄩ敊璇? },
      { status: 500 }
    )
  }
} 

