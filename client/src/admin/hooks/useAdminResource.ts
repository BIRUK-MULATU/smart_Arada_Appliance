import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '../lib/adminApi'

export function useAdminResource<T extends { id: number }>(resource: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminApi.get<T[]>(`/${resource}`)
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [resource])

  useEffect(() => {
    let cancelled = false

    adminApi
      .get<T[]>(`/${resource}`)
      .then((data) => {
        if (!cancelled) setItems(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [resource])

  const create = useCallback(
    async (data: Partial<T>) => {
      await adminApi.post(`/${resource}`, data)
      await reload()
    },
    [resource, reload],
  )

  const update = useCallback(
    async (id: number, data: Partial<T>) => {
      await adminApi.put(`/${resource}/${id}`, data)
      await reload()
    },
    [resource, reload],
  )

  const remove = useCallback(
    async (id: number) => {
      await adminApi.delete(`/${resource}/${id}`)
      await reload()
    },
    [resource, reload],
  )

  return { items, loading, error, reload, create, update, remove }
}
