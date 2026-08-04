'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const PRIMARY_NAV = [
  { href: '/banking/dashboard', label: 'Home', short: 'Home' },
  { href: '/banking/transactions', label: 'Activity', short: 'Activity' },
  { href: '/banking/transfer', label: 'Transfer', short: 'Send' },
  { href: '/banking/external-accounts', label: 'Linked', short: 'Linked' },
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
    <div className="banking-root min-h-screen bg-[#e8eef4]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1f33]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5">
          <Link href="/banking/dashboard" className="flex min-w-0 items-center gap-2.5 no-underline text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3d9b8f]/80 bg-[#12324d] text-[10px] font-bold tracking-wide text-[#7dd3c7]">
              ECF
            </span>
            <span className="min-w-0">
              <span className="block truncate font-[family-name:var(--font-banking-display)] text-[15px] tracking-wide sm:text-base">
                ECF Banking
              </span>
              {accountName ? (
                <span className="block truncate text-[11px] text-white/55 sm:hidden">{accountName}</span>
              ) : null}
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 text-sm">
            {accountName ? (
              <span className="hidden max-w-[160px] truncate text-white/65 sm:inline">{accountName}</span>
            ) : null}
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-white/20 px-2.5 py-1.5 text-xs text-white/90 hover:bg-white/10 sm:px-3 sm:text-sm"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Desktop / tablet top nav */}
        <nav className="mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-4 pb-2.5 md:flex">
          {[...PRIMARY_NAV, ...MORE_NAV].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm no-underline transition ${
                  active
                    ? 'bg-white/15 font-semibold text-white'
                    : 'text-white/65 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-5 sm:py-8 md:pb-10">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d5dde6] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-1">
          {PRIMARY_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 no-underline ${
                  active ? 'text-[#0f766e]' : 'text-[#64748b]'
                }`}
              >
                <span
                  className={`h-1 w-1 rounded-full ${active ? 'bg-[#0f766e]' : 'bg-transparent'}`}
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
              className={`flex list-none flex-col items-center gap-0.5 rounded-xl px-1 py-2 marker:content-none [&::-webkit-details-marker]:hidden ${
                moreActive ? 'text-[#0f766e]' : 'text-[#64748b]'
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${moreActive ? 'bg-[#0f766e]' : 'bg-transparent'}`}
                aria-hidden
              />
              <span className={`text-[11px] ${moreActive ? 'font-semibold' : 'font-medium'}`}>More</span>
            </summary>
            <div className="absolute bottom-[calc(100%+8px)] right-1 w-44 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white py-1 shadow-xl">
              {MORE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2.5 text-sm no-underline ${
                    pathname === item.href
                      ? 'bg-[#f0fdfa] font-semibold text-[#0f766e]'
                      : 'text-[#334155]'
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
