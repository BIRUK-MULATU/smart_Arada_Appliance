import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import { useCategories } from '../hooks/useCatalog'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function CategoryGrid() {
  const { data: categories } = useCategories()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section className="bg-white py-16">
      <Container fluid className="flex flex-col gap-8">
        <SectionHeading eyebrow={t('categories.eyebrow')} title={t('categories.title')} />

        <div ref={ref} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
          {categories.map((category, i) => (
            <a
              key={category.slug}
              href="#products"
              aria-label={`Browse ${category.name}`}
              className={`group aspect-[4/5] [perspective:1200px] transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
            >
              <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-4 text-center shadow-sm [backface-visibility:hidden]">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-bg-light">
                    <img src={category.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-navy">{category.name}</span>
                </div>

                {/* Back */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-navy p-4 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Icon name="chevronRight" className="h-5 w-5 text-accent" />
                  </span>
                  <span className="text-sm font-semibold">{category.name}</span>
                  <span className="text-xs text-white/60">{t('categories.browseNow')}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
