import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ECF Banking',
  description: 'Secure support award accounts for Edwin Castro Foundation recipients.',
  robots: { index: false, follow: false },
};

export default function BankingRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .banking-root {
          --font-banking-display: 'Libre Baskerville', Georgia, serif;
          --font-banking-sans: 'Source Sans 3', system-ui, sans-serif;
          font-family: var(--font-banking-sans);
          color: #0f172a;
        }
        .banking-root h1, .banking-root h2, .banking-root .banking-display {
          font-family: var(--font-banking-display);
        }
      `}</style>
      <div className="banking-isolate">{children}</div>
    </>
  );
}
