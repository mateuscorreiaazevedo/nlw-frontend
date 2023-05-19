import { NextRequest, NextResponse } from 'next/server'
import { env } from './main/config'

const signInUrl = `https://github.com/login/oauth/authorize?client_id=${env.githubId}`

export default function middleware (req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly; max-age=2;`
      }
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/memories/:path*']
}
