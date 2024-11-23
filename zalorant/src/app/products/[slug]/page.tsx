import { Metadata } from 'next'
import Image from 'next/image'
import { ProductType } from '@/types'
import Product from '@/db/models/product'
import AddToWishList from '@/components/WishList'

async function fetchProduct(slug: string): Promise<ProductType | null> {
  try {
    const product = await Product.findBySlug(slug)
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: product.name,
    description: product.excerpt,
  }
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug)

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-4">Sorry, the product you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex flex-col lg:flex-row gap-8">

        <div className="flex-shrink-0 w-full lg:w-1/2">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>


        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-semibold text-indigo-600 mt-6">
            Rp{Number(product.price).toLocaleString('id-ID')}
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No tags available</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">More Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {product.images && product.images.map((imageUrl, index) => (
                <div key={index} className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Image ${index + 1} for ${product.name}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="mt-8">
              <AddToWishList productId={product._id?.toString() || ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
