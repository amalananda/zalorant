import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { handleError, HttpError } from './lib/error'
import * as jose from 'jose'


export async function middleware(request: NextRequest) {
  try {
    const authCookie = cookies().get('Authorization')

    if (!authCookie) {
      // Redirect to login page if the user is not authenticated
      if (request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } else {
      const [type, token] = authCookie.value.split(' ')

      if (type !== 'Bearer' || !token) {
        throw new HttpError("Invalid Token", 401)
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
      const result = await jose.jwtVerify<{ _id: string, email: string }>(token, secret)

      // Add user info to request headers for API usage
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', result.payload._id)
      requestHeaders.set('x-user-email', result.payload.email)

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
    }

    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return handleError(error)
  }
}

export const config = {
  matcher: ['/wishlist', '/api/wishlist']
}
