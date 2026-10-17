// Category slugs are now free-form (admin-defined), not a fixed union.
export type Category = {
  id: number
  slug: string
  name: string
  image: string
  sortOrder: number
}

// Public shape returned by /api/products — category is flattened to its slug/label.
export type Product = {
  id: number
  name: string
  category: string
  categoryLabel: string
  spec: string
  price: number
  oldPrice: number | null
  onSale: boolean
  inStock: boolean
  image: string
  featured: boolean
}

// Admin shape used for editing — keeps the raw categoryId foreign key.
export type AdminProduct = {
  id: number
  name: string
  spec: string
  price: number
  oldPrice: number | null
  onSale: boolean
  inStock: boolean
  image: string
  featured: boolean
  categoryId: number
}
