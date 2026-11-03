import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import TiltCard from './ui/TiltCard'
import type { IconName } from './ui/Icon'
import { useSectionItems } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

// Cycles through 3 badge decorations so any number of admin-added reasons still
// looks intentional, rather than tying a specific animation to a specific item.
const badgeDecorations: { badgeClass: string; ping?: boolean }[] = [
  { badgeClass: '', ping: true },
  { badgeClass: 'animate-bounce motion-reduce:animate-none [animation-duration:2s]' },
  { badgeClass: 'animate-wiggle [animation-duration:2.4s]' },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()
  const { data: reasons } = useSectionItems('why')

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg-light py-20 [perspective:1600px]">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <span className="pointer-events-none absolute left-[10%] top-12 hidden text-accent/30 sm:block">
        <Icon name="star" className="h-5 w-5 animate-float-y [animation-delay:0.3s]" />
      </span>
      <span className="pointer-events-none absolute right-[12%] top-24 hidden text-navy/20 sm:block">
        <Icon name="shieldCheck" className="h-6 w-6 animate-float-y [animation-delay:1.5s]" />
      </span>
      <span className="pointer-events-none absolute bottom-10 left-[16%] hidden text-navy/15 sm:block">
        <Icon name="star" className="h-4 w-4 animate-float-y [animation-delay:2.4s]" />
      </span>

      <Container
        className={`relative flex flex-col items-center gap-12 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeading
          align="center"
          eyebrow={t('why.eyebrow')}
          title={t('why.title')}
          description={t('why.desc')}
        />

        <div className="grid w-full gap-6 sm:grid-cols-3">
          {reasons.map((reason, i) => {
            const { badgeClass, ping } = badgeDecorations[i % badgeDecorations.length]
            return (
              <div
                key={reason.id}
                className={`transition-all duration-700 ease-out ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
              >
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-colors duration-500 hover:border-accent/40 hover:shadow-xl">
                    <span className="pointer-events-none absolute -right-3 -top-7 select-none text-7xl font-extrabold text-bg-light transition-colors duration-500 group-hover:text-accent/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative z-10">
                      <span
                        className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:bg-accent ${badgeClass}`}
                      >
                        <Icon name={(reason.icon as IconName) ?? 'star'} className="h-6 w-6" />
                        {ping && (
                          <span className="absolute inset-0 -z-10 animate-ping rounded-xl bg-accent/40 motion-reduce:animate-none [animation-duration:2.6s]" />
                        )}
                      </span>
                      <h3 className="mt-5 font-semibold text-navy">{reason.title}</h3>
                      <p className="mt-2 text-sm text-text-muted">{reason.description}</p>
                    </div>

                    <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
