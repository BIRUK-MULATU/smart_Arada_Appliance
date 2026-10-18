import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useCatalog'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

const sortOptions: { value: SortOption; key: TranslationKey }[] = [
  { value: 'featured', key: 'products.sortFeatured' },
  { value: 'price-asc', key: 'products.sortPriceAsc' },
  { value: 'price-desc', key: 'products.sortPriceDesc' },
  { value: 'name', key: 'products.sortName' },
]

export default function AllProductsPage() {
  const { data: products, loading } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const { t } = useLanguage()

  const tabs = useMemo(() => {
    const seen = new Map<string, string>()
    for (const product of products) {
      if (!seen.has(product.category)) seen.set(product.category, product.categoryLabel)
    }
    return Array.from(seen, ([value, label]) => ({ value, label }))
  }, [products])

  function updateSearch(value: string) {
    setSearchTerm(value)
    const next = new URLSearchParams(searchParams)
    if (value.trim()) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const min = minPrice.trim() ? Number(minPrice) : null
  const max = maxPrice.trim() ? Number(maxPrice) : null
  const term = searchTerm.trim().toLowerCase()
  const hasFilters = Boolean(term) || min !== null || max !== null || activeCategory !== 'all'

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      if (term) {
        const haystack = `${p.name} ${p.spec} ${p.categoryLabel} ${p.brandName ?? ''}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      if (min !== null && p.price < min) return false
      if (max !== null && p.price > max) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [products, activeCategory, term, min, max, sortBy])

  function clearFilters() {
    setActiveCategory('all')
    updateSearch('')
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <StorefrontLayout>
      <Container className="flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex w-fit items-center gap-1.5 text-sm font-medium text-text-muted hover:text-navy"
          >
            <Icon name="chevronLeft" className="h-4 w-4" />
            {t('products.backHome')}
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                {t('products.eyebrow')}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{t('products.title')}</h1>
            </div>

            <label className="relative w-full max-w-xs">
              <span className="sr-only">{t('products.searchPlaceholder')}</span>
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder={t('products.searchPlaceholder')}
                className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-navy focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products by category">
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === 'all'
                    ? 'bg-navy text-white'
                    : 'border border-border text-text-secondary hover:border-navy'
                }`}
              >
                {t('featured.all')}
              </button>
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === tab.value}
                  onClick={() => setActiveCategory(tab.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === tab.value
                      ? 'bg-navy text-white'
                      : 'border border-border text-text-secondary hover:border-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={t('products.minPrice')}
                  className="w-24 rounded-lg border border-border px-2.5 py-2 text-sm focus:border-navy focus:outline-none"
                />
                <span className="text-text-muted">–</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t('products.maxPrice')}
                  className="w-24 rounded-lg border border-border px-2.5 py-2 text-sm focus:border-navy focus:outline-none"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-navy focus:border-navy focus:outline-none"
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {t(opt.key)}
                  </option>
                ))}
              </select>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-navy"
                >
                  <Icon name="close" className="h-3.5 w-3.5" />
                  {t('products.clear')}
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <p className="py-16 text-center text-text-muted">{t('products.loading')}</p>
        ) : visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-text-muted">
            <p>{t('products.noMatch')}</p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-accent hover:underline"
              >
                {t('products.clearFilters')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </StorefrontLayout>
  )
}
