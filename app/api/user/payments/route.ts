export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserPaymentHistory, getUserPaymentStats, PaymentType, PaymentStatus } from '@/lib/payments'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const paymentType = searchParams.get('paymentType') as PaymentType | null
    const paymentStatus = searchParams.get('paymentStatus') as PaymentStatus | null
    const includeStats = searchParams.get('includeStats') === 'true'

    // 鑾峰彇鏀粯璁板綍
    const payments = await getUserPaymentHistory(session.user.id, {
      limit,
      offset,
      paymentType: paymentType || undefined,
      paymentStatus: paymentStatus || undefined,
    })

    // 濡傛灉闇€瑕佺粺璁℃暟鎹?
    let stats = null
    if (includeStats) {
      stats = await getUserPaymentStats(session.user.id)
    }

    return NextResponse.json({
      success: true,
      data: {
        payments,
        stats,
        pagination: {
          limit,
          offset,
          total: payments.length,
        }
      }
    })
  } catch (error) {
    console.error('鑾峰彇鏀粯璁板綍澶辫触:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    )
  }
} 

