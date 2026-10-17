import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'

export default function FloatingTelegramButton() {
  const { settings } = useShopSettings()

  return (
    <a
      href={settings.telegramUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Message us on Telegram"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent-dark"
    >
      <Icon name="send" className="h-6 w-6" />
    </a>
  )
}
