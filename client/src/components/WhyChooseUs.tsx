import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

const reasons: { number: string; titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { number: '01', titleKey: 'why.reason1Title', descriptionKey: 'why.reason1Desc' },
  { number: '02', titleKey: 'why.reason2Title', descriptionKey: 'why.reason2Desc' },
  { number: '03', titleKey: 'why.reason3Title', descriptionKey: 'why.reason3Desc' },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} className="bg-bg-light py-16">
      <Container
        className={`flex flex-col items-center gap-10 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeading
          align="center"
          eyebrow={t('why.eyebrow')}
          title={t('why.title')}
          description={t('why.desc')}
        />

        <div className="grid w-full gap-5 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.number} className="rounded-xl border border-border bg-white p-6">
              <span className="text-2xl font-extrabold text-accent">{reason.number}</span>
              <h3 className="mt-3 font-semibold text-navy">{t(reason.titleKey)}</h3>
              <p className="mt-2 text-sm text-text-muted">{t(reason.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
