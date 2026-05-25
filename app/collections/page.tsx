'use client'

import { useSearchParams } from 'next/navigation'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { ProductCard } from '@/components/store/ProductCard'

const CATEGORY_LABELS: Record<string, string> = {
  outerwear: 'Outerwear',
  dresses: 'Dresses',
  knitwear: 'Knitwear',
  accessories: 'Accessories',
  bespoke: 'Bespoke',
}

const FILTERS = ['All', 'Outerwear', 'Dresses', 'Knitwear', 'Bespoke']

export default function CollectionsPage() {
  const params = useSearchParams()
  const category = params.get('category') ?? ''
  const filter = params.get('filter') ?? ''

  const isNewArrivals = filter === 'new'

  const products = MOCK_PRODUCTS.filter(p => {
    if (isNewArrivals) return p.badge === 'New Arrival'
    if (category) return p.category === category
    return true
  })

  const heading = isNewArrivals
    ? 'New Arrivals'
    : category
      ? CATEGORY_LABELS[category] ?? 'Collections'
      : 'All Collections'

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 pt-32 md:pt-36 pb-[120px]">
      {/* Header */}
      <div className="mb-12 border-b border-[#e8e2da] pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-3">
          {isNewArrivals ? 'Summer 2025' : 'AESTHETE'}
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#1a1a1a]">{heading}</h1>
      </div>

      {/* Category filter tabs */}
      {!isNewArrivals && (
        <div className="flex flex-wrap gap-6 mb-12">
          {FILTERS.map(f => {
            const cat = f === 'All' ? '' : f.toLowerCase()
            const active = cat === category || (f === 'All' && !category)
            return (
              <a
                key={f}
                href={cat ? `/collections?category=${cat}` : '/collections'}
                className={`text-[12px] tracking-[0.1em] uppercase pb-1 transition-colors ${
                  active
                    ? 'border-b border-[#1a1a1a] text-[#1a1a1a]'
                    : 'text-[#747878] hover:text-[#1a1a1a]'
                }`}
              >
                {f}
              </a>
            )
          })}
        </div>
      )}

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-[#747878] mt-8">No pieces found in this category.</p>
      )}
    </div>
  )
}
