import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl, whatsappOrderUrl } from '../lib/order'

export default function Contact() {
  const { settings } = useShopSettings()

  return (
    <section id="contact" className="bg-bg-light py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Contact &amp; visit
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              Ready to order? Reach us anytime.
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
                Order on Telegram
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
                WhatsApp
              </span>
              <span className="text-white/80">{settings.whatsappNumber}</span>
            </a>

            <a
              href={settings.phoneHref}
              className="flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4 font-semibold text-navy hover:border-navy"
            >
              <span className="flex items-center gap-3">
                <Icon name="phone" className="h-5 w-5" />
                Call us
              </span>
              <span className="text-text-muted">{settings.phone}</span>
            </a>
          </div>

          <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-semibold text-navy">
                <Icon name="mapPin" className="h-4 w-4 text-accent" />
                Showroom
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
                Opening hours
              </p>
              <p className="mt-2 text-sm text-text-muted">
                {settings.hours.weekdays}
                <br />
                {settings.hours.sunday}
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-[repeating-linear-gradient(135deg,#E6EAF0_0,#E6EAF0_2px,transparent_2px,transparent_14px)] bg-white">
          <span className="rounded-lg bg-white px-4 py-2 text-sm text-text-muted shadow-sm">
            Google Map of your showroom
          </span>
        </div>
      </Container>
    </section>
  )
}
