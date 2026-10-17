import { useMemo, useState } from 'react'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'
import ProductCard from './ProductCard'
import { useProducts } from '../hooks/useCatalog'

export default function FeaturedProducts() {
  const { data: products } = useProducts()
  const [activeCategory, setActiveCategory] = useState<string>('all')

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
    <section id="products" className="bg-white py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Featured" title="Popular right now" />

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
              All
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline">View all products</Button>
        </div>
      </Container>
    </section>
  )
}
