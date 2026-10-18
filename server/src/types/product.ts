// Category slugs are now free-form (admin-defined), not a fixed union.
export type Category = {
  id: number
  slug: string
  name: string
  image: string
  sortOrder: number
}

export type ProductSpec = {
  label: string
  value: string
}

// Public shape returned by /api/products (list/grid) — category and brand
// are flattened to their display names, no images/specs/description.
export type Product = {
  id: number
  name: string
  category: string
  categoryLabel: string
  brandName: string | null
  spec: string
  price: number
  oldPrice: number | null
  onSale: boolean
  inStock: boolean
  image: string
  featured: boolean
}

// Public shape returned by /api/products/:id — the full detail page.
export type ProductDetail = Product & {
  description: string
  images: string[]
  specs: ProductSpec[]
}

// Admin shape used for editing — keeps the raw categoryId/brandId foreign keys.
export type AdminProduct = {
  id: number
  name: string
  spec: string
  description: string
  price: number
  oldPrice: number | null
  onSale: boolean
  inStock: boolean
  image: string
  featured: boolean
  categoryId: number
  brandId: number | null
  images: string[]
  specs: ProductSpec[]
}

// What the admin list table needs — no images/specs, keeps the list fast.
export type AdminProductSummary = {
  id: number
  name: string
  price: number
  onSale: boolean
  inStock: boolean
  featured: boolean
  categoryId: number
  categoryLabel: string
  brandName: string | null
}
