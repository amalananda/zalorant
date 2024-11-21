import { ZodError } from 'zod'

export class HttpError extends Error {
  status: number = 500
  message: string = "Internal Server Error"
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export function handleError(error: unknown) {
  if (error instanceof HttpError) {
    return Response.json({ message: error.message }, { status: error.status })
  }
  if (error instanceof ZodError) {
    const message = error.issues[0].message
    return Response.json({
      message: message
    }, {
      status: 400
    })
  }
  return Response.json({
    message: "Internal Server Error"
  }, {
    status: 500
  })
}
