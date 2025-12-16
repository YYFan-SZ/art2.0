export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: '璇峰湪URL涓彁渚涢偖绠卞弬鏁帮紝渚嬪锛?email=your@email.com' },
        { status: 400 }
      )
    }

    // 鏇存柊鐢ㄦ埛瑙掕壊涓虹鐞嗗憳
    const result = await db
      .update(users)
      .set({ role: 'admin' })
      .where(eq(users.email, email))
      .returning()

    if (result.length === 0) {
      return NextResponse.json(
        { error: '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: `鐢ㄦ埛 ${email} 宸茶缃负绠＄悊鍛榒,
      success: true 
    })
  } catch (error) {
    console.error('Set admin error:', error)
    return NextResponse.json(
      { 
        error: '璁剧疆绠＄悊鍛樺け璐?,
        details: error instanceof Error ? error.message : '鏈煡閿欒'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: '閭鍦板潃鏄繀闇€鐨? },
        { status: 400 }
      )
    }

    // 鏇存柊鐢ㄦ埛瑙掕壊涓虹鐞嗗憳
    const result = await db
      .update(users)
      .set({ role: 'admin' })
      .where(eq(users.email, email))
      .returning()

    if (result.length === 0) {
      return NextResponse.json(
        { error: '鐢ㄦ埛涓嶅瓨鍦? },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: `鐢ㄦ埛 ${email} 宸茶缃负绠＄悊鍛榒,
      success: true 
    })
  } catch (error) {
    console.error('Set admin error:', error)
    return NextResponse.json(
      { 
        error: '璁剧疆绠＄悊鍛樺け璐?,
        details: error instanceof Error ? error.message : '鏈煡閿欒'
      },
      { status: 500 }
    )
  }
} 
