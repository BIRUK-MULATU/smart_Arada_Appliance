import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import type { IconName } from './ui/Icon'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

const steps: {
  number: number
  icon: IconName
  titleKey: TranslationKey
  descriptionKey: TranslationKey
}[] = [
  { number: 1, icon: 'search', titleKey: 'howTo.step1Title', descriptionKey: 'howTo.step1Desc' },
  { number: 2, icon: 'phone', titleKey: 'howTo.step2Title', descriptionKey: 'howTo.step2Desc' },
  { number: 3, icon: 'truck', titleKey: 'howTo.step3Title', descriptionKey: 'howTo.step3Desc' },
]

export default function HowToOrder() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} id="how-to-order" className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

      <Container
        className={`relative flex flex-col items-center gap-14 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeading align="center" eyebrow={t('howTo.eyebrow')} title={t('howTo.title')} />

        <div className="relative grid w-full gap-10 sm:grid-cols-3 sm:gap-8">
          <div className="absolute left-[16.67%] right-[16.67%] top-7 hidden border-t-2 border-dashed border-border sm:block" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`group relative flex flex-col items-center gap-3 text-center transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : '0ms' }}
            >
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-md ring-8 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent">
                <Icon name={step.icon} className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white ring-2 ring-white transition-colors duration-500 group-hover:bg-navy">
                  {step.number}
                </span>
              </span>
              <h3 className="font-semibold text-navy">{t(step.titleKey)}</h3>
              <p className="max-w-xs text-sm text-text-muted">{t(step.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
