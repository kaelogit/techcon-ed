import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Apply for Edwin Castro Foundation grant help',
  description:
    'Apply for debt-free grant help from the Edwin Castro Foundation. Tell us if it is for a home, school, health, a business, or a hard season. Start only at edwinmega.com/apply.',
  path: '/apply',
});

export default function ApplyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Apply for grant help', path: '/apply' },
        ])}
      />
      {children}
    </>
  );
}
