import Container from './ui/Container'
import Icon from './ui/Icon'
import TiltCard from './ui/TiltCard'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl, whatsappOrderUrl } from '../lib/order'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { settings } = useShopSettings()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} id="contact" className="bg-bg-light py-16">
      <Container
        className={`grid gap-10 transition-all duration-700 ease-out lg:grid-cols-2 lg:items-center ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {settings.contactEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              {settings.contactTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={telegramOrderUrl(settings, 'your products')}
              target="_blank"
              rel="noreferrer"
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-accent px-5 py-4 font-semibold text-white hover:bg-accent-dark"
            >
              <span className="flex shrink-0 items-center gap-3">
                <Icon name="telegram" className="h-5 w-5" />
                {t('contact.orderTelegram')}
              </span>
              <span className="min-w-0 truncate text-white/80">{settings.telegramHandle}</span>
            </a>

            <a
              href={whatsappOrderUrl(settings, 'your products')}
              target="_blank"
              rel="noreferrer"
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-navy px-5 py-4 font-semibold text-white hover:bg-navy/90"
            >
              <span className="flex shrink-0 items-center gap-3">
                <Icon name="messageCircle" className="h-5 w-5" />
                {t('contact.whatsapp')}
              </span>
              <span className="min-w-0 truncate text-white/80">{settings.whatsappNumber}</span>
            </a>

            <a
              href={settings.social.viber.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-[#7360F2] px-5 py-4 font-semibold text-white hover:bg-[#7360F2]/90"
            >
              <span className="flex shrink-0 items-center gap-3">
                <Icon name="viber" className="h-5 w-5" />
                {t('contact.orderViber')}
              </span>
              <span className="min-w-0 truncate text-white/80">{t('contact.messageUs')}</span>
            </a>

            <a
              href={settings.social.facebook.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-[#1877F2] px-5 py-4 font-semibold text-white hover:bg-[#1877F2]/90"
            >
              <span className="flex shrink-0 items-center gap-3">
                <Icon name="facebook" className="h-5 w-5" />
                {t('contact.orderFacebook')}
              </span>
              <span className="min-w-0 truncate text-white/80">{t('contact.messageUs')}</span>
            </a>

            <a
              href={settings.social.tiktok.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-black px-5 py-4 font-semibold text-white hover:bg-black/90"
            >
              <span className="flex shrink-0 items-center gap-3">
                <Icon name="tiktok" className="h-5 w-5" />
                {t('contact.orderTiktok')}
              </span>
              <span className="min-w-0 truncate text-white/80">{settings.social.tiktok.handle}</span>
            </a>

            <a
              href={settings.phoneHref}
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-border bg-white px-5 py-4 font-semibold text-navy hover:border-navy"
            >
              <span className="flex shrink-0 items-center gap-3">
                <Icon name="phone" className="h-5 w-5" />
                {t('contact.callUs')}
              </span>
              <span className="min-w-0 truncate text-text-muted">{settings.phone}</span>
            </a>
          </div>
        </div>

        <div className="grid gap-8 [perspective:1600px] sm:grid-cols-2 sm:gap-6">
          <div
            className={`group relative transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-accent/25 blur-2xl animate-pulse motion-reduce:animate-none [animation-duration:4s]" />
            <TiltCard className="rounded-2xl">
              <div className="relative min-h-64 overflow-hidden rounded-2xl border border-border shadow-lg transition-shadow duration-500 group-hover:shadow-2xl sm:min-h-80">
                <img
                  src={settings.contactImageUrl}
                  alt="Addis Ababa city skyline"
                  className="h-full min-h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:min-h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <p className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon name="mapPin" className="h-4 w-4 text-accent" />
                  {settings.city}
                </p>
              </div>
            </TiltCard>
          </div>

          <div
            className={`group relative transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: inView ? '150ms' : '0ms' }}
          >
            <span className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-navy/20 blur-2xl animate-pulse motion-reduce:animate-none [animation-duration:4s] [animation-delay:1.3s]" />
            <TiltCard className="rounded-2xl">
              <div className="relative min-h-64 overflow-hidden rounded-2xl border border-border shadow-lg transition-shadow duration-500 group-hover:shadow-2xl sm:min-h-80">
                <img
                  src={settings.contactSecondImageUrl}
                  alt="Historical black and white photo of Arada Market in 1934"
                  className="h-full min-h-64 w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 sm:min-h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold uppercase tracking-wide text-white">
                  {settings.contactSecondImageCaption}
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
