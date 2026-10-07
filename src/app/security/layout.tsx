import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How We Protect Your Information',
  description:
    'Learn how Edwin Castro protects your story and documents on edwinmega.com. Official support email is support@edwinmega.com. Confirm contact on the verification page before you reply.',
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
