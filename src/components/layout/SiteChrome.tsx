'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isBanking = pathname.startsWith('/banking');

  if (isBanking) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
