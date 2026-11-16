import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Scam Recovery Mode',
  description:
    'We feel your pain. If a fake claims agent or trustee took your money, begin recovery mode. Tell your story, report names like Ralph Montigny or Bobby Miller, and speak up for possible extra support.',
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
