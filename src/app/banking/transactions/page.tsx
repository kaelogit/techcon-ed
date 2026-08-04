'use client';

import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';

export default function BankingTransactionsPage() {
  const { data, loading, error } = useBankingMe();

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[#64748b]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-3xl text-[#0b1f33]">Account activity</h1>
      <p className="mt-1 text-sm text-[var(--ecf-muted)]">Full transaction history for this account.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#d5dde6] bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-[#64748b]">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((txn) => (
              <tr key={txn.id} className="border-t border-[#e2e8f0]">
                <td className="px-4 py-3 whitespace-nowrap text-[#475569]">{formatDate(txn.date)}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#0f172a]">{txn.description}</p>
                  {txn.reference ? <p className="text-xs text-[#94a3b8]">{txn.reference}</p> : null}
                </td>
                <td className="px-4 py-3 capitalize text-[#64748b]">{txn.status}</td>
                <td
                  className={`px-4 py-3 text-right font-semibold tabular-nums ${
                    txn.amount >= 0 ? 'text-[#0f766e]' : 'text-[#0f172a]'
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
    </BankingAppShell>
  );
}
