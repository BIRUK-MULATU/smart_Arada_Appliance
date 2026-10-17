import Container from './ui/Container'
import Button from './ui/Button'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl } from '../lib/order'
import { useDeal } from '../hooks/useContent'
import { useCountdown } from '../hooks/useCountdown'

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center rounded-lg bg-white/10 py-2">
      <span className="text-xl font-extrabold tabular-nums">{String(value).padStart(2, '0')}</span>
      <span className="text-[11px] text-white/70">{label}</span>
    </div>
  )
}

export default function DealOfWeek() {
  const { settings } = useShopSettings()
  const { data: deal } = useDeal()
  const { days, hours, minutes, expired } = useCountdown(deal?.endsAt ?? new Date().toISOString())

  if (!deal) return null

  return (
    <section id="deals" className="bg-white py-16">
      <Container>
        <div className="grid overflow-hidden rounded-2xl bg-navy text-white lg:grid-cols-2">
          <div className="flex flex-col gap-5 p-8 sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Deal of the week
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{deal.title}</h2>
            <p className="text-white/70">{deal.description}</p>

            {!expired ? (
              <div className="flex gap-3">
                <TimeBlock value={days} label="Days" />
                <TimeBlock value={hours} label="Hours" />
                <TimeBlock value={minutes} label="Minutes" />
              </div>
            ) : (
              <p className="text-sm font-semibold text-accent">This deal has ended — check back soon.</p>
            )}

            <div>
              <Button
                href={telegramOrderUrl(settings, 'the washing machine deal')}
                target="_blank"
                rel="noreferrer"
              >
                Grab the deal
              </Button>
            </div>
          </div>

          <div className="hidden min-h-64 items-center justify-center bg-white/5 lg:flex">
            <span className="text-sm text-white/50">Deal product photo</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
