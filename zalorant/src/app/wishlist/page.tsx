'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ProductType } from '@/types'
import RemoveFromWishList from '@/components/RemoveWishList'



interface WishlistItem {
  productId: string
  wishlist: ProductType // Pastikan wishlist sudah berisi data produk lengkap
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<ProductType[]>([]) // Wishlist berisi array produk
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`) // Ambil data wishlist
        const data: WishlistItem[] = await response.json() // Mendefinisikan tipe data wishlist
        console.log('Fetched Wishlist Data:', data)

        // Ambil data produk dari wishlist
        const products = data.map(item => item.wishlist) // Di sini kita menggunakan data produk yang sudah ada di wishlist
        setWishlist(products) // Menyimpan produk di wishlist
      } catch (error) {
        console.error('Failed to fetch wishlist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemoveFromWishlist = (productId: string) => {
    // Update the state by removing the product from the wishlist array
    setWishlist(wishlist.filter((product) => product._id?.toString() !== productId))
  }

  return (
    <div>
      <div className="bg-gray-50 py-16 w-full">
        <main className="max-w-7xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold text-gray-800">Your Wishlist</h1>
          <p className="text-lg text-gray-600 mt-4">
            View the products you&apos;ve saved for later. Shopping made easier.
          </p>
        </main>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Wishlist</h2>

        {loading ? (
          <div className="flex justify-center items-center py-4">
            <p className="text-gray-500 text-lg font-medium">Loading your wishlist...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.length === 0 ? (
              <p className="text-lg text-gray-500">Your wishlist is empty.</p>
            ) : (
              wishlist.map((product) => (
                <div key={product._id?.toString()} className="border rounded-lg shadow-lg p-6 bg-white">
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.thumbnail || '/images/default-thumbnail.jpg'}
                      alt={product.name || 'Product image'}
                      width={400}
                      height={400}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h3 className="mt-4 text-xl font-bold text-gray-800">{product.name || 'No name available'}</h3>
                    <p className="mt-2 text-gray-600">{product.excerpt || 'No description available'}</p>
                    <p className="mt-2 font-semibold text-indigo-600">
                      Rp{product.price ? Number(product.price).toLocaleString('id-ID') : '0'}
                    </p>
                  </Link>
                  <RemoveFromWishList
                    productId={product._id?.toString() || ''}
                    onRemove={handleRemoveFromWishlist} // Pass the state update function
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
