import Link from 'next/link';
import type { ReactNode } from 'react';

export function BankingPublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="banking-root flex min-h-screen flex-col bg-white">
      <div className="bg-[var(--ecf-navy-deep)] px-4 py-1.5 text-center text-[11px] text-white/75 sm:text-left">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <span>Customer Service 1-800-ECF-BANK · Mon–Fri 7am–9pm ET</span>
          <span className="hidden sm:inline">Locations · Security Center · About ECF Bank</span>
        </div>
      </div>

      <header className="border-b border-[var(--ecf-line)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/banking" className="flex items-center gap-3 no-underline">
            <span className="flex h-11 w-11 items-center justify-center rounded bg-[var(--ecf-navy)] text-sm font-bold tracking-wide text-white">
              ECF
            </span>
            <span>
              <span className="block font-[family-name:var(--font-banking-display)] text-xl font-semibold text-[var(--ecf-navy)]">
                ECF Bank
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ecf-muted)]">
                Personal Banking
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--ecf-ink)] md:flex">
            <span className="cursor-default">Checking</span>
            <span className="cursor-default">Savings</span>
            <span className="cursor-default">Payments</span>
            <span className="cursor-default">Help</span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/banking/login"
              className="rounded px-3 py-2 text-sm font-semibold text-[var(--ecf-navy)] no-underline hover:bg-[var(--ecf-sky)]"
            >
              Sign in
            </Link>
            <Link
              href="/banking/register"
              className="rounded bg-[var(--ecf-navy)] px-3.5 py-2 text-sm font-semibold text-white no-underline hover:bg-[var(--ecf-blue)]"
            >
              Enroll
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--ecf-line)] bg-[var(--ecf-paper)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-banking-display)] text-lg font-semibold text-[var(--ecf-navy)]">
              ECF Bank
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ecf-muted)]">
              Member FDIC. Equal Housing Lender. © {new Date().getFullYear()} ECF Bank, N.A.
            </p>
          </div>
          <div className="text-sm text-[var(--ecf-muted)]">
            <p className="font-semibold text-[var(--ecf-ink)]">Online Banking</p>
            <p className="mt-2">Sign in · Enroll · Password help · Account alerts</p>
          </div>
          <div className="text-sm text-[var(--ecf-muted)]">
            <p className="font-semibold text-[var(--ecf-ink)]">Security</p>
            <p className="mt-2">
              Never share your password or one-time codes. ECF Bank will not ask for your full account
              credentials by email or text.
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--ecf-line)] px-4 py-4 text-center text-[11px] text-[var(--ecf-muted)]">
          Investment and insurance products are not FDIC insured, are not bank deposits, and may lose value.
        </div>
      </footer>
    </div>
  );
}
