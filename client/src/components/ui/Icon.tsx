export type IconName =
  | 'play'
  | 'phone'
  | 'menu'
  | 'close'
  | 'chevronDown'
  | 'star'
  | 'shieldCheck'
  | 'calendar'
  | 'truck'
  | 'wrench'
  | 'send'
  | 'mapPin'
  | 'clock'
  | 'messageCircle'
  | 'plus'
  | 'minus'
  | 'tiktok'
  | 'telegram'
  | 'facebook'
  | 'instagram'
  | 'youtube'

const strokeIcons: Partial<Record<IconName, string>> = {
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M18 6 6 18M6 6l12 12',
  chevronDown: 'm6 9 6 6 6-6',
  shieldCheck: 'M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Zm-1.5 11.5L8 11l1.4-1.4 1.1 1.1 3.1-3.1L15 9Z',
  calendar: 'M8 2v4M16 2v4M3.5 9h17M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  truck: 'M3 7h11v9H3zM14 10h4l3 3v3h-7zM6.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  wrench:
    'M14.7 6.3a4 4 0 0 0-5.6 4.86l-6.8 6.8a1.5 1.5 0 0 0 2.12 2.12l6.8-6.8a4 4 0 0 0 4.86-5.6l-2.6 2.6-2.3-2.3Z',
  mapPin: 'M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  clock: 'M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  messageCircle:
    'M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1l-4.5 1 1.1-4.3A8.5 8.5 0 1 1 21 11.5Z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
}

const filledIcons: Partial<Record<IconName, string>> = {
  play: 'M8 5v14l11-7Z',
  send: 'M3 11.5 21 3l-5 18-5.2-7.3L3 11.5Zm0 0 7 2.5',
  star: 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.8-4.6 6.6-.9Z',
  telegram:
    'M21.5 3 2.3 10.6c-1.2.5-1.2 1.2-.2 1.5l4.9 1.5 11.3-7.1c.5-.3 1-.1.6.3L10 14.9l-.4 5.5c.6 0 .9-.3 1.2-.6l2.6-2.5 5.4 4c1 .5 1.7.3 2-.8L21.9 4.2c.4-1.3-.4-1.9-1.4-1.2Z',
  tiktok:
    'M16.5 2h-3v13.3a2.7 2.7 0 1 1-2.1-2.6V9.5a6 6 0 1 0 5.1 5.9V9.1a7.6 7.6 0 0 0 4.5 1.5V7.4A4.6 4.6 0 0 1 16.5 2Z',
  facebook: 'M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7H14v-7h2.6l.4-3h-3V9.6c0-.4.2-.6.6-.6Z',
  instagram:
    'M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm4 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17 6.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
  youtube:
    'M22 12a28 28 0 0 0-.4-5.2 2.8 2.8 0 0 0-2-2C17.9 4.3 12 4.3 12 4.3s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A28 28 0 0 0 2 12a28 28 0 0 0 .4 5.2 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A28 28 0 0 0 22 12Zm-12.3 3.3V8.7l5.8 3.3Z',
}

export default function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: IconName
  className?: string
}) {
  const strokePath = strokeIcons[name]
  const filledPath = filledIcons[name]

  if (filledPath) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d={filledPath} />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={strokePath} />
    </svg>
  )
}
