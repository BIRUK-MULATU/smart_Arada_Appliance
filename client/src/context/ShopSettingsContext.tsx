import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ShopSettingsContext } from '../hooks/useShopSettings'
import { defaultSettings } from '../config/defaultSettings'
import type { ShopSettingsData } from '../types/content'

export function ShopSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ShopSettingsData>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch('/api/settings')
      .then((res) => res.json())
      .then((json: ShopSettingsData) => {
        if (!cancelled) setSettings(json)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ShopSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </ShopSettingsContext.Provider>
  )
}
