import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl, whatsappOrderUrl } from '../lib/order'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { settings } = useShopSettings()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  const hasRealAddress = Boolean(settings.address) && !settings.address.trim().startsWith('[')
  const query = `${settings.address}, ${settings.city}`
  const mapSrc = settings.mapEmbedUrl
    ? settings.mapEmbedUrl
    : hasRealAddress
      ? `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
      : null
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

  return (
    <section ref={ref} id="contact" className="bg-bg-light py-16">
      <Container
        className={`grid gap-10 transition-all duration-700 ease-out lg:grid-cols-2 lg:items-start ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {t('contact.eyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              {t('contact.title')}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={telegramOrderUrl(settings, 'your products')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-accent px-5 py-4 font-semibold text-white hover:bg-accent-dark"
            >
              <span className="flex items-center gap-3">
                <Icon name="telegram" className="h-5 w-5" />
                {t('contact.orderTelegram')}
              </span>
              <span className="text-white/80">{settings.telegramHandle}</span>
            </a>

            <a
              href={whatsappOrderUrl(settings, 'your products')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-navy px-5 py-4 font-semibold text-white hover:bg-navy/90"
            >
              <span className="flex items-center gap-3">
                <Icon name="messageCircle" className="h-5 w-5" />
                {t('contact.whatsapp')}
              </span>
              <span className="text-white/80">{settings.whatsappNumber}</span>
            </a>

            <a
              href={settings.phoneHref}
              className="flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4 font-semibold text-navy hover:border-navy"
            >
              <span className="flex items-center gap-3">
                <Icon name="phone" className="h-5 w-5" />
                {t('contact.callUs')}
              </span>
              <span className="text-text-muted">{settings.phone}</span>
            </a>
          </div>

          <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-semibold text-navy">
                <Icon name="mapPin" className="h-4 w-4 text-accent" />
                {t('contact.showroom')}
              </p>
              <p className="mt-2 text-sm text-text-muted">
                {settings.address}
                <br />
                {settings.city}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-semibold text-navy">
                <Icon name="clock" className="h-4 w-4 text-accent" />
                {t('contact.hours')}
              </p>
              <p className="mt-2 text-sm text-text-muted">
                {settings.hours.weekdays}
                <br />
                {settings.hours.sunday}
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-2xl border border-border bg-white">
          {mapSrc ? (
            <>
              <iframe
                title="Showroom location"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-lg hover:bg-bg-light"
              >
                <Icon name="mapPin" className="h-4 w-4 text-accent" />
                {t('contact.getDirections')}
              </a>
            </>
          ) : (
            <div className="flex h-full min-h-80 items-center justify-center bg-[repeating-linear-gradient(135deg,#E6ECF0_0,#E6ECF0_2px,transparent_2px,transparent_14px)]">
              <span className="rounded-lg bg-white px-4 py-2 text-sm text-text-muted shadow-sm">
                {t('contact.noMap')}
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
