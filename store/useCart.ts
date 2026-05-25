'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  subtotal: () => number
  itemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size) => {
        set(state => {
          const existing = state.items.find(
            i => i.product.id === product.id && i.size === size
          )
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id && i.size === size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { product, size, quantity: 1 }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId, size) => {
        set(state => ({
          items: state.items.filter(
            i => !(i.product.id === productId && i.size === size)
          ),
        }))
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'aesthete-cart' }
  )
)
