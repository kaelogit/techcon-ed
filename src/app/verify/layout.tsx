import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { verifyFaqs } from '@/data/verify';
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Official Contact Verification',
  description:
    'Confirm official Edwin Castro funding contact on edwinmega.com. Real follow-up comes only from support@edwinmega.com. Check a message here before you reply or share documents.',
  path: '/verify',
});

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Official Contact Verification', path: '/verify' },
        ])}
      />
      <JsonLd data={faqPageJsonLd(verifyFaqs)} />
      {children}
    </>
  );
}
