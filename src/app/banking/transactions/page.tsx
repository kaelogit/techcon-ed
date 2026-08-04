'use client';

import { useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';
import type { BankingMe } from '@/components/banking/useBankingMe';

type Txn = BankingMe['transactions'][number];

function TransactionRow({ txn }: { txn: Txn }) {
  const [open, setOpen] = useState(false);
  const credit = txn.amount >= 0;

  return (
    <li className="border-b border-[var(--ecf-line)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 px-3 py-3.5 text-left sm:px-4"
        aria-expanded={open}
      >
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            credit ? 'bg-[var(--ecf-sky)] text-[var(--ecf-navy)]' : 'bg-[var(--ecf-paper)] text-[var(--ecf-ink)]'
          }`}
        >
          {credit ? '+' : '−'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-[var(--ecf-ink)]">{txn.description}</span>
          <span className="mt-0.5 block text-xs text-[var(--ecf-muted)]">
            {formatDate(txn.date)}
            <span className="capitalize"> · {txn.status}</span>
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`text-sm font-semibold tabular-nums ${credit ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-ink)]'}`}
          >
            {credit ? '+' : ''}
            {formatMoney(txn.amount)}
          </span>
          <span className="text-[10px] font-medium text-[var(--ecf-blue)]">{open ? 'Hide' : 'Details'}</span>
        </span>
      </button>

      {open ? (
        <div className="border-t border-[var(--ecf-line)] bg-[var(--ecf-paper)] px-3 py-3 text-xs text-[var(--ecf-muted)] sm:px-4">
          <dl className="grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-[var(--ecf-ink)]">Description</dt>
              <dd className="mt-0.5 break-words">{txn.description}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ecf-ink)]">Date</dt>
              <dd className="mt-0.5">{formatDate(txn.date)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ecf-ink)]">Status</dt>
              <dd className="mt-0.5 capitalize">{txn.status}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ecf-ink)]">Type</dt>
              <dd className="mt-0.5 capitalize">{txn.type}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ecf-ink)]">Amount</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-[var(--ecf-ink)]">
                {credit ? '+' : ''}
                {formatMoney(txn.amount)}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ecf-ink)]">Reference</dt>
              <dd className="mt-0.5 break-all font-mono">{txn.reference || '—'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-[var(--ecf-ink)]">Transaction ID</dt>
              <dd className="mt-0.5 break-all font-mono">{txn.id}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </li>
  );
}

export default function BankingTransactionsPage() {
  const { data, loading, error } = useBankingMe();

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[var(--ecf-muted)]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-2xl font-semibold text-[var(--ecf-navy)] sm:text-3xl">
        Account activity
      </h1>
      <p className="mt-1 text-sm text-[var(--ecf-muted)]">
        Tap a transaction for full details.
      </p>

      <div className="mt-5 overflow-hidden border border-[var(--ecf-line)] bg-white shadow-sm">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--ecf-paper)] text-xs uppercase tracking-wide text-[var(--ecf-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((txn) => (
                <tr key={txn.id} className="border-t border-[var(--ecf-line)] align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--ecf-muted)]">{formatDate(txn.date)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--ecf-ink)]">{txn.description}</p>
                    {txn.reference ? (
                      <p className="mt-0.5 font-mono text-xs text-[var(--ecf-muted)]">{txn.reference}</p>
                    ) : null}
                    <p className="mt-0.5 font-mono text-[10px] text-[var(--ecf-muted)]">{txn.id}</p>
                  </td>
                  <td className="px-4 py-3 capitalize text-[var(--ecf-muted)]">{txn.status}</td>
                  <td
                    className={`px-4 py-3 text-right font-semibold tabular-nums ${
                      txn.amount >= 0 ? 'text-[var(--ecf-navy)]' : 'text-[var(--ecf-ink)]'
                    }`}
                  >
                    {txn.amount >= 0 ? '+' : ''}
                    {formatMoney(txn.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile expandable list */}
        <ul className="md:hidden">
          {data.transactions.map((txn) => (
            <TransactionRow key={txn.id} txn={txn} />
          ))}
        </ul>

        {!data.transactions.length ? (
          <p className="px-4 py-10 text-center text-sm text-[var(--ecf-muted)]">No activity yet.</p>
        ) : null}
      </div>
    </BankingAppShell>
  );
}
