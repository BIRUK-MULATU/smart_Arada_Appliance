import { useState } from 'react'
import type { FormEvent } from 'react'
import type { FieldConfig, FormValues } from './fieldTypes'

export default function ResourceForm({
  title,
  fields,
  initialValues,
  onCancel,
  onSubmit,
}: {
  title: string
  fields: FieldConfig[]
  initialValues: FormValues
  onCancel: () => void
  onSubmit: (values: FormValues) => Promise<void>
}) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setField(name: string, value: string | number | boolean) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(values)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-navy">{title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          {fields.map((field) => (
            <label key={field.name} className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">{field.label}</span>

              {field.type === 'textarea' && (
                <textarea
                  className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
                  rows={3}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                />
              )}

              {field.type === 'text' && (
                <input
                  type="text"
                  className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
                  required={field.required}
                  placeholder={field.placeholder}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                />
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.name] === '' ? '' : String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                />
              )}

              {field.type === 'select' && (
                <select
                  className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
                  required={field.required}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => setField(field.name, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(values[field.name])}
                    onChange={(e) => setField(field.name, e.target.checked)}
                  />
                  <span className="text-text-muted">{field.placeholder}</span>
                </span>
              )}
            </label>
          ))}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-navy hover:border-navy"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
            >
              {submitting ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
