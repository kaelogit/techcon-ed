import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Share Your Goal',
  description: 'Share a clear goal for direct, debt-free funding from Edwin Castro — crisis recovery, growth, or ambition across housing, education, health, business, and community.',
  openGraph: {
    title: 'Share Your Goal | Edwin Castro',
    description: 'Direct funding for recovery, growth, and ambition — open at every income stage.',
    url: `${siteUrl}/apply`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Share Your Goal — Edwin Castro Funding',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share Your Goal | Edwin Castro',
    description: 'Direct funding for recovery, growth, and ambition — open at every income stage.',
    images: [ogImageUrl],
  },
};

export default function ApplyLayout({ children }: { children: ReactNode }) {
  return children;
}
