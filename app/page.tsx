'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { ProductCard } from '@/components/store/ProductCard'

const FILTERS = ['All', 'Outerwear', 'Dresses', 'Knitwear', 'Bespoke']

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'newest'

function applySortAndFilter(filter: string, sort: SortKey) {
  let list = filter === 'All'
    ? [...MOCK_PRODUCTS]
    : MOCK_PRODUCTS.filter(p => p.category === filter.toLowerCase())

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sort === 'newest') list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  // 'recommended' keeps original order

  return list
}

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortKey, setSortKey] = useState<SortKey>('recommended')

  const products = applySortAndFilter(activeFilter, sortKey)

  return (
    <>
      {/* ── Hero — full-bleed editorial ─────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=90&fit=crop"
          alt="AESTHETE — Summer Collection 2025"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />

        {/* Content: top padding clears the fixed navbar (72px desktop / 64px mobile) */}
        <div
          className="relative z-10 h-full flex flex-col justify-end px-5 md:px-16 pb-20 md:pb-28 max-w-[1440px] mx-auto"
          style={{ paddingTop: '72px' }}
        >
          {/* Label above headline */}
          <p className="text-[12px] tracking-[0.1em] uppercase text-white/70 mb-5">
            Summer Collection 2025
          </p>
          <h1 className="font-playfair text-5xl md:text-[72px] text-white leading-[1.05] mb-2">
            Dressed for
          </h1>
          <h1 className="font-playfair text-5xl md:text-[72px] text-white leading-[1.05] italic mb-10">
            the quiet moment
          </h1>
          <div className="flex flex-wrap gap-4">
            {/* SHOP NOW — solid black */}
            <a
              href="#catalog"
              className="bg-[#1a1a1a] text-white px-8 py-3 text-[12px] font-medium tracking-[0.1em] uppercase hover:bg-[#d4c5b9] hover:text-[#1a1a1a] transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 z-10 flex items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
          <div className="w-8 h-px bg-white/30" />
        </div>
      </section>

      {/* ── Catalog ─────────────────────────────────────────────────────── */}
      <section id="catalog" className="max-w-[1440px] mx-auto px-5 md:px-16 pt-20 md:pt-28 pb-0">

        {/* Section heading — visually distinguishes catalog from nav above */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-3">
            New Collection
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#1a1a1a]">Summer 2025</h2>
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 border-t border-[#e8e2da] pt-6">
          <div className="flex flex-wrap gap-6">
            {FILTERS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[11px] tracking-[0.12em] uppercase pb-1 transition-colors ${
                  activeFilter === cat
                    ? 'border-b border-[#1a1a1a] text-[#1a1a1a]'
                    : 'text-[#747878] hover:text-[#1a1a1a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as SortKey)}
            className="text-[11px] tracking-[0.12em] uppercase bg-transparent border-0 focus:outline-none text-[#747878] cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Editorial blocks ────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-16 pt-[120px] pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left — large editorial image with overlay */}
          <div className="relative h-[70vh] overflow-hidden bg-[#e8e8e8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85&fit=crop"
              alt="The Craft"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1a1a1a]/30 flex flex-col justify-end p-8 md:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4c5b9] mb-3">
                The Craft
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6 leading-snug">
                Made to last
                <br />a generation
              </h2>
              <Link
                href="/editorial"
                className="text-[12px] text-white tracking-[0.1em] uppercase border-b border-white pb-px self-start hover:text-[#d4c5b9] hover:border-[#d4c5b9] transition-colors"
              >
                Read the Story
              </Link>
            </div>
          </div>

          {/* Right — stacked: text block + still-life, explicit height matches left */}
          <div className="grid grid-rows-2 gap-6 h-[70vh]">

            {/* Right top — CRAFTSMANSHIP text block */}
            <div className="bg-[#f3f1ee] flex flex-col justify-center px-10 py-8 min-h-0">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-4">
                Craftsmanship
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl text-[#1a1a1a] mb-4 leading-snug">
                Made in Italy
              </h3>
              <p className="text-[14px] text-[#444748] leading-relaxed mb-6 max-w-[320px]">
                Every piece passes through the hands of artisans whose families have worked in Milanese ateliers for generations. No shortcuts. No compromise.
              </p>
              <Link
                href="/archive"
                className="border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2.5 text-[12px] font-medium tracking-[0.1em] uppercase self-start hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Explore the Archive
              </Link>
            </div>

            {/* Right bottom — still-life image */}
            <div className="relative overflow-hidden bg-[#2a2a2a] min-h-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=85&fit=crop"
                alt="Considered details"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bespoke — dark charcoal with neutral editorial bg ────────────── */}
      <section className="relative overflow-hidden bg-[#1a1a1a] py-[120px]">
        {/* Neutral dark editorial background at low opacity */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        {/* Extra dark overlay to ensure #1a1a1a dominates */}
        <div className="absolute inset-0 bg-[#1a1a1a]/60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-5">
            Bespoke
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white leading-snug mb-10">
            Made for you,
            <br />only
          </h2>
          {/* Ghost button centered */}
          <a
            href="/about#contact"
            className="inline-block border border-white text-white bg-transparent px-8 py-3 text-[12px] font-medium tracking-[0.1em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-colors"
          >
            Enquire
          </a>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="bg-[#f3f3f3] py-[120px]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#747878] mb-4">
            Join the Collective
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#1a1a1a] mb-10">
            Stay in the quiet
          </h2>
          <form
            className="max-w-md mx-auto flex"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border-0 border-b border-[#1a1a1a] bg-transparent text-[14px] py-2 focus:outline-none placeholder:text-[#747878]"
            />
            <button
              type="submit"
              className="ml-6 bg-[#1a1a1a] text-white px-6 py-3 text-[12px] font-medium tracking-[0.1em] uppercase hover:bg-[#d4c5b9] hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </>
  )
}
