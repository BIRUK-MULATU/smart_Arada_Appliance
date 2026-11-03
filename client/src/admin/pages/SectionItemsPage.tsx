import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { SectionItem } from '../../types/content'

const sectionLabels: Record<string, string> = {
  about: 'About us',
  why: 'Why choose us',
  fleet: 'We deliver it ourselves',
  howTo: 'How to order',
  gift: 'Gift from abroad',
}

const columns: ColumnConfig<SectionItem>[] = [
  { key: 'section', label: 'Section', render: (item) => sectionLabels[item.section] ?? item.section },
  { key: 'title', label: 'Title' },
  { key: 'sortOrder', label: 'Order' },
]

const fields: FieldConfig[] = [
  {
    name: 'section',
    label: 'Section',
    type: 'select',
    required: true,
    options: [
      { label: 'About us', value: 'about' },
      { label: 'Why choose us', value: 'why' },
      { label: 'We deliver it ourselves', value: 'fleet' },
      { label: 'How to order', value: 'howTo' },
      { label: 'Gift from abroad', value: 'gift' },
    ],
  },
  {
    name: 'icon',
    label: 'Icon (not used by "We deliver it ourselves" — use Image URL instead)',
    type: 'select',
    options: [
      { label: 'None', value: '' },
      { label: 'Message', value: 'messageCircle' },
      { label: 'Truck', value: 'truck' },
      { label: 'Wrench', value: 'wrench' },
      { label: 'Globe', value: 'globe' },
      { label: 'Send', value: 'send' },
      { label: 'Gift', value: 'gift' },
      { label: 'Star', value: 'star' },
      { label: 'Shield check', value: 'shieldCheck' },
      { label: 'Phone', value: 'phone' },
      { label: 'Calendar', value: 'calendar' },
      { label: 'Map pin', value: 'mapPin' },
      { label: 'Clock', value: 'clock' },
    ],
  },
  {
    name: 'image',
    label: 'Image URL (used by "We deliver it ourselves" instead of an icon)',
    type: 'text',
    placeholder: '/fleet/delivery-van.jpg',
  },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
]

export default function SectionItemsPage() {
  return (
    <ResourceTable<SectionItem>
      resource="section-items"
      title="Page sections"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.title}
    />
  )
}
