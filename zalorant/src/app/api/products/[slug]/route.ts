import Product from '@/db/models/product'

import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  const url = new URL(request.url)
  const slug = url.pathname.split('/').pop()


  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  try {
    const product = await Product.findBySlug(slug)


    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
