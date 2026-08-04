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
        'To transfer funds out of the Edwin Castro Foundation vault, you need a vault key. Please reach out to your Support Coordinator to receive your vault key.'
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
              'Please reach out to your Support Coordinator to get your vault key.'
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
      <h1 className="banking-display text-3xl text-[#0b1f33]">ACH Transfer</h1>
      <p className="mt-1 text-sm text-[#64748b]">
        Transfer from your ECF support balance to a linked external account. Outbound releases
        require a Foundation vault key.
      </p>

      <div className="mt-6 max-w-lg rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
        <p className="text-sm text-[#64748b]">Available in vault</p>
        <p className="banking-display text-3xl text-[#0b1f33]">{formatMoney(balance)}</p>

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

            <label className="block text-sm font-medium text-[#334155]">
              Foundation vault key
              <input
                type="password"
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={vaultKey}
                onChange={(e) => setVaultKey(e.target.value)}
                placeholder="Required to release funds from vault"
                autoComplete="off"
              />
              <span className="mt-1 block text-xs text-[#64748b]">
                Issued by your Support Coordinator. Without this key, ACH cannot leave the Foundation vault.
              </span>
            </label>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            {result ? (
              <div className="rounded-xl border border-[#b7e4de] bg-[#ecfdf8] p-3 text-sm text-[#115e59]">
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
              className="w-full rounded-xl bg-[#0b1f33] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? 'Authorizing…' : 'Confirm ACH transfer'}
            </button>
          </form>
        )}
      </div>

      {showVaultModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1f33]/55 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vault-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2f8f84]">
              Vault authorization required
            </p>
            <h2 id="vault-modal-title" className="banking-display mt-2 text-2xl text-[#0b1f33]">
              Contact your Support Coordinator
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#475569]">
              {vaultModalMessage ||
                'To transfer funds out of the Edwin Castro Foundation vault, you need a vault key. Please reach out to your Support Coordinator to receive your vault key.'}
            </p>
            <p className="mt-3 text-sm text-[#64748b]">
              Support Coordinator: <strong>Michael Freedman</strong>
              <br />
              <a className="font-semibold text-[#2f8f84]" href="mailto:michaelfreedman@edwinmega.com">
                michaelfreedman@edwinmega.com
              </a>
            </p>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-[#0b1f33] py-3 text-sm font-semibold text-white"
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
