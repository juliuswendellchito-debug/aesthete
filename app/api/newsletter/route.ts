import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const normalised = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalised)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('subscribers')
      .insert({ email: normalised, source: 'footer' })

    if (error) {
      // Unique violation — already subscribed
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
      }
      console.error('Newsletter insert error:', error)
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subscribed' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
