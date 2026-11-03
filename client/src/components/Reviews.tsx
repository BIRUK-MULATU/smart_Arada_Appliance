import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import TiltCard from './ui/TiltCard'
import { useReviews } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

const avatarPalette = ['bg-accent', 'bg-navy', 'bg-accent/80', 'bg-navy/80']

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export default function Reviews() {
  const { data: reviews } = useReviews()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg-light py-16 [perspective:1600px]">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />

      <span className="pointer-events-none absolute left-[9%] top-10 hidden text-accent/30 sm:block">
        <Icon name="star" className="h-5 w-5 animate-float-y [animation-delay:0.6s]" />
      </span>
      <span className="pointer-events-none absolute right-[11%] top-20 hidden text-navy/20 sm:block">
        <Icon name="star" className="h-4 w-4 animate-float-y [animation-delay:1.8s]" />
      </span>

      <Container
        className={`relative flex flex-col items-center gap-10 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeading align="center" eyebrow={t('reviews.eyebrow')} title={t('reviews.title')} />

        <div className="grid w-full gap-6 sm:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={`transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
            >
              <TiltCard>
                <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-colors duration-500 hover:border-accent/40 hover:shadow-xl">
                  <Icon
                    name="quote"
                    className="pointer-events-none absolute -right-2 -top-3 h-16 w-16 text-bg-light transition-colors duration-500 group-hover:text-accent/10"
                  />

                  <div className="relative flex gap-0.5 text-accent" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <Icon
                        key={starIndex}
                        name="star"
                        className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                        style={{ transitionDelay: `${starIndex * 40}ms` }}
                      />
                    ))}
                  </div>

                  <p className="relative text-sm text-text-secondary">{review.text}</p>

                  <div className="relative mt-auto flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm transition-transform duration-500 group-hover:scale-110 ${
                        avatarPalette[i % avatarPalette.length]
                      }`}
                      aria-hidden="true"
                    >
                      {initialsOf(review.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.location}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
