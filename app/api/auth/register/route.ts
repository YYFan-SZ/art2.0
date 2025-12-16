export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, emailVerificationTokens } from '@/lib/schema'
import { sendVerificationEmail } from '@/lib/email'
import { giveRegisterBonus } from '@/lib/points'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, locale } = await request.json()

    // 浠庤姹備腑鑾峰彇璇█淇℃伅锛岄粯璁や负鑻辨枃
    const language = locale || 'en'
    
    // 楠岃瘉杈撳叆
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: language === 'en' ? 'Please fill in all required fields' : '璇峰～鍐欐墍鏈夊繀濉瓧娈? },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: language === 'en' ? 'Password must be at least 6 characters long' : '瀵嗙爜鑷冲皯闇€瑕?涓瓧绗? },
        { status: 400 }
      )
    }

    // 妫€鏌ョ敤鎴锋槸鍚﹀凡瀛樺湪
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingUser) {
      return NextResponse.json(
        { error: language === 'en' ? 'This email is already registered' : '璇ラ偖绠卞凡琚敞鍐? },
        { status: 400 }
      )
    }

    // 鍔犲瘑瀵嗙爜
    const hashedPassword = await bcrypt.hash(password, 12)

    // 鍒涘缓鐢ㄦ埛
    const userId = nanoid()
    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
    })

    // 璧犻€佹敞鍐岀Н鍒?
    try {
      await giveRegisterBonus(userId)
      console.log(`鏂扮敤鎴?${email} 娉ㄥ唽鎴愬姛锛屽凡璧犻€佹敞鍐岀Н鍒哷)
    } catch (pointsError) {
      console.error('璧犻€佹敞鍐岀Н鍒嗗け璐?', pointsError)
      // 绉垎璧犻€佸け璐ヤ笉褰卞搷娉ㄥ唽娴佺▼
    }

    // 鐢熸垚閭楠岃瘉浠ょ墝
    const verificationToken = nanoid(32)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24灏忔椂鍚庤繃鏈?

    await db.insert(emailVerificationTokens).values({
      id: nanoid(),
      email,
      token: verificationToken,
      expires,
    })

    // 鍙戦€侀獙璇侀偖浠讹紙鏍规嵁璇█锛?
    const emailResult = await sendVerificationEmail(email, verificationToken, language as 'zh' | 'en')

    if (!emailResult.success) {
      return NextResponse.json(
        { error: language === 'en' 
          ? 'Registration successful, but failed to send verification email. Please try again later.' 
          : '娉ㄥ唽鎴愬姛锛屼絾鍙戦€侀獙璇侀偖浠跺け璐ワ紝璇风◢鍚庨噸璇? },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: language === 'en' 
        ? 'Registration successful! Please check your email and click the verification link to complete registration.'
        : '娉ㄥ唽鎴愬姛锛佽妫€鏌ユ偍鐨勯偖绠卞苟鐐瑰嚮楠岃瘉閾炬帴瀹屾垚娉ㄥ唽銆?,
      success: true
    })

  } catch (error) {
    console.error('娉ㄥ唽閿欒:', error)
    return NextResponse.json(
      { error: 'Registration failed, please try again later' },
      { status: 500 }
    )
  }
} 
