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

const ALL_NAV = [...PRIMARY_NAV, ...MORE_NAV];

export function BankingAppShell({
  children,
  accountName,
}: {
  children: ReactNode;
  accountName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/banking/dashboard';

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  async function logout() {
    setMenuOpen(false);
    await fetch('/api/banking/logout', { method: 'POST' });
    router.push('/banking/login');
    router.refresh();
  }

  function goBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    router.push('/banking/dashboard');
  }

  return (
    <div className="banking-root min-h-screen bg-[var(--ecf-paper)]">
      <div className="bg-[var(--ecf-navy-deep)] px-4 py-1 text-[10px] text-white/70 sm:text-[11px]">
        <div className="mx-auto flex max-w-6xl justify-between">
          <span>ECF Bank Online Banking</span>
          <span className="hidden sm:inline">Secure session</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[var(--ecf-line)] bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          {/* Mobile back */}
          {!isHome ? (
            <button
              type="button"
              onClick={goBack}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[var(--ecf-line)] text-[var(--ecf-navy)] md:hidden"
              aria-label="Go back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 6L9 12l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}

          <Link
            href="/banking/dashboard"
            className="flex min-w-0 flex-1 items-center gap-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
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

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {accountName ? (
              <span className="max-w-[180px] truncate text-sm text-[var(--ecf-muted)]">{accountName}</span>
            ) : null}
            <button
              type="button"
              onClick={logout}
              className="rounded border border-[var(--ecf-line)] px-3 py-1.5 text-sm font-semibold text-[var(--ecf-navy)] hover:bg-[var(--ecf-sky)]"
            >
              Sign out
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[var(--ecf-line)] text-[var(--ecf-navy)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="ecf-app-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>

        <nav className="mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-4 pb-2 md:flex">
          {ALL_NAV.map((item) => {
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

        {menuOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/35 md:hidden"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <div
              id="ecf-app-menu"
              className="absolute inset-x-0 top-full z-50 border-b border-[var(--ecf-line)] bg-white shadow-lg md:hidden"
            >
              <nav className="mx-auto flex max-w-6xl flex-col px-2 py-2">
                {accountName ? (
                  <p className="px-3 py-2 text-xs text-[var(--ecf-muted)]">{accountName}</p>
                ) : null}
                {ALL_NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded px-3 py-2.5 text-sm no-underline ${
                        active
                          ? 'bg-[var(--ecf-sky)] font-semibold text-[var(--ecf-navy)]'
                          : 'font-medium text-[var(--ecf-ink)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="my-1 border-t border-[var(--ecf-line)]" />
                <button
                  type="button"
                  onClick={logout}
                  className="rounded px-3 py-2.5 text-left text-sm font-semibold text-red-700"
                >
                  Sign out
                </button>
              </nav>
            </div>
          </>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:py-8 md:pb-10">{children}</main>

      {/* Quick bottom tabs — still useful; full menu is in hamburger */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ecf-line)] bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 px-1 pt-0.5">
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
        </div>
      </nav>
    </div>
  );
}
