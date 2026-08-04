import type { ReactNode } from 'react';
import { BankingPublicHeader } from '@/components/banking/BankingPublicHeader';

export function BankingPublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="banking-root flex min-h-screen flex-col bg-white">
      <BankingPublicHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[var(--ecf-line)] bg-[var(--ecf-paper)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-8 sm:py-10">
          <div>
            <p className="font-[family-name:var(--font-banking-display)] text-base font-semibold text-[var(--ecf-navy)] sm:text-lg">
              ECF Bank
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--ecf-muted)] sm:text-sm">
              Member FDIC. Equal Housing Lender. © {new Date().getFullYear()} ECF Bank, N.A.
            </p>
          </div>
          <div className="text-xs text-[var(--ecf-muted)] sm:text-sm">
            <p className="font-semibold text-[var(--ecf-ink)]">Online Banking</p>
            <p className="mt-2">Sign in · Enroll · Password help · Account alerts</p>
          </div>
          <div className="text-xs text-[var(--ecf-muted)] sm:text-sm">
            <p className="font-semibold text-[var(--ecf-ink)]">Security</p>
            <p className="mt-2">
              Never share your password or one-time codes. ECF Bank will not ask for your full account
              credentials by email or text.
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--ecf-line)] px-4 py-3 text-center text-[10px] text-[var(--ecf-muted)] sm:py-4 sm:text-[11px]">
          Investment and insurance products are not FDIC insured, are not bank deposits, and may lose value.
        </div>
      </footer>
    </div>
  );
}
