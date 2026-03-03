import './globals.css';
import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/home/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <Navbar />
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

