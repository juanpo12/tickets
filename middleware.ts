import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './src/types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl
  const isLogin = pathname === '/'
  const isProtected = pathname.startsWith('/payment-search')
  const isApi = pathname.startsWith('/api')

  if (!session && isProtected) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/'
    return NextResponse.redirect(loginUrl)
  }

  if (!session && isApi) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  if (session && isLogin) {
    const targetUrl = req.nextUrl.clone()
    targetUrl.pathname = '/payment-search'
    return NextResponse.redirect(targetUrl)
  }

  return res
}

export const config = {
  matcher: ['/', '/payment-search/:path*', '/api/:path*'],
}