import type { MetadataRoute } from 'next';
import { pageUrl, SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/banking', '/trackdelivery', '/upload-gift-cards'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/banking', '/trackdelivery', '/upload-gift-cards'],
      },
    ],
    sitemap: pageUrl('/sitemap.xml'),
    host: new URL(SITE_URL).hostname,
  };
}
