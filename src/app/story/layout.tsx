import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Why the lottery winner started the Foundation',
  description:
    'Edwin Castro won the Powerball lottery and started the Edwin Castro Foundation so grant help could reach people directly. A home, school, health, a business, or a hard season.',
  path: '/story',
});

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Why the Foundation', path: '/story' },
        ])}
      />
      {children}
    </>
  );
}
