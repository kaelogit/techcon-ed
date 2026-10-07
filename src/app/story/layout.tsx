import { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Why Edwin Castro Funds People Directly',
  description:
    'Learn why Edwin Castro built a direct funding path on edwinmega.com. Capital goes to clear human goals — recovery, growth, and ambition — without turning people into paperwork.',
  path: '/story',
});

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'The Vision', path: '/story' },
        ])}
      />
      {children}
    </>
  );
}
