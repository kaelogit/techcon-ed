import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Apply for Official Edwin Castro Funding',
  description:
    'Apply on the official Edwin Castro website. Share a clear goal for housing, education, health, business, or recovery. Direct funding is reviewed personally — start only at edwinmega.com/apply.',
  path: '/apply',
});

export default function ApplyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Apply', path: '/apply' },
        ])}
      />
      {children}
    </>
  );
}
