import { HttpError } from "@/lib/error"
import { ObjectId, Collection, Filter } from "mongodb"
import { z } from "zod"
import { connectToDB } from '../config'

// Validasi Schema untuk WishList
export const WishListSchema = z.object({
  userId: z.instanceof(ObjectId, { message: "User ID is not detected" }),
  productId: z.instanceof(ObjectId, { message: "Product not found" }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type WishListType = z.infer<typeof WishListSchema>

export default class WishList {
  static col: Collection<WishListType>

  // Inisialisasi Koleksi
  static async initialize() {
    const db = await connectToDB()
    this.col = db.collection<WishListType>("wishlist")
  }

  // Membuat Item WishList
  static async create(body: WishListType) {
    await this.initialize()

    try {
      WishListSchema.parse(body)

      const wishlist = {
        userId: new ObjectId(body.userId),
        productId: new ObjectId(body.productId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const result = await this.col.insertOne(wishlist)

      return {
        message: "This product is added to your list",
        data: { ...wishlist, _id: result.insertedId },
      }
    } catch (error) {
      console.error("Error creating wishlist:", error)
      throw new HttpError("Failed to add to wishlist", 500)
    }
  }

  // Menemukan Wishlist Berdasarkan User
  static async findByUser(userId: string) {
    await this.initialize()

    try {
      if (!ObjectId.isValid(userId)) {
        throw new HttpError("Invalid user ID", 401)
      }

      const wishlistUser = await this.col.aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "wishlist",
          },
        },
        { $unwind: "$wishlist" },
      ]).toArray()

      return wishlistUser
    } catch (error) {
      console.error("Error fetching wishlist:", error)
      throw new HttpError("Failed to fetch wishlist", 500)
    }
  }
  static async remove(filter: Filter<WishListType>) {
    await this.initialize()

    try {
      const result = await this.col.deleteOne(filter)

      if (result.deletedCount === 0) {
        throw new HttpError("Product not found in wishlist", 404)
      }

      return { message: "Product removed from wishlist" }
    } catch (error) {
      console.error("Error removing product from wishlist:", error)
      throw new HttpError("Failed to remove from wishlist", 500)
    }
  }

  // Menemukan Satu Item Wishlist
  static async findOne(filter: Filter<WishListType>) {
    await this.initialize()
    return await this.col.findOne(filter)
  }
}
