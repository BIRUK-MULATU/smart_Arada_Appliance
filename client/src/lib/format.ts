// Price of 0 means "not set yet" — show the same placeholder style as the design.
export function formatPrice(price: number) {
  if (price <= 0) return '[PRICE] ETB'
  return `${price.toLocaleString('en-US')} ETB`
}

export function formatOldPrice(oldPrice: number | null) {
  if (oldPrice === null) return null
  if (oldPrice <= 0) return '[OLD PRICE]'
  return `${oldPrice.toLocaleString('en-US')} ETB`
}
