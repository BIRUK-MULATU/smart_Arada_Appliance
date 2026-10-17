import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '../lib/adminApi'

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false

    adminApi
      .get<{ authenticated: boolean }>('/me')
      .then((res) => {
        if (!cancelled) setAuthenticated(res.authenticated)
      })
      .catch(() => {
        if (!cancelled) setAuthenticated(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (password: string) => {
    await adminApi.post('/login', { password })
    setAuthenticated(true)
  }, [])

  const logout = useCallback(async () => {
    await adminApi.post('/logout', {})
    setAuthenticated(false)
  }, [])

  return { authenticated, login, logout }
}
