import Link from 'next/link';
import type { ReactNode } from 'react';

export function BankingPublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="banking-root min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-[#0b1f33]/text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/banking" className="flex items-center gap-3 no-underline text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3d9b8f] bg-[#12324d] text-xs font-bold tracking-wider text-[#7dd3c7]">
              ECF
            </span>
            <span>
              <span className="block font-[family-name:var(--font-banking-display)] text-lg tracking-wide">
                ECF Banking
              </span>
              <span className="block text-[11px] uppercase tracking-[0.18em] text-white/55">
                Secure award accounts
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/banking/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 no-underline hover:bg-white/10"
            >
              Sign in
            </Link>
            <Link
              href="/banking/register"
              className="rounded-lg bg-[#2f8f84] px-3 py-2 text-sm font-semibold text-white no-underline hover:bg-[#267a71]"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#d5dde6] bg-[#f4f7fa] px-4 py-6 text-center text-xs text-[#64748b]">
        ECF Banking — secure award disbursement portal for Edwin Castro Foundation recipients.
        <span className="mt-1 block text-[#94a3b8]">For authorized support recipients only.</span>
      </footer>
    </div>
  );
}
