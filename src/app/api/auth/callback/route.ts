import { userService } from '@/modules/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const token = await userService.register(code!)
  const redirectTo = req.cookies.get('redirectTo')?.value

  const redirectUrl = redirectTo ?? new URL('/', req.url)

  const cookieExpiresInSeconds = 60 * 60 * 60 * 24 * 30 // 1 month

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`
    }
  })
}
