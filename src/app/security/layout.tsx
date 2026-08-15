import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How We Protect Your Information',
  description:
    'How Edwin Castro handles your story and documents on edwinmega.com. We never ask for fees or passwords. Official email is support@edwinmega.com.',
  path: '/security',
});

export default function SecurityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'How we protect data', path: '/security' },
        ])}
      />
      {children}
    </>
  );
}
