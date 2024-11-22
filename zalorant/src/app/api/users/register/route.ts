import User from '@/db/models/user'
import { NextRequest } from 'next/server'
import { ZodError } from 'zod'

class HttpError extends Error {
  status: number = 500
  message: string = "Internal Server Error"
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await User.create(body)

    return new Response(
      JSON.stringify({ message: "Register success!" }),
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof HttpError) {
      return new Response(
        JSON.stringify({ message: error.message }),
        { status: error.status }
      )
    }
    if (error instanceof ZodError) {
      const message = error.issues[0].message
      return new Response(
        JSON.stringify({ message }),
        { status: 400 }
      )
    }

    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    )
  }
}


export async function GET(request: NextRequest) {
  console.log("user id yg akses???", request.headers.get('x-user-id'))
  console.log("user email yg akses???", request.headers.get('x-user-email'))
  // const users = await User.findAll()
  // return Response.json(users)
}
