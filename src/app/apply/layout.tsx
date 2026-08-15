import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Share Your Goal — Direct Funding, No Debt',
  description:
    'Tell Edwin Castro what you need funded. Direct capital for housing, school, health, business, or recovery. No repayment. No fees. Official applications are only on edwinmega.com.',
  path: '/apply',
});

export default function ApplyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Share Your Goal', path: '/apply' },
        ])}
      />
      {children}
    </>
  );
}
