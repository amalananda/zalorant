import React from "react"
import { ProductType } from "@/types"
import Image from "next/image"

interface ProductCardProps {
  product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <Image
        src={product.thumbnail || "https://i.pinimg.com/736x/d5/1c/15/d51c15ffa9cb570efeac761f12f14316.jpg"}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 truncate max-h-[3rem] leading-[1.5rem]">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm">{product.excerpt}</p>
      <p className="text-lg font-bold text-indigo-600 mt-2">
        Rp{product.price.toLocaleString("id-ID")}
      </p>
    </div>
  )
}

export default ProductCard
