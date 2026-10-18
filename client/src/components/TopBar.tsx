import Container from './ui/Container'
import { useShopSettings } from '../hooks/useShopSettings'
import { useLanguage } from '../context/LanguageContext'

export default function TopBar() {
  const { settings } = useShopSettings()
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="hidden bg-navy text-xs text-white/80 sm:block">
      <Container className="flex items-center justify-between gap-4 py-2">
        <p>{t('topBar.freeDelivery', { threshold: settings.freeDeliveryThreshold })}</p>
        <div className="flex items-center gap-4">
          <a href={settings.phoneHref} className="hover:text-white">
            {t('topBar.call', { phone: settings.phone })}
          </a>
          <span className="text-white/40">·</span>
          <span>{settings.hours.short}</span>
          <span className="text-white/40">·</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'font-semibold text-white' : 'text-white/70 hover:text-white'}
            >
              EN
            </button>
            <span className="text-white/40">/</span>
            <button
              type="button"
              onClick={() => setLang('am')}
              className={lang === 'am' ? 'font-semibold text-white' : 'text-white/70 hover:text-white'}
            >
              አማ
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
