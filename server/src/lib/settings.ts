import type { ShopSettingsData } from '../types/content.js'

export const defaultSettings: ShopSettingsData = {
  name: '[YOUR SHOP NAME]',
  tagline: 'Genuine home appliances with delivery and installation across Addis Ababa.',

  phone: '[PHONE NUMBER]',
  phoneHref: 'tel:+251000000000',

  telegramHandle: '[YOUR_TELEGRAM]',
  telegramUrl: 'https://t.me/your_telegram',
  telegramChannelUrl: 'https://t.me/your_channel',

  whatsappNumber: '[WHATSAPP NUMBER]',
  whatsappUrl: 'https://wa.me/251000000000',

  address: '[SHOP ADDRESS]',
  city: 'Addis Ababa',

  hours: {
    weekdays: 'Mon–Sat: 8:30 AM – 7:00 PM',
    sunday: 'Sunday: Closed',
    short: 'Mon–Sat, 8:30 AM – 7:00 PM',
  },

  freeDeliveryThreshold: '[AMOUNT]',

  mapEmbedUrl: '',

  logoUrl: '/brand/logo-icon.png',
  heroVideoUrl: '/videos/appliance-showcase.mp4',
  contactImageUrl: '/contact/addis-tower.jpg',
  fleetWatermarkUrl: '/fleet/addis-street-night.png',

  contactEyebrow: 'Contact & visit',
  contactTitle: 'Ready to order? Reach us anytime.',
  contactSecondImageUrl: '/contact/arada-market-1934.jpg',
  contactSecondImageCaption: 'Arada Market in 1934',

  aboutEyebrow: 'About us',
  aboutTitle: 'The story behind Smart Arada',
  aboutDesc:
    "We're a local appliance shop with a simple promise: buy with confidence, get it delivered by people you can actually reach, and feel at home — whether you're shopping in Addis Ababa or sending a gift from abroad.",
  aboutImageUrl: '/contact/arada-market-1934.jpg',
  aboutImageCaption: 'Arada Market, 1934 — where it all started',

  social: {
    tiktok: { label: 'TikTok', url: 'https://tiktok.com/@your_shop', handle: '@[TIKTOK]' },
    telegram: { label: 'Telegram', url: 'https://t.me/your_telegram' },
    facebook: { label: 'Facebook', url: 'https://facebook.com/your_shop' },
    instagram: { label: 'Instagram', url: 'https://instagram.com/your_shop' },
    youtube: { label: 'YouTube', url: 'https://youtube.com/@your_shop' },
    viber: { label: 'Viber', url: 'viber://chat?number=%2B251000000000' },
  },

  stats: {
    productsInStock: '[NUMBER]+',
    happyCustomers: '[NUMBER]+',
    yearsInBusiness: '[NUMBER] yrs',
  },
}

export function parseSettings(data: string): ShopSettingsData {
  try {
    const parsed = JSON.parse(data)
    return {
      ...defaultSettings,
      ...parsed,
      hours: { ...defaultSettings.hours, ...parsed.hours },
      social: { ...defaultSettings.social, ...parsed.social },
      stats: { ...defaultSettings.stats, ...parsed.stats },
    } as ShopSettingsData
  } catch {
    return defaultSettings
  }
}
