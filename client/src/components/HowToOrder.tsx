import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'

const steps = [
  {
    number: 1,
    title: 'Browse & choose',
    description: 'Find the appliance you like on our website.',
  },
  {
    number: 2,
    title: 'Message or call us',
    description: 'Tap "Order now" to reach us on Telegram, WhatsApp or by phone.',
  },
  {
    number: 3,
    title: 'We deliver & install',
    description: 'We bring it to your home, set it up, and you pay on delivery.',
  },
]

export default function HowToOrder() {
  return (
    <section id="how-to-order" className="bg-white py-16">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading align="center" eyebrow="How to order" title="Three simple steps" />

        <div className="grid w-full gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                {step.number}
              </span>
              <h3 className="font-semibold text-navy">{step.title}</h3>
              <p className="max-w-xs text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
