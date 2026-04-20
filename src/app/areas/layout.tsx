import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Support Areas',
  description: 'Explore the areas where Edwin Castro provides direct community support: education funding, housing assistance, disaster recovery, medical support, and more.',
  openGraph: {
    title: 'Support Areas | Edwin Castro Community Support',
    description: 'Explore the areas where Edwin Castro provides direct community support: education funding, housing assistance, disaster recovery, medical support, and more.',
    url: `${siteUrl}/areas`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Community Support Areas',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Areas | Edwin Castro Community Support',
    description: 'Explore education, housing, disaster recovery, and other support areas.',
    images: [ogImageUrl],
  },
};

export default function AreasLayout({ children }: { children: ReactNode }) {
  return children;
}
