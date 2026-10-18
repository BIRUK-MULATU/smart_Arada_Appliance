import Container from './ui/Container'
import Button from './ui/Button'
import { useShopSettings } from '../hooks/useShopSettings'
import { telegramOrderUrl } from '../lib/order'
import { useDeal } from '../hooks/useContent'
import { useCountdown } from '../hooks/useCountdown'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

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
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  if (!deal) return null

  return (
    <section ref={ref} id="deals" className="bg-white py-16">
      <Container>
        <div
          className={`grid overflow-hidden rounded-2xl bg-navy text-white transition-all duration-700 ease-out lg:grid-cols-2 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-5 p-8 sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {t('deal.eyebrow')}
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{deal.title}</h2>
            <p className="text-white/70">{deal.description}</p>

            {!expired ? (
              <div className="flex gap-3">
                <TimeBlock value={days} label={t('deal.days')} />
                <TimeBlock value={hours} label={t('deal.hours')} />
                <TimeBlock value={minutes} label={t('deal.minutes')} />
              </div>
            ) : (
              <p className="text-sm font-semibold text-accent">{t('deal.ended')}</p>
            )}

            <div>
              <Button
                href={telegramOrderUrl(settings, 'the washing machine deal')}
                target="_blank"
                rel="noreferrer"
              >
                {t('deal.grab')}
              </Button>
            </div>
          </div>

          <div className="relative hidden min-h-64 items-center justify-center overflow-hidden bg-white/5 lg:flex">
            {deal.image ? (
              <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-white/50">{t('deal.noPhoto')}</span>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
