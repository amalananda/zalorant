import Product from "@/db/models/product"
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from "next"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "10")

    const skip = (page - 1) * limit

    await Product.initialize()
    const products = await Product.findAll({
      skip,
      limit,
    })

    const hasMore = products.length === limit

    return new Response(
      JSON.stringify({ items: products, hasMore }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, slug, description, excerpt, price, tags, thumbnail, images } = req.body

    if (!name || !slug || !description || !excerpt || !thumbnail) {
      return res.status(400).json({ error: "Missing required fields." })
    }

    const currentDate = new Date()

    const body = {
      _id: new ObjectId,
      name,
      slug,
      description,
      excerpt,
      price: parseFloat(price || "0"),
      tags: tags || [],
      thumbnail,
      images: images || [],
      createdAt: currentDate,
      updatedAt: currentDate,
    }

    await Product.initialize()
    const response = await Product.create(body)

    res.status(201).json(response)
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).json({ error: "Failed to create product" })
  }
}
