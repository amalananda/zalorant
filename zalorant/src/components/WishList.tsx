'use client'

import Swal from "sweetalert2"
// import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { ObjectId } from 'mongodb'

type AddToWishListProps = {
  productId: string | ObjectId
}

export default function AddToWishList({ productId }: AddToWishListProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)


  useEffect(() => {
    const wishlistedProducts = localStorage.getItem("wishlist")
    const wishlistArray = wishlistedProducts ? JSON.parse(wishlistedProducts) : []
    setIsWishlisted(wishlistArray.includes(productId))
  }, [productId])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      console.log("Sending request to add product to wishlist", productId)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ productId }),
      })
      console.log("API response:", res)
      if (!res.ok) {
        const errorData = await res.json()
        console.log("API error response:", errorData)
        throw new Error(errorData.message)
      }

      const data = await res.json()
      console.log("Success:", data)

      Swal.fire({
        title: "Success!",
        text: "This product has been added to your wishlist",
        timer: 2000,
      })


      const wishlistedProducts = localStorage.getItem("wishlist")
      const wishlistArray = wishlistedProducts ? JSON.parse(wishlistedProducts) : []
      if (!wishlistArray.includes(productId)) {
        wishlistArray.push(productId)
        localStorage.setItem("wishlist", JSON.stringify(wishlistArray))
        setIsWishlisted(true)
      }
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        title: "Error!",
        text: error instanceof Error ? error.message : "Something went wrong",
        timer: 2000,
      })
    }
  }

  return (
    <div className="container flex items-center justify-center w-22 h-8 border-2 border-gray-300 rounded-md gap-x-2">
      <div
        className={`${isWishlisted ? "text-pink-500" : "text-gray-500"
          } transition - colors duration - 300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill={isWishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.06l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </div>

      <button
        className="font-sans font-bold text-xs"
        onClick={handleSubmit}
      >
        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
      </button>
    </div>
  )
}
