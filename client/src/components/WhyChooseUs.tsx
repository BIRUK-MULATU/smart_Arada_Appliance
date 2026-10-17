import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'

const reasons = [
  {
    number: '01',
    title: 'Expert advice',
    description:
      "Not sure which fridge fits your kitchen? Message us and we'll help you pick the right size and model.",
  },
  {
    number: '02',
    title: 'Pay on delivery',
    description: 'Check your appliance when it arrives, then pay by cash, Telebirr or bank transfer. No risk.',
  },
  {
    number: '03',
    title: 'After-sales support',
    description: "Warranty repairs and maintenance handled by our own technicians. One call and we're on it.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-bg-light py-16">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading
          align="center"
          eyebrow="Why choose us"
          title="Shopping you can trust"
          description="We handle everything from choosing the right appliance to delivery, installation and after-sales service."
        />

        <div className="grid w-full gap-5 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.number} className="rounded-xl border border-border bg-white p-6">
              <span className="text-2xl font-extrabold text-accent">{reason.number}</span>
              <h3 className="mt-3 font-semibold text-navy">{reason.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
