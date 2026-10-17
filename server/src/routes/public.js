import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { parseSettings } from '../lib/settings.js';
const router = Router();
router.get('/categories', async (_req, res) => {
    const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(categories);
});
router.get('/products', async (_req, res) => {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { id: 'asc' },
    });
    const shaped = products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category.slug,
        categoryLabel: p.category.name,
        spec: p.spec,
        price: p.price,
        oldPrice: p.oldPrice,
        onSale: p.onSale,
        inStock: p.inStock,
        image: p.image,
        featured: p.featured,
    }));
    res.json(shaped);
});
router.get('/reviews', async (_req, res) => {
    const reviews = await prisma.review.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(reviews);
});
router.get('/faq', async (_req, res) => {
    const faqs = await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(faqs);
});
router.get('/brands', async (_req, res) => {
    const brands = await prisma.brand.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(brands);
});
router.get('/deal', async (_req, res) => {
    const deal = await prisma.dealOfWeek.findUnique({ where: { id: 1 } });
    if (!deal) {
        res.status(404).json({ error: 'Deal of the week is not set up yet' });
        return;
    }
    res.json({ title: deal.title, description: deal.description, endsAt: deal.endsAt.toISOString() });
});
router.get('/settings', async (_req, res) => {
    const row = await prisma.shopSettings.findUnique({ where: { id: 1 } });
    res.json(row ? parseSettings(row.data) : parseSettings('{}'));
});
export default router;
//# sourceMappingURL=public.js.map