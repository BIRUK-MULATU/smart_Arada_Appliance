import Container from './ui/Container'
import Icon from './ui/Icon'
import TiltCard from './ui/TiltCard'
import type { IconName } from './ui/Icon'
import { useSectionItems } from '../hooks/useContent'
import { useShopSettings } from '../hooks/useShopSettings'
import { useInView } from '../hooks/useInView'

export default function AboutUs() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { settings } = useShopSettings()
  const { data: pillars } = useSectionItems('about')

  return (
    <section
      ref={ref}
      id="about-us"
      className="relative overflow-hidden bg-white py-20 [perspective:1600px]"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />

      <Container
        className={`relative grid gap-12 transition-all duration-700 ease-out lg:grid-cols-2 lg:items-center ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="group relative">
          <span className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-accent/20 blur-2xl animate-pulse motion-reduce:animate-none [animation-duration:4s]" />
          <TiltCard className="rounded-2xl">
            <div className="relative min-h-72 overflow-hidden rounded-2xl border border-border shadow-xl sm:min-h-96">
              <img
                src={settings.aboutImageUrl}
                alt="Historical photo of Arada Market, the Addis Ababa marketplace Smart Arada is named after"
                className="h-full min-h-72 w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 sm:min-h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-semibold uppercase tracking-wide text-white">
                {settings.aboutImageCaption}
              </p>
            </div>
          </TiltCard>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {settings.aboutEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{settings.aboutTitle}</h2>
            <p className="mt-4 text-base text-text-muted">{settings.aboutDesc}</p>
          </div>

          <div className="flex flex-col gap-5">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                className={`group/pillar flex gap-4 rounded-xl border border-transparent p-3 transition-all duration-500 ease-out hover:border-border hover:bg-bg-light ${
                  inView ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: inView ? `${i * 150}ms` : '0ms' }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-md transition-transform duration-500 group-hover/pillar:scale-110 group-hover/pillar:bg-accent">
                  <Icon name={(pillar.icon as IconName) ?? 'star'} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-navy">{pillar.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
