import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Scam Recovery Mode',
  description:
    'We feel your pain. A dedicated $1,000,000,000 Recovery Fund is set aside for people scammed by fake claims agents. Tell your story, begin recovery, and speak up for possible extra support.',
  path: '/scam-report',
});

export default function ScamReportLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Scam Recovery Mode', path: '/scam-report' },
        ])}
      />
      {children}
    </>
  );
}
