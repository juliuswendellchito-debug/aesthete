'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false)
  const [showSizes, setShowSizes] = useState(false)
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.sizes.length === 0) {
      addItem(product, 'One Size')
      return
    }
    setShowSizes(true)
  }

  const handleSizeSelect = (e: React.MouseEvent, size: string) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, size)
    setShowSizes(false)
  }

  return (
    <div
      className="group relative border border-transparent hover:border-[#e8e2da] transition-colors duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowSizes(false) }}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image */}
        <div className="relative overflow-hidden bg-[#f0ede9] aspect-[3/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {product.images[1] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[1]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Badge — 1px sand border, no fill */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="text-[10px] tracking-[0.1em] uppercase border border-[#e8e2da] px-2 py-1 text-[#1a1a1a] bg-transparent">
                {product.badge}
              </span>
            </div>
          )}

          {/* Quick Add overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
              hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {showSizes ? (
              <div className="bg-white px-4 py-3">
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#747878] mb-2">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={(e) => handleSizeSelect(e, size)}
                      className="text-[10px] tracking-[0.1em] uppercase border border-[#1a1a1a] px-2 py-1 hover:bg-[#1a1a1a] hover:text-white transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="w-full bg-white text-[#1a1a1a] text-[10px] tracking-[0.1em] uppercase py-3 hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Quick Add
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-4 px-0">
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#1a1a1a]">
            {product.name}
          </p>
          <p className="text-[14px] font-normal text-[#444748] mt-1">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  )
}
