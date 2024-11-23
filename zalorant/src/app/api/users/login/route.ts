import { cookies } from "next/headers"
import User from "../../../../db/models/user"
import { generateToken } from "../../../../lib/jwt"
import { compare } from "bcryptjs"


const secureCookie = process.env.NODE_ENV === "production" ? "Secure" : ""
export async function POST(request: Request) {
  try {
    const jsonData = await request.json()
    const email = jsonData.email as string
    const password = (jsonData.password || "")?.toString()

    await User.initialize()

    const user = await User.findOne({ email })
    console.log("User found:", user)

    console.log("Password yang dimasukkan:", password)
    if (user) {
      console.log("Password yang di-hash di database:", user.password)
    }

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    const isPasswordValid = await compare(password, user.password)
    console.log("Is password valid?", isPasswordValid)

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const token = generateToken({ _id: user._id, email: user.email })
    console.log("Generated token:", token)

    const Cookies = cookies()
    Cookies.set("Authorization", `Bearer ${token}`, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
    })

    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; ${secureCookie}; Max-Age=${30 * 24 * 60 * 60}`,
        },
      }
    )

  } catch (error) {
    console.error("Error during login:", error)
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
