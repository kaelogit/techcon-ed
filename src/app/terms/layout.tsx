import { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'Terms for using the official Edwin Castro funding site. Support is reviewed personally, applications must be honest, and edwinmega.com is the place to apply and verify contact.',
  path: '/terms',
});

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
