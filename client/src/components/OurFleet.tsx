import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useSectionItems } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

const RADIUS_PX = 320

export default function OurFleet() {
  const { settings } = useShopSettings()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()
  const { data: vehicles } = useSectionItems('fleet')

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy py-20 [perspective:1600px]">
      <video
        src={settings.heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy/55 to-navy" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <span className="pointer-events-none absolute left-[10%] top-14 hidden text-white/20 sm:block lg:left-[16%]">
        <Icon name="truck" className="h-6 w-6 animate-float-y [animation-delay:0.5s]" />
      </span>
      <span className="pointer-events-none absolute right-[12%] top-24 hidden text-accent/60 sm:block lg:right-[18%]">
        <Icon name="star" className="h-5 w-5 animate-float-y [animation-delay:1.6s]" />
      </span>

      <Container className="relative flex flex-col items-center gap-12">
        <div
          className={`flex max-w-2xl flex-col items-center gap-3 text-center transition-all duration-700 ease-out ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t('fleet.eyebrow')}
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('fleet.title')}</h2>
          <p className="text-base text-white/70">{t('fleet.desc')}</p>
        </div>

        <div
          className={`group/carousel relative flex h-[340px] w-full items-center justify-center transition-all duration-700 ease-out [perspective:1800px] sm:h-[440px] md:h-[500px] ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]">
            <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl [transform:translateZ(-480px)] sm:h-[520px] sm:w-[520px] md:h-[600px] md:w-[600px]" />
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-2xl [transform:translateZ(-280px)] sm:h-[340px] sm:w-[340px]" />

            <div className="fleet-floor-grid absolute left-1/2 top-[76%] h-[220px] w-[480px] -translate-x-1/2 [transform:rotateX(78deg)_translateZ(-160px)] sm:h-[300px] sm:w-[680px] md:h-[360px] md:w-[820px]" />

            <div className="motion-reduce:animate-none absolute left-1/2 top-1/2 h-[200px] w-[480px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-accent/30 [animation-duration:18s] [transform:rotateX(78deg)_translateZ(-40px)] sm:h-[260px] sm:w-[640px] md:h-[300px] md:w-[740px]" />
            <div className="motion-reduce:animate-none absolute left-1/2 top-1/2 h-[240px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-white/20 [animation-direction:reverse] [animation-duration:26s] [transform:rotateX(78deg)_translateZ(-90px)] sm:h-[300px] sm:w-[720px] md:h-[340px] md:w-[840px]" />
          </div>

          <div className="absolute bottom-2 left-1/2 h-8 w-[220px] -translate-x-1/2 rounded-full bg-black/40 blur-xl sm:bottom-6 sm:h-12 sm:w-[300px] md:w-[360px]" />

          <div
            className="animate-orbit3d relative h-[260px] w-[240px] [transform-style:preserve-3d] group-hover/carousel:[animation-play-state:paused] sm:h-[340px] sm:w-[300px] md:h-[400px] md:w-[360px]"
            style={{ animationDuration: `${vehicles.length * 6}s` }}
          >
            {vehicles.map((vehicle, i) => {
              const angle = (360 / vehicles.length) * i
              return (
                <div
                  key={vehicle.id}
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
                  style={{ transform: `rotateY(${angle}deg) translateZ(${RADIUS_PX}px)` }}
                >
                  <img
                    src={vehicle.image ?? '/placeholder.svg'}
                    alt={vehicle.title}
                    className="h-full w-full object-cover"
                  />
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm font-medium text-white">
                    {vehicle.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
