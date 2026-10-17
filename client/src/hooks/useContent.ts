import { useFetch } from './useFetch'
import type { Brand, DealOfWeekData, FaqItem, Review } from '../types/content'

export function useReviews() {
  return useFetch<Review[]>('/api/reviews', [])
}

export function useFaqItems() {
  return useFetch<FaqItem[]>('/api/faq', [])
}

export function useBrands() {
  return useFetch<Brand[]>('/api/brands', [])
}

export function useDeal() {
  return useFetch<DealOfWeekData | null>('/api/deal', null)
}
