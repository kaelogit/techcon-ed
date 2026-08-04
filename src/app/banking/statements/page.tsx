'use client';

import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';

export default function BankingStatementsPage() {
  const { data, loading, error } = useBankingMe();

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[#64748b]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  const a = data.account;
  const credits = data.transactions.filter((t) => t.amount > 0);
  const debits = data.transactions.filter((t) => t.amount < 0);

  return (
    <BankingAppShell accountName={a.fullName}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="banking-display text-3xl text-[#0b1f33]">Statements</h1>
          <p className="mt-1 text-sm text-[#64748b]">Printable account statement for your records.</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl bg-[#0b1f33] px-4 py-2.5 text-sm font-semibold text-white print:hidden"
        >
          Print / Save PDF
        </button>
      </div>

      <article className="rounded-2xl border border-[#d5dde6] bg-white p-6 shadow-sm print:border-0 print:shadow-none">
        <header className="border-b border-[#e2e8f0] pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ecf-blue)]">ECF Bank</p>
          <h2 className="banking-display mt-1 text-2xl text-[var(--ecf-navy)]">Account statement</h2>
          <p className="mt-2 text-sm text-[#64748b]">
            {a.fullName} · {a.accountNumber}
          </p>
        </header>

        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-[#64748b]">Opening credit</p>
            <p className="font-semibold">{formatMoney(a.supportAmount)}</p>
          </div>
          <div>
            <p className="text-[#64748b]">Current balance</p>
            <p className="font-semibold">{formatMoney(a.balance)}</p>
          </div>
          <div>
            <p className="text-[#64748b]">Statement date</p>
            <p className="font-semibold">{formatDate(new Date().toISOString())}</p>
          </div>
        </div>

        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e2e8f0] text-xs uppercase text-[#64748b]">
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-[#f1f5f9]">
                <td className="py-2 whitespace-nowrap">{formatDate(txn.date)}</td>
                <td className="py-2">{txn.description}</td>
                <td className="py-2 text-right tabular-nums font-medium">
                  {formatMoney(txn.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-6 text-xs text-[#94a3b8]">
          Credits: {credits.length} · Debits/transfers: {debits.length}. This statement is issued by ECF
          Banking statement — retain for your records.
        </p>
      </article>
    </BankingAppShell>
  );
}
