import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

const steps: { number: number; titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { number: 1, titleKey: 'howTo.step1Title', descriptionKey: 'howTo.step1Desc' },
  { number: 2, titleKey: 'howTo.step2Title', descriptionKey: 'howTo.step2Desc' },
  { number: 3, titleKey: 'howTo.step3Title', descriptionKey: 'howTo.step3Desc' },
]

export default function HowToOrder() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} id="how-to-order" className="bg-white py-16">
      <Container
        className={`flex flex-col items-center gap-10 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <SectionHeading align="center" eyebrow={t('howTo.eyebrow')} title={t('howTo.title')} />

        <div className="grid w-full gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                {step.number}
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
