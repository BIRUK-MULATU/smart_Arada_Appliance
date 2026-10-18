import { useEffect, useState } from 'react'
import type { ProductDetail } from '../types/product'

export function useProductDetail(id: number) {
  const [data, setData] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/products/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) setNotFound(true)
          return null
        }
        return (await res.json()) as ProductDetail
      })
      .then((json) => {
        if (!cancelled && json) setData(json)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { data, loading, notFound }
}
