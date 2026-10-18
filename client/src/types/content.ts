// Mirrors server/src/types/content.ts — keep in sync manually (no shared package yet).
export type Review = {
  id: number
  name: string
  location: string
  rating: number
  text: string
  sortOrder: number
}

export type FaqItem = {
  id: number
  question: string
  answer: string
  sortOrder: number
}

export type Brand = {
  id: number
  name: string
  logo: string
  sortOrder: number
}

export type Video = {
  id: number
  platform: string
  caption: string
  url: string
  thumbnail: string
  sortOrder: number
}

export type DealOfWeekData = {
  title: string
  description: string
  endsAt: string
  image: string
}

export type ShopSettingsData = {
  name: string
  tagline: string
  phone: string
  phoneHref: string
  telegramHandle: string
  telegramUrl: string
  telegramChannelUrl: string
  whatsappNumber: string
  whatsappUrl: string
  address: string
  city: string
  hours: {
    weekdays: string
    sunday: string
    short: string
  }
  freeDeliveryThreshold: string
  warrantyYears: string
  mapEmbedUrl: string
  social: {
    tiktok: { label: string; url: string; handle: string }
    telegram: { label: string; url: string }
    facebook: { label: string; url: string }
    instagram: { label: string; url: string }
    youtube: { label: string; url: string }
  }
  stats: {
    productsInStock: string
    happyCustomers: string
    yearsInBusiness: string
  }
}
