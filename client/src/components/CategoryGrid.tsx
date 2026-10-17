import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useCategories } from '../hooks/useCatalog'

export default function CategoryGrid() {
  const { data: categories } = useCategories()

  return (
    <section className="bg-white py-16">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow="Shop by category" title="Everything for your home" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <a
              key={category.slug}
              href="#products"
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-4 text-center transition hover:border-navy hover:shadow-sm"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-bg-light">
                <img src={category.image} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="text-sm font-semibold text-navy">{category.name}</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
