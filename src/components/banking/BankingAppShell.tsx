'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const PRIMARY_NAV = [
  { href: '/banking/dashboard', label: 'Accounts', short: 'Accounts' },
  { href: '/banking/transactions', label: 'Activity', short: 'Activity' },
  { href: '/banking/transfer', label: 'Pay & transfer', short: 'Transfer' },
  { href: '/banking/external-accounts', label: 'Linked banks', short: 'Linked' },
];

const MORE_NAV = [
  { href: '/banking/statements', label: 'Statements' },
  { href: '/banking/profile', label: 'Profile' },
  { href: '/banking/security', label: 'Security' },
];

export function BankingAppShell({
  children,
  accountName,
}: {
  children: ReactNode;
  accountName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const moreActive = MORE_NAV.some((item) => pathname === item.href);

  async function logout() {
    await fetch('/api/banking/logout', { method: 'POST' });
    router.push('/banking/login');
    router.refresh();
  }

  return (
    <div className="banking-root min-h-screen bg-[var(--ecf-paper)]">
      <div className="bg-[var(--ecf-navy-deep)] px-4 py-1 text-[11px] text-white/70">
        <div className="mx-auto flex max-w-6xl justify-between">
          <span>ECF Bank Online Banking</span>
          <span className="hidden sm:inline">Secure session</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--ecf-line)] bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/banking/dashboard" className="flex min-w-0 items-center gap-2.5 no-underline">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[var(--ecf-navy)] text-[10px] font-bold tracking-wide text-white">
              ECF
            </span>
            <span className="min-w-0">
              <span className="block truncate font-[family-name:var(--font-banking-display)] text-[15px] font-semibold text-[var(--ecf-navy)] sm:text-base">
                ECF Bank
              </span>
              {accountName ? (
                <span className="block truncate text-[11px] text-[var(--ecf-muted)] sm:hidden">
                  {accountName}
                </span>
              ) : null}
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-3 text-sm">
            {accountName ? (
              <span className="hidden max-w-[180px] truncate text-[var(--ecf-muted)] sm:inline">
                {accountName}
              </span>
            ) : null}
            <button
              type="button"
              onClick={logout}
              className="rounded border border-[var(--ecf-line)] px-2.5 py-1.5 text-xs font-semibold text-[var(--ecf-navy)] hover:bg-[var(--ecf-sky)] sm:px-3 sm:text-sm"
            >
              Sign out
            </button>
          </div>
        </div>

        <nav className="mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-4 pb-2 md:flex">
          {[...PRIMARY_NAV, ...MORE_NAV].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded px-3 py-2 text-sm no-underline transition ${
                  active
                    ? 'bg-[var(--ecf-sky)] font-semibold text-[var(--ecf-navy)]'
                    : 'text-[var(--ecf-muted)] hover:bg-[var(--ecf-paper)] hover:text-[var(--ecf-ink)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-5 sm:py-8 md:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ecf-line)] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-1">
          {PRIMARY_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-1 py-2 no-underline ${
                  active ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-muted)]'
                }`}
              >
                <span
                  className={`h-1 w-1 rounded-full ${active ? 'bg-[var(--ecf-navy)]' : 'bg-transparent'}`}
                  aria-hidden
                />
                <span className={`text-[11px] ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.short}
                </span>
              </Link>
            );
          })}
          <details className="relative">
            <summary
              className={`flex list-none flex-col items-center gap-0.5 rounded-lg px-1 py-2 marker:content-none [&::-webkit-details-marker]:hidden ${
                moreActive ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-muted)]'
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${moreActive ? 'bg-[var(--ecf-navy)]' : 'bg-transparent'}`}
                aria-hidden
              />
              <span className={`text-[11px] ${moreActive ? 'font-semibold' : 'font-medium'}`}>More</span>
            </summary>
            <div className="absolute bottom-[calc(100%+8px)] right-1 w-44 overflow-hidden rounded-lg border border-[var(--ecf-line)] bg-white py-1 shadow-xl">
              {MORE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2.5 text-sm no-underline ${
                    pathname === item.href
                      ? 'bg-[var(--ecf-sky)] font-semibold text-[var(--ecf-navy)]'
                      : 'text-[var(--ecf-ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </div>
  );
}
