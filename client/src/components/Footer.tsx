import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import type { IconName } from './ui/Icon'

const shopLinks = [
  { label: 'Refrigerators', href: '#products' },
  { label: 'Washing machines', href: '#products' },
  { label: 'TVs', href: '#products' },
  { label: 'Kitchen', href: '#products' },
]

const helpLinks = [
  { label: 'How to order', href: '#how-to-order' },
  { label: 'Delivery & warranty', href: '#delivery-warranty' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { settings } = useShopSettings()
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
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs">
              LOGO
            </span>
            <span className="text-lg">{settings.name}</span>
          </div>
          <p className="max-w-xs text-sm">{settings.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Shop</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Help</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Follow us</h3>
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
            © {year} {settings.name}. All rights reserved.
          </p>
          <p>Addis Ababa, Ethiopia</p>
        </Container>
      </div>
    </footer>
  )
}
