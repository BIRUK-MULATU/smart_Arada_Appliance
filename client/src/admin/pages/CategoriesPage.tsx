import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { Category } from '../../types/product'

const columns: ColumnConfig<Category>[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'sortOrder', label: 'Order' },
]

const fields: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Refrigerators' },
  {
    name: 'slug',
    label: 'Slug (used in the URL/filter tabs)',
    type: 'text',
    required: true,
    placeholder: 'refrigerators',
  },
  { name: 'image', label: 'Image URL', type: 'text', placeholder: '/placeholder.svg' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
]

export default function CategoriesPage() {
  return (
    <ResourceTable<Category>
      resource="categories"
      title="Categories"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.name}
    />
  )
}
