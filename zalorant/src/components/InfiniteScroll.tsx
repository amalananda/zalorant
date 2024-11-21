import { ProductType } from '@/types'
import { useState, useEffect, useRef } from 'react'

interface InfiniteScrollProps {
  fetchData: (skip: number, limit: number) => Promise<{ items: ProductType[], hasMore: boolean }>
  children: (props: { items: ProductType[], loading: boolean, hasMore: boolean }) => JSX.Element
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ fetchData, children }) => {
  const [items, setItems] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1) // Menggunakan page, bukan skip
  const limit = 10 // Jumlah produk yang dimuat setiap kali
  const footerRef = useRef<HTMLDivElement>(null)

  const loadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const { items: newItems, hasMore: moreItems } = await fetchData(page, limit)
      if (Array.isArray(newItems)) {
        setItems((prevItems) => [...prevItems, ...newItems])
      }

      setHasMore(moreItems)
      setPage((prevPage) => prevPage + 1) // Increment page setiap kali load
    } catch (error) {
      console.error("Error loading more items:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore()
        }
      },
      { rootMargin: "100px" }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [loading, hasMore])

  useEffect(() => {
    loadMore() // Muat data pertama kali
  }, [])

  return (
    <div>
      {children({ items, loading, hasMore })}
      <div ref={footerRef} className="h-10" />
      {loading && <div className="text-center py-4">Loading...</div>}
      {!hasMore && <div className="text-center py-4">No more products</div>}
    </div>
  )
}

export default InfiniteScroll
