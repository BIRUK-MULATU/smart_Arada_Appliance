import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import ProductCard from './ProductCard'
import { useProducts } from '../hooks/useCatalog'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function FeaturedProducts() {
  const { data: products } = useProducts()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  const featured = useMemo(() => products.filter((p) => p.featured), [products])

  const tabs = useMemo(() => {
    const seen = new Map<string, string>()
    for (const product of featured) {
      if (!seen.has(product.category)) seen.set(product.category, product.categoryLabel)
    }
    return Array.from(seen, ([value, label]) => ({ value, label }))
  }, [featured])

  const visibleProducts =
    activeCategory === 'all' ? featured : featured.filter((p) => p.category === activeCategory)

  return (
    <section ref={ref} id="products" className="relative overflow-hidden bg-white py-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-navy/5 blur-3xl" />

      <Container
        fluid
        className={`relative flex flex-col gap-8 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/30 motion-reduce:animate-none [animation-duration:2.2s]" />
              <Icon name="star" className="relative h-5 w-5" />
            </span>
            <SectionHeading eyebrow={t('featured.eyebrow')} title={t('featured.title')} />
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'scale-105 bg-navy text-white shadow-md shadow-navy/20'
                  : 'border border-border text-text-secondary hover:scale-105 hover:border-navy'
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
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === tab.value
                    ? 'scale-105 bg-navy text-white shadow-md shadow-navy/20'
                    : 'border border-border text-text-secondary hover:scale-105 hover:border-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {visibleProducts.map((product, i) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: inView ? `${(i % 8) * 70}ms` : '0ms' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:border-navy hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t('featured.viewAll')}
            <Icon
              name="chevronRight"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Container>
    </section>
  )
}
