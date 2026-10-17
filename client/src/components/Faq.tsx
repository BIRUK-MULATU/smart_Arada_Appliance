import { useState } from 'react'
import Container from './ui/Container'
import Icon from './ui/Icon'
import { useFaqItems } from '../hooks/useContent'

export default function Faq() {
  const { data: faqs } = useFaqItems()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-white py-16">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">FAQ</span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Questions? We&apos;ve got answers.
          </h2>
          <p className="mt-3 text-text-muted">
            Can&apos;t find what you need? Send us a message on Telegram and we&apos;ll reply fast.
          </p>
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
