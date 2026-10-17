import Container from './ui/Container'
import { useShopSettings } from '../hooks/useShopSettings'

export default function TopBar() {
  const { settings } = useShopSettings()

  return (
    <div className="hidden bg-navy text-xs text-white/80 sm:block">
      <Container className="flex items-center justify-between gap-4 py-2">
        <p>
          Free delivery inside Addis Ababa on orders above {settings.freeDeliveryThreshold} ETB
        </p>
        <div className="flex items-center gap-4">
          <a href={settings.phoneHref} className="hover:text-white">
            Call: {settings.phone}
          </a>
          <span className="text-white/40">·</span>
          <span>{settings.hours.short}</span>
          <span className="text-white/40">·</span>
          <div className="flex items-center gap-2">
            <button type="button" className="font-semibold text-white">
              EN
            </button>
            <span className="text-white/40">/</span>
            <button type="button" className="text-white/70 hover:text-white">
              አማ
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
