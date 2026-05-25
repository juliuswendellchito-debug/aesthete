'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/useCart'

interface Props {
  orderId: string
  total: number
}

export function PaymentForm({ orderId, total }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { clearCart } = useCart()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/${orderId}`,
      },
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.')
      setProcessing(false)
    } else {
      clearCart()
      router.push(`/order/${orderId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      {error && (
        <p className="text-error text-sm mt-4">{error}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-8 py-4 bg-brand-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${total.toLocaleString()}`}
      </button>
    </form>
  )
}
