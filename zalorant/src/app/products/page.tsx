'use client'

import Image from 'next/image'
import Link from 'next/link'
import InfiniteScroll from '@/components/InfiniteScroll'
import AddToWishList from '@/components/WishList'
import { useState } from 'react'


async function fetchProducts(page = 1, limit = 10) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&limit=${limit}`)
    const data = await response.json()
    return {
      items: Array.isArray(data.items) ? data.items : [],
      hasMore: data.hasMore,
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return { items: [], hasMore: false }
  }
}

export default function Products() {
  const [wishlist, setWishlist] = useState<string[]>([]) // state untuk menyimpan wishlist

  // Perbaikan di sini, pastikan productId diterima sebagai parameter
  const handleWishlistChange = (productId: string, isWishlisted: boolean) => {
    if (isWishlisted) {
      setWishlist((prev) => [...prev, productId])
    } else {
      setWishlist((prev) => prev.filter((id) => id !== productId))
    }
  }

  return (
    <div>
      <div className="bg-gray-50 py-16 w-full">
        <main className="max-w-7xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold text-gray-800">Our Exclusive Products</h1>
          <p className="text-lg text-gray-600 mt-4">
            Browse through our carefully curated collection of top-tier products. Style and quality guaranteed.
          </p>
        </main>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Products</h2>
        <InfiniteScroll fetchData={fetchProducts}>
          {({ items, loading, hasMore }) => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((product, index) => (
                  <div
                    key={`${product._id?.toString()}-${index}`}  // Kombinasikan _id dengan index untuk memastikan keunikannya
                    className="border rounded-lg shadow-lg p-6 bg-white"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div>
                        <Image
                          src={
                            product.thumbnail ||
                            'https://i.pinimg.com/736x/d5/1c/15/d51c15ffa9cb570efeac761f12f14316.jpg'
                          }
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <h3 className="mt-4 text-xl font-bold text-gray-800">{product.name}</h3>
                        <p className="mt-2 text-gray-600">{product.excerpt}</p>
                        <p className="mt-2 font-semibold text-indigo-600">
                          Rp{Number(product.price).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </Link>

                    {/* Tombol Add to Wishlist dipisahkan dari elemen Link */}
                    <div className="mt-8">
                      <AddToWishList
                        productId={product._id?.toString() || ''}
                      />
                    </div>
                  </div>
                ))}

              </div>

              {loading && (
                <div className="flex justify-center items-center py-4">
                  <p className="text-gray-500 text-lg font-medium">Loading more products...</p>
                </div>
              )}

              {!hasMore && (
                <div className="flex justify-center items-center py-4">
                  <p className="text-gray-500 text-lg font-medium">No more products to load.</p>
                </div>
              )}
            </>
          )}
        </InfiniteScroll>
      </div>
    </div>
  )
}
