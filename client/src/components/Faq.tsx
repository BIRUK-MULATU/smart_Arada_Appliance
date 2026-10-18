import { useState } from 'react'
import Container from './ui/Container'
import Icon from './ui/Icon'
import { useFaqItems } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function Faq() {
  const { data: faqs } = useFaqItems()
  const [openIndex, setOpenIndex] = useState(0)
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} id="faq" className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-navy/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <Container
        className={`relative grid gap-10 transition-all duration-700 ease-out lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white shadow-md">
            <Icon name="messageCircle" className="h-6 w-6" />
          </span>
          <span className="mt-4 block text-sm font-semibold uppercase tracking-wide text-accent">
            {t('faq.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{t('faq.title')}</h2>
          <p className="mt-3 text-text-muted">{t('faq.desc')}</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${
                  isOpen ? 'border-accent/40 shadow-md' : 'border-border hover:border-accent/30'
                }`}
                style={{ transitionDelay: inView ? `${index * 80}ms` : '0ms' }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-navy'}`}>
                    {faq.question}
                  </span>
                  <Icon
                    name="plus"
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-accent' : 'text-text-muted'
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="min-h-0 overflow-hidden px-5 pb-4 text-sm text-text-muted">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
