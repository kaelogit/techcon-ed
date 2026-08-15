import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { Metadata, Viewport } from 'next';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  OG_IMAGE,
  organizationJsonLd,
  SITE_NAME,
  SITE_URL,
  websiteJsonLd,
} from '@/lib/seo';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-ZR6ZXRW988';

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: '%s | Edwin Castro',
  },
  description: HOME_DESCRIPTION,
  keywords: [
    'Edwin Castro',
    'Edwin Castro funding',
    'direct funding',
    'debt-free funding',
    'edwinmega.com',
    'housing funding',
    'education funding',
    'medical funding',
    'business funding',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: HOME_TITLE,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
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
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

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
