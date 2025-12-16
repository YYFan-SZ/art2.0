export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserPointsHistory, getUserPointsHistoryCount } from '@/lib/points'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '鏈櫥褰? },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '5')
    const offset = (page - 1) * limit

    // 鑾峰彇鍒嗛〉鍘嗗彶璁板綍
    const history = await getUserPointsHistory(session.user.id, limit, offset)
    
    // 鑾峰彇鎬昏褰曟暟
    const total = await getUserPointsHistoryCount(session.user.id)
    
    // 璁＄畻鎬婚〉鏁?
    const totalPages = Math.ceil(total / limit)
    
    return NextResponse.json({
      success: true,
      history,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    })
  } catch (error) {
    console.error('鑾峰彇绉垎鍘嗗彶澶辫触:', error)
    return NextResponse.json(
      { error: '鑾峰彇绉垎鍘嗗彶澶辫触' },
      { status: 500 }
    )
  }
} 

