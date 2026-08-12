'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { DebitCard } from '@/components/banking/DebitCard';
import { SupportOfferCard } from '@/components/banking/SupportOfferCard';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';

function isSupportOffer(txn: {
  id: string;
  reference?: string;
  amount: number;
  type: string;
  status: string;
}) {
  return (
    txn.status === 'pending' &&
    txn.amount > 0 &&
    txn.type === 'credit' &&
    (txn.id.startsWith('CR-OFFER-') || Boolean(txn.reference?.startsWith('ECF-SUPPORT')))
  );
}

export default function BankingDashboardPage() {
  const { data, loading, error, refresh } = useBankingMe();
  const [showWelcome, setShowWelcome] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openTxn, setOpenTxn] = useState<string | null>(null);
  const [offerBusy, setOfferBusy] = useState<string | null>(null);

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

  async function decideOffer(txnId: string, action: 'accept' | 'reject') {
    setOfferBusy(`${action}:${txnId}`);
    try {
      await fetch('/api/banking/support-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, transactionId: txnId }),
      });
      await refresh();
    } finally {
      setOfferBusy(null);
    }
  }

  if (loading) {
    return (
      <BankingAppShell>
        <div className="animate-pulse space-y-4">
          <div className="h-40 bg-[#d5dde6]/70" />
          <div className="aspect-[1.586/1] bg-[#d5dde6]/50" />
          <div className="h-40 bg-[#d5dde6]/40" />
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
  const pendingOffer =
    data.pendingSupportOffer || transactions.find((t) => isSupportOffer(t)) || null;

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

      {pendingOffer ? <SupportOfferCard offer={pendingOffer} onDecided={refresh} /> : null}

      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-muted)]">
          Accounts
        </p>
        <h1 className="banking-display mt-1 text-2xl font-semibold text-[var(--ecf-navy)] sm:text-3xl">
          {account.fullName.split(' ')[0]}’s checking
        </h1>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.9fr] lg:items-start lg:gap-6">
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
                className="banking-btn-light rounded bg-white px-2.5 py-2 text-center text-[11px] font-semibold no-underline sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Transfer
              </Link>
              <Link
                href="/banking/external-accounts"
                className="banking-btn-ghost rounded border border-white/40 bg-white/10 px-2.5 py-2 text-center text-[11px] font-semibold no-underline sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Link
              </Link>
              <Link
                href="/banking/transactions"
                className="banking-btn-ghost rounded border border-white/40 bg-white/10 px-2.5 py-2 text-center text-[11px] font-semibold no-underline sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Activity
              </Link>
            </div>
          </div>
        </section>

        <DebitCard
          accountNumber={account.accountNumber}
          cardholderName={account.fullName}
          issued={Boolean(account.debitCardIssued)}
          onCopyAccount={copyAccount}
          copied={copied}
        />
      </div>

      <section className="mt-5 border border-[var(--ecf-line)] bg-white shadow-sm sm:mt-6">
        <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
          <h2 className="text-base font-semibold text-[var(--ecf-navy)] sm:text-lg">Recent activity</h2>
          <Link href="/banking/transactions" className="text-sm font-semibold text-[var(--ecf-blue)]">
            See all
          </Link>
        </div>
        <ul className="mt-1 divide-y divide-[var(--ecf-line)]">
          {recent.map((txn) => {
            const open = openTxn === txn.id;
            const credit = txn.amount >= 0;
            const offer = isSupportOffer(txn);
            return (
              <li key={txn.id}>
                <button
                  type="button"
                  onClick={() => setOpenTxn(open ? null : txn.id)}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left sm:px-6"
                  aria-expanded={open}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      credit
                        ? 'bg-[var(--ecf-sky)] text-[var(--ecf-navy)]'
                        : 'bg-[var(--ecf-paper)] text-[var(--ecf-ink)]'
                    }`}
                  >
                    {credit ? '+' : '−'}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-[var(--ecf-ink)]">
                      {txn.description}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--ecf-muted)]">
                      {formatDate(txn.date)}
                      <span className="capitalize"> · {txn.status}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={`text-sm font-semibold tabular-nums ${
                        credit ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-ink)]'
                      }`}
                    >
                      {credit ? '+' : ''}
                      {formatMoney(txn.amount)}
                    </span>
                    <span className="text-[10px] font-medium text-[var(--ecf-blue)]">
                      {open ? 'Hide' : 'Details'}
                    </span>
                  </span>
                </button>
                {open || offer ? (
                  <div className="border-t border-[var(--ecf-line)] bg-[var(--ecf-paper)] px-4 py-3 text-xs text-[var(--ecf-muted)] sm:px-6">
                    <p className="break-words">{txn.description}</p>
                    <p className="mt-2 font-mono">
                      Ref: {txn.reference || '—'} · ID: {txn.id}
                    </p>
                    {offer ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={Boolean(offerBusy)}
                          onClick={() => decideOffer(txn.id, 'accept')}
                          className="rounded bg-[var(--ecf-navy)] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          {offerBusy === `accept:${txn.id}` ? 'Accepting…' : 'Accept'}
                        </button>
                        <button
                          type="button"
                          disabled={Boolean(offerBusy)}
                          onClick={() => decideOffer(txn.id, 'reject')}
                          className="rounded border border-[var(--ecf-line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ecf-ink)] disabled:opacity-60"
                        >
                          {offerBusy === `reject:${txn.id}` ? 'Rejecting…' : 'Reject'}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
          {recent.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-[var(--ecf-muted)]">No activity yet.</li>
          ) : null}
        </ul>
      </section>
    </BankingAppShell>
  );
}
