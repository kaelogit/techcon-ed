import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { verifyFaqs } from '@/data/verify';
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Did someone contact you about funding?',
  description:
    'Check if a message is really from Edwin Castro. Official email is support@edwinmega.com on edwinmega.com. We never ask for fees, taxes, or passwords.',
  path: '/verify',
});

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Check a message', path: '/verify' },
        ])}
      />
      <JsonLd data={faqPageJsonLd(verifyFaqs)} />
      {children}
    </>
  );
}
