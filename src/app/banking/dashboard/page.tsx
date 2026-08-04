'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';

export default function BankingDashboardPage() {
  const { data, loading, error } = useBankingMe();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (data && !data.account.welcomeSeen) {
      setShowWelcome(true);
      fetch('/api/banking/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ welcomeSeen: true }),
      });
    }
  }, [data]);

  if (loading) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[#64748b]">Loading your account…</p>
      </BankingAppShell>
    );
  }

  if (error || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-red-600">{error || 'Unable to load account.'}</p>
      </BankingAppShell>
    );
  }

  const { account, transactions } = data;
  const recent = transactions.slice(0, 5);

  return (
    <BankingAppShell accountName={account.fullName}>
      {showWelcome ? (
        <div className="mb-6 rounded-2xl border border-[#b7e4de] bg-[#ecfdf8] p-4 text-sm text-[#115e59]">
          <strong>Welcome, {account.fullName.split(' ')[0]}.</strong> Your support award has been
          credited to this ECF Banking account. You can review activity and link an external account
          whenever you are ready.
          <button
            type="button"
            className="ml-2 font-semibold underline"
            onClick={() => setShowWelcome(false)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl bg-gradient-to-br from-[#0b1f33] to-[#134e4a] p-6 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7dd3c7]">Available balance</p>
          <p className="banking-display mt-2 text-4xl sm:text-5xl">{formatMoney(account.balance)}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-[11px] uppercase tracking-wide text-white/60">Pending</p>
              <p className="mt-1 font-semibold">{formatMoney(account.pendingBalance)}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-[11px] uppercase tracking-wide text-white/60">Account type</p>
              <p className="mt-1 text-sm font-semibold">{account.accountType}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-[11px] uppercase tracking-wide text-white/60">Account number</p>
              <p className="mt-1 font-mono text-sm font-semibold">{account.maskedAccountNumber}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/banking/transfer"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1f33] no-underline"
            >
              Transfer
            </Link>
            <Link
              href="/banking/external-accounts"
              className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Link account
            </Link>
            <Link
              href="/banking/transactions"
              className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white no-underline"
            >
              View activity
            </Link>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-[#0f172a] p-5 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94a3b8]">ECF Debit</p>
          <p className="mt-8 banking-display text-2xl tracking-wide">ECF Banking</p>
          <p className="mt-6 font-mono text-lg tracking-[0.2em]">•••• •••• •••• {account.accountNumber.slice(-4)}</p>
          <div className="mt-8 flex justify-between text-sm">
            <div>
              <p className="text-[10px] uppercase text-white/50">Cardholder</p>
              <p className="font-medium">{account.fullName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-white/50">Status</p>
              <p className="font-medium text-[#7dd3c7]">Active</p>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2f8f84]/30" />
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0b1f33]">Recent activity</h2>
          <Link href="/banking/transactions" className="text-sm font-medium text-[#2f8f84]">
            See all
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-[#e2e8f0]">
          {recent.map((txn) => (
            <li key={txn.id} className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="font-medium text-[#0f172a]">{txn.description}</p>
                <p className="text-xs text-[#64748b]">
                  {formatDate(txn.date)} · {txn.status}
                  {txn.reference ? ` · ${txn.reference}` : ''}
                </p>
              </div>
              <p className={`font-semibold tabular-nums ${txn.amount >= 0 ? 'text-[#0f766e]' : 'text-[#0f172a]'}`}>
                {txn.amount >= 0 ? '+' : ''}
                {formatMoney(txn.amount)}
              </p>
            </li>
          ))}
          {recent.length === 0 ? (
            <li className="py-6 text-center text-sm text-[#64748b]">No activity yet.</li>
          ) : null}
        </ul>
      </section>
    </BankingAppShell>
  );
}
