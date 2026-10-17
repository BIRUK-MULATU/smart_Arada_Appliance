import { useFetch } from './useFetch'
import type { Category, Product } from '../types/product'

export function useProducts() {
  return useFetch<Product[]>('/api/products', [])
}

export function useCategories() {
  return useFetch<Category[]>('/api/categories', [])
}
