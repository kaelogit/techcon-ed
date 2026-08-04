'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

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
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = MORE_NAV.some((item) => pathname === item.href);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [moreOpen]);

  async function logout() {
    await fetch('/api/banking/logout', { method: 'POST' });
    router.push('/banking/login');
    router.refresh();
  }

  return (
    <div className="banking-root min-h-screen bg-[var(--ecf-paper)]">
      <div className="bg-[var(--ecf-navy-deep)] px-4 py-1 text-[10px] text-white/70 sm:text-[11px]">
        <div className="mx-auto flex max-w-6xl justify-between">
          <span>ECF Bank Online Banking</span>
          <span className="hidden sm:inline">Secure session</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--ecf-line)] bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:py-3">
          <Link href="/banking/dashboard" className="flex min-w-0 items-center gap-2 no-underline">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[var(--ecf-navy)] text-[10px] font-bold tracking-wide text-white">
              ECF
            </span>
            <span className="min-w-0">
              <span className="block truncate font-[family-name:var(--font-banking-display)] text-sm font-semibold text-[var(--ecf-navy)] sm:text-base">
                ECF Bank
              </span>
              {accountName ? (
                <span className="block truncate text-[10px] text-[var(--ecf-muted)] sm:hidden">
                  {accountName}
                </span>
              ) : null}
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 text-sm">
            {accountName ? (
              <span className="hidden max-w-[180px] truncate text-[var(--ecf-muted)] sm:inline">
                {accountName}
              </span>
            ) : null}
            <button
              type="button"
              onClick={logout}
              className="rounded border border-[var(--ecf-line)] px-2 py-1 text-[11px] font-semibold text-[var(--ecf-navy)] hover:bg-[var(--ecf-sky)] sm:px-3 sm:py-1.5 sm:text-sm"
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
                className={`whitespace-nowrap rounded px-3 py-1.5 text-sm no-underline transition ${
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

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:py-8 md:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ecf-line)] bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-0.5">
          {PRIMARY_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded px-0.5 py-1.5 no-underline ${
                  active ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-muted)]'
                }`}
              >
                <span
                  className={`h-1 w-1 rounded-full ${active ? 'bg-[var(--ecf-navy)]' : 'bg-transparent'}`}
                  aria-hidden
                />
                <span className={`text-[10px] ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.short}
                </span>
              </Link>
            );
          })}
          <div className="relative">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
              className={`flex w-full flex-col items-center gap-0.5 rounded px-0.5 py-1.5 ${
                moreActive || moreOpen ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-muted)]'
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${moreActive || moreOpen ? 'bg-[var(--ecf-navy)]' : 'bg-transparent'}`}
                aria-hidden
              />
              <span className={`text-[10px] ${moreActive || moreOpen ? 'font-semibold' : 'font-medium'}`}>
                More
              </span>
            </button>
            {moreOpen ? (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40 bg-transparent"
                  aria-label="Close menu"
                  onClick={() => setMoreOpen(false)}
                />
                <div
                  role="menu"
                  className="absolute bottom-[calc(100%+6px)] right-0 z-50 w-40 overflow-hidden border border-[var(--ecf-line)] bg-white py-1 shadow-lg"
                >
                  {MORE_NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className={`block px-3 py-2 text-sm no-underline ${
                        pathname === item.href
                          ? 'bg-[var(--ecf-sky)] font-semibold text-[var(--ecf-navy)]'
                          : 'text-[var(--ecf-ink)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}
