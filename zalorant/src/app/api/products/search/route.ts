
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get("q")
    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      )
    }

    // const products = await Product.findAll({
    //   // where: {
    //   //   name: { [Op.like]: `%${query}%` },
    //   // },
    // })

    // return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    )
  }
}
