import type { MetadataRoute } from 'next';
import { pageUrl, PUBLIC_ROUTES } from '@/lib/seo';

const PRIORITY: Record<string, number> = {
  '/': 1,
  '/apply': 0.95,
  '/story': 0.9,
  '/areas': 0.85,
  '/impact': 0.85,
  '/verify': 0.9,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map((path) => ({
    url: pageUrl(path),
    lastModified,
    changeFrequency: path === '/' || path === '/apply' || path === '/verify' ? 'weekly' : 'monthly',
    priority: PRIORITY[path] ?? 0.7,
  }));
}
