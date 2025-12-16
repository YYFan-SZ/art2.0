export const runtime = 'edge';
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserPointsDetail } from '@/lib/points-manager'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: '鏈巿鏉? }, { status: 401 })
    }

    const pointsDetail = await getUserPointsDetail(session.user.id)
    
    return NextResponse.json(pointsDetail)
  } catch (error) {
    console.error('鑾峰彇鐢ㄦ埛绉垎璇︽儏澶辫触:', error)
    return NextResponse.json(
      { error: '鑾峰彇绉垎璇︽儏澶辫触' },
      { status: 500 }
    )
  }
} 

