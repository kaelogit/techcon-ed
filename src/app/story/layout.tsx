import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Edwin Castro\'s personal journey and commitment to rebuilding lives across America. Discover the vision behind direct, debt-free community support.',
  openGraph: {
    title: 'Our Story | Edwin Castro Community Support',
    description: 'Learn about Edwin Castro\'s personal journey and commitment to rebuilding lives across America. Discover the vision behind direct, debt-free community support.',
    url: `${siteUrl}/story`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Story',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | Edwin Castro Community Support',
    description: 'Learn about Edwin Castro\'s journey and commitment to community support.',
    images: [ogImageUrl],
  },
};

export default function StoryLayout({ children }: { children: ReactNode }) {
  return children;
}
