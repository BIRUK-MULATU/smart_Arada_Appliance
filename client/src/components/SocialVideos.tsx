import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import type { IconName } from './ui/Icon'

const videos: { platform: string; icon: IconName; caption: string }[] = [
  { platform: 'TikTok', icon: 'tiktok', caption: 'Unboxing our best-selling fridge' },
  { platform: 'Instagram', icon: 'instagram', caption: 'Washing machine: how it works' },
  { platform: 'Facebook', icon: 'facebook', caption: 'Customer delivery & installation' },
  { platform: 'YouTube', icon: 'youtube', caption: 'Smart TV setup in 2 minutes' },
]

export default function SocialVideos() {
  const { settings } = useShopSettings()

  return (
    <section className="bg-navy py-16 text-white">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Watch our videos
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              See the products in action
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={settings.social.tiktok.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              {settings.social.tiktok.handle}
            </a>
            <a
              href={settings.telegramChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              t.me/{settings.telegramHandle.replace(/^@/, '')}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {videos.map((video) => (
            <div key={video.caption} className="flex flex-col gap-3">
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-white/5">
                <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                  <Icon name={video.icon} className="h-3.5 w-3.5" />
                  {video.platform}
                </span>
                <button
                  type="button"
                  aria-label={`Play video: ${video.caption}`}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy transition hover:bg-white">
                    <Icon name="play" className="h-5 w-5 translate-x-0.5" />
                  </span>
                </button>
              </div>
              <p className="text-sm text-white/80">{video.caption}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
