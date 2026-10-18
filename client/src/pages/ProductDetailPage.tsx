import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useLanguage } from '../context/LanguageContext'
import { useProductDetail } from '../hooks/useProductDetail'
import { telegramOrderUrl, whatsappOrderUrl } from '../lib/order'
import { formatOldPrice, formatPrice } from '../lib/format'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { settings } = useShopSettings()
  const { t } = useLanguage()
  const { data: product, loading, notFound } = useProductDetail(Number(id))
  const [activeImage, setActiveImage] = useState(0)

  if (notFound) {
    return (
      <StorefrontLayout>
        <Container className="flex flex-col items-center gap-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-navy">{t('productDetail.notFoundTitle')}</h1>
          <p className="text-text-muted">{t('productDetail.notFoundDesc')}</p>
          <Link to="/#products" className="font-semibold text-accent hover:underline">
            {t('productDetail.backToProducts')}
          </Link>
        </Container>
      </StorefrontLayout>
    )
  }

  if (loading || !product) {
    return (
      <StorefrontLayout>
        <Container className="py-24 text-center text-text-muted">{t('productDetail.loading')}</Container>
      </StorefrontLayout>
    )
  }

  const gallery = product.images.length > 0 ? product.images : [product.image]

  return (
    <StorefrontLayout>
      <Container className="flex flex-col gap-10 py-10">
        <Link to="/#products" className="flex w-fit items-center gap-1.5 text-sm font-medium text-text-muted hover:text-navy">
          <Icon name="chevronLeft" className="h-4 w-4" />
          {t('productDetail.backToProducts')}
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-light">
              {product.onSale && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-navy px-3 py-1 text-xs font-semibold uppercase text-white">
                  {t('productCard.sale')}
                </span>
              )}
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                      i === activeImage ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                <span>{product.categoryLabel}</span>
                {product.brandName && (
                  <>
                    <span className="text-border">·</span>
                    <span>{product.brandName}</span>
                  </>
                )}
              </div>
              <h1 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">{product.name}</h1>
              <p className="mt-1 text-text-muted">{product.spec}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-navy">{formatPrice(product.price)}</span>
              {product.onSale && (
                <span className="text-lg text-text-muted line-through">
                  {formatOldPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {product.inStock ? (
              <div className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                {t('productDetail.inStock')}
              </div>
            ) : (
              <div className="flex w-fit items-center gap-1.5 rounded-full bg-bg-light px-3 py-1 text-xs font-semibold text-text-muted">
                {t('productDetail.outOfStock')}
              </div>
            )}

            {product.description && (
              <p className="leading-relaxed text-text-secondary">{product.description}</p>
            )}

            <div className="flex flex-wrap gap-3 border-t border-border pt-5">
              <a
                href={telegramOrderUrl(settings, product.name)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                <Icon name="telegram" className="h-4 w-4" />
                {t('productDetail.orderTelegram')}
              </a>
              <a
                href={whatsappOrderUrl(settings, product.name)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy/90"
              >
                <Icon name="messageCircle" className="h-4 w-4" />
                {t('productDetail.whatsapp')}
              </a>
              <a
                href={settings.phoneHref}
                className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-navy hover:border-navy"
              >
                <Icon name="phone" className="h-4 w-4" />
                {t('productDetail.callUs')}
              </a>
            </div>

            {product.specs.length > 0 && (
              <div className="border-t border-border pt-5">
                <h2 className="mb-3 font-semibold text-navy">{t('productDetail.specifications')}</h2>
                <dl className="divide-y divide-border rounded-xl border border-border">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                      <dt className="text-text-muted">{spec.label}</dt>
                      <dd className="text-right font-medium text-navy">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </Container>
    </StorefrontLayout>
  )
}
