// Mirrors server/src/types/product.ts — keep in sync manually (no shared package yet).
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

export type ProductDetail = Product & {
  description: string
  images: string[]
  specs: ProductSpec[]
}

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
