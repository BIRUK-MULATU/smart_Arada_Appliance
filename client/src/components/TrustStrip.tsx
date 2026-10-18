import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { IconName } from './ui/Icon'

export default function TrustStrip() {
  const { settings } = useShopSettings()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const { t } = useLanguage()

  const items: { icon: IconName; title: string; description: string }[] = [
    { icon: 'shieldCheck', title: t('trust.genuineTitle'), description: t('trust.genuineDesc') },
    {
      icon: 'calendar',
      title: t('trust.warrantyTitle', { years: settings.warrantyYears }),
      description: t('trust.warrantyDesc'),
    },
    { icon: 'truck', title: t('trust.deliveryTitle'), description: t('trust.deliveryDesc') },
    { icon: 'wrench', title: t('trust.installTitle'), description: t('trust.installDesc') },
  ]

  return (
    <section ref={ref} id="delivery-warranty" className="border-b border-border bg-bg-light">
      <Container
        className={`grid grid-cols-2 gap-4 py-8 transition-all duration-700 ease-out sm:grid-cols-4 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-white p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: inView ? `${i * 100}ms` : '0ms' }}
          >
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-light text-navy transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <div className="relative z-10 min-w-0">
              <p className="text-sm font-semibold text-navy">{item.title}</p>
              <p className="truncate text-xs text-text-muted">{item.description}</p>
            </div>
            <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[250%] skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[450%]" />
          </div>
        ))}
      </Container>
    </section>
  )
}
