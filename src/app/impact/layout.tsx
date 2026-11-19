import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Edwin Castro Foundation help, in real lives',
  description:
    'Homes, school, care, and businesses. These are people the Edwin Castro Foundation grant has helped. Stories appear only when the person said we could tell them.',
  path: '/impact',
});

export default function ImpactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Real help', path: '/impact' },
        ])}
      />
      {children}
    </>
  );
}
