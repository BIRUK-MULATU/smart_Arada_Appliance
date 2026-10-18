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
            {track.map((brand, i) => {
              const hasLogo = brand.logo !== '/placeholder.svg'
              return (
              <div
                key={`${brand.id}-${i}`}
                className="group/card h-36 w-64 shrink-0 cursor-default [perspective:1200px]"
              >
                <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover/card:[transform:rotateY(180deg)]">
                  {/* Front: real logo + name on white, or a glowing wordmark on the brand navy when no logo is set yet */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-6 transition-all duration-500 [backface-visibility:hidden] ${
                      hasLogo
                        ? 'border border-border bg-white shadow-sm group-hover/card:border-accent/40 group-hover/card:shadow-lg'
                        : 'border border-navy bg-navy shadow-[0_0_25px_-10px_rgba(166,103,7,0.5)] group-hover/card:shadow-[0_0_45px_-8px_rgba(166,103,7,0.85)]'
                    }`}
                  >
                    {hasLogo ? (
                      <>
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-12 max-w-full object-contain grayscale transition-all duration-500 group-hover/card:scale-110 group-hover/card:grayscale-0"
                        />
                        <span className="text-sm font-semibold text-navy/70 transition-colors duration-500 group-hover/card:text-navy">
                          {brand.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-2xl transition-all duration-500 group-hover/card:bg-accent/70 group-hover/card:blur-3xl" />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-[70%] -translate-y-[30%] rounded-full bg-white/20 blur-2xl transition-all duration-500 group-hover/card:bg-white/30" />
                        <span
                          className="relative text-2xl font-extrabold uppercase tracking-[0.15em] text-white transition-transform duration-500 group-hover/card:scale-105"
                          style={{
                            textShadow:
                              '0 0 10px rgba(166,103,7,0.9), 0 0 24px rgba(166,103,7,0.6), 0 0 36px rgba(255,255,255,0.4)',
                          }}
                        >
                          {brand.name}
                        </span>
                      </>
                    )}
                    <span className="relative h-0.5 w-6 origin-center scale-x-0 bg-accent transition-transform duration-500 group-hover/card:scale-x-100" />
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
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
