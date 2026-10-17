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
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000 * 30)
    return () => clearInterval(interval)
  }, [target])

  return timeLeft
}
