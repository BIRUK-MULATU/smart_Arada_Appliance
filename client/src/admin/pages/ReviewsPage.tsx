import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { Review } from '../../types/content'

const columns: ColumnConfig<Review>[] = [
  { key: 'name', label: 'Customer' },
  { key: 'location', label: 'Location' },
  { key: 'rating', label: 'Rating' },
  { key: 'sortOrder', label: 'Order' },
]

const fields: FieldConfig[] = [
  { name: 'name', label: 'Customer name', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text', placeholder: 'Bole, Addis Ababa' },
  {
    name: 'rating',
    label: 'Rating',
    type: 'select',
    options: [5, 4, 3, 2, 1].map((n) => ({ label: `${n} stars`, value: n })),
  },
  { name: 'text', label: 'Review text', type: 'textarea', required: true },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
]

export default function ReviewsPage() {
  return (
    <ResourceTable<Review>
      resource="reviews"
      title="Customer reviews"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.name}
    />
  )
}
