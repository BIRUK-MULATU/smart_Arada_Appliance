import type { ShopSettingsData } from '../types/content'

export function buildOrderMessage(productName: string) {
  return `Hi, I'm interested in ${productName}`
}

export function telegramOrderUrl(settings: ShopSettingsData, productName: string) {
  const text = encodeURIComponent(buildOrderMessage(productName))
  return `https://t.me/${settings.telegramHandle.replace(/^@/, '')}?text=${text}`
}

export function whatsappOrderUrl(settings: ShopSettingsData, productName: string) {
  const text = encodeURIComponent(buildOrderMessage(productName))
  const number = settings.whatsappUrl.replace('https://wa.me/', '')
  return `https://wa.me/${number}?text=${text}`
}
