import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'What Edwin Castro Funding Covers',
  description:
    'Explore Edwin Castro funding areas on the official site: housing, education, health, business, family support, and community projects. Apply for the goal that actually moves your next chapter.',
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
