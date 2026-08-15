'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isIsolated =
    pathname.startsWith('/banking') || pathname.startsWith('/trackdelivery');

  if (isIsolated) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}
