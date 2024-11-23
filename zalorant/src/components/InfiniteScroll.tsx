export const dynamic = 'force-dynamic'

import { ProductType } from '@/types'
import { useState, useEffect, useRef, useCallback } from 'react'



interface InfiniteScrollProps {
  fetchData: (skip: number, limit: number) => Promise<{ items: ProductType[], hasMore: boolean }>
  children: (props: { items: ProductType[], loading: boolean, hasMore: boolean }) => JSX.Element
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ fetchData, children }) => {
  const [items, setItems] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const limit = 10
  const footerRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const { items: newItems, hasMore: moreItems } = await fetchData(page, limit)
      if (Array.isArray(newItems)) {
        setItems((prevItems) => [...prevItems, ...newItems])
      }

      setHasMore(moreItems)
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error("Error loading more items:", error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, limit, fetchData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore()
        }
      },
      { rootMargin: "100px" }
    )

    const footerNode = footerRef.current
    if (footerNode) {
      observer.observe(footerNode)
    }

    return () => {
      if (footerNode) {
        observer.unobserve(footerNode)
      }
    }
  }, [loading, hasMore, loadMore])

  useEffect(() => {
    loadMore()
  }, [loadMore])

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
