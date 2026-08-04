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
  const [vaultKey, setVaultKey] = useState('');
  const [result, setResult] = useState<{ reference: string; balance: number } | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [vaultModalMessage, setVaultModalMessage] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setResult(null);

    if (!vaultKey.trim()) {
      setVaultModalMessage(
        'Outbound ACH requires a transfer authorization key. Contact your relationship manager if you have not received one.'
      );
      setShowVaultModal(true);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/banking/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          externalAccountId,
          amount: Number(amount),
          memo,
          vaultKey: vaultKey.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.code === 'VAULT_KEY_REQUIRED' || json.code === 'VAULT_KEY_INVALID') {
          setVaultModalMessage(
            json.message ||
              'Contact your relationship manager for a transfer authorization key.'
          );
          setShowVaultModal(true);
          return;
        }
        if (json.code === 'ACCOUNT_FROZEN') {
          setErr(json.message || 'This account is frozen.');
          return;
        }
        setErr(json.error || 'Transfer failed.');
        return;
      }
      setResult({ reference: json.reference, balance: json.balance });
      setAmount('');
      setMemo('');
      setVaultKey('');
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
  const balance = data.account.balance;

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-3xl font-semibold text-[var(--ecf-navy)]">Pay &amp; transfer</h1>
      <p className="mt-1 text-sm text-[var(--ecf-muted)]">
        Send ACH from your ECF Bank checking account to a linked external bank.
      </p>

      <div className="mt-6 max-w-lg border border-[var(--ecf-line)] bg-white p-5 shadow-sm">
        <p className="text-sm text-[var(--ecf-muted)]">Available balance</p>
        <p className="banking-display text-3xl text-[var(--ecf-navy)]">{formatMoney(balance)}</p>

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

            <div>
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm font-medium text-[#334155]">Amount (USD)</label>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#2f8f84] hover:underline"
                  onClick={() => setAmount(String(balance))}
                >
                  Transfer all ({formatMoney(balance)})
                </button>
              </div>
              <input
                type="number"
                min="0.01"
                step="0.01"
                max={balance}
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount or use Transfer all"
                required
              />
            </div>

            <label className="block text-sm font-medium text-[#334155]">
              Memo (optional)
              <input
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </label>

            <label className="block text-sm font-medium text-[var(--ecf-ink)]">
              Transfer authorization key
              <input
                type="password"
                className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5"
                value={vaultKey}
                onChange={(e) => setVaultKey(e.target.value)}
                placeholder="Required for outbound ACH"
                autoComplete="off"
              />
              <span className="mt-1 block text-xs text-[var(--ecf-muted)]">
                Issued by your relationship manager for outbound transfers.
              </span>
            </label>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            {result ? (
              <div className="border border-[var(--ecf-line)] bg-[var(--ecf-sky)] p-3 text-sm text-[var(--ecf-navy)]">
                ACH transfer submitted — pending clearance.
                <br />
                Reference: <strong>{result.reference}</strong>
                <br />
                Available balance: <strong>{formatMoney(result.balance)}</strong>
              </div>
            ) : null}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded bg-[var(--ecf-navy)] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? 'Submitting…' : 'Submit ACH transfer'}
            </button>
          </form>
        )}
      </div>

      {showVaultModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vault-modal-title"
            className="w-full max-w-md bg-white p-6 shadow-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-blue)]">
              Authorization required
            </p>
            <h2 id="vault-modal-title" className="banking-display mt-2 text-2xl text-[var(--ecf-navy)]">
              Contact your relationship manager
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ecf-muted)]">
              {vaultModalMessage ||
                'Outbound ACH requires a transfer authorization key. Contact your relationship manager if you have not received one.'}
            </p>
            <p className="mt-3 text-sm text-[var(--ecf-muted)]">
              Relationship Manager: <strong>Michael Freedman</strong>
              <br />
              <a className="font-semibold text-[var(--ecf-blue)]" href="mailto:michaelfreedman@edwinmega.com">
                michaelfreedman@edwinmega.com
              </a>
            </p>
            <button
              type="button"
              className="mt-6 w-full rounded bg-[var(--ecf-navy)] py-3 text-sm font-semibold text-white"
              onClick={() => setShowVaultModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </BankingAppShell>
  );
}
