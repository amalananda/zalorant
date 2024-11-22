import React from "react"
import { ProductType } from "@/types"
import Link from "next/link"
import { shuffleArray } from "@/utils/shuffleArray"
import ProductCard from "./ProductCard"

interface FeaturedProductsProps {
  products: ProductType[]
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const shuffledProducts = shuffleArray(products)

  return (
    <section className="my-16 px-6 lg:px-0 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured Products
      </h2>
      <div className="overflow-x-scroll whitespace-nowrap no-scrollbar">
        <div className="inline-flex gap-6">
          {shuffledProducts.slice(0, 5).map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="min-w-[300px]">
                <ProductCard product={product} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Lihat Semua
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProducts
