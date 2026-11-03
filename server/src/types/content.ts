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

export type SectionItem = {
  id: number
  section: string
  icon: string | null
  image: string | null
  title: string
  description: string
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
  mapEmbedUrl: string
  logoUrl: string
  heroVideoUrl: string
  contactImageUrl: string
  fleetWatermarkUrl: string
  contactEyebrow: string
  contactTitle: string
  contactSecondImageUrl: string
  contactSecondImageCaption: string
  aboutEyebrow: string
  aboutTitle: string
  aboutDesc: string
  aboutImageUrl: string
  aboutImageCaption: string
  social: {
    tiktok: { label: string; url: string; handle: string }
    telegram: { label: string; url: string }
    facebook: { label: string; url: string }
    instagram: { label: string; url: string }
    youtube: { label: string; url: string }
    viber: { label: string; url: string }
  }
  stats: {
    productsInStock: string
    happyCustomers: string
    yearsInBusiness: string
  }
}
