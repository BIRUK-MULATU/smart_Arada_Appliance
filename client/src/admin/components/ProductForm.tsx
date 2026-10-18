import { useState } from 'react'
import type { FormEvent } from 'react'
import Icon from '../../components/ui/Icon'
import type { AdminProduct, Category, ProductSpec } from '../../types/product'
import type { Brand } from '../../types/content'

type FormState = {
  name: string
  categoryId: number
  brandId: number | ''
  spec: string
  description: string
  price: number
  oldPrice: number | ''
  onSale: boolean
  inStock: boolean
  featured: boolean
  image: string
  images: string[]
  specs: ProductSpec[]
}

function toFormState(p: AdminProduct | null, defaultCategoryId: number): FormState {
  if (!p) {
    return {
      name: '',
      categoryId: defaultCategoryId,
      brandId: '',
      spec: '',
      description: '',
      price: 0,
      oldPrice: '',
      onSale: false,
      inStock: true,
      featured: false,
      image: '/placeholder.svg',
      images: [],
      specs: [],
    }
  }
  return {
    name: p.name,
    categoryId: p.categoryId,
    brandId: p.brandId ?? '',
    spec: p.spec,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice ?? '',
    onSale: p.onSale,
    inStock: p.inStock,
    featured: p.featured,
    image: p.image,
    images: p.images,
    specs: p.specs,
  }
}

const inputClass =
  'rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none'

export default function ProductForm({
  categories,
  brands,
  initial,
  onCancel,
  onSubmit,
}: {
  categories: Category[]
  brands: Brand[]
  initial: AdminProduct | null
  onCancel: () => void
  onSubmit: (payload: Partial<AdminProduct>) => Promise<void>
}) {
  const [form, setForm] = useState<FormState>(() => toFormState(initial, categories[0]?.id ?? 0))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateImage(i: number, value: string) {
    setForm((prev) => ({ ...prev, images: prev.images.map((img, idx) => (idx === i ? value : img)) }))
  }
  function addImage() {
    setForm((prev) => ({ ...prev, images: [...prev.images, ''] }))
  }
  function removeImage(i: number) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))
  }

  function updateSpec(i: number, key: 'label' | 'value', value: string) {
    setForm((prev) => ({
      ...prev,
      specs: prev.specs.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
    }))
  }
  function addSpec() {
    setForm((prev) => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }))
  }
  function removeSpec(i: number) {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({
        name: form.name,
        categoryId: form.categoryId,
        brandId: form.brandId === '' ? null : Number(form.brandId),
        spec: form.spec,
        description: form.description,
        price: Number(form.price),
        oldPrice: form.oldPrice === '' ? null : Number(form.oldPrice),
        onSale: form.onSale,
        inStock: form.inStock,
        featured: form.featured,
        image: form.image,
        images: form.images,
        specs: form.specs,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-navy">{initial ? 'Edit product' : 'Add product'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">Name</span>
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">Category</span>
              <select
                required
                className={inputClass}
                value={form.categoryId}
                onChange={(e) => set('categoryId', Number(e.target.value))}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">Brand (optional)</span>
              <select
                className={inputClass}
                value={form.brandId}
                onChange={(e) => set('brandId', e.target.value === '' ? '' : Number(e.target.value))}
              >
                <option value="">— none —</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">Spec line (shown on cards)</span>
              <input
                className={inputClass}
                placeholder="[CAPACITY] L · Frost-free"
                value={form.spec}
                onChange={(e) => set('spec', e.target.value)}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-navy">Description</span>
            <textarea
              rows={4}
              className={inputClass}
              placeholder="A longer paragraph shown on the product's own page."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">Price (ETB, 0 = show placeholder)</span>
              <input
                type="number"
                className={inputClass}
                value={form.price}
                onChange={(e) => set('price', Number(e.target.value))}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-navy">Old price (only used when on sale)</span>
              <input
                type="number"
                className={inputClass}
                value={form.oldPrice}
                onChange={(e) => set('oldPrice', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.onSale} onChange={(e) => set('onSale', e.target.checked)} />
              On sale
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => set('inStock', e.target.checked)}
              />
              In stock
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
              />
              Featured
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-navy">Main image URL</span>
            <input
              className={inputClass}
              placeholder="/placeholder.svg"
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-navy">Photo gallery</span>
              <button type="button" onClick={addImage} className="text-sm font-semibold text-accent hover:underline">
                + Add photo
              </button>
            </div>
            {form.images.length === 0 && (
              <p className="text-xs text-text-muted">No gallery photos — the main image will be used.</p>
            )}
            {form.images.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={`flex-1 ${inputClass}`}
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => updateImage(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  aria-label="Remove photo"
                  className="flex items-center justify-center rounded-lg border border-border px-3 text-red-600 hover:border-red-300"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-navy">Specifications</span>
              <button type="button" onClick={addSpec} className="text-sm font-semibold text-accent hover:underline">
                + Add spec
              </button>
            </div>
            {form.specs.length === 0 && <p className="text-xs text-text-muted">No spec rows yet.</p>}
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={`w-1/3 ${inputClass}`}
                  placeholder="Capacity"
                  value={spec.label}
                  onChange={(e) => updateSpec(i, 'label', e.target.value)}
                />
                <input
                  className={`flex-1 ${inputClass}`}
                  placeholder="350 L"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, 'value', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  aria-label="Remove spec"
                  className="flex items-center justify-center rounded-lg border border-border px-3 text-red-600 hover:border-red-300"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

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
