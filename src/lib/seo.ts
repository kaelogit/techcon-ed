import type { Metadata } from 'next';

export const SITE_URL = 'https://edwinmega.com';
export const SITE_NAME = 'Edwin Castro';
export const CONTACT_EMAIL = 'support@edwinmega.com';
export const OG_IMAGE = `${SITE_URL}/hero-image.jpg`;

export const HOME_TITLE = 'Edwin Castro — Official Funding. No Debt.';
export const HOME_DESCRIPTION =
  'Official site of Edwin Castro. Direct funding for housing, school, health, business, and recovery. No repayment. No fees. Share your goal at edwinmega.com.';

export const PUBLIC_ROUTES = [
  '/',
  '/apply',
  '/story',
  '/areas',
  '/impact',
  '/verify',
] as const;

export function pageUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = pageUrl(options.path);
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${options.title} | ${SITE_NAME}`,
      description: options.description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          secureUrl: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: options.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${options.title} | ${SITE_NAME}`,
      description: options.description,
      images: [OG_IMAGE],
      creator: '@edwinmega',
    },
    robots: options.noIndex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#edwin-castro`,
    name: 'Edwin Castro',
    url: SITE_URL,
    image: OG_IMAGE,
    email: CONTACT_EMAIL,
    description: HOME_DESCRIPTION,
    sameAs: ['https://twitter.com/edwinmega'],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#edwin-castro` },
    inLanguage: 'en-US',
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
