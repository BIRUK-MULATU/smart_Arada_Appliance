import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { Brand } from '../../types/content'

const columns: ColumnConfig<Brand>[] = [
  { key: 'name', label: 'Name' },
  { key: 'sortOrder', label: 'Order' },
]

const fields: FieldConfig[] = [
  { name: 'name', label: 'Brand name', type: 'text', required: true },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
]

export default function BrandsPage() {
  return (
    <ResourceTable<Brand>
      resource="brands"
      title="Brands"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.name}
    />
  )
}
