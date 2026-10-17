import ResourceTable from '../components/ResourceTable'
import type { ColumnConfig, FieldConfig } from '../components/fieldTypes'
import type { FaqItem } from '../../types/content'

const columns: ColumnConfig<FaqItem>[] = [
  { key: 'question', label: 'Question' },
  { key: 'sortOrder', label: 'Order' },
]

const fields: FieldConfig[] = [
  { name: 'question', label: 'Question', type: 'text', required: true },
  { name: 'answer', label: 'Answer', type: 'textarea', required: true },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
]

export default function FaqPage() {
  return (
    <ResourceTable<FaqItem>
      resource="faq"
      title="FAQ"
      columns={columns}
      fields={fields}
      itemLabel={(item) => item.question}
    />
  )
}
