import { notFound } from 'next/navigation'
import Link from 'next/link'
import { demoOrders } from '@/lib/demo-store'
import type { OrderItem } from '@/lib/types'

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic'

export default function OrderConfirmationPage({ params }: Props) {
  const order = demoOrders.get(params.id) ?? null
  if (!order) notFound()

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)

  return (
    <div className="pt-20 md:pt-24">
      <div className="max-w-aesthete mx-auto px-5 md:px-16 py-16 md:py-24">

        {/* Confirmation header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 border border-brand-champagne rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-brand-champagne text-lg">✓</span>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-3">
            Order Confirmed
          </p>
          <h1 className="font-playfair text-4xl mb-3">Thank you for your order.</h1>
          <p className="text-sm text-outline">
            Order #{order.id.slice(0, 12).toUpperCase()}
          </p>
          <p className="text-sm text-outline mt-1">
            A confirmation has been sent to {order.shipping_address.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 bg-surface-container-low p-8">
            <h2 className="text-xs font-semibold tracking-widest uppercase mb-6">Your Items</h2>
            <ul className="space-y-6">
              {order.items.map((item: OrderItem, i: number) => (
                <li key={i} className="flex gap-4">
                  <div className="w-16 h-20 bg-surface-container-high overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-wider uppercase">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-outline">
                      {item.size} · Qty {item.quantity}
                    </p>
                    <p className="text-sm mt-1">
                      ${(item.price_at_purchase * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-brand-sand space-y-2 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>${order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span>
                  {order.shipping_cost === 0
                    ? 'Complimentary'
                    : `$${order.shipping_cost}`}
                </span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t border-brand-sand">
                <span>Total</span>
                <span>${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-brand-black text-white p-8">
              <p className="text-[10px] tracking-widest uppercase text-outline mb-3">
                Estimated Delivery
              </p>
              <p className="font-playfair text-xl mb-1">
                {deliveryDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs text-outline">5–7 business days</p>
            </div>

            <div className="border border-brand-sand p-8">
              <p className="text-[10px] tracking-widest uppercase text-outline mb-3">
                Shipping To
              </p>
              <p className="text-sm">{order.shipping_address.full_name}</p>
              <p className="text-sm text-on-surface-variant">
                {order.shipping_address.address_line1}
              </p>
              {order.shipping_address.address_line2 && (
                <p className="text-sm text-on-surface-variant">
                  {order.shipping_address.address_line2}
                </p>
              )}
              <p className="text-sm text-on-surface-variant">
                {order.shipping_address.city}
                {order.shipping_address.state
                  ? `, ${order.shipping_address.state}`
                  : ''}{' '}
                {order.shipping_address.postal_code}
              </p>
            </div>

            <Link
              href="/"
              className="bg-brand-black text-white w-full block text-center px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
