import React from "react"
import { ProductType } from "@/types"
import Link from "next/link"
// import ProductCard from "../ProductCard"
import { shuffleArray } from '@/utils/shuffleArray'
import ProductCard from './ProductCard'

interface FeaturedProductsProps {
  products: ProductType[]
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Failed to fetch products")

  let products: ProductType[] = await response.json()
  products = shuffleArray(products) // Mengacak urutan produk

  return (
    <section className="my-16 px-6 lg:px-0 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 5).map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/products" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
          Lihat Semua
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProducts
