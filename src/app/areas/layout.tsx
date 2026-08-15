import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Housing, School, Health & Business Funding',
  description:
    'What Edwin Castro funds: a home, education, medical care, a business, disaster recovery, or a community project. Direct capital. You do not pay it back.',
  path: '/areas',
});

export default function AreasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Funding Areas', path: '/areas' },
        ])}
      />
      {children}
    </>
  );
}
