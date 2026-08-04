'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatMoney } from '@/lib/banking/format';

export default function TransferPage() {
  const { data, loading, error, refresh } = useBankingMe();
  const [externalAccountId, setExternalAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [result, setResult] = useState<{ reference: string; balance: number } | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setResult(null);
    setBusy(true);
    try {
      const res = await fetch('/api/banking/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          externalAccountId,
          amount: Number(amount),
          memo,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error || 'Transfer failed.');
        return;
      }
      setResult({ reference: json.reference, balance: json.balance });
      setAmount('');
      setMemo('');
      await refresh();
    } catch {
      setErr('Transfer failed.');
    } finally {
      setBusy(false);
    }
  }

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[#64748b]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  const accounts = data.account.externalAccounts;

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-3xl text-[#0b1f33]">Transfer</h1>
      <p className="mt-1 text-sm text-[#64748b]">
        Move funds from your ECF support balance to a linked external account.
      </p>

      <div className="mt-6 max-w-lg rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
        <p className="text-sm text-[#64748b]">Available to transfer</p>
        <p className="banking-display text-3xl text-[#0b1f33]">{formatMoney(data.account.balance)}</p>

        {accounts.length === 0 ? (
          <p className="mt-6 text-sm text-[#64748b]">
            You need a linked external account first.{' '}
            <Link href="/banking/external-accounts" className="font-semibold text-[#2f8f84]">
              Link an account
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-[#334155]">
              To account
              <select
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={externalAccountId}
                onChange={(e) => setExternalAccountId(e.target.value)}
                required
              >
                <option value="">Select linked account</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {(acc.nickname || acc.bankName) + ` ••••${acc.accountNumberLast4}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-[#334155]">
              Amount (USD)
              <input
                type="number"
                min="0.01"
                step="0.01"
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
            <label className="block text-sm font-medium text-[#334155]">
              Memo (optional)
              <input
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </label>
            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            {result ? (
              <div className="rounded-xl border border-[#b7e4de] bg-[#ecfdf8] p-3 text-sm text-[#115e59]">
                Transfer completed.
                <br />
                Reference: <strong>{result.reference}</strong>
                <br />
                New balance: <strong>{formatMoney(result.balance)}</strong>
              </div>
            ) : null}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-[#0b1f33] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? 'Processing…' : 'Confirm transfer'}
            </button>
          </form>
        )}
      </div>
    </BankingAppShell>
  );
}
