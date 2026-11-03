import type { ShopSettingsData } from '../types/content'

export function buildOrderMessage(productName: string) {
  return `Hi, I'm interested in ${productName}`
}

export function telegramMessageUrl(settings: ShopSettingsData, message: string) {
  const text = encodeURIComponent(message)
  return `https://t.me/${settings.telegramHandle.replace(/^@/, '')}?text=${text}`
}

export function whatsappMessageUrl(settings: ShopSettingsData, message: string) {
  const text = encodeURIComponent(message)
  const number = settings.whatsappUrl.replace('https://wa.me/', '')
  return `https://wa.me/${number}?text=${text}`
}

export function telegramOrderUrl(settings: ShopSettingsData, productName: string) {
  return telegramMessageUrl(settings, buildOrderMessage(productName))
}

export function whatsappOrderUrl(settings: ShopSettingsData, productName: string) {
  return whatsappMessageUrl(settings, buildOrderMessage(productName))
}
