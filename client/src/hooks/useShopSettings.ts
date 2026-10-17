import { createContext, useContext } from 'react'
import { defaultSettings } from '../config/defaultSettings'
import type { ShopSettingsData } from '../types/content'

export type ShopSettingsContextValue = {
  settings: ShopSettingsData
  loading: boolean
}

export const ShopSettingsContext = createContext<ShopSettingsContextValue>({
  settings: defaultSettings,
  loading: true,
})

export function useShopSettings() {
  return useContext(ShopSettingsContext)
}
