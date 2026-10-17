import Container from './ui/Container'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl } from '../lib/order'
import { useProducts } from '../hooks/useCatalog'
import { formatPrice } from '../lib/format'
import type { IconName } from './ui/Icon'
import type { ShopSettingsData } from '../types/content'

const socialLinks: { key: keyof ShopSettingsData['social']; icon: IconName }[] = [
  { key: 'tiktok', icon: 'tiktok' },
  { key: 'telegram', icon: 'telegram' },
  { key: 'facebook', icon: 'facebook' },
  { key: 'instagram', icon: 'instagram' },
  { key: 'youtube', icon: 'youtube' },
]

export default function Hero() {
  const { settings } = useShopSettings()
  const { data: products } = useProducts()
  const featuredProduct = products.find((p) => p.featured) ?? null

  return (
    <section id="top" className="bg-bg-light">
      <Container className="grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-text-secondary">
            Genuine products · Official warranty
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
            Quality home appliances, delivered to your door.
          </h1>

          <p className="max-w-lg text-base text-text-muted">
            Fridges, washing machines, TVs, cookers and more from trusted brands. Browse the
            catalogue, then message us to order. We deliver and install.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#products">Browse products</Button>
            <Button href={settings.phoneHref} variant="outline">
              Call {settings.phone}
            </Button>
          </div>

          <dl className="flex flex-wrap gap-8 border-t border-border pt-6">
            <div>
              <dt className="sr-only">Products in stock</dt>
              <dd className="text-2xl font-extrabold text-navy">{settings.stats.productsInStock}</dd>
              <p className="text-sm text-text-muted">Products in stock</p>
            </div>
            <div>
              <dt className="sr-only">Happy customers</dt>
              <dd className="text-2xl font-extrabold text-navy">{settings.stats.happyCustomers}</dd>
              <p className="text-sm text-text-muted">Happy customers</p>
            </div>
            <div>
              <dt className="sr-only">Years in business</dt>
              <dd className="text-2xl font-extrabold text-navy">{settings.stats.yearsInBusiness}</dd>
              <p className="text-sm text-text-muted">In business</p>
            </div>
          </dl>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-text-muted">Follow us for videos &amp; deals</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ key, icon }) => {
                const entry = settings.social[key]
                return (
                  <a
                    key={key}
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={entry.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy hover:border-navy"
                  >
                    <Icon name={icon} className="h-4 w-4" />
                    {entry.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-navy">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.04)_2px,transparent_2px,transparent_12px)]" />
            <button
              type="button"
              aria-label="Watch: inside our showroom"
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-navy transition hover:bg-white"
            >
              <Icon name="play" className="h-6 w-6 translate-x-0.5" />
            </button>
            <span className="absolute left-4 top-4 z-10 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Watch: inside our showroom
            </span>
          </div>

          {featuredProduct && (
            <div className="absolute -bottom-8 left-4 flex w-56 items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-lg sm:left-8">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-bg-light">
                <img
                  src={featuredProduct.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                  Featured product
                </p>
                <p className="truncate text-sm font-semibold text-navy">{featuredProduct.name}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-navy">
                    {formatPrice(featuredProduct.price)}
                  </span>
                  <a
                    href={telegramOrderUrl(settings, featuredProduct.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Order
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
