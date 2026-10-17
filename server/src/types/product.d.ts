export type Category = {
    id: number;
    slug: string;
    name: string;
    image: string;
    sortOrder: number;
};
export type Product = {
    id: number;
    name: string;
    category: string;
    categoryLabel: string;
    spec: string;
    price: number;
    oldPrice: number | null;
    onSale: boolean;
    inStock: boolean;
    image: string;
    featured: boolean;
};
export type AdminProduct = {
    id: number;
    name: string;
    spec: string;
    price: number;
    oldPrice: number | null;
    onSale: boolean;
    inStock: boolean;
    image: string;
    featured: boolean;
    categoryId: number;
};
//# sourceMappingURL=product.d.ts.map