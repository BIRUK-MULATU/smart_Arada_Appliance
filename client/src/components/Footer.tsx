import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useLanguage } from '../context/LanguageContext'
import type { IconName } from './ui/Icon'
import type { TranslationKey } from '../i18n/translations'

const shopLinks: { key: TranslationKey; href: string }[] = [
  { key: 'footer.refrigerators', href: '/#products' },
  { key: 'footer.washingMachines', href: '/#products' },
  { key: 'footer.tvs', href: '/#products' },
  { key: 'footer.kitchen', href: '/#products' },
]

const helpLinks: { key: TranslationKey; href: string }[] = [
  { key: 'header.nav.howToOrder', href: '/#how-to-order' },
  { key: 'footer.deliveryWarranty', href: '/#delivery-warranty' },
  { key: 'header.nav.faq', href: '/#faq' },
  { key: 'header.nav.contact', href: '/#contact' },
]

export default function Footer() {
  const { settings } = useShopSettings()
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const socialLinks: { label: string; icon: IconName; url: string }[] = [
    { label: 'Telegram', icon: 'telegram', url: settings.social.telegram.url },
    { label: 'TikTok', icon: 'tiktok', url: settings.social.tiktok.url },
    { label: 'Facebook', icon: 'facebook', url: settings.social.facebook.url },
    { label: 'Instagram', icon: 'instagram', url: settings.social.instagram.url },
    { label: 'YouTube', icon: 'youtube', url: settings.social.youtube.url },
  ]

  return (
    <footer className="bg-navy text-white/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-extrabold text-white">
            <img src="/brand/logo-icon.png" alt="" className="h-9 w-9 object-contain" />
            <span className="text-lg">{settings.name}</span>
          </div>
          <p className="max-w-xs text-sm">{settings.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('footer.shop')}</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.key}>
                <a href={link.href} className="hover:text-white">
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('footer.help')}</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {helpLinks.map((link) => (
              <li key={link.key}>
                <a href={link.href} className="hover:text-white">
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('footer.followUs')}</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Icon name={link.icon} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.location')}</p>
        </Container>
      </div>
    </footer>
  )
}
