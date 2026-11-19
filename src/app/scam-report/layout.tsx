import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Edwin Castro scam? Tell us about the text',
  description:
    'Got an Edwin Castro scam text about a grant or a gift you never applied for? Tell us what they said. The Foundation has a $1,000,000,000 Recovery Fund for people who lost money to a fake message.',
  path: '/scam-report',
});

export default function ScamReportLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Edwin Castro scam', path: '/scam-report' },
        ])}
      />
      {children}
    </>
  );
}
