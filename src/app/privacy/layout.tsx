import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Edwin Castro Community Support. We are committed to protecting your personal information.',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'Privacy Policy | Edwin Castro Community Support',
    description: 'Privacy Policy for Edwin Castro Community Support.',
    url: `${siteUrl}/privacy`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Privacy Policy',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
