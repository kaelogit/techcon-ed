import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Impact & Results',
  description: 'Discover the real impact of Edwin Castro\'s direct community support across America. See the stories of families and lives transformed through debt-free funding.',
  openGraph: {
    title: 'Impact & Results | Edwin Castro Community Support',
    description: 'Discover the real impact of Edwin Castro\'s direct community support across America. See the stories of families and lives transformed through debt-free funding.',
    url: `${siteUrl}/impact`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Community Impact',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact & Results | Edwin Castro Community Support',
    description: 'See the real impact and stories of transformed lives across America.',
    images: [ogImageUrl],
  },
};

export default function ImpactLayout({ children }: { children: ReactNode }) {
  return children;
}
