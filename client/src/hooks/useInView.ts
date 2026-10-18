import { useCallback, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // A callback ref (not useRef + useEffect) so the observer attaches
  // whenever the node actually mounts — including when a component
  // renders `null` first (e.g. while data is still loading) and the
  // observed element only appears on a later render.
  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect()
      observerRef.current = null

      if (!node) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => setInView(entry?.isIntersecting ?? false),
        { threshold },
      )
      observerRef.current.observe(node)
    },
    [threshold],
  )

  return { ref, inView }
}
