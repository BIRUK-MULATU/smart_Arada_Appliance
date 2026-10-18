import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { parseSettings } from '../lib/settings.js'
import type { Product, ProductDetail } from '../types/product.js'

const router = Router()

router.get('/categories', async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
  res.json(categories)
})

router.get('/products', async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { id: 'asc' },
  })

  const shaped: Product[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category.slug,
    categoryLabel: p.category.name,
    brandName: p.brand?.name ?? null,
    spec: p.spec,
    price: p.price,
    oldPrice: p.oldPrice,
    onSale: p.onSale,
    inStock: p.inStock,
    image: p.image,
    featured: p.featured,
  }))

  res.json(shaped)
})

router.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id)
  const p = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { sortOrder: 'asc' } },
      specs: { orderBy: { sortOrder: 'asc' } },
    },
  })

  if (!p) {
    res.status(404).json({ error: 'Product not found' })
    return
  }

  const shaped: ProductDetail = {
    id: p.id,
    name: p.name,
    category: p.category.slug,
    categoryLabel: p.category.name,
    brandName: p.brand?.name ?? null,
    spec: p.spec,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice,
    onSale: p.onSale,
    inStock: p.inStock,
    image: p.image,
    featured: p.featured,
    images: p.images.map((img) => img.url),
    specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
  }

  res.json(shaped)
})

router.get('/reviews', async (_req, res) => {
  const reviews = await prisma.review.findMany({ orderBy: { sortOrder: 'asc' } })
  res.json(reviews)
})

router.get('/faq', async (_req, res) => {
  const faqs = await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } })
  res.json(faqs)
})

router.get('/brands', async (_req, res) => {
  const brands = await prisma.brand.findMany({ orderBy: { sortOrder: 'asc' } })
  res.json(brands)
})

router.get('/videos', async (_req, res) => {
  const videos = await prisma.video.findMany({ orderBy: { sortOrder: 'asc' } })
  res.json(videos)
})

router.get('/deal', async (_req, res) => {
  const deal = await prisma.dealOfWeek.findUnique({ where: { id: 1 } })
  if (!deal) {
    res.status(404).json({ error: 'Deal of the week is not set up yet' })
    return
  }
  res.json({ title: deal.title, description: deal.description, endsAt: deal.endsAt.toISOString() })
})

router.get('/settings', async (_req, res) => {
  const row = await prisma.shopSettings.findUnique({ where: { id: 1 } })
  res.json(row ? parseSettings(row.data) : parseSettings('{}'))
})

export default router
