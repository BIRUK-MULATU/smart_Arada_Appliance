import { useState } from 'react'
import Container from './ui/Container'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl } from '../lib/order'

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Deals', href: '#deals' },
  { label: 'Brands', href: '#brands' },
  { label: 'How to order', href: '#how-to-order' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { settings } = useShopSettings()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 font-extrabold text-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-light text-xs text-text-muted">
            LOGO
          </span>
          <span className="text-lg">{settings.name}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={telegramOrderUrl(settings, 'your products')} target="_blank" rel="noreferrer">
            Order on Telegram
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-text-secondary hover:bg-bg-light hover:text-navy"
              >
                {link.label}
              </a>
            ))}
            <Button
              href={telegramOrderUrl(settings, 'your products')}
              target="_blank"
              rel="noreferrer"
              className="mt-2"
            >
              Order on Telegram
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
