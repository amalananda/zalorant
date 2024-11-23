import User from '@/db/models/user'

type SecondArgs = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: SecondArgs) {
  const user = await User.findById(params.id)

  return Response.json(user, {
    status: 200
  })
}
