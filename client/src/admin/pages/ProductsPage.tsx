import { useState } from 'react'
import { useAdminResource } from '../hooks/useAdminResource'
import { adminApi } from '../lib/adminApi'
import ProductForm from '../components/ProductForm'
import type { AdminProduct, AdminProductSummary, Category } from '../../types/product'
import type { Brand } from '../../types/content'

export default function ProductsPage() {
  const { items: categories, loading: categoriesLoading } = useAdminResource<Category>('categories')
  const { items: brands, loading: brandsLoading } = useAdminResource<Brand>('brands')
  const {
    items: products,
    loading: productsLoading,
    error,
    create,
    update,
    remove,
  } = useAdminResource<AdminProductSummary>('products')

  const [editing, setEditing] = useState<AdminProduct | 'new' | null>(null)
  const [loadingEditId, setLoadingEditId] = useState<number | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function openEdit(id: number) {
    setLoadingEditId(id)
    setLoadError(null)
    try {
      const full = await adminApi.get<AdminProduct>(`/products/${id}`)
      setEditing(full)
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load product')
    } finally {
      setLoadingEditId(null)
    }
  }

  async function handleDelete(item: AdminProductSummary) {
    if (!confirm(`Delete "${item.name}"? This can't be undone.`)) return
    setDeleteError(null)
    try {
      await remove(item.id)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  if (categoriesLoading || brandsLoading) {
    return <p className="text-text-muted">Loading…</p>
  }

  if (categories.length === 0) {
    return (
      <p className="text-text-muted">
        Add at least one category first — products need a category to belong to.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy">Products</h1>
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          Add new
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {loadError && <p className="text-sm text-red-600">{loadError}</p>}
      {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-light text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Brand</th>
              <th className="px-4 py-3 font-semibold">Price (ETB)</th>
              <th className="px-4 py-3 font-semibold">On sale</th>
              <th className="px-4 py-3 font-semibold">In stock</th>
              <th className="px-4 py-3 font-semibold">Featured</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsLoading && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {!productsLoading && products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-text-muted">
                  No products yet.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3 text-navy">{p.name}</td>
                <td className="px-4 py-3 text-navy">{p.categoryLabel}</td>
                <td className="px-4 py-3 text-navy">{p.brandName ?? '—'}</td>
                <td className="px-4 py-3 text-navy">{p.price}</td>
                <td className="px-4 py-3 text-navy">{p.onSale ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-navy">{p.inStock ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-navy">{p.featured ? 'Yes' : 'No'}</td>
                <td className="flex gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => openEdit(p.id)}
                    disabled={loadingEditId === p.id}
                    className="font-semibold text-navy hover:underline disabled:opacity-50"
                  >
                    {loadingEditId === p.id ? 'Loading…' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p)}
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
        <ProductForm
          categories={categories}
          brands={brands}
          initial={editing === 'new' ? null : editing}
          onCancel={() => setEditing(null)}
          onSubmit={async (payload) => {
            if (editing === 'new') await create(payload)
            else await update(editing.id, payload)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}
