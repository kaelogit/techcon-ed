'use client';

import { FormEvent, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';

export default function ExternalAccountsPage() {
  const { data, loading, error, refresh } = useBankingMe();
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking');
  const [nickname, setNickname] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setMsg('');
    setBusy(true);
    try {
      const res = await fetch('/api/banking/external-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankName,
          accountHolder,
          routingNumber,
          accountNumber,
          accountType,
          nickname,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error || 'Could not add account.');
        return;
      }
      setMsg('External account linked successfully.');
      setBankName('');
      setAccountHolder('');
      setRoutingNumber('');
      setAccountNumber('');
      setNickname('');
      await refresh();
    } catch {
      setErr('Could not add account.');
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

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-3xl text-[#0b1f33]">Linked accounts</h1>
      <p className="mt-1 text-sm text-[#64748b]">
        Add an external bank account to receive transfers from your ECF support balance.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#0b1f33]">Your linked accounts</h2>
          <ul className="mt-4 space-y-3">
            {data.account.externalAccounts.map((acc) => (
              <li key={acc.id} className="rounded-xl border border-[#e2e8f0] p-3 text-sm">
                <p className="font-semibold text-[#0f172a]">
                  {acc.nickname || acc.bankName}
                </p>
                <p className="text-[#64748b]">
                  {acc.bankName} · {acc.accountType} · ••••{acc.accountNumberLast4}
                </p>
                <p className="text-xs text-[#94a3b8]">{acc.accountHolder}</p>
              </li>
            ))}
            {data.account.externalAccounts.length === 0 ? (
              <li className="py-6 text-center text-sm text-[#64748b]">No linked accounts yet.</li>
            ) : null}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#0b1f33]">Add external account</h2>
          <input
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="Bank name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="Account holder name"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="Routing number"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="Account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <select
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as 'checking' | 'savings')}
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </select>
          <input
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="Nickname (optional)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {err ? <p className="text-sm text-red-600">{err}</p> : null}
          {msg ? <p className="text-sm text-[#0f766e]">{msg}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#2f8f84] py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Link account'}
          </button>
        </form>
      </div>
    </BankingAppShell>
  );
}
