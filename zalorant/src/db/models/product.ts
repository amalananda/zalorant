import { ProductType } from "@/types"
import { connectToDB } from "../config"
import { Collection, ObjectId } from "mongodb"

export default class Product {
  static col: Collection<ProductType>

  static async initialize() {
    const db = await connectToDB()
    this.col = db.collection<ProductType>("products")
  }

  static async findAll({ skip = 0, limit = 10 }: { skip: number; limit: number }): Promise<ProductType[]> {
    if (!this.col) throw new Error("Collection is not initialized")

    const products = await this.col.find().skip(skip).limit(limit).toArray()

    return products.map((product) => ({
      _id: product._id?.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      excerpt: product.excerpt,
      price: product.price,
      tags: product.tags || [],
      thumbnail: product.thumbnail,
      images: product.images || [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }))
  }

  static async findById(_id: string) {
    if (!this.col) throw new Error("Collection is not initialized")
    return await this.col.findOne({ _id: new ObjectId(_id) })
  }
  static async find(query: object) {
    await this.initialize()

    if (!this.col) throw new Error("Collection is not initialized")

    return await this.col.find(query).toArray()
  }

  static async create(data: ProductType) {
    if (!this.col) throw new Error("Collection is not initialized")

    const currentDate = new Date()
    const productData = {
      ...data,
      createdAt: currentDate,
      updatedAt: currentDate,
    }

    const result = await this.col.insertOne(productData)
    return { ...productData, id: result.insertedId.toString() }
  }

  static async update(_id: string, data: ProductType) {
    if (!this.col) throw new Error("Collection is not initialized")

    const currentDate = new Date()
    const updatedData = {
      ...data,
      updatedAt: currentDate,
    }

    const result = await this.col.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updatedData }
    )

    return result.modifiedCount > 0
  }

  static async findBySlug(slug: string) {
    const db = await connectToDB()
    const collection = db.collection<ProductType>("products")

    console.log("Searching for product with slug:", slug)
    const product = await collection.findOne({
      slug: { $regex: new RegExp(`^${slug}$`, "i") },
    })
    console.log("Product found:", product)

    return product
  }
}
