import Container from './ui/Container'
import Button from './ui/Button'
import Icon from './ui/Icon'
import TiltCard from './ui/TiltCard'
import type { IconName } from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useSectionItems } from '../hooks/useContent'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import { telegramMessageUrl } from '../lib/order'

// Cycles through 3 badge decorations so any number of admin-added steps still
// looks intentional, rather than tying a specific animation to a specific item.
const badgeDecorations: { badgeClass: string; ping?: boolean }[] = [
  { badgeClass: 'animate-orbit3d [animation-duration:7s]' },
  { badgeClass: 'animate-pulse motion-reduce:animate-none [animation-duration:2.5s]' },
  { badgeClass: '', ping: true },
]

export default function GiftFromAbroad() {
  const { settings } = useShopSettings()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()
  const { data: steps } = useSectionItems('gift')

  const inquiryUrl = telegramMessageUrl(
    settings,
    "Hi, I'm abroad and I'd like to send a gift to my family in Ethiopia",
  )

  return (
    <section
      ref={ref}
      id="gift-from-abroad"
      className="relative isolate overflow-hidden bg-navy py-24 [perspective:1600px]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <span className="pointer-events-none absolute left-[8%] top-16 hidden text-white/25 sm:block lg:left-[14%]">
        <Icon name="star" className="h-5 w-5 animate-float-y [animation-delay:0.4s]" />
      </span>
      <span className="pointer-events-none absolute right-[10%] top-28 hidden text-accent/60 sm:block lg:right-[16%]">
        <Icon name="gift" className="h-6 w-6 animate-float-y [animation-delay:1.3s]" />
      </span>
      <span className="pointer-events-none absolute bottom-16 left-[14%] hidden text-white/20 sm:block">
        <Icon name="star" className="h-4 w-4 animate-float-y [animation-delay:2.1s]" />
      </span>

      <Container
        className={`relative flex flex-col items-center gap-14 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t('giftAbroad.eyebrow')}
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('giftAbroad.title')}</h2>
          <p className="text-base text-white/70">{t('giftAbroad.desc')}</p>
        </div>

        <div className="flex w-full max-w-3xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-6">
          <div className="flex w-full max-w-xs flex-col items-center gap-3 sm:w-72">
            <div className="relative -rotate-3 transition-transform duration-500 hover:rotate-0">
              <span className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-accent/30 blur-2xl animate-pulse motion-reduce:animate-none [animation-duration:4s]" />
              <div className="animate-float-y [animation-delay:0.3s]">
                <TiltCard className="rounded-2xl">
                  <div className="overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
                    <img
                      src="/gift/delivery-bike.jpg"
                      alt="Smart Arada delivery rider heading out with a customer's order"
                      className="h-56 w-full object-cover sm:h-64"
                    />
                  </div>
                </TiltCard>
              </div>
            </div>
            <p className="max-w-[16rem] text-center text-sm font-medium text-white/80">
              {t('giftAbroad.photo1Caption')}
            </p>
          </div>

          <span className="hidden self-center pt-20 text-accent sm:block">
            <Icon
              name="send"
              className="h-6 w-6 animate-float-y motion-reduce:animate-none [animation-delay:1s]"
            />
          </span>

          <div className="flex w-full max-w-xs flex-col items-center gap-3 sm:w-72">
            <div className="relative rotate-3 transition-transform duration-500 hover:rotate-0">
              <span className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-white/20 blur-2xl animate-pulse motion-reduce:animate-none [animation-duration:4s] [animation-delay:1.5s]" />
              <div className="animate-float-y [animation-delay:1.1s]">
                <TiltCard className="rounded-2xl">
                  <div className="overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
                    <img
                      src="/gift/doorstep-handoff.jpg"
                      alt="Smiling delivery rider handing a package to a customer at their door"
                      className="h-56 w-full object-cover sm:h-64"
                    />
                  </div>
                </TiltCard>
              </div>
            </div>
            <p className="max-w-[16rem] text-center text-sm font-medium text-white/80">
              {t('giftAbroad.photo2Caption')}
            </p>
          </div>
        </div>

        <div className="relative grid w-full gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.length === 3 && (
            <div className="absolute left-[16.67%] right-[16.67%] top-7 hidden border-t-2 border-dashed border-white/25 sm:block">
              <span className="absolute -top-[9px] animate-fly-across text-accent motion-reduce:animate-none [animation-duration:5s]">
                <Icon name="send" className="h-[18px] w-[18px]" />
              </span>
            </div>
          )}

          {steps.map((step, i) => {
            const { badgeClass, ping } = badgeDecorations[i % badgeDecorations.length]
            return (
              <div
                key={step.id}
                className={`transition-all duration-700 ease-out ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: inView ? `${i * 150}ms` : '0ms' }}
              >
                <TiltCard>
                  <div className="group flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-7 text-center shadow-lg backdrop-blur-sm transition-colors duration-500 hover:border-accent/50 hover:bg-white/[0.1]">
                    <span
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-md ring-8 ring-navy transition-transform duration-500 group-hover:scale-110 ${badgeClass}`}
                    >
                      <Icon name={(step.icon as IconName) ?? 'star'} className="h-6 w-6" />
                      {ping && (
                        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/60 motion-reduce:animate-none [animation-duration:2.4s]" />
                      )}
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white ring-2 ring-navy transition-colors duration-500 group-hover:bg-white group-hover:text-accent">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="max-w-xs text-sm text-white/70">{step.description}</p>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>

        <div className="relative transition-transform duration-300 hover:scale-105">
          <span className="pointer-events-none absolute inset-0 -z-10 scale-110 animate-pulse rounded-lg bg-accent/50 blur-xl motion-reduce:animate-none [animation-duration:3s]" />
          <Button href={inquiryUrl} target="_blank" rel="noreferrer">
            <Icon name="telegram" className="h-5 w-5" />
            {t('giftAbroad.cta')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
