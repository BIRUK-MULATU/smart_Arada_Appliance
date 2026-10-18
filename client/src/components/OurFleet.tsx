import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'

const vehicles: { src: string; alt: string; captionKey: TranslationKey }[] = [
  { src: '/fleet/delivery-van.jpg', alt: 'Smart Arada branded delivery van', captionKey: 'fleet.van' },
  {
    src: '/fleet/delivery-truck.jpg',
    alt: 'Smart Arada branded delivery truck',
    captionKey: 'fleet.truck',
  },
  {
    src: '/fleet/delivery-motorcycle.jpg',
    alt: 'Smart Arada branded delivery motorcycle',
    captionKey: 'fleet.motorcycle',
  },
  {
    src: '/fleet/delivery-bicycle.jpg',
    alt: 'Smart Arada branded delivery rider with bicycle',
    captionKey: 'fleet.bicycle',
  },
]

const RADIUS_PX = 320

export default function OurFleet() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

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
            eyebrow={t('fleet.eyebrow')}
            title={t('fleet.title')}
            description={t('fleet.desc')}
          />
        </div>

        <div
          className={`group/carousel relative flex h-[340px] w-full items-center justify-center transition-all duration-700 ease-out [perspective:1800px] sm:h-[440px] md:h-[500px] ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]">
            <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl [transform:translateZ(-480px)] sm:h-[520px] sm:w-[520px] md:h-[600px] md:w-[600px]" />
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/25 blur-2xl [transform:translateZ(-280px)] sm:h-[340px] sm:w-[340px]" />

            <div className="fleet-floor-grid absolute left-1/2 top-[76%] h-[220px] w-[480px] -translate-x-1/2 [transform:rotateX(78deg)_translateZ(-160px)] sm:h-[300px] sm:w-[680px] md:h-[360px] md:w-[820px]" />

            <div className="motion-reduce:animate-none absolute left-1/2 top-1/2 h-[200px] w-[480px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-accent/30 [animation-duration:18s] [transform:rotateX(78deg)_translateZ(-40px)] sm:h-[260px] sm:w-[640px] md:h-[300px] md:w-[740px]" />
            <div className="motion-reduce:animate-none absolute left-1/2 top-1/2 h-[240px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-navy/20 [animation-direction:reverse] [animation-duration:26s] [transform:rotateX(78deg)_translateZ(-90px)] sm:h-[300px] sm:w-[720px] md:h-[340px] md:w-[840px]" />
          </div>

          <div className="absolute bottom-2 left-1/2 h-8 w-[220px] -translate-x-1/2 rounded-full bg-navy/30 blur-xl sm:bottom-6 sm:h-12 sm:w-[300px] md:w-[360px]" />

          <div
            className="animate-orbit3d relative h-[260px] w-[240px] [transform-style:preserve-3d] group-hover/carousel:[animation-play-state:paused] sm:h-[340px] sm:w-[300px] md:h-[400px] md:w-[360px]"
            style={{ animationDuration: `${vehicles.length * 6}s` }}
          >
            {vehicles.map((vehicle, i) => {
              const angle = (360 / vehicles.length) * i
              return (
                <div
                  key={vehicle.src}
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
                  style={{ transform: `rotateY(${angle}deg) translateZ(${RADIUS_PX}px)` }}
                >
                  <img src={vehicle.src} alt={vehicle.alt} className="h-full w-full object-cover" />
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm font-medium text-white">
                    {t(vehicle.captionKey)}
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
