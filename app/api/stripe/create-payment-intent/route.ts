import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { OrderItem, ShippingAddress } from '@/lib/types'

interface RequestBody {
  items: OrderItem[]
  shipping_address: ShippingAddress
  shipping_cost: number
  total: number
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    const { items, shipping_address, shipping_cost, total } = body

    if (!items?.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.price_at_purchase * item.quantity,
      0
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        shipping_name: shipping_address.full_name,
        shipping_email: shipping_address.email,
      },
    })

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        stripe_payment_intent_id: paymentIntent.id,
        status: 'pending',
        shipping_address,
        items,
        subtotal,
        shipping_cost,
        total,
      })
      .select()
      .single()

    if (error) throw new Error(error.message)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
