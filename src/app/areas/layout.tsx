import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Funding Areas',
  description: 'Explore Edwin Castro funding for crisis recovery, growth, and ambition — housing, education, health, business expansion, and community legacy projects.',
  openGraph: {
    title: 'Funding Areas | Edwin Castro',
    description: 'Capital for recovery, growth, and ambition across housing, education, health, business, and community.',
    url: `${siteUrl}/areas`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Funding Areas',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Funding Areas | Edwin Castro',
    description: 'Capital for recovery, growth, and ambition across key life and business goals.',
    images: [ogImageUrl],
  },
};

export default function AreasLayout({ children }: { children: ReactNode }) {
  return children;
}
