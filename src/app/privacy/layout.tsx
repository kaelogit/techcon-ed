import { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How We Handle Your Information',
  description:
    'How Edwin Castro uses the information you share on edwinmega.com. Your request stays private. Official email is support@edwinmega.com.',
  path: '/privacy',
});

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
