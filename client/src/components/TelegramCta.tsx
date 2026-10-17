import Container from './ui/Container'
import Button from './ui/Button'
import { useShopSettings } from '../hooks/useShopSettings'

export default function TelegramCta() {
  const { settings } = useShopSettings()

  return (
    <section className="bg-bg-light pb-16">
      <Container>
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Never miss a deal</h2>
            <p className="mt-1 text-sm text-text-muted">
              Join our Telegram channel for new arrivals, weekly discounts and price drops.
            </p>
          </div>
          <Button
            href={settings.telegramChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            Join our Telegram channel
          </Button>
        </div>
      </Container>
    </section>
  )
}
