import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ECF Bank | Online Banking',
  description: 'Secure online banking from ECF Bank. Sign in to manage checking, transfers, and account activity.',
  robots: { index: false, follow: false },
};

export default function BankingRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:wght@500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .banking-root {
          --ecf-navy: #003087;
          --ecf-navy-deep: #001f5c;
          --ecf-blue: #0f5ebd;
          --ecf-sky: #e8f1fb;
          --ecf-ink: #1a1f36;
          --ecf-muted: #5c6578;
          --ecf-line: #d8dee8;
          --ecf-paper: #f5f7fb;
          --font-banking-display: 'IBM Plex Serif', Georgia, serif;
          --font-banking-sans: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
          font-family: var(--font-banking-sans);
          color: var(--ecf-ink);
          background: #fff;
        }
        .banking-root h1,
        .banking-root h2,
        .banking-root .banking-display {
          font-family: var(--font-banking-display);
          letter-spacing: -0.02em;
        }
        .banking-root a,
        .banking-root a:link,
        .banking-root a:visited,
        .banking-root a:hover,
        .banking-root a:active,
        .banking-root a:focus {
          color: inherit;
          -webkit-tap-highlight-color: transparent;
          text-decoration: none;
        }
        .banking-root a.banking-nav-active,
        .banking-root a.banking-nav-active:visited,
        .banking-root a.banking-nav-active:active {
          color: #ffffff !important;
        }
        .banking-root a.banking-nav-item,
        .banking-root a.banking-nav-item:visited,
        .banking-root a.banking-nav-item:active {
          color: #003087;
        }
        .banking-root a.banking-nav-muted,
        .banking-root a.banking-nav-muted:visited,
        .banking-root a.banking-nav-muted:active {
          color: #5c6578;
        }
        .banking-root a.banking-btn-light,
        .banking-root a.banking-btn-light:link,
        .banking-root a.banking-btn-light:visited,
        .banking-root a.banking-btn-light:hover,
        .banking-root a.banking-btn-light:active {
          color: #003087 !important;
        }
        .banking-root a.banking-btn-ghost,
        .banking-root a.banking-btn-ghost:link,
        .banking-root a.banking-btn-ghost:visited,
        .banking-root a.banking-btn-ghost:hover,
        .banking-root a.banking-btn-ghost:active {
          color: #ffffff !important;
        }
      `}</style>
      <div className="banking-isolate">{children}</div>
    </>
  );
}
