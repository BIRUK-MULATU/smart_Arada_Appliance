import { useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'

type TiltState = {
  rotateX: number
  rotateY: number
  scale: number
  glareX: number
  glareY: number
  glareOpacity: number
}

const resting: TiltState = { rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50, glareOpacity: 0 }

export default function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>(resting)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({
      rotateX: (0.5 - py) * 16,
      rotateY: (px - 0.5) * 16,
      scale: 1.03,
      glareX: px * 100,
      glareY: py * 100,
      glareOpacity: 0.2,
    })
  }

  function handleMouseLeave() {
    setTilt(resting)
  }

  const style: CSSProperties = {
    transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: tilt.glareOpacity,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.9), transparent 55%)`,
        }}
      />
    </div>
  )
}
