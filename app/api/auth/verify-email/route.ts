export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, emailVerificationTokens } from '@/lib/schema'
import { eq, and, gt } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: '楠岃瘉浠ょ墝缂哄け' },
        { status: 400 }
      )
    }

    // 鏌ユ壘楠岃瘉浠ょ墝
    const verificationToken = await db.query.emailVerificationTokens.findFirst({
      where: and(
        eq(emailVerificationTokens.token, token),
        gt(emailVerificationTokens.expires, new Date())
      )
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: '楠岃瘉浠ょ墝鏃犳晥鎴栧凡杩囨湡' },
        { status: 400 }
      )
    }

    // 鏇存柊鐢ㄦ埛閭楠岃瘉鐘舵€?
    await db.update(users)
      .set({ 
        emailVerified: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.email, verificationToken.email))

    // 鍒犻櫎楠岃瘉浠ょ墝
    await db.delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.token, token))

    return NextResponse.json({
      message: '閭楠岃瘉鎴愬姛锛佹偍鐜板湪鍙互鐧诲綍浜嗐€?,
      success: true
    })

  } catch (error) {
    console.error('閭楠岃瘉閿欒:', error)
    return NextResponse.json(
      { error: '閭楠岃瘉澶辫触锛岃绋嶅悗閲嶈瘯' },
      { status: 500 }
    )
  }
} 
