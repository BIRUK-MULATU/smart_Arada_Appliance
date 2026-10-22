import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
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
    <section ref={ref} id="products" className="bg-white py-16">
      <Container
        fluid
        className={`flex flex-col gap-8 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t('featured.eyebrow')} title={t('featured.title')} />

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
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t('featured.viewAll')}
          </Link>
        </div>
      </Container>
    </section>
  )
}
