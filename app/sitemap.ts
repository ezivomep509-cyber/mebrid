import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    '',
    '/catalog',
    '/about',
    '/contacts',
    '/delivery',
    '/returns',
    '/privacy',
    '/terms',
    '/offer',
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const productPages = getAllProducts().map((p) => ({
    url: `${site.url}/product/${p.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}
