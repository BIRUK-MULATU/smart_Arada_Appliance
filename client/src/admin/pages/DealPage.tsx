import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { adminApi } from '../lib/adminApi'
import type { DealOfWeekData } from '../../types/content'

function toLocalInputValue(iso: string) {
  const d = new Date(iso)
  const offsetMs = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - offsetMs).toISOString().slice(0, 16)
}

function fromLocalInputValue(local: string) {
  return new Date(local).toISOString()
}

export default function DealPage() {
  const [form, setForm] = useState<{ title: string; description: string; endsAt: string } | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    adminApi
      .get<DealOfWeekData>('/deal')
      .then((deal) =>
        setForm({
          title: deal.title,
          description: deal.description,
          endsAt: toLocalInputValue(deal.endsAt),
        }),
      )
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setMessage(null)
    setError(null)
    try {
      await adminApi.put('/deal', {
        title: form.title,
        description: form.description,
        endsAt: fromLocalInputValue(form.endsAt),
      })
      setMessage('Saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) return <p className="text-text-muted">Loading…</p>

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-navy">Deal of the week</h1>

      <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-navy">Title</span>
          <input
            type="text"
            required
            className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-navy">Description</span>
          <textarea
            rows={3}
            className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-navy">Ends at</span>
          <input
            type="datetime-local"
            required
            className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
            value={form.endsAt}
            onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-emerald-700">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  )
}
