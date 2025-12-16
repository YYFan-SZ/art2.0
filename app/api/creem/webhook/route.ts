export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, pointsHistory } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const eventType = payload.event || payload.type || ''
    const data = payload.data || payload.checkout || payload.session || {}
    const metadata = data.metadata || {}

    const userId: string | undefined = metadata.userId
    const actionType: string | undefined = metadata.type
    const giftedPoints: number = Number(metadata.giftedPoints || 0)
    const purchasedPoints: number = Number(metadata.points || 0)

    const status: string = data.status || payload.status || ''

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId in metadata' }, { status: 400 })
    }

    if (!status || !(status === 'paid' || status === 'succeeded' || status === 'completed')) {
      return NextResponse.json({ success: true })
    }

    const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (actionType === 'subscription' && giftedPoints > 0) {
      await db
        .update(users)
        .set({
          points: sql`${users.points} + ${giftedPoints}`,
          giftedPoints: sql`${users.giftedPoints} + ${giftedPoints}`,
          subscriptionStatus: 'active',
          subscriptionPlan: metadata.planType || 'pro',
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))

      await db.insert(pointsHistory).values({
        id: uuidv4(),
        userId,
        points: giftedPoints,
        pointsType: 'gifted',
        action: 'subscription_purchase',
        description: `璁㈤槄鍏呭€艰禒閫?${giftedPoints} 绉垎`,
        createdAt: new Date(),
      })
    }

    if (actionType === 'points_purchase' && purchasedPoints > 0) {
      await db
        .update(users)
        .set({
          points: sql`${users.points} + ${purchasedPoints}`,
          purchasedPoints: sql`${users.purchasedPoints} + ${purchasedPoints}`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))

      await db.insert(pointsHistory).values({
        id: uuidv4(),
        userId,
        points: purchasedPoints,
        pointsType: 'purchased',
        action: 'points_purchase',
        description: `璐拱绉垎 ${purchasedPoints} 绉垎`,
        createdAt: new Date(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Creem webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

