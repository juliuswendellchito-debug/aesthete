'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/store/useCart'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import type { Product } from '@/lib/types'

// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const MEGA_CATEGORIES = [
  { label: 'Outerwear', href: '/collections?category=outerwear' },
  { label: 'Dresses', href: '/collections?category=dresses' },
  { label: 'Knitwear', href: '/collections?category=knitwear' },
  { label: 'Accessories', href: '/collections?category=accessories' },
  { label: 'Bespoke', href: '/collections?category=bespoke' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const collectionsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { itemCount, toggleCart } = useCart()
  const count = itemCount()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // ESC closes search and mega menu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSearchQuery('')
        setCollectionsOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60)
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  // Close panels on route change
  useEffect(() => {
    setSearchOpen(false)
    setCollectionsOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // Real-time search filter
  const searchResults: Product[] = searchQuery.trim().length >= 1
    ? MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  // Delay-close helpers — prevent gap between trigger and panel closing the menu
  const openCollections = () => {
    if (collectionsCloseTimer.current) clearTimeout(collectionsCloseTimer.current)
    setCollectionsOpen(true)
    setSearchOpen(false)
  }
  const scheduleCloseCollections = () => {
    collectionsCloseTimer.current = setTimeout(() => setCollectionsOpen(false), 200)
  }

  // Active link — strip query string for comparison
  const isActive = (href: string) => {
    const path = href.split('?')[0]
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  // Transparent only on homepage hero — all other pages always show white navbar
  const isHomepage = pathname === '/'
  const panelOpen = searchOpen || collectionsOpen
  const isLight = !isHomepage || scrolled || panelOpen || menuOpen

  const navbarBg = isLight
    ? 'bg-white/95 backdrop-blur-[20px] border-b border-[#e8e2da]'
    : 'bg-transparent'

  const linkCls = `text-[12px] font-medium tracking-[0.1em] uppercase transition-colors duration-200 ${
    isLight ? 'text-[#1a1a1a] hover:text-[#747878]' : 'text-white hover:text-white/70'
  }`

  const iconCls = `transition-colors duration-200 ${
    isLight ? 'text-[#1a1a1a] hover:text-[#747878]' : 'text-white hover:text-white/70'
  }`

  const logoCls = `font-playfair text-[18px] tracking-[0.25em] uppercase absolute left-1/2 -translate-x-1/2 transition-colors duration-300 ${
    isLight ? 'text-[#1a1a1a]' : 'text-white'
  }`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>

      {/* ── Main bar ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Left — nav links */}
          <div className="hidden md:flex items-center gap-8">

            {/* Collections — hover triggers mega menu; timer prevents gap-close */}
            <div
              className="relative"
              onMouseEnter={openCollections}
              onMouseLeave={scheduleCloseCollections}
            >
              <Link
                href="/collections"
                className={`${linkCls} ${isActive('/collections') ? 'border-b border-current pb-px' : ''}`}
              >
                Collections
              </Link>
            </div>

            <Link
              href="/collections?filter=new"
              className={`${linkCls} ${isActive('/collections') ? 'border-b border-current pb-px' : ''}`}
            >
              New Arrivals
            </Link>

            <Link
              href="/editorial"
              className={`${linkCls} ${isActive('/editorial') ? 'border-b border-current pb-px' : ''}`}
            >
              Editorial
            </Link>

            <Link
              href="/archive"
              className={`${linkCls} ${isActive('/archive') ? 'border-b border-current pb-px' : ''}`}
            >
              Archive
            </Link>
          </div>

          {/* Center — wordmark */}
          <Link href="/" className={logoCls}>AESTHETE</Link>

          {/* Right — icon trio */}
          <div className="hidden md:flex items-center gap-5">
            <button
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              onClick={() => { setSearchOpen(v => !v); setCollectionsOpen(false) }}
              className={iconCls}
            >
              {searchOpen ? <CloseIcon size={16} /> : <SearchIcon />}
            </button>

            <button
              aria-label={`Shopping bag, ${count} item${count !== 1 ? 's' : ''}`}
              onClick={toggleCart}
              className={`relative ${iconCls}`}
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#1a1a1a] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>

            <Link href="/auth" aria-label="Account" className={iconCls}>
              <UserIcon />
            </Link>
          </div>

          {/* Mobile — bag + hamburger */}
          <div className={`md:hidden flex items-center gap-4 ${iconCls}`}>
            <button aria-label="Shopping bag" onClick={toggleCart} className="relative">
              <BagIcon />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#1a1a1a] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Collections mega menu — hover panel ───────────────────────────── */}
      <div
        className={`hidden md:block overflow-hidden transition-all duration-200 ${
          collectionsOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        onMouseEnter={openCollections}
        onMouseLeave={scheduleCloseCollections}
      >
        <div className="bg-white border-b border-[#e8e2da] px-5 md:px-16 py-10">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-5 gap-8">
              {MEGA_CATEGORIES.map(cat => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="group block"
                  onClick={() => setCollectionsOpen(false)}
                >
                  <p className="font-playfair text-[22px] text-[#1a1a1a] mb-2 group-hover:text-[#747878] transition-colors leading-tight">
                    {cat.label}
                  </p>
                  <span className="block w-0 group-hover:w-full h-px bg-[#e8e2da] transition-all duration-300" />
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#f0ede9]">
              <Link
                href="/collections"
                className="text-[11px] tracking-[0.15em] uppercase text-[#747878] hover:text-[#1a1a1a] transition-colors"
                onClick={() => setCollectionsOpen(false)}
              >
                View All Collections →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search bar ────────────────────────────────────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-200 ${
          searchOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white border-b border-[#e8e2da] px-5 md:px-16 py-5">
          <div className="max-w-[1440px] mx-auto">
            {/* Input */}
            <div className="flex items-center gap-4 border-b border-[#e8e2da] pb-4">
              <SearchIcon />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="SEARCH FOR PIECES..."
                className="flex-1 bg-transparent text-[13px] tracking-[0.05em] text-[#1a1a1a] placeholder:text-[#c8c6c5] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#747878] hover:text-[#1a1a1a] transition-colors"
                  aria-label="Clear search"
                >
                  <CloseIcon size={14} />
                </button>
              )}
            </div>

            {/* Results */}
            {searchResults.length > 0 && (
              <ul className="mt-2">
                {searchResults.map(product => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 py-3 border-b border-[#f5f3f0] hover:bg-[#faf9f7] -mx-2 px-2 transition-colors"
                    >
                      <div className="w-10 h-12 overflow-hidden bg-[#f0ede9] flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium tracking-[0.06em] uppercase text-[#1a1a1a] truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-[#747878] capitalize mt-0.5">{product.category}</p>
                      </div>
                      <p className="text-[13px] text-[#1a1a1a] font-medium flex-shrink-0">
                        ${product.price.toLocaleString()}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {searchQuery.trim().length >= 1 && searchResults.length === 0 && (
              <p className="mt-4 text-[12px] text-[#747878] tracking-[0.03em]">
                No pieces found for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e8e2da] px-5 py-8">
          <ul className="flex flex-col gap-5 mb-6">
            {[
              { label: 'Collections', href: '/collections' },
              { label: 'New Arrivals', href: '/collections?filter=new' },
              { label: 'Editorial', href: '/editorial' },
              { label: 'Archive', href: '/archive' },
            ].map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`text-[12px] font-medium tracking-[0.1em] uppercase transition-colors ${
                    isActive(item.href)
                      ? 'text-[#1a1a1a] border-b border-[#1a1a1a] pb-px'
                      : 'text-[#1a1a1a]'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-px bg-[#e8e2da] mb-5" />

          {/* Mobile category shortcuts */}
          <ul className="flex flex-col gap-3 mb-6">
            {MEGA_CATEGORIES.map(cat => (
              <li key={cat.label}>
                <Link
                  href={cat.href}
                  className="text-[11px] tracking-[0.1em] uppercase text-[#747878] hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-px bg-[#e8e2da] mb-5" />

          <Link
            href="/auth"
            className="text-[12px] font-medium tracking-[0.1em] uppercase text-[#747878]"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  )
}
