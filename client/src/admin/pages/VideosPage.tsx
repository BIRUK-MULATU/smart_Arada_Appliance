import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { Video } from '../../types/content'

const columns: ColumnConfig<Video>[] = [
  { key: 'caption', label: 'Caption' },
  { key: 'platform', label: 'Platform' },
  { key: 'sortOrder', label: 'Order' },
]

const fields: FieldConfig[] = [
  {
    name: 'platform',
    label: 'Platform',
    type: 'select',
    required: true,
    options: [
      { label: 'TikTok', value: 'tiktok' },
      { label: 'Instagram', value: 'instagram' },
      { label: 'Facebook', value: 'facebook' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'Telegram', value: 'telegram' },
    ],
  },
  { name: 'caption', label: 'Caption', type: 'text', required: true },
  {
    name: 'url',
    label: 'Video link (the actual post)',
    type: 'text',
    required: true,
    placeholder: 'https://tiktok.com/@your_shop/video/...',
  },
  { name: 'thumbnail', label: 'Thumbnail image URL', type: 'text', placeholder: '/placeholder.svg' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
]

export default function VideosPage() {
  return (
    <ResourceTable<Video>
      resource="videos"
      title="Videos"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.caption}
    />
  )
}
