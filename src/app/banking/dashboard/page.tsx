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
        <div className="mb-5 rounded-2xl border border-[#b7e4de] bg-gradient-to-br from-[#ecfdf8] to-[#f0fdfa] p-4 text-sm text-[#115e59] shadow-sm">
          <p>
            <strong>Welcome, {account.fullName.split(' ')[0]}.</strong> Your support award is credited
            and ready in this secure ECF account.
          </p>
          <button
            type="button"
            className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#0f766e] underline"
            onClick={() => setShowWelcome(false)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748b]">Good to see you</p>
        <h1 className="banking-display mt-1 text-2xl text-[#0b1f33] sm:text-3xl">
          {account.fullName.split(' ')[0]}’s account
        </h1>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.9fr] lg:gap-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1f33] via-[#12324d] to-[#0f766e] p-5 text-white shadow-[0_20px_50px_rgba(11,31,51,.28)] sm:p-7">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 90% 10%, rgba(125,211,199,.45), transparent 35%), radial-gradient(circle at 10% 90%, rgba(255,255,255,.08), transparent 40%)',
            }}
          />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#a7f3e8]">Available balance</p>
            <p className="banking-display mt-2 text-[2.35rem] leading-none tracking-tight sm:text-5xl">
              {formatMoney(account.balance)}
            </p>
            <p className="mt-2 text-sm text-white/65">{account.accountType}</p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-wide text-white/55">Pending</p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{formatMoney(account.pendingBalance)}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-wide text-white/55">Account</p>
                <p className="mt-1 truncate font-mono text-xs font-semibold sm:text-sm">
                  {account.maskedAccountNumber}
                </p>
              </div>
              <div className="col-span-2 rounded-2xl bg-white/10 p-3 backdrop-blur-sm sm:col-span-1">
                <p className="text-[10px] uppercase tracking-wide text-white/55">Status</p>
                <p className="mt-1 text-sm font-semibold text-[#a7f3e8]">Active · Secured</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Link
                href="/banking/transfer"
                className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#0b1f33] no-underline shadow-sm"
              >
                Transfer
              </Link>
              <Link
                href="/banking/external-accounts"
                className="rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white no-underline"
              >
                Link account
              </Link>
              <Link
                href="/banking/transactions"
                className="col-span-2 rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white no-underline sm:col-span-1"
              >
                View activity
              </Link>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl bg-[#0c1220] p-5 text-white shadow-lg sm:min-h-[240px] sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#2f8f84]/35 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-[#1d4ed8]/20 blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Virtual card</p>
              <p className="mt-1 text-xs font-medium text-[#7dd3c7]">ECF Debit</p>
            </div>
            <div className="h-8 w-11 rounded-md bg-gradient-to-br from-[#fbbf24]/80 to-[#b45309]/60 opacity-90" />
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
              className="shrink-0 rounded-xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/85"
            >
              {copied ? 'Copied' : 'Copy #'}
            </button>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-3xl border border-[#dbe3ec] bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[#0b1f33] sm:text-lg">Recent activity</h2>
          <Link href="/banking/transactions" className="text-sm font-semibold text-[#0f766e]">
            See all
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-[#eef2f7]">
          {recent.map((txn) => (
            <li key={txn.id} className="flex items-start justify-between gap-3 py-3.5">
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    txn.amount >= 0 ? 'bg-[#ecfdf8] text-[#0f766e]' : 'bg-[#f1f5f9] text-[#334155]'
                  }`}
                >
                  {txn.amount >= 0 ? '+' : '−'}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#0f172a]">{txn.description}</p>
                  <p className="mt-0.5 text-xs text-[#64748b]">
                    {formatDate(txn.date)}
                    <span className="capitalize"> · {txn.status}</span>
                  </p>
                </div>
              </div>
              <p
                className={`shrink-0 text-sm font-semibold tabular-nums ${
                  txn.amount >= 0 ? 'text-[#0f766e]' : 'text-[#0f172a]'
                }`}
              >
                {txn.amount >= 0 ? '+' : ''}
                {formatMoney(txn.amount)}
              </p>
            </li>
          ))}
          {recent.length === 0 ? (
            <li className="py-8 text-center text-sm text-[#64748b]">No activity yet.</li>
          ) : null}
        </ul>
      </section>
    </BankingAppShell>
  );
}
