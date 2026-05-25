'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Mode = 'signin' | 'signup'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Demo: simulate a brief delay then redirect home
    await new Promise(r => setTimeout(r, 600))
    router.push('/')
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-sm px-6">

        {/* Demo notice */}
        <div className="bg-surface-container-high border-l-2 border-brand-champagne px-4 py-3 mb-8">
          <span className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold block mb-1">
            Demo Mode
          </span>
          <span className="text-xs text-outline">
            No real authentication. Any credentials will sign you in.
          </span>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-playfair text-3xl mb-2">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-sm text-outline">
            {mode === 'signin'
              ? 'Access your AESTHETE account.'
              : 'Join the Silent Atelier collective.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase text-outline block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border-0 border-b border-on-surface bg-transparent py-2 text-sm focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-black text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-champagne hover:text-brand-black transition-colors disabled:opacity-50"
          >
            {loading ? '...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-xs tracking-widest uppercase text-outline hover:text-on-surface transition-colors"
          >
            {mode === 'signin'
              ? "Don't have an account? Create one"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
