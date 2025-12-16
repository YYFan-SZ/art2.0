export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq, and, gt } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // 鏌ユ壘鍏锋湁鏈夋晥閲嶇疆浠ょ墝鐨勭敤鎴?
    const user = await db.select().from(users).where(
      and(
        eq(users.resetToken, token),
        gt(users.resetTokenExpiry, new Date())
      )
    ).limit(1)

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // 鍝堝笇鏂板瘑鐮?
    const hashedPassword = await bcrypt.hash(password, 12)

    // 鏇存柊鐢ㄦ埛瀵嗙爜骞舵竻闄ら噸缃护鐗?
    await db.update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      })
      .where(eq(users.id, user[0].id))

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
