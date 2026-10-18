import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import { useReviews } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function Reviews() {
  const { data: reviews } = useReviews()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} className="bg-bg-light py-16">
      <Container
        className={`flex flex-col items-center gap-10 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeading align="center" eyebrow={t('reviews.eyebrow')} title={t('reviews.title')} />

        <div className="grid w-full gap-5 sm:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6">
              <div className="flex gap-0.5 text-accent" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4" />
                ))}
              </div>
              <p className="text-sm text-text-secondary">{review.text}</p>
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 shrink-0 rounded-full bg-bg-light" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-navy">{review.name}</p>
                  <p className="text-xs text-text-muted">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
