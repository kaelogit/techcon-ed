import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Impact & Results',
  description: 'See real outcomes from Edwin Castro direct funding — recovery, growth, and ambition across housing, education, health, business, and community.',
  openGraph: {
    title: 'Impact & Results | Edwin Castro',
    description: 'Real outcomes from direct funding across recovery, growth, and ambition.',
    url: `${siteUrl}/impact`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Impact',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact & Results | Edwin Castro',
    description: 'Real outcomes from direct funding across recovery, growth, and ambition.',
    images: [ogImageUrl],
  },
};

export default function ImpactLayout({ children }: { children: ReactNode }) {
  return children;
}
