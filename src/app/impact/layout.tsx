import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'People Already Funded',
  description:
    'See real outcomes from Edwin Castro’s direct funding — homes, school, health, and business. Debt-free. Stories are shared only with permission.',
  path: '/impact',
});

export default function ImpactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Impact', path: '/impact' },
        ])}
      />
      {children}
    </>
  );
}
