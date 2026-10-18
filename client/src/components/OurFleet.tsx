import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import TiltCard from './ui/TiltCard'
import { useInView } from '../hooks/useInView'

const vehicles = [
  {
    src: '/fleet/delivery-van.jpg',
    alt: 'Smart Arada branded delivery van',
    caption: 'Our delivery van, out on same-day drop-offs across Addis Ababa.',
  },
  {
    src: '/fleet/delivery-truck.jpg',
    alt: 'Smart Arada branded delivery truck',
    caption: 'Our larger vehicle, built for bulk and heavy appliance deliveries.',
  },
]

export default function OurFleet() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)

  return (
    <section ref={ref} className="overflow-hidden bg-bg-light py-20">
      <Container className="flex flex-col items-center gap-12">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <SectionHeading
            align="center"
            eyebrow="Our fleet"
            title="We deliver it ourselves"
            description="No third-party couriers. Our own branded vehicles bring every order straight to your door, on time."
          />
        </div>

        <div className="grid w-full gap-10 sm:grid-cols-2">
          {vehicles.map((vehicle, i) => (
            <div
              key={vehicle.src}
              className={`transition-all duration-700 ease-out ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : '0ms' }}
            >
              <TiltCard className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden bg-bg-light">
                  <img
                    src={vehicle.src}
                    alt={vehicle.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="px-5 py-4 text-sm text-text-secondary">{vehicle.caption}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
