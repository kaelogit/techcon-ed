'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/banking/dashboard', label: 'Overview' },
  { href: '/banking/transactions', label: 'Activity' },
  { href: '/banking/transfer', label: 'Transfer' },
  { href: '/banking/external-accounts', label: 'Linked accounts' },
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

  async function logout() {
    await fetch('/api/banking/logout', { method: 'POST' });
    router.push('/banking/login');
    router.refresh();
  }

  return (
    <div className="banking-root min-h-screen bg-[#eef2f6]">
      <header className="border-b border-[#d5dde6] bg-[#0b1f33] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/banking/dashboard" className="flex items-center gap-3 no-underline text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3d9b8f] text-[10px] font-bold text-[#7dd3c7]">
              ECF
            </span>
            <span className="font-[family-name:var(--font-banking-display)] text-base tracking-wide">
              ECF Banking
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            {accountName ? <span className="hidden text-white/70 sm:inline">{accountName}</span> : null}
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-white/20 px-3 py-1.5 text-white/90 hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm no-underline ${
                  active ? 'bg-white/15 font-semibold text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
    </div>
  );
}
