import { NextResponse, type NextRequest } from 'next/server'

// Demo mode: no auth required. All routes are open.
// When Supabase is connected, replace with the full auth middleware from
// the commented block below.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

/*
// ── Production middleware (restore when Supabase is connected) ──────────────
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/auth', request.url))

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()

    if (profile?.role !== 'admin')
      return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}
*/
