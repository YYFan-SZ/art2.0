export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { sendPasswordResetEmail } from '@/lib/email'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json()

    // 浠庤姹備腑鑾峰彇璇█淇℃伅锛岄粯璁や负鑻辨枃
    const language = locale || 'en'

    if (!email) {
      return NextResponse.json(
        { error: language === 'en' ? 'Email is required' : '閭鍦板潃鏄繀濉」' },
        { status: 400 }
      )
    }

    // 鏌ユ壘鐢ㄦ埛
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (user.length === 0) {
      return NextResponse.json(
        { error: language === 'en' ? 'User not found' : '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    // 鐢熸垚閲嶇疆浠ょ墝
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24灏忔椂鍚庤繃鏈?

    // 淇濆瓨閲嶇疆浠ょ墝鍒版暟鎹簱
    await db.update(users)
      .set({
        resetToken,
        resetTokenExpiry
      })
      .where(eq(users.email, email))

    // 鍙戦€侀噸缃瘑鐮侀偖浠讹紙鏍规嵁璇█锛?
    await sendPasswordResetEmail(email, resetToken, language as 'zh' | 'en')

    return NextResponse.json(
      { message: language === 'en' 
        ? 'Password reset email sent successfully' 
        : '瀵嗙爜閲嶇疆閭欢宸插彂閫佹垚鍔? },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
