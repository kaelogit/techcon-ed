import { ReactNode } from 'react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'Read how Edwin Castro handles personal information submitted on edwinmega.com. Your application stays private, and official support contact is support@edwinmega.com.',
  path: '/privacy',
});

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
