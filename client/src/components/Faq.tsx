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
    <section ref={ref} id="faq" className="bg-white py-16">
      <Container
        className={`grid gap-10 transition-all duration-700 ease-out lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t('faq.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{t('faq.title')}</h2>
          <p className="mt-3 text-text-muted">{t('faq.desc')}</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.id} className="rounded-xl border border-border">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-semibold text-navy">{faq.question}</span>
                  <Icon
                    name={isOpen ? 'minus' : 'plus'}
                    className="h-4 w-4 shrink-0 text-text-muted"
                  />
                </button>
                {isOpen && <p className="px-5 pb-4 text-sm text-text-muted">{faq.answer}</p>}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
