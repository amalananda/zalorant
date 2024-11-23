import User from "@/db/models/user"

export async function GET() {
  const users = await User.findAll()

  return Response.json(users)
}
