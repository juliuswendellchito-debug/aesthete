'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/useCart'
import type { ShippingAddress } from '@/lib/types'

type Step = 'review' | 'shipping' | 'payment'

const EMPTY_SHIPPING: ShippingAddress = {
  full_name: '',
  email: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'US',
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<Step>('review')
  const [shipping, setShipping] = useState<ShippingAddress>(EMPTY_SHIPPING)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')
  const [processing, setProcessing] = useState(false)

  const sub = subtotal()
  const shippingCost = shippingMethod === 'express' ? 25 : 0
  const total = sub + shippingCost

  const steps: { key: Step; label: string }[] = [
    { key: 'review', label: 'Review' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ]

  const handleDemoCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    const res = await fetch('/api/demo/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(i => ({
          product_id: i.product.id,
          product_name: i.product.name,
          product_image: i.product.images[0] ?? '',
          size: i.size,
          quantity: i.quantity,
          price_at_purchase: i.product.price,
        })),
        shipping_address: shipping,
        shipping_cost: shippingCost,
        total,
      }),
    })

    const { orderId } = await res.json()
    clearCart()
    router.push(`/order/${orderId}`)
  }

  const updateField =
    (field: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setShipping(prev => ({ ...prev, [field]: e.target.value }))

  if (items.length === 0) {
    return (
      <div className="pt-32 max-w-aesthete mx-auto px-5 md:px-16 py-24 text-center">
        <p className="text-sm text-outline">Your bag is empty.</p>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      <div className="max-w-aesthete mx-auto px-5 md:px-16 py-16 md:py-24">

        {/* Demo banner */}
        <div className="bg-surface-container-high border-l-2 border-brand-champagne px-4 py-3 mb-10 flex items-center gap-3">
          <span className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold">
            Demo Mode
          </span>
          <span className="text-xs text-outline">
            No real payment is processed. Click &ldquo;Complete Order&rdquo; to simulate a successful checkout.
          </span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-16">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-6 md:gap-10">
              <span
                className={`text-[10px] tracking-widest uppercase pb-1 transition-colors ${
                  step === s.key
                    ? 'border-b border-on-surface text-on-surface'
                    : 'text-outline'
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <span className="text-outline-variant hidden md:block">—</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main */}
          <div className="md:col-span-2">

            {/* Step 1: Review */}
            {step === 'review' && (
              <div>
                <h2 className="font-playfair text-2xl mb-8">Review Your Order</h2>
                <ul className="space-y-6 mb-8">
                  {items.map(item => (
                    <li key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-surface-container-high overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold tracking-wider uppercase">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-outline">
                          {item.size} · Qty {item.quantity}
                        </p>
                        <p className="text-sm mt-1">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setStep('shipping')}
                  className="bg-brand-black text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 'shipping' && (
              <div>
                <h2 className="font-playfair text-2xl mb-8">Shipping Information</h2>
                <div className="space-y-6 mb-8">
                  {(
                    [
                      { name: 'full_name', label: 'Full Name', type: 'text' },
                      { name: 'email', label: 'Email Address', type: 'email' },
                      { name: 'address_line1', label: 'Street Address', type: 'text' },
                      { name: 'address_line2', label: 'Apartment, suite, etc. (optional)', type: 'text' },
                      { name: 'city', label: 'City', type: 'text' },
                      { name: 'state', label: 'State / Province', type: 'text' },
                      { name: 'postal_code', label: 'Postal Code', type: 'text' },
                    ] as { name: keyof ShippingAddress; label: string; type: string }[]
                  ).map(field => (
                    <div key={field.name}>
                      <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={shipping[field.name] ?? ''}
                        onChange={updateField(field.name)}
                        className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Shipping method */}
                <div className="mb-8">
                  <p className="text-[10px] tracking-widest uppercase text-outline mb-4">
                    Shipping Method
                  </p>
                  {[
                    { id: 'standard', label: 'Standard Delivery', desc: '5–7 business days', price: 'Complimentary' },
                    { id: 'express', label: 'Express Delivery', desc: '2–3 business days', price: '$25' },
                  ].map(method => (
                    <label
                      key={method.id}
                      className="flex items-center justify-between border border-outline-variant p-4 mb-3 cursor-pointer hover:border-on-surface transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={shippingMethod === method.id}
                          onChange={() =>
                            setShippingMethod(method.id as 'standard' | 'express')
                          }
                          className="accent-on-surface"
                        />
                        <div>
                          <p className="text-xs font-medium tracking-wider uppercase">
                            {method.label}
                          </p>
                          <p className="text-xs text-outline">{method.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium">{method.price}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setStep('review')}
                    className="border border-on-surface text-on-surface px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-on-surface hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('payment')}
                    className="bg-brand-black text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment (Demo) */}
            {step === 'payment' && (
              <div>
                <h2 className="font-playfair text-2xl mb-8">Payment</h2>

                <form onSubmit={handleDemoCheckout} className="space-y-6">
                  {/* Mock card fields — visual only */}
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="4242 4242 4242 4242"
                      readOnly
                      className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm text-on-surface focus:outline-none cursor-default"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        defaultValue="12 / 28"
                        readOnly
                        className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm text-on-surface focus:outline-none cursor-default"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        defaultValue="···"
                        readOnly
                        className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm text-on-surface focus:outline-none cursor-default"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="border border-on-surface text-on-surface px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-on-surface hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-1 bg-brand-black text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors disabled:opacity-50"
                    >
                      {processing
                        ? 'Processing...'
                        : `Complete Order — $${total.toLocaleString()}`}
                    </button>
                  </div>
                </form>

                {/* Trust badges */}
                <div className="mt-10 pt-8 border-t border-brand-sand flex flex-wrap gap-6">
                  {['Demo Mode — No charge', 'Free Returns · 30 Days', 'Sustainable Packaging'].map(
                    badge => (
                      <div key={badge} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-brand-champagne" />
                        <span className="text-[10px] tracking-widest uppercase text-outline">
                          {badge}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-surface-container-low p-6 h-fit">
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Order Summary
            </h3>
            <ul className="space-y-4 mb-6">
              {items.map(item => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-on-surface-variant">
                    {item.product.name}{' '}
                    <span className="text-outline">×{item.quantity}</span>
                  </span>
                  <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-4 border-t border-brand-sand text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>${sub.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t border-brand-sand">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
