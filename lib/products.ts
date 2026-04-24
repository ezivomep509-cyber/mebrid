export type Spec = { key: string; value: string };

export type Product = {
  id: string;
  source_id: number;
  brand: string;
  brand_slug: string;
  category: string;
  name: string;
  url: string;
  price: number;
  old_price: number | null;
  currency: string;
  stock: { in_stock: boolean; label: string };
  photos: string[];
  main_photo: string | null;
  description: string;
  specs: Spec[];
};

export type DataFile = {
  products: Product[];
  meta: {
    total: number;
    categories: string[];
    brands: string[];
    currencies: string[];
  };
};

import dataJson from '@/data/products.json';
export const data = dataJson as DataFile;

export function getAllProducts(): Product[] {
  return data.products;
}

export function getProductById(id: string): Product | undefined {
  return data.products.find((p) => p.id === id);
}

export function formatPrice(amount: number, currency: string = 'RUB'): string {
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(amount);
  if (currency === 'USD') return `$${formatted}`;
  if (currency === 'EUR') return `€${formatted}`;
  if (currency === 'PLN') return `${formatted} zł`;
  return `${formatted} ₽`;
}

export function discountPercent(price: number, oldPrice: number | null): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round((1 - price / oldPrice) * 100);
}
