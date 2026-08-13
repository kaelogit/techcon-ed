import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { Metadata, Viewport } from 'next';
import { SiteChrome } from '@/components/layout/SiteChrome';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-ZR6ZXRW988';

const siteTitle = 'Edwin Castro — Private Funding for Every Stage';
const siteDescription = 'Direct, debt-free funding from Edwin Castro for recovery, growth, and ambition. Capital for education, housing, health, business, and community goals — open to people rebuilding after a setback and people ready to scale. USA, Canada, UK, Germany, Australia, and beyond.';

const siteUrl = 'https://edwinmega.com';
const ogImageUrl = `${siteUrl}/hero-image.jpg`;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Edwin Castro',
  },
  description: siteDescription,
  keywords: [
    'Edwin Castro',
    'direct funding',
    'private funding',
    'debt-free capital',
    'education funding',
    'housing',
    'business expansion',
    'medical funding',
    'community projects',
    'disaster recovery',
    'growth capital',
    'USA',
    'Canada',
    'United Kingdom',
    'Germany',
    'Australia',
  ],
  authors: [{ name: 'Edwin Castro' }],
  creator: 'Edwin Castro',
  publisher: 'Edwin Castro',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Edwin Castro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Edwin Castro — Private Funding for Recovery, Growth, and Ambition',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
    creator: '@edwinmega',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Edwin Castro',
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}/ecf-foundation-logo.png`,
    sameAs: ['https://twitter.com/edwinmega'],
    image: ogImageUrl,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { 
                  send_page_view: true,
                  page_title: document.title,
                  page_location: window.location.href
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}