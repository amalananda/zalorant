// pages/index.tsx
import Banner from '@/components/Banner'
import DetailStore from '@/components/DetailStore'
import FeaturedProducts from '@/components/FeaturedProduct'
import Product from '@/db/models/product'
import { ProductType } from '@/types'

export default async function Home() {
  await Product.initialize()
  const products: ProductType[] = await Product.findAll({ skip: 0, limit: Infinity })

  const featuredProducts = products.slice(0, 5)

  return (
    <div className="flex flex-col items-center gap-20 px-6 sm:px-20 font-[family-name:var(--font-geist-sans)] bg-background">
      <Banner />
      <FeaturedProducts products={featuredProducts} />
      <DetailStore />
    </div>
  )
}
