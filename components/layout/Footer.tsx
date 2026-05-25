'use client'

import { useState } from 'react'
import Link from 'next/link'

const COLLECTION_LINKS = [
  { label: 'Collections', href: '/collections' },
  { label: 'New Arrivals', href: '/collections?filter=new' },
  { label: 'Editorial', href: '/editorial' },
  { label: 'Archive', href: '/archive' },
  { label: 'Bespoke', href: '/collections?category=bespoke' },
]

const SERVICE_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Returns & Exchanges', href: '/about#returns' },
  { label: 'Shipping Information', href: '/about#shipping' },
  { label: 'Contact', href: '/about#contact' },
  { label: 'Size Guide', href: '/size-guide' },
]

const SOCIAL_LINKS = [
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'TT', href: 'https://tiktok.com' },
  { label: 'PI', href: 'https://pinterest.com' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || status === 'loading') return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setStatus('done')
        setEmail('')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Something went wrong')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error — please try again')
      setStatus('error')
    }
  }

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="font-playfair text-[20px] tracking-[0.2em] uppercase mb-4 block hover:text-[#c8c6c5] transition-colors">
              AESTHETE
            </Link>
            <p className="text-[13px] text-[#c8c6c5] leading-relaxed max-w-[220px]">
              Quiet luxury. Considered design. Each piece made to outlast the season.
            </p>
            {/* Social */}
            <div className="flex gap-5 mt-8">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] tracking-[0.1em] text-[#747878] hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Collection */}
          <div>
            <h4 className="text-[12px] tracking-[0.1em] uppercase text-[#747878] mb-6">
              Collection
            </h4>
            <ul className="space-y-3">
              {COLLECTION_LINKS.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[#c8c6c5] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Client Services */}
          <div>
            <h4 className="text-[12px] tracking-[0.1em] uppercase text-[#747878] mb-6">
              Client Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[#c8c6c5] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-[12px] tracking-[0.1em] uppercase text-[#747878] mb-6">
              Newsletter
            </h4>
            <p className="text-[13px] text-[#c8c6c5] leading-relaxed mb-6">
              Dispatches from the atelier — new arrivals, editorial stories, and events.
            </p>

            {status === 'done' ? (
              <p className="text-[13px] text-[#d4c5b9]">
                Thank you — you&apos;re on the list.
              </p>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  disabled={status === 'loading'}
                  className="w-full border-b border-[#474746] bg-transparent text-[13px] text-white placeholder:text-[#474746] py-2 focus:outline-none focus:border-[#c8c6c5] transition-colors disabled:opacity-50"
                />
                {status === 'error' && (
                  <p className="text-[11px] text-red-400">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="self-start bg-white text-[#1a1a1a] px-6 py-2.5 text-[12px] font-medium tracking-[0.1em] uppercase hover:bg-[#d4c5b9] transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-5 border-t border-[#2f3131]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-[12px] text-[#747878]">
            © {new Date().getFullYear()} AESTHETE. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy', href: '/about' },
              { label: 'Terms', href: '/about' },
              { label: 'Cookies', href: '/about' },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] text-[#747878] hover:text-[#c8c6c5] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
