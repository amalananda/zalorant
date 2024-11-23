import { connectToDB } from "@/db/config"
import { Collection, Filter, ObjectId } from 'mongodb'
import { hashPassword } from "@/lib/bcrypt"
import { z } from "zod"

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(8, { message: "Username is required" }),
  email: z.string().email({ message: "Email format is invalid" }),
  password: z.string().min(6, { message: "Password must be minimum at 6 characters" }),
})

type UserType = z.infer<typeof UserSchema>

export default class User {
  static col: Collection<UserType>

  static async initialize() {
    const db = await connectToDB()
    this.col = db.collection<UserType>('users')
  }

  static async findOne(filter: Filter<UserType>) {
    const db = await connectToDB()
    return await db.collection<UserType>('users').findOne(filter)
  }

  static async findById(_id: string) {
    const db = await connectToDB()
    return await db.collection<UserType>('users').findOne({ _id: new ObjectId(_id) })
  }

  static async create(data: UserType) {
    UserSchema.parse(data)
    const db = await connectToDB()


    const existingUsername = await db.collection<UserType>('users').findOne({ username: data.username })
    if (existingUsername) {
      throw new Error("Username already exists")
    }

    const existingEmail = await db.collection<UserType>('users').findOne({ email: data.email })
    if (existingEmail) {
      throw new Error("Email already exists")
    }
    data.password = await hashPassword(data.password)

    await db.collection<UserType>('users').insertOne(data)
  }
}
