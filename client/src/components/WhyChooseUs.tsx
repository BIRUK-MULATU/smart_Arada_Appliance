import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import type { IconName } from './ui/Icon'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

const reasons: {
  number: string
  icon: IconName
  titleKey: TranslationKey
  descriptionKey: TranslationKey
}[] = [
  { number: '01', icon: 'messageCircle', titleKey: 'why.reason1Title', descriptionKey: 'why.reason1Desc' },
  { number: '02', icon: 'truck', titleKey: 'why.reason2Title', descriptionKey: 'why.reason2Desc' },
  { number: '03', icon: 'wrench', titleKey: 'why.reason3Title', descriptionKey: 'why.reason3Desc' },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg-light py-20">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

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
          {reasons.map((reason, i) => (
            <div
              key={reason.number}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-accent/40 hover:shadow-xl ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
            >
              <span className="pointer-events-none absolute -right-3 -top-7 select-none text-7xl font-extrabold text-bg-light transition-colors duration-500 group-hover:text-accent/10">
                {reason.number}
              </span>

              <div className="relative z-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:bg-accent">
                  <Icon name={reason.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-semibold text-navy">{t(reason.titleKey)}</h3>
                <p className="mt-2 text-sm text-text-muted">{t(reason.descriptionKey)}</p>
              </div>

              <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
