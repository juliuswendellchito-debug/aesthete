'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart()
  const total = subtotal()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-sand">
          <h2 className="text-xs font-semibold tracking-widest uppercase">
            Your Bag{items.length > 0 && ` (${items.length})`}
          </h2>
          <button
            onClick={closeCart}
            className="text-xs tracking-widest uppercase text-outline hover:text-on-surface transition-colors"
          >
            Close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-sm text-outline mb-6">Your bag is empty.</p>
              <button
                onClick={closeCart}
                className="border border-on-surface text-on-surface px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-on-surface hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map(item => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4"
                >
                  <div className="w-20 h-24 bg-surface-container-high overflow-hidden flex-shrink-0">
                    {item.product.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold tracking-wider uppercase truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-outline mt-1">{item.size}</p>
                    <p className="text-sm mt-2">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity - 1)
                          }
                          className="text-outline hover:text-on-surface transition-colors w-5 h-5 flex items-center justify-center text-lg leading-none"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity + 1)
                          }
                          className="text-outline hover:text-on-surface transition-colors w-5 h-5 flex items-center justify-center text-lg leading-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-xs text-outline hover:text-on-surface transition-colors ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-brand-sand">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs tracking-widest uppercase text-outline">Subtotal</span>
              <span className="text-sm font-medium">${total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-outline mb-6">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="bg-brand-black text-white w-full block text-center px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
