import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'
import { useBrands } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function Brands() {
  const { data: brands } = useBrands()
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const { t } = useLanguage()

  // Exactly two copies back-to-back, so animating from 0 to -50% of the
  // track width loops seamlessly with no visible jump.
  const track = brands.length > 0 ? [...brands, ...brands] : []
  const duration = Math.max(brands.length * 4, 16)

  return (
    <section id="brands" ref={ref} className="overflow-hidden border-b border-border bg-white py-20">
      <Container
        className={`flex flex-col items-center gap-10 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <SectionHeading align="center" eyebrow={t('brands.eyebrow')} title={t('brands.title')} />

        {track.length === 0 && <p className="text-sm text-text-muted">{t('brands.empty')}</p>}
      </Container>

      {track.length > 0 && (
        <div className="group/track relative mt-4 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className="animate-marquee flex w-max gap-8 group-hover/track:[animation-play-state:paused]"
            style={{ animationDuration: `${duration}s` }}
          >
            {track.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="group/card h-32 w-64 shrink-0 cursor-default [perspective:1200px]"
              >
                <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover/card:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-border bg-white px-10 shadow-sm [backface-visibility:hidden]">
                    {brand.logo === '/placeholder.svg' ? (
                      <span className="text-xl font-extrabold tracking-tight text-navy/70">
                        {brand.name}
                      </span>
                    ) : (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-14 max-w-full object-contain grayscale"
                      />
                    )}
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-navy px-6 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <Icon name="shieldCheck" className="h-5 w-5 text-accent" />
                    </span>
                    <span className="text-sm font-semibold">{brand.name}</span>
                    <span className="text-xs text-white/60">{t('brands.genuine')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
