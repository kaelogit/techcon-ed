import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'The Person Behind This Funding',
  description:
    'Read who Edwin Castro is and why he funds people directly. Debt-free capital for recovery, growth, and ambition. Official site: edwinmega.com.',
  path: '/story',
});

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Our Story', path: '/story' },
        ])}
      />
      {children}
    </>
  );
}
