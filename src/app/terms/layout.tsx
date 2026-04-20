import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Edwin Castro Community Support.',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'Terms of Service | Edwin Castro Community Support',
    description: 'Terms of Service for Edwin Castro Community Support.',
    url: `${siteUrl}/terms`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Terms of Service',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
