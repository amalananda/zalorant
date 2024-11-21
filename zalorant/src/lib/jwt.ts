import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

const JWT_SECRET = "your_secret_key_here"

if (!JWT_SECRET) {
  console.error("JWT_SECRET not set")
  process.exit(1)
}

type PayloadJWT = { _id: ObjectId; email: string }

export const generateToken = (payload: PayloadJWT) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error: unknown) {
    if (error instanceof Error) {
      // If error is an instance of Error, access the message property
      console.error("Error verifying token:", error.message)
    } else {
      // If error is not an instance of Error, log a generic message
      console.error("Unknown error occurred while verifying token.")
    }
    throw new Error("Invalid or malformed token.")
  }
}
