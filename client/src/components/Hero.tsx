import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './ui/Container'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl } from '../lib/order'
import { useProducts } from '../hooks/useCatalog'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../lib/format'
import type { IconName } from './ui/Icon'
import type { ShopSettingsData } from '../types/content'

const socialLinks: {
  key: keyof ShopSettingsData['social']
  icon: IconName
  bg: string
  ring: string
}[] = [
  { key: 'tiktok', icon: 'tiktok', bg: 'bg-black', ring: 'shadow-black/30' },
  { key: 'telegram', icon: 'telegram', bg: 'bg-[#229ED9]', ring: 'shadow-[#229ED9]/40' },
  { key: 'facebook', icon: 'facebook', bg: 'bg-[#1877F2]', ring: 'shadow-[#1877F2]/40' },
  {
    key: 'instagram',
    icon: 'instagram',
    bg: 'bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]',
    ring: 'shadow-[#D62976]/40',
  },
  { key: 'youtube', icon: 'youtube', bg: 'bg-[#FF0000]', ring: 'shadow-[#FF0000]/40' },
]

export default function Hero() {
  const { settings } = useShopSettings()
  const { data: products } = useProducts()
  const featuredProduct = products.find((p) => p.featured) ?? null
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleSound() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy">
      <video
        ref={videoRef}
        src="/videos/appliance-showcase.mp4"
        poster="/videos/appliance-showcase-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-transparent to-navy/30" />

      <Container
        className={`flex flex-col gap-6 py-28 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {t('hero.badge')}
        </span>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          {t('hero.title')}
        </h1>

        <p className="max-w-lg text-base text-white/80">{t('hero.subtitle')}</p>

        <div className="flex flex-wrap gap-3">
          <Button href="#products">{t('hero.browseProducts')}</Button>
          <a
            href={settings.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t('hero.callUs', { phone: settings.phone })}
          </a>
        </div>

        <dl className="flex flex-wrap gap-8 border-t border-white/20 pt-6">
          <div>
            <dt className="sr-only">{t('hero.statsProductsInStock')}</dt>
            <dd className="text-2xl font-extrabold text-white">{settings.stats.productsInStock}</dd>
            <p className="text-sm text-white/70">{t('hero.statsProductsInStock')}</p>
          </div>
          <div>
            <dt className="sr-only">{t('hero.statsHappyCustomers')}</dt>
            <dd className="text-2xl font-extrabold text-white">{settings.stats.happyCustomers}</dd>
            <p className="text-sm text-white/70">{t('hero.statsHappyCustomers')}</p>
          </div>
          <div>
            <dt className="sr-only">{t('hero.statsYearsInBusiness')}</dt>
            <dd className="text-2xl font-extrabold text-white">{settings.stats.yearsInBusiness}</dd>
            <p className="text-sm text-white/70">{t('hero.statsYearsInBusiness')}</p>
          </div>
        </dl>

        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2 text-sm font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t('hero.followUs')}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map(({ key, icon, bg, ring }, i) => {
              const entry = settings.social[key]
              return (
                <a
                  key={key}
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={entry.label}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-sm backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-110 hover:rotate-6 hover:border-transparent hover:shadow-lg ${ring} ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: inView ? `${300 + i * 80}ms` : '0ms' }}
                >
                  <span
                    className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${bg}`}
                  />
                  <Icon
                    name={icon}
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-md bg-navy px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    {entry.label}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-navy" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </Container>

      {featuredProduct && (
        <div className="absolute bottom-6 right-4 z-10 hidden w-64 items-center gap-3 rounded-xl border border-white/15 bg-navy/70 p-3 shadow-lg backdrop-blur-md sm:flex lg:right-10">
          <Link
            to={`/products/${featuredProduct.id}`}
            className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/10"
          >
            <img src={featuredProduct.image} alt="" className="h-full w-full object-cover" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
              {t('hero.featuredProduct')}
            </p>
            <Link
              to={`/products/${featuredProduct.id}`}
              className="block truncate text-sm font-semibold text-white hover:text-accent"
            >
              {featuredProduct.name}
            </Link>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-white">{formatPrice(featuredProduct.price)}</span>
              <a
                href={telegramOrderUrl(settings, featuredProduct.name)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-accent hover:underline"
              >
                {t('hero.order')}
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? t('hero.tapForSound') : t('hero.mute')}
        className="absolute bottom-6 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 lg:left-10"
      >
        <Icon name={muted ? 'volumeOff' : 'volume'} className="h-5 w-5" />
      </button>
    </section>
  )
}
