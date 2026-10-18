import type { IconName } from '../components/ui/Icon'

const knownPlatforms: Record<string, IconName> = {
  tiktok: 'tiktok',
  telegram: 'telegram',
  facebook: 'facebook',
  instagram: 'instagram',
  youtube: 'youtube',
}

const platformLabels: Record<string, string> = {
  tiktok: 'TikTok',
  telegram: 'Telegram',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
}

export function platformIcon(platform: string): IconName {
  return knownPlatforms[platform.toLowerCase()] ?? 'play'
}

export function platformLabel(platform: string): string {
  return platformLabels[platform.toLowerCase()] ?? platform
}
