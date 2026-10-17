import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import type { IconName } from './ui/Icon'

export default function TrustStrip() {
  const { settings } = useShopSettings()

  const items: { icon: IconName; title: string; description: string }[] = [
    { icon: 'shieldCheck', title: '100% genuine', description: 'Original brand products' },
    {
      icon: 'calendar',
      title: `${settings.warrantyYears}-year warranty`,
      description: 'On every appliance',
    },
    { icon: 'truck', title: 'Fast delivery', description: 'Same or next day in Addis' },
    { icon: 'wrench', title: 'Free installation', description: 'By trained technicians' },
  ]

  return (
    <section id="delivery-warranty" className="border-b border-border bg-white">
      <Container className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-light text-navy">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">{item.title}</p>
              <p className="text-xs text-text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}
