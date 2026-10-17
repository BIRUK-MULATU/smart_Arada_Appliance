import { useAdminResource } from '../hooks/useAdminResource'
import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { AdminProduct, Category } from '../../types/product'

const columns: ColumnConfig<AdminProduct>[] = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price (ETB)' },
  { key: 'onSale', label: 'On sale', render: (item) => (item.onSale ? 'Yes' : 'No') },
  { key: 'inStock', label: 'In stock', render: (item) => (item.inStock ? 'Yes' : 'No') },
  { key: 'featured', label: 'Featured', render: (item) => (item.featured ? 'Yes' : 'No') },
]

export default function ProductsPage() {
  const { items: categories, loading } = useAdminResource<Category>('categories')

  if (loading) {
    return <p className="text-text-muted">Loading…</p>
  }

  if (categories.length === 0) {
    return (
      <p className="text-text-muted">
        Add at least one category first — products need a category to belong to.
      </p>
    )
  }

  const fields: FieldConfig[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'categoryId',
      label: 'Category',
      type: 'select',
      required: true,
      options: categories.map((c) => ({ label: c.name, value: c.id })),
    },
    { name: 'spec', label: 'Spec line', type: 'text', placeholder: '[CAPACITY] L · Frost-free' },
    { name: 'price', label: 'Price (ETB, 0 = show placeholder)', type: 'number' },
    { name: 'oldPrice', label: 'Old price (only used when on sale)', type: 'number', nullable: true },
    { name: 'onSale', label: 'On sale', type: 'checkbox', placeholder: 'Show Sale tag and old price' },
    { name: 'inStock', label: 'In stock', type: 'checkbox', placeholder: 'Show "In stock" badge' },
    { name: 'featured', label: 'Featured', type: 'checkbox', placeholder: 'Show in homepage catalog' },
    { name: 'image', label: 'Image URL', type: 'text', placeholder: '/placeholder.svg' },
  ]

  return (
    <ResourceTable<AdminProduct>
      resource="products"
      title="Products"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.name}
    />
  )
}
