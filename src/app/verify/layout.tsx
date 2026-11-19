import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { verifyFaqs } from '@/data/verify';
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Is this Edwin Castro text real?',
  description:
    'Is this Edwin Castro text real? If a text or a Facebook or Instagram message says the Foundation picked you and you must claim a grant, stop. That is not how we reach people. Check edwinmega.com/verify before you reply. Support: support@edwinmega.com.',
  path: '/verify',
});

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Is this text real?', path: '/verify' },
        ])}
      />
      <JsonLd data={faqPageJsonLd(verifyFaqs)} />
      {children}
    </>
  );
}
