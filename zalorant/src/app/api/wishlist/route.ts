import WishList from '@/db/models/wishlist'
import { handleError, HttpError } from '@/lib/error'
import { ObjectId } from "mongodb"
import { NextRequest } from "next/server"


export async function GET(request: NextRequest) {
  try {

    const userId = request.headers.get('x-user-id')

    if (!userId) {
      throw new HttpError("userId is missing in headers", 401)
    }

    // console.log(userId, 'ini apa')

    const userWishlist = await WishList.findByUser(userId)


    if (!userWishlist || userWishlist.length === 0) {
      return Response.json({ message: "No wishlist found for this user" }, { status: 404 })
    }

    return Response.json(userWishlist, { status: 200 })
  } catch (error) {
    console.error(error)
    return handleError(error)
  }
}




export async function POST(request: NextRequest) {

  try {

    const userId = request.headers.get('x-user-id')
    console.log("Headers diterima:", request.headers.get("x-user-id"))
    if (!userId) {
      throw new HttpError("userId is missing in headers", 401)
    }

    const { productId } = await request.json()
    console.log("Body request diterima:", { productId })
    // const { userId, productId } = WishListSchema.parse(body)

    if (!productId) {
      throw new HttpError("productId is missing or invalid", 400)
    }
    const existingproduct = await WishList.findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    })

    if (existingproduct) {
      throw new HttpError("This product has already been added to your wishlist", 409)
    }

    const wishListUser = await WishList.create({ userId: new ObjectId(userId), productId: new ObjectId(productId) })

    return Response.json(wishListUser, { status: 200 })

  } catch (error) {
    console.log(error)
    return handleError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      throw new HttpError('userId is missing in headers', 401)
    }

    const { productId } = await request.json()

    if (!productId) {
      throw new HttpError('productId is missing or invalid', 400)
    }

    const existingProduct = await WishList.findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    })

    if (!existingProduct) {
      throw new HttpError('Product not found in your wishlist', 404)
    }
    await WishList.remove({ userId: new ObjectId(userId), productId: new ObjectId(productId) })

    return Response.json({ message: 'Product removed from wishlist' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return handleError(error)
  }
}
