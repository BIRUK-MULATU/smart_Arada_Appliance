export const defaultSettings = {
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
};
export function parseSettings(data) {
    try {
        return { ...defaultSettings, ...JSON.parse(data) };
    }
    catch {
        return defaultSettings;
    }
}
//# sourceMappingURL=settings.js.map