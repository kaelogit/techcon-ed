import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Security',
  description: 'Security information for Edwin Castro Community Support. We are committed to protecting your data.',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'Security | Edwin Castro Community Support',
    description: 'Security information for Edwin Castro Community Support.',
    url: `${siteUrl}/security`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Security',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
};

export default function SecurityLayout({ children }: { children: ReactNode }) {
  return children;
}
