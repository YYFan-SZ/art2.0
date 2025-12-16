export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, emailVerificationTokens } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '鏈巿鏉冭闂? },
        { status: 401 }
      )
    }

    // 鑾峰彇鐢ㄦ埛淇℃伅
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
      columns: {
        id: true,
        email: true,
        emailVerified: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    // 妫€鏌ラ偖绠辨槸鍚﹀凡楠岃瘉
    if (user.emailVerified) {
      return NextResponse.json(
        { error: '閭宸查獙璇侊紝鏃犻渶閲嶅楠岃瘉' },
        { status: 400 }
      )
    }

    // 鍒犻櫎璇ョ敤鎴蜂箣鍓嶇殑楠岃瘉浠ょ墝
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.email, user.email))

    // 鐢熸垚鏂扮殑楠岃瘉浠ょ墝
    const token = uuidv4()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24灏忔椂鍚庤繃鏈?

    // 淇濆瓨鏂扮殑楠岃瘉浠ょ墝
    await db.insert(emailVerificationTokens).values({
      id: uuidv4(),
      email: user.email,
      token,
      expires,
    })

    // 鑾峰彇鐢ㄦ埛璇█鍋忓ソ
    const { locale = 'en' } = await request.json().catch(() => ({ locale: 'en' }))

    // 鍙戦€侀獙璇侀偖浠?
    const emailResult = await sendVerificationEmail(user.email, token, locale as 'zh' | 'en')

    if (!emailResult.success) {
      console.error('鍙戦€侀獙璇侀偖浠跺け璐?', emailResult.error)
      return NextResponse.json(
        { error: '鍙戦€侀獙璇侀偖浠跺け璐ワ紝璇风◢鍚庨噸璇? },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '楠岃瘉閭欢宸插彂閫侊紝璇锋鏌ユ偍鐨勯偖绠?
    })

  } catch (error) {
    console.error('閲嶅彂楠岃瘉閭欢澶辫触:', error)
    return NextResponse.json(
      { error: '鏈嶅姟鍣ㄥ唴閮ㄩ敊璇? },
      { status: 500 }
    )
  }
}

