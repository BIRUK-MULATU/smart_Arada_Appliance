import { PrismaClient } from '@prisma/client'
import { defaultSettings } from '../src/lib/settings.js'

const prisma = new PrismaClient()

async function main() {
  const categories = await Promise.all(
    [
      { slug: 'refrigerators', name: 'Refrigerators', sortOrder: 0 },
      { slug: 'washing-machines', name: 'Washing machines', sortOrder: 1 },
      { slug: 'tvs', name: 'TVs', sortOrder: 2 },
      { slug: 'cookers-ovens', name: 'Cookers & ovens', sortOrder: 3 },
      { slug: 'air-cooling', name: 'Air & cooling', sortOrder: 4 },
      { slug: 'small-appliances', name: 'Small appliances', sortOrder: 5 },
    ].map((c) =>
      prisma.category.upsert({
        where: { slug: c.slug },
        update: c,
        create: { ...c, image: '/placeholder.svg' },
      }),
    ),
  )

  const byCategory = (slug: string) => categories.find((c) => c.slug === slug)!.id

  const products = [
    {
      name: 'Double-door refrigerator',
      category: 'refrigerators',
      spec: '[CAPACITY] L · Frost-free · Inverter',
      onSale: true,
      oldPrice: 0,
      featured: true,
    },
    {
      name: 'Front-load washing machine',
      category: 'washing-machines',
      spec: '[X] kg · 1400 rpm · 15 programs',
      onSale: false,
      oldPrice: null,
      featured: true,
    },
    {
      name: '55" 4K Smart TV',
      category: 'tvs',
      spec: 'Ultra HD · Android TV · Wi-Fi',
      onSale: true,
      oldPrice: 0,
      featured: true,
    },
    {
      name: '4-burner gas cooker with oven',
      category: 'cookers-ovens',
      spec: 'Auto-ignition · [X] L oven',
      onSale: false,
      oldPrice: null,
      featured: true,
    },
    {
      name: 'Single-door refrigerator',
      category: 'refrigerators',
      spec: '[CAPACITY] L · Energy saving',
      onSale: false,
      oldPrice: null,
      featured: true,
    },
    {
      name: 'Twin-tub washing machine',
      category: 'washing-machines',
      spec: '[X] kg · Low water use',
      onSale: true,
      oldPrice: 0,
      featured: true,
    },
    {
      name: '43" Full HD Smart TV',
      category: 'tvs',
      spec: 'Full HD · Netflix & YouTube',
      onSale: false,
      oldPrice: null,
      featured: true,
    },
    {
      name: 'Microwave oven',
      category: 'cookers-ovens',
      spec: '[X] L · Grill function',
      onSale: false,
      oldPrice: null,
      featured: true,
    },
  ]

  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } })
    if (existing) continue
    await prisma.product.create({
      data: {
        name: p.name,
        spec: p.spec,
        price: 0,
        oldPrice: p.oldPrice,
        onSale: p.onSale,
        inStock: true,
        image: '/placeholder.svg',
        featured: p.featured,
        categoryId: byCategory(p.category),
      },
    })
  }

  const reviews = [
    { name: '[CUSTOMER NAME]', location: 'Bole, Addis Ababa', sortOrder: 0 },
    { name: '[CUSTOMER NAME]', location: 'CMC, Addis Ababa', sortOrder: 1 },
    { name: '[CUSTOMER NAME]', location: 'Piassa, Addis Ababa', sortOrder: 2 },
  ]
  for (const r of reviews) {
    const existing = await prisma.review.findFirst({ where: { location: r.location } })
    if (existing) continue
    await prisma.review.create({
      data: {
        ...r,
        rating: 5,
        text: '[A real customer review goes here — paste it from Telegram or Facebook.]',
      },
    })
  }

  const faqs = [
    {
      question: 'Can I pay on delivery?',
      answer: 'Yes. You check the appliance when it arrives and pay by cash, Telebirr or bank transfer.',
      sortOrder: 0,
    },
    {
      question: 'Where do you deliver?',
      answer: 'We deliver across Addis Ababa and surrounding areas. Message us your location to confirm delivery.',
      sortOrder: 1,
    },
    {
      question: 'Are your products genuine?',
      answer: 'Yes — every product is 100% genuine with an official [X]-year warranty.',
      sortOrder: 2,
    },
    {
      question: 'Do you install the appliance?',
      answer: 'Yes, free installation is included by our trained technicians for eligible appliances.',
      sortOrder: 3,
    },
    {
      question: 'What if something breaks?',
      answer: "Warranty repairs and maintenance are handled by our own technicians — just reach out and we'll sort it.",
      sortOrder: 4,
    },
  ]
  for (const f of faqs) {
    const existing = await prisma.faqItem.findFirst({ where: { question: f.question } })
    if (existing) continue
    await prisma.faqItem.create({ data: f })
  }

  const brands = ['[BRAND 1]', '[BRAND 2]', '[BRAND 3]', '[BRAND 4]', '[BRAND 5]', '[BRAND 6]']
  for (const [i, name] of brands.entries()) {
    const existing = await prisma.brand.findFirst({ where: { name } })
    if (existing) continue
    await prisma.brand.create({ data: { name, sortOrder: i } })
  }

  const videos = [
    { platform: 'tiktok', caption: 'Unboxing our best-selling fridge', url: 'https://tiktok.com/@your_shop' },
    { platform: 'instagram', caption: 'Washing machine: how it works', url: 'https://instagram.com/your_shop' },
    { platform: 'facebook', caption: 'Customer delivery & installation', url: 'https://facebook.com/your_shop' },
    { platform: 'youtube', caption: 'Smart TV setup in 2 minutes', url: 'https://youtube.com/@your_shop' },
  ]
  for (const [i, v] of videos.entries()) {
    const existing = await prisma.video.findFirst({ where: { caption: v.caption } })
    if (existing) continue
    await prisma.video.create({ data: { ...v, thumbnail: '/placeholder.svg', sortOrder: i } })
  }

  await prisma.dealOfWeek.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Save up to [X]% on washing machines',
      description: 'Limited stock. Offer ends [END DATE]. Free delivery and installation included.',
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.shopSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, data: JSON.stringify(defaultSettings) },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
