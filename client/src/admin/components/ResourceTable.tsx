import { useState } from 'react'
import { useAdminResource } from '../hooks/useAdminResource'
import ResourceForm from './ResourceForm'
import {
  defaultFormValues,
  formValuesToPayload,
  itemToFormValues,
  type ColumnConfig,
  type FieldConfig,
} from './fieldTypes'

type ResourceItem = { id: number }

export default function ResourceTable<T extends ResourceItem>({
  resource,
  title,
  columns,
  fields,
  itemLabel = (item) => `#${item.id}`,
}: {
  resource: string
  title: string
  columns: ColumnConfig<T>[]
  fields: FieldConfig[]
  itemLabel?: (item: T) => string
}) {
  const { items, loading, error, create, update, remove } = useAdminResource<T>(resource)
  const [editing, setEditing] = useState<T | 'new' | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleDelete(item: T) {
    if (!confirm(`Delete "${itemLabel(item)}"? This can't be undone.`)) return
    setDeleteError(null)
    try {
      await remove(item.id)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy">{title}</h1>
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          Add new
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-light text-xs uppercase tracking-wide text-text-muted">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 font-semibold">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-text-muted">
                  Nothing here yet.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-navy">
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </td>
                ))}
                <td className="flex gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="font-semibold text-navy hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <ResourceForm
          title={editing === 'new' ? `Add ${title.toLowerCase()}` : `Edit ${title.toLowerCase()}`}
          fields={fields}
          initialValues={
            editing === 'new'
              ? defaultFormValues(fields)
              : itemToFormValues(editing as unknown as Record<string, unknown>, fields)
          }
          onCancel={() => setEditing(null)}
          onSubmit={async (values) => {
            const payload = formValuesToPayload(values, fields)
            if (editing === 'new') await create(payload as Partial<T>)
            else await update(editing.id, payload as Partial<T>)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}
