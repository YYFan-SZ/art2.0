export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '鏈巿鏉冭闂? },
        { status: 401 }
      )
    }

    // 鑾峰彇鐢ㄦ埛鐨勫叧鑱旇处鎴蜂俊鎭?
    const accounts = await db.query.accounts.findMany({
      where: (accounts, { eq }) => eq(accounts.userId, session.user.id),
    })

    const connectedAccounts = [
      {
        provider: 'google',
        connected: accounts.some(acc => acc.provider === 'google'),
      },
    ]

    return NextResponse.json({
      success: true,
      accounts: connectedAccounts,
    })
  } catch (error) {
    console.error('鑾峰彇鍏宠仈璐︽埛澶辫触:', error)
    return NextResponse.json(
      { error: '鏈嶅姟鍣ㄩ敊璇? },
      { status: 500 }
    )
  }
} 

