import { ObjectId } from 'mongodb'

export interface ProductType {
  _id: ObjectId
  name: string
  slug: string
  description: string
  excerpt: string
  price: number
  tags: string[]
  thumbnail: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}
