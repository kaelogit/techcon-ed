import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Gift Cards & Receipts',
  description: 'Secure claimant upload for Steam Wallet, Apple Gift Card, and Razor Gold gift cards with purchase receipts.',
  robots: { index: false, follow: false },
};

export default function UploadGiftCardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
