import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Container from './ui/Container'
import Icon from './ui/Icon'
import { useShopSettings } from '../hooks/useShopSettings'
import { useVideos } from '../hooks/useContent'
import { platformIcon, platformLabel } from '../lib/platformIcon'

const AUTO_ADVANCE_MS = 3200
const POP_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function circularOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex
  if (offset > length / 2) offset -= length
  if (offset < -length / 2) offset += length
  return offset
}

function cardStyle(offset: number): CSSProperties {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)

  if (abs > 2) {
    return {
      transform: `translate(-50%, -50%) translateX(${sign * 520}px) scale(0.5)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      transition: `transform 700ms ${POP_EASE}, opacity 500ms ease`,
    }
  }

  const translateX = offset * 148
  const translateZ = -abs * 140
  const rotateY = -sign * (abs === 0 ? 0 : 26)
  const scale = abs === 0 ? 1.12 : abs === 1 ? 0.82 : 0.64
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.28

  return {
    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: 10 - abs,
    transition: `transform 700ms ${POP_EASE}, opacity 500ms ease`,
  }
}

export default function SocialVideos() {
  const { settings } = useShopSettings()
  const { data: videos } = useVideos()
  const [activeIndex, setActiveIndex] = useState(0)

  // Clamp here instead of syncing via effect — keeps this safe even if the
  // video list shrinks or loads in after activeIndex was already advanced.
  const safeIndex = videos.length > 0 ? ((activeIndex % videos.length) + videos.length) % videos.length : 0

  // Runs continuously — never pauses, including on hover, by design.
  useEffect(() => {
    if (videos.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % videos.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [videos.length])

  function goTo(index: number) {
    setActiveIndex(((index % videos.length) + videos.length) % videos.length)
  }

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

          <div className="flex flex-wrap items-center gap-3">
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

            {videos.length > 1 && (
              <div className="ml-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Previous video"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                >
                  <Icon name="chevronLeft" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Next video"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                >
                  <Icon name="chevronRight" className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {videos.length === 0 ? (
          <p className="text-sm text-white/60">Videos you add in the admin will show up here.</p>
        ) : (
          <>
            <div
              className="relative h-[380px] w-full overflow-hidden sm:h-[420px]"
              style={{ perspective: '1400px' }}
            >
              {videos.map((video, index) => {
                const offset = circularOffset(index, safeIndex, videos.length)
                const isActive = offset === 0
                const style: CSSProperties = {
                  ...cardStyle(offset),
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                }

                const content = (
                  <>
                    <div
                      className={`relative aspect-[9/16] w-40 overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-500 sm:w-48 ${
                        isActive
                          ? 'border-accent/60 bg-white/15 shadow-2xl shadow-accent/20'
                          : 'border-white/15 bg-white/5'
                      }`}
                    >
                      <img src={video.thumbnail} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                        <Icon name={platformIcon(video.platform)} className="h-3.5 w-3.5" />
                        {platformLabel(video.platform)}
                      </span>
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition hover:bg-white">
                            <Icon name="play" className="h-5 w-5 translate-x-0.5" />
                          </span>
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-3 text-center transition-all duration-500 ${
                        isActive ? 'text-sm font-bold text-white' : 'text-xs font-medium text-white/50'
                      }`}
                    >
                      {video.caption}
                    </p>
                  </>
                )

                return isActive ? (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    style={style}
                    className="flex flex-col items-center"
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show ${video.caption}`}
                    style={style}
                    className="flex cursor-pointer flex-col items-center"
                  >
                    {content}
                  </button>
                )
              })}
            </div>

            {videos.length > 1 && (
              <div className="flex items-center justify-center gap-2">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${video.caption}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === safeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  )
}
