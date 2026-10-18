import Container from './ui/Container'
import Button from './ui/Button'
import { useShopSettings } from '../hooks/useShopSettings'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

export default function TelegramCta() {
  const { settings } = useShopSettings()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  return (
    <section ref={ref} className="bg-bg-light pb-16">
      <Container>
        <div
          className={`flex flex-col items-start gap-5 rounded-2xl border border-border bg-white p-8 transition-all duration-700 ease-out sm:flex-row sm:items-center sm:justify-between ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div>
            <h2 className="text-xl font-extrabold text-navy">{t('telegramCta.title')}</h2>
            <p className="mt-1 text-sm text-text-muted">{t('telegramCta.desc')}</p>
          </div>
          <Button
            href={settings.telegramChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            {t('telegramCta.join')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
