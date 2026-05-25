import { NextRequest, NextResponse } from 'next/server'
import { demoOrders } from '@/lib/demo-store'
import type { Order, OrderItem, ShippingAddress } from '@/lib/types'

interface Body {
  items: OrderItem[]
  shipping_address: ShippingAddress
  shipping_cost: number
  total: number
}

export async function POST(req: NextRequest) {
  const { items, shipping_address, shipping_cost, total }: Body = await req.json()

  const orderId = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  const subtotal = items.reduce(
    (sum, item) => sum + item.price_at_purchase * item.quantity,
    0
  )

  const order: Order = {
    id: orderId,
    stripe_payment_intent_id: `pi_demo_${orderId}`,
    status: 'confirmed',
    shipping_address,
    items,
    subtotal,
    shipping_cost,
    total,
    created_at: new Date().toISOString(),
  }

  demoOrders.set(orderId, order)

  return NextResponse.json({ orderId })
}
