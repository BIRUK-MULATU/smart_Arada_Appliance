import { Link } from 'react-router-dom'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl } from '../lib/order'
import { formatOldPrice, formatPrice } from '../lib/format'
import type { Product } from '../types/product'

export default function ProductCard({ product }: { product: Product }) {
  const { settings } = useShopSettings()

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-bg-light"
      >
        {product.onSale && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-navy px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
            Sale
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/products/${product.id}`} className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
            {product.categoryLabel}
          </span>
          <h3 className="font-semibold text-navy hover:text-accent">{product.name}</h3>
          <p className="text-xs text-text-muted">{product.spec}</p>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-navy">{formatPrice(product.price)}</span>
            {product.onSale && (
              <span className="text-sm text-text-muted line-through">
                {formatOldPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {product.inStock && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              In stock
            </div>
          )}
        </Link>

        <div className="mt-auto flex gap-2 pt-3">
          <a
            href={telegramOrderUrl(settings, product.name)}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            Order now
          </a>
          <a
            href={settings.phoneHref}
            aria-label={`Call us about ${product.name}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-navy hover:border-navy"
          >
            <Icon name="phone" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
