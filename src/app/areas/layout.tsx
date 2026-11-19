import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'What an Edwin Castro grant can help with',
  description:
    'See what Edwin Castro Foundation grant help can cover: a home, school, health, a business, family, or a community project. Apply for the help that matches your life.',
  path: '/areas',
});

export default function AreasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'What the grant can help with', path: '/areas' },
        ])}
      />
      {children}
    </>
  );
}
