import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from './ui/Container'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useLanguage } from '../context/LanguageContext'
import { telegramOrderUrl } from '../lib/order'
import type { TranslationKey } from '../i18n/translations'

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: 'header.nav.products', href: '/#products' },
  { key: 'header.nav.deals', href: '/#deals' },
  { key: 'header.nav.brands', href: '/#brands' },
  { key: 'header.nav.howToOrder', href: '/#how-to-order' },
  { key: 'header.nav.faq', href: '/#faq' },
  { key: 'header.nav.contact', href: '/#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { settings } = useShopSettings()
  const { t } = useLanguage()
  const navigate = useNavigate()

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const term = search.trim()
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : '/products')
    setSearchOpen(false)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 font-extrabold text-navy">
          <img src="/brand/logo-icon.png" alt="" className="h-9 w-9 object-contain" />
          <span className="text-lg">{settings.name}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-navy"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <form
            onSubmit={handleSearch}
            className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ease-out ${
              searchOpen ? 'w-56 border-border bg-white' : 'w-10 border-transparent'
            }`}
          >
            <button
              type={searchOpen ? 'submit' : 'button'}
              onClick={() => !searchOpen && setSearchOpen(true)}
              aria-label={t('header.searchAria')}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-navy hover:text-accent"
            >
              <Icon name="search" className="h-4 w-4" />
            </button>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => !search && setSearchOpen(false)}
              placeholder={t('header.searchPlaceholder')}
              aria-hidden={!searchOpen}
              tabIndex={searchOpen ? 0 : -1}
              className="w-full bg-transparent pr-3 text-sm text-navy placeholder:text-text-muted focus:outline-none"
            />
          </form>

          <Button href={telegramOrderUrl(settings, 'your products')} target="_blank" rel="noreferrer">
            {t('header.orderTelegram')}
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
            <form onSubmit={handleSearch} className="relative mb-2">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('header.searchPlaceholder')}
                className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-navy focus:outline-none"
              />
            </form>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-text-secondary hover:bg-bg-light hover:text-navy"
              >
                {t(link.key)}
              </a>
            ))}
            <Button
              href={telegramOrderUrl(settings, 'your products')}
              target="_blank"
              rel="noreferrer"
              className="mt-2"
            >
              {t('header.orderTelegram')}
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
