import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Edwin Castro\'s personal journey and commitment to funding recovery, growth, and ambition with direct, debt-free capital.',
  openGraph: {
    title: 'Our Story | Edwin Castro',
    description: 'Learn about Edwin Castro\'s personal journey and commitment to funding people at every stage — crisis, growth, and ambition.',
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
    title: 'Our Story | Edwin Castro',
    description: 'Learn about Edwin Castro\'s journey and commitment to funding recovery, growth, and ambition.',
    images: [ogImageUrl],
  },
};

export default function StoryLayout({ children }: { children: ReactNode }) {
  return children;
}
