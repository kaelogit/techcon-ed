import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How We Protect Your Information',
  description:
    'Learn how Edwin Castro protects stories and documents submitted on edwinmega.com. Confirm official contact on the verification page before you reply or share sensitive details.',
  path: '/verify',
  noIndex: true,
});

export default function SecurityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Official Contact Verification', path: '/verify' },
        ])}
      />
      {children}
    </>
  );
}
