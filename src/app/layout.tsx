import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/home/Footer';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-ZR6ZXRW988';

export const metadata: Metadata = {
  title: 'Edwin Castro - Community Support Initiative',
  description: 'Direct funding for education, housing, disaster recovery, and more. Rebuilding lives and empowering communities across the United States.',
  keywords: ['Edwin Castro', 'community support', 'funding', 'education', 'housing', 'disaster recovery', 'Altadena', 'Powerball'],
  authors: [{ name: 'Edwin Castro' }],
  creator: 'Edwin Castro',
  publisher: 'Edwin Castro Community Support',
  metadataBase: new URL('https://edwinmega.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Edwin Castro - Community Support Initiative',
    description: 'Direct funding for families, students, and neighborhoods across the United States.',
    url: 'https://edwinmega.com',
    siteName: 'Edwin Castro Community Support',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Edwin Castro Community Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edwin Castro - Community Support Initiative',
    description: 'Direct funding for families, students, and neighborhoods across the United States.',
    images: ['/hero-image.jpg'],
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
