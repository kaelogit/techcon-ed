'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';

export default function BankingDashboardPage() {
  const { data, loading, error } = useBankingMe();
  const [showWelcome, setShowWelcome] = useState(false);
  const [copied, setCopied] = useState(false);

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

  async function copyAccount() {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  if (loading) {
    return (
      <BankingAppShell>
        <div className="animate-pulse space-y-4">
          <div className="h-48 rounded-3xl bg-[#d5dde6]/70" />
          <div className="h-36 rounded-3xl bg-[#d5dde6]/50" />
          <div className="h-40 rounded-3xl bg-[#d5dde6]/40" />
        </div>
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
        <div className="mb-5 border border-[var(--ecf-line)] bg-white p-4 text-sm text-[var(--ecf-ink)] shadow-sm">
          <p>
            <strong>Welcome, {account.fullName.split(' ')[0]}.</strong> You’re signed in to ECF Bank
            Online Banking.
          </p>
          <button
            type="button"
            className="mt-2 text-xs font-semibold text-[var(--ecf-blue)] underline"
            onClick={() => setShowWelcome(false)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-muted)]">
          Accounts
        </p>
        <h1 className="banking-display mt-1 text-2xl font-semibold text-[var(--ecf-navy)] sm:text-3xl">
          {account.fullName.split(' ')[0]}’s checking
        </h1>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.9fr] lg:gap-6">
        <section className="relative overflow-hidden bg-[var(--ecf-navy)] p-5 text-white shadow-md sm:p-7">
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Available balance</p>
            <p className="banking-display mt-2 text-[2.35rem] leading-none tracking-tight sm:text-5xl">
              {formatMoney(account.balance)}
            </p>
            <p className="mt-2 text-sm text-white/65">{account.accountType}</p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              <div className="bg-white/10 p-3">
                <p className="text-[10px] uppercase tracking-wide text-white/55">Pending</p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{formatMoney(account.pendingBalance)}</p>
              </div>
              <div className="bg-white/10 p-3">
                <p className="text-[10px] uppercase tracking-wide text-white/55">Account</p>
                <p className="mt-1 truncate font-mono text-xs font-semibold sm:text-sm">
                  {account.maskedAccountNumber}
                </p>
              </div>
              <div className="col-span-2 bg-white/10 p-3 sm:col-span-1">
                <p className="text-[10px] uppercase tracking-wide text-white/55">Status</p>
                <p className="mt-1 text-sm font-semibold text-white">Open</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-5 sm:flex sm:flex-wrap sm:gap-2">
              <Link
                href="/banking/transfer"
                className="bg-white px-2.5 py-2 text-center text-[11px] font-semibold text-[var(--ecf-navy)] no-underline sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Transfer
              </Link>
              <Link
                href="/banking/external-accounts"
                className="border border-white/30 bg-white/5 px-2.5 py-2 text-center text-[11px] font-semibold text-white no-underline sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Link
              </Link>
              <Link
                href="/banking/transactions"
                className="border border-white/30 bg-white/5 px-2.5 py-2 text-center text-[11px] font-semibold text-white no-underline sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Activity
              </Link>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[200px] flex-col justify-between overflow-hidden bg-[#0a1628] p-5 text-white shadow-md sm:min-h-[240px] sm:p-6">
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Debit card</p>
              <p className="mt-1 text-xs font-medium text-white/70">ECF Bank</p>
            </div>
            <div className="h-8 w-11 rounded-sm bg-gradient-to-br from-amber-300/90 to-amber-700/70" />
          </div>
          <p className="relative mt-8 font-mono text-lg tracking-[0.22em] sm:text-xl">
            •••• •••• •••• {account.accountNumber.slice(-4)}
          </p>
          <div className="relative mt-6 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase text-white/40">Cardholder</p>
              <p className="truncate text-sm font-medium">{account.fullName}</p>
            </div>
            <button
              type="button"
              onClick={copyAccount}
              className="shrink-0 border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/85"
            >
              {copied ? 'Copied' : 'Copy #'}
            </button>
          </div>
        </section>
      </div>

      <section className="mt-5 border border-[var(--ecf-line)] bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[var(--ecf-navy)] sm:text-lg">Recent activity</h2>
          <Link href="/banking/transactions" className="text-sm font-semibold text-[var(--ecf-blue)]">
            See all
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-[var(--ecf-line)]">
          {recent.map((txn) => (
            <li key={txn.id} className="flex items-start justify-between gap-3 py-3.5">
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    txn.amount >= 0
                      ? 'bg-[var(--ecf-sky)] text-[var(--ecf-navy)]'
                      : 'bg-[var(--ecf-paper)] text-[var(--ecf-ink)]'
                  }`}
                >
                  {txn.amount >= 0 ? '+' : '−'}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-[var(--ecf-ink)]">{txn.description}</p>
                  <p className="mt-0.5 text-xs text-[var(--ecf-muted)]">
                    {formatDate(txn.date)}
                    <span className="capitalize"> · {txn.status}</span>
                  </p>
                </div>
              </div>
              <p
                className={`shrink-0 text-sm font-semibold tabular-nums ${
                  txn.amount >= 0 ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-ink)]'
                }`}
              >
                {txn.amount >= 0 ? '+' : ''}
                {formatMoney(txn.amount)}
              </p>
            </li>
          ))}
          {recent.length === 0 ? (
            <li className="py-8 text-center text-sm text-[var(--ecf-muted)]">No activity yet.</li>
          ) : null}
        </ul>
      </section>
    </BankingAppShell>
  );
}
