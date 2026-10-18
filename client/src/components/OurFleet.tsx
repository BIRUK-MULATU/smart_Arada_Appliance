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
