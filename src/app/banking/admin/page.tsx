'use client';

import { FormEvent, useEffect, useState } from 'react';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';
import { formatMoney } from '@/lib/banking/format';

type ListedAccount = {
  accountNumber: string;
  fullName: string;
  supportAmount: number;
  city: string;
  state: string;
  registered: boolean;
};

export default function BankingAdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [accounts, setAccounts] = useState<ListedAccount[]>([]);
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');
  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [supportAmount, setSupportAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  async function loadAccounts(adminKey: string) {
    const res = await fetch(`/api/banking/admin?key=${encodeURIComponent(adminKey)}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Unauthorized');
      setAuthed(false);
      return;
    }
    setAccounts(data.accounts);
    setAuthed(true);
    setError('');
  }

  async function unlock(e: FormEvent) {
    e.preventDefault();
    await loadAccounts(key);
  }

  async function createAccount(e: FormEvent) {
    e.preventDefault();
    setCreated('');
    setError('');
    const res = await fetch('/api/banking/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ecf-admin-key': key,
      },
      body: JSON.stringify({
        fullName,
        addressLine1,
        city,
        state,
        postalCode,
        supportAmount: Number(supportAmount),
        accountNumber: accountNumber || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Create failed');
      return;
    }
    setCreated(`Issued account number: ${data.accountNumber}`);
    setFullName('');
    setAddressLine1('');
    setCity('');
    setState('');
    setPostalCode('');
    setSupportAmount('');
    setAccountNumber('');
    await loadAccounts(key);
  }

  useEffect(() => {
    // keep page client-only
  }, []);

  return (
    <BankingPublicShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="banking-display text-3xl text-[#0b1f33]">Operator console</h1>
        <p className="mt-2 text-sm text-[#64748b]">
          Issue ECF Banking account numbers for winners. Default admin key:{' '}
          <code className="rounded bg-[#f1f5f9] px-1">ecf-admin-demo</code> (override with{' '}
          <code className="rounded bg-[#f1f5f9] px-1">ECF_BANKING_ADMIN_KEY</code>).
        </p>

        {!authed ? (
          <form onSubmit={unlock} className="mt-8 max-w-md space-y-3 rounded-2xl border border-[#d5dde6] bg-white p-5">
            <input
              type="password"
              className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
              placeholder="Admin key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" className="rounded-xl bg-[#0b1f33] px-4 py-2.5 text-sm font-semibold text-white">
              Unlock
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-8">
            <form onSubmit={createAccount} className="grid gap-3 rounded-2xl border border-[#d5dde6] bg-white p-5 sm:grid-cols-2">
              <h2 className="sm:col-span-2 font-semibold text-[#0b1f33]">Issue new account</h2>
              <input className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="Support amount" value={supportAmount} onChange={(e) => setSupportAmount(e.target.value)} required />
              <input className="sm:col-span-2 rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="Street address" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
              <input className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
              <input className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
              <input className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
              <input className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm" placeholder="Custom account # (optional)" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              {error ? <p className="sm:col-span-2 text-sm text-red-600">{error}</p> : null}
              {created ? <p className="sm:col-span-2 text-sm text-[#0f766e]">{created}</p> : null}
              <button type="submit" className="sm:col-span-2 rounded-xl bg-[#2f8f84] py-3 text-sm font-semibold text-white">
                Issue account number
              </button>
            </form>

            <div className="rounded-2xl border border-[#d5dde6] bg-white p-5">
              <h2 className="font-semibold text-[#0b1f33]">Issued accounts</h2>
              <ul className="mt-4 divide-y divide-[#e2e8f0] text-sm">
                {accounts.map((a) => (
                  <li key={a.accountNumber} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div>
                      <p className="font-semibold">{a.fullName}</p>
                      <p className="font-mono text-xs text-[#64748b]">{a.accountNumber}</p>
                      <p className="text-xs text-[#94a3b8]">
                        {a.city}, {a.state} · {formatMoney(a.supportAmount)}
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${a.registered ? 'bg-[#ecfdf8] text-[#0f766e]' : 'bg-[#fff7ed] text-[#c2410c]'}`}>
                      {a.registered ? 'Registered' : 'Awaiting register'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </BankingPublicShell>
  );
}
