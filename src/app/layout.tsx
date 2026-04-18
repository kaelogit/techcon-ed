import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/home/Footer';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-ZR6ZXRW988';

const siteTitle = 'Edwin Castro — Community Support Initiative';
const siteDescription = 'A personal commitment to rebuilding lives across America. Edwin Castro provides direct, debt-free funding for education, housing, disaster recovery, medical needs, and community projects — with support reaching all 50 states. No middlemen. No complicated paperwork. Just real help for real people.';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Edwin Castro Community Support',
  },
  description: siteDescription,
  keywords: ['Edwin Castro', 'community support', 'funding', 'education', 'housing', 'disaster recovery', 'Altadena', 'Powerball', 'direct support', 'debt-free funding', 'family support'],
  authors: [{ name: 'Edwin Castro' }],
  creator: 'Edwin Castro',
  publisher: 'Edwin Castro Community Support',
  metadataBase: new URL('https://edwinmega.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://edwinmega.com',
    siteName: 'Edwin Castro Community Support',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Community Support — Direct Funding for Families Across America',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/hero-image.jpg'],
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {GA_ID && (
          <>
            {/* Google Analytics */}
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
