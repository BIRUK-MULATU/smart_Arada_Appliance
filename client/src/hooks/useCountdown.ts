import { useEffect, useState } from 'react'

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const totalMinutes = Math.floor(diff / 60000)

  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor((totalMinutes / 60) % 24),
    minutes: totalMinutes % 60,
    expired: diff <= 0,
  }
}

export function useCountdown(target: string) {
  // `tick` has no meaning of its own — bumping it just forces a re-render
  // every 30s so getTimeLeft(target) below is recomputed against the clock.
  const [, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick((n) => n + 1), 1000 * 30)
    return () => clearInterval(interval)
  }, [])

  return getTimeLeft(target)
}
