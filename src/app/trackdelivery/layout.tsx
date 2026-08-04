import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ECF Delivery Tracking',
  description: 'Track Edwin Castro Foundation secure deliveries.',
  robots: { index: false, follow: false },
};

export default function TrackDeliveryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:wght@500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .delivery-root {
          --ecf-navy: #003087;
          --ecf-navy-deep: #001f5c;
          --ecf-blue: #0f5ebd;
          --ecf-sky: #e8f1fb;
          --ecf-ink: #1a1f36;
          --ecf-muted: #5c6578;
          --ecf-line: #d8dee8;
          --ecf-paper: #f5f7fb;
          --font-display: 'IBM Plex Serif', Georgia, serif;
          --font-sans: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
          font-family: var(--font-sans);
          color: var(--ecf-ink);
          background: #fff;
        }
        .delivery-root h1, .delivery-root h2, .delivery-root .display {
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }
        .delivery-root a { color: inherit; text-decoration: none; }
      `}</style>
      <div className="delivery-root">{children}</div>
    </>
  );
}
