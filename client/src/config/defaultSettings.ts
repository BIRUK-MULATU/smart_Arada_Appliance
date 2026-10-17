import type { ShopSettingsData } from '../types/content'

// Shown while /api/settings is loading, and if it ever fails — keeps the page
// from flashing empty content. Mirrors server/src/lib/settings.ts.
export const defaultSettings: ShopSettingsData = {
  name: '[YOUR SHOP NAME]',
  tagline: 'Genuine home appliances with delivery, installation and warranty across Addis Ababa.',

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
  warrantyYears: '[X]',

  mapEmbedUrl: '',

  social: {
    tiktok: { label: 'TikTok', url: 'https://tiktok.com/@your_shop', handle: '@[TIKTOK]' },
    telegram: { label: 'Telegram', url: 'https://t.me/your_telegram' },
    facebook: { label: 'Facebook', url: 'https://facebook.com/your_shop' },
    instagram: { label: 'Instagram', url: 'https://instagram.com/your_shop' },
    youtube: { label: 'YouTube', url: 'https://youtube.com/@your_shop' },
  },

  stats: {
    productsInStock: '[NUMBER]+',
    happyCustomers: '[NUMBER]+',
    yearsInBusiness: '[NUMBER] yrs',
  },
}
