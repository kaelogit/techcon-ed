import { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms — Direct Funding, No Fees',
  description:
    'Terms for Edwin Castro’s official site. Funding is direct and debt-free. We never charge a fee to receive support. Official site: edwinmega.com.',
  path: '/terms',
});

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
