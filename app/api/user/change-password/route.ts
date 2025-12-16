export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

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
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: '璇锋彁渚涘綋鍓嶅瘑鐮佸拰鏂板瘑鐮? },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: '鏂板瘑鐮佽嚦灏戦渶瑕?涓瓧绗? },
        { status: 400 }
      )
    }

    // 鑾峰彇鐢ㄦ埛褰撳墠瀵嗙爜
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.user.id),
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: '鐢ㄦ埛涓嶅瓨鍦ㄦ垨鏈缃瘑鐮? },
        { status: 404 }
      )
    }

    // 楠岃瘉褰撳墠瀵嗙爜
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '褰撳墠瀵嗙爜涓嶆纭? },
        { status: 400 }
      )
    }

    // 鍔犲瘑鏂板瘑鐮?
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // 鏇存柊瀵嗙爜
    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))

    return NextResponse.json({
      success: true,
      message: '瀵嗙爜淇敼鎴愬姛',
    })
  } catch (error) {
    console.error('淇敼瀵嗙爜澶辫触:', error)
    return NextResponse.json(
      { error: '鏈嶅姟鍣ㄩ敊璇? },
      { status: 500 }
    )
  }
} 

