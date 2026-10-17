import Container from './ui/Container'
import { useBrands } from '../hooks/useContent'

export default function Brands() {
  const { data: brands } = useBrands()

  return (
    <section id="brands" className="border-b border-border bg-white py-12">
      <Container className="flex flex-col items-center gap-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Brands we carry
        </span>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex h-16 items-center justify-center rounded-lg bg-bg-light text-sm font-semibold text-text-muted"
            >
              {brand.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
