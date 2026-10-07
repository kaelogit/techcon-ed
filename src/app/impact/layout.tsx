import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Real Funding Outcomes',
  description:
    'See real outcomes from Edwin Castro direct funding — homes rebuilt, education completed, care secured, and businesses grown. Stories appear only with permission on the official site.',
  path: '/impact',
});

export default function ImpactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Real Stories', path: '/impact' },
        ])}
      />
      {children}
    </>
  );
}
