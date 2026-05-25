'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export function ProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToBag = () => {
    if (!selectedSize && product.sizes.length > 0) {
      // Shake the size selector — just alert for simplicity
      alert('Please select a size.')
      return
    }
    addItem(product, selectedSize ?? 'One Size')
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const accordions = [
    {
      id: 'details',
      label: 'Details & Fit',
      content:
        'Composition: 100% Virgin Wool. Dry clean only. Made in Italy. True to size — model is 5\'10" wearing size S.',
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content:
        'Complimentary standard shipping on all orders. Express delivery available at checkout. Free returns within 30 days of delivery.',
    },
  ]

  return (
    <div className="pt-20 md:pt-24">
      <div className="max-w-aesthete mx-auto px-5 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-20 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-[3/4] overflow-hidden border transition-colors ${
                    selectedImage === i ? 'border-on-surface' : 'border-transparent'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 aspect-[3/4] overflow-hidden bg-surface-container-high">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="md:sticky md:top-28 self-start">
            <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-3 capitalize">
              {product.category}
            </p>
            <h1 className="font-playfair text-3xl md:text-4xl text-on-surface mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-on-surface mb-8">
              ${product.price.toLocaleString()}
            </p>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-widest uppercase text-on-surface">Size</p>
                  <button className="text-[10px] tracking-widest uppercase text-outline underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => {
                    const inStock = (product.stock[size] ?? 0) > 0
                    return (
                      <button
                        key={size}
                        onClick={() => inStock && setSelectedSize(size)}
                        disabled={!inStock}
                        className={`text-xs tracking-widest uppercase border px-4 py-2 transition-colors ${
                          selectedSize === size
                            ? 'bg-on-surface text-white border-on-surface'
                            : inStock
                            ? 'border-outline-variant hover:border-on-surface'
                            : 'border-outline-variant text-outline-variant line-through cursor-not-allowed'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Add to bag */}
            <button
              onClick={handleAddToBag}
              className={`w-full py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                added
                  ? 'bg-brand-champagne text-brand-black'
                  : 'bg-brand-black text-white hover:bg-brand-champagne hover:text-brand-black'
              }`}
            >
              {added ? 'Added to Bag' : 'Add to Bag'}
            </button>

            {/* Description */}
            <p className="text-sm text-on-surface-variant leading-relaxed mt-8 mb-8">
              {product.description}
            </p>

            {/* Accordions */}
            {accordions.map(acc => (
              <div key={acc.id} className="border-t border-brand-sand">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === acc.id ? null : acc.id)
                  }
                  className="flex items-center justify-between w-full py-4 text-xs font-semibold tracking-widest uppercase text-on-surface"
                >
                  {acc.label}
                  <span className="text-outline font-light text-lg leading-none">
                    {openAccordion === acc.id ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === acc.id && (
                  <p className="text-sm text-on-surface-variant leading-relaxed pb-4">
                    {acc.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
