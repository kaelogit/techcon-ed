import { Metadata } from 'next';
import { ReactNode } from 'react';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: 'Apply for Support',
  description: 'Apply for direct, debt-free funding from Edwin Castro Community Support. Tell your story and get the help you need for education, housing, disaster recovery, or medical needs.',
  openGraph: {
    title: 'Apply for Support | Edwin Castro Community Support',
    description: 'Apply for direct, debt-free funding from Edwin Castro Community Support. Tell your story and get the help you need for education, housing, disaster recovery, or medical needs.',
    url: `${siteUrl}/apply`,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Apply for Edwin Castro Community Support',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply for Support | Edwin Castro Community Support',
    description: 'Apply for direct, debt-free funding. Tell your story and get the help you need.',
    images: [ogImageUrl],
  },
};

export default function ApplyLayout({ children }: { children: ReactNode }) {
  return children;
}
