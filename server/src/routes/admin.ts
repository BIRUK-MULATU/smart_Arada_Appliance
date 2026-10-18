import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { defaultSettings, parseSettings } from '../lib/settings.js'
import { omitUndefined } from '../lib/omitUndefined.js'
import type { AdminProduct, AdminProductSummary } from '../types/product.js'
import type {
  Brand,
  DealOfWeekData,
  FaqItem,
  Review,
  ShopSettingsData,
  Video,
} from '../types/content.js'

const router = Router()

// ---------- Categories ----------

router.get('/categories', async (_req, res) => {
  res.json(await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }))
})

router.post('/categories', async (req, res) => {
  const { slug, name, image, sortOrder } = req.body as {
    slug?: string
    name?: string
    image?: string
    sortOrder?: number
  }
  if (!slug || !name) {
    res.status(400).json({ error: 'slug and name are required' })
    return
  }
  const category = await prisma.category.create({
    data: { slug, name, image: image || '/placeholder.svg', sortOrder: sortOrder ?? 0 },
  })
  res.status(201).json(category)
})

router.put('/categories/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { slug, name, image, sortOrder } = req.body as {
    slug?: string
    name?: string
    image?: string
    sortOrder?: number
  }
  const category = await prisma.category.update({
    where: { id },
    data: omitUndefined({ slug, name, image, sortOrder }),
  })
  res.json(category)
})

router.delete('/categories/:id', async (req, res) => {
  const id = Number(req.params.id)
  const productCount = await prisma.product.count({ where: { categoryId: id } })
  if (productCount > 0) {
    res.status(409).json({ error: `Cannot delete — ${productCount} product(s) still use this category` })
    return
  }
  await prisma.category.delete({ where: { id } })
  res.status(204).end()
})

// ---------- Products ----------

router.get('/products', async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { id: 'asc' },
  })
  const shaped: AdminProductSummary[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    onSale: p.onSale,
    inStock: p.inStock,
    featured: p.featured,
    categoryId: p.categoryId,
    categoryLabel: p.category.name,
    brandName: p.brand?.name ?? null,
  }))
  res.json(shaped)
})

router.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id)
  const p = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      specs: { orderBy: { sortOrder: 'asc' } },
    },
  })
  if (!p) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  const shaped: AdminProduct = {
    id: p.id,
    name: p.name,
    spec: p.spec,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice,
    onSale: p.onSale,
    inStock: p.inStock,
    image: p.image,
    featured: p.featured,
    categoryId: p.categoryId,
    brandId: p.brandId,
    images: p.images.map((img) => img.url),
    specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
  }
  res.json(shaped)
})

router.post('/products', async (req, res) => {
  const body = req.body as Partial<AdminProduct>
  if (!body.name || !body.categoryId) {
    res.status(400).json({ error: 'name and categoryId are required' })
    return
  }
  const product = await prisma.product.create({
    data: {
      name: body.name,
      spec: body.spec || '',
      description: body.description || '',
      price: body.price ?? 0,
      oldPrice: body.oldPrice ?? null,
      onSale: body.onSale ?? false,
      inStock: body.inStock ?? true,
      image: body.image || '/placeholder.svg',
      featured: body.featured ?? false,
      categoryId: Number(body.categoryId),
      brandId: body.brandId ? Number(body.brandId) : null,
      images: {
        create: (body.images ?? [])
          .filter((url) => url.trim())
          .map((url, i) => ({ url, sortOrder: i })),
      },
      specs: {
        create: (body.specs ?? [])
          .filter((s) => s.label.trim())
          .map((s, i) => ({ label: s.label, value: s.value, sortOrder: i })),
      },
    },
  })
  res.status(201).json(product)
})

router.put('/products/:id', async (req, res) => {
  const id = Number(req.params.id)
  const body = req.body as Partial<AdminProduct>

  const data: Record<string, unknown> = omitUndefined({
    name: body.name,
    spec: body.spec,
    description: body.description,
    price: body.price,
    oldPrice: body.oldPrice,
    onSale: body.onSale,
    inStock: body.inStock,
    image: body.image,
    featured: body.featured,
    categoryId: body.categoryId !== undefined ? Number(body.categoryId) : undefined,
    brandId: body.brandId !== undefined ? (body.brandId ? Number(body.brandId) : null) : undefined,
  })

  if (body.images !== undefined) {
    data.images = {
      deleteMany: {},
      create: body.images
        .filter((url) => url.trim())
        .map((url, i) => ({ url, sortOrder: i })),
    }
  }
  if (body.specs !== undefined) {
    data.specs = {
      deleteMany: {},
      create: body.specs
        .filter((s) => s.label.trim())
        .map((s, i) => ({ label: s.label, value: s.value, sortOrder: i })),
    }
  }

  const product = await prisma.product.update({ where: { id }, data })
  res.json(product)
})

router.delete('/products/:id', async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } })
  res.status(204).end()
})

// ---------- Reviews ----------

router.get('/reviews', async (_req, res) => {
  res.json(await prisma.review.findMany({ orderBy: { sortOrder: 'asc' } }))
})

router.post('/reviews', async (req, res) => {
  const body = req.body as Partial<Review>
  if (!body.name || !body.text) {
    res.status(400).json({ error: 'name and text are required' })
    return
  }
  const review = await prisma.review.create({
    data: {
      name: body.name,
      location: body.location || '',
      rating: body.rating ?? 5,
      text: body.text,
      sortOrder: body.sortOrder ?? 0,
    },
  })
  res.status(201).json(review)
})

router.put('/reviews/:id', async (req, res) => {
  const body = req.body as Partial<Review>
  const review = await prisma.review.update({
    where: { id: Number(req.params.id) },
    data: body,
  })
  res.json(review)
})

router.delete('/reviews/:id', async (req, res) => {
  await prisma.review.delete({ where: { id: Number(req.params.id) } })
  res.status(204).end()
})

// ---------- FAQ ----------

router.get('/faq', async (_req, res) => {
  res.json(await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } }))
})

router.post('/faq', async (req, res) => {
  const body = req.body as Partial<FaqItem>
  if (!body.question || !body.answer) {
    res.status(400).json({ error: 'question and answer are required' })
    return
  }
  const faq = await prisma.faqItem.create({
    data: { question: body.question, answer: body.answer, sortOrder: body.sortOrder ?? 0 },
  })
  res.status(201).json(faq)
})

router.put('/faq/:id', async (req, res) => {
  const body = req.body as Partial<FaqItem>
  const faq = await prisma.faqItem.update({ where: { id: Number(req.params.id) }, data: body })
  res.json(faq)
})

router.delete('/faq/:id', async (req, res) => {
  await prisma.faqItem.delete({ where: { id: Number(req.params.id) } })
  res.status(204).end()
})

// ---------- Brands ----------

router.get('/brands', async (_req, res) => {
  res.json(await prisma.brand.findMany({ orderBy: { sortOrder: 'asc' } }))
})

router.post('/brands', async (req, res) => {
  const body = req.body as Partial<Brand>
  if (!body.name) {
    res.status(400).json({ error: 'name is required' })
    return
  }
  const brand = await prisma.brand.create({
    data: { name: body.name, logo: body.logo || '/placeholder.svg', sortOrder: body.sortOrder ?? 0 },
  })
  res.status(201).json(brand)
})

router.put('/brands/:id', async (req, res) => {
  const body = req.body as Partial<Brand>
  const brand = await prisma.brand.update({ where: { id: Number(req.params.id) }, data: body })
  res.json(brand)
})

router.delete('/brands/:id', async (req, res) => {
  await prisma.brand.delete({ where: { id: Number(req.params.id) } })
  res.status(204).end()
})

// ---------- Videos ----------

router.get('/videos', async (_req, res) => {
  res.json(await prisma.video.findMany({ orderBy: { sortOrder: 'asc' } }))
})

router.post('/videos', async (req, res) => {
  const body = req.body as Partial<Video>
  if (!body.platform || !body.caption || !body.url) {
    res.status(400).json({ error: 'platform, caption and url are required' })
    return
  }
  const video = await prisma.video.create({
    data: {
      platform: body.platform,
      caption: body.caption,
      url: body.url,
      thumbnail: body.thumbnail || '/placeholder.svg',
      sortOrder: body.sortOrder ?? 0,
    },
  })
  res.status(201).json(video)
})

router.put('/videos/:id', async (req, res) => {
  const body = req.body as Partial<Video>
  const video = await prisma.video.update({ where: { id: Number(req.params.id) }, data: body })
  res.json(video)
})

router.delete('/videos/:id', async (req, res) => {
  await prisma.video.delete({ where: { id: Number(req.params.id) } })
  res.status(204).end()
})

// ---------- Deal of the week (singleton) ----------

router.get('/deal', async (_req, res) => {
  const deal = await prisma.dealOfWeek.findUnique({ where: { id: 1 } })
  res.json(
    deal
      ? {
          title: deal.title,
          description: deal.description,
          endsAt: deal.endsAt.toISOString(),
          image: deal.image,
        }
      : { title: '', description: '', endsAt: new Date().toISOString(), image: '' },
  )
})

router.put('/deal', async (req, res) => {
  const body = req.body as Partial<DealOfWeekData>
  if (!body.title || !body.endsAt) {
    res.status(400).json({ error: 'title and endsAt are required' })
    return
  }
  const deal = await prisma.dealOfWeek.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      title: body.title,
      description: body.description || '',
      endsAt: new Date(body.endsAt),
      image: body.image || '',
    },
    update: {
      title: body.title,
      description: body.description ?? '',
      endsAt: new Date(body.endsAt),
      image: body.image ?? '',
    },
  })
  res.json({
    title: deal.title,
    description: deal.description,
    endsAt: deal.endsAt.toISOString(),
    image: deal.image,
  })
})

// ---------- Shop settings (singleton) ----------

router.get('/settings', async (_req, res) => {
  const row = await prisma.shopSettings.findUnique({ where: { id: 1 } })
  res.json(row ? parseSettings(row.data) : defaultSettings)
})

router.put('/settings', async (req, res) => {
  const incoming = req.body as ShopSettingsData
  const merged = { ...defaultSettings, ...incoming }
  const row = await prisma.shopSettings.upsert({
    where: { id: 1 },
    create: { id: 1, data: JSON.stringify(merged) },
    update: { data: JSON.stringify(merged) },
  })
  res.json(parseSettings(row.data))
})

export default router
