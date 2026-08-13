'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { DebitCardRequestPanel } from '@/components/banking/DebitCardRequestPanel';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatMoney } from '@/lib/banking/format';

type Step =
  | 'details'
  | 'processing'
  | 'authorize'
  | 'card-processing'
  | 'card-verify'
  | 'done';

const PROCESSING_LINES = [
  'Verifying available balance…',
  'Checking linked account details…',
  'Routing ACH for clearance…',
  'Preparing authorization step…',
];

const CARD_PROCESSING_LINES = [
  'Checking authorization key…',
  'Authorization key passed',
  'Opening card verification…',
];

export default function TransferPage() {
  const { data, loading, error, refresh } = useBankingMe();
  const [step, setStep] = useState<Step>('details');
  const [externalAccountId, setExternalAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [vaultKey, setVaultKey] = useState('');
  const [cardLast4, setCardLast4] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [result, setResult] = useState<{ reference: string; balance: number } | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [processLine, setProcessLine] = useState(0);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [vaultModalMessage, setVaultModalMessage] = useState('');
  const [vaultModalTitle, setVaultModalTitle] = useState('Authorization key required');

  useEffect(() => {
    if (step !== 'processing' && step !== 'card-processing') return;
    setProcessLine(0);
    const lines = step === 'processing' ? PROCESSING_LINES : CARD_PROCESSING_LINES;
    const tick = window.setInterval(() => {
      setProcessLine((i) => Math.min(i + 1, lines.length - 1));
    }, 700);
    const done = window.setTimeout(() => {
      setStep(step === 'processing' ? 'authorize' : 'card-verify');
    }, step === 'processing' ? 3200 : 3600);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [step]);

  function openVaultModal(title: string, message: string) {
    setVaultModalTitle(title);
    setVaultModalMessage(message);
    setShowVaultModal(true);
  }

  function startProcessing(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setResult(null);
    const value = Number(amount);
    if (!externalAccountId || !Number.isFinite(value) || value <= 0) {
      setErr('Select an account and enter a valid amount.');
      return;
    }
    if (data && value > data.account.balance) {
      setErr('Amount exceeds available balance.');
      return;
    }
    setStep('processing');
  }

  async function submitAuthorized(e: FormEvent) {
    e.preventDefault();
    setErr('');

    if (!vaultKey.trim()) {
      openVaultModal(
        'Authorization key required',
        'You must enter the transfer authorization key issued by your relationship manager. Your ECF account number is not the authorization key and will not work.'
      );
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
          validateOnly: true,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.code === 'VAULT_KEY_REQUIRED') {
          openVaultModal(
            'Authorization key not issued yet',
            json.message ||
              'Your authorization key has not been issued yet. Contact Michael Freedman — this is not something that can be completed by entering your account number.'
          );
          setErr(json.message || 'Authorization key not issued yet.');
          return;
        }
        if (json.code === 'VAULT_KEY_INVALID') {
          openVaultModal(
            'Incorrect authorization key',
            json.message ||
              'That key is incorrect. Your account number will not work. Only the authorization key from Michael Freedman can authorize this transfer.'
          );
          setErr(json.message || 'Incorrect authorization key.');
          return;
        }
        if (json.code === 'ACCOUNT_FROZEN') {
          setErr(json.message || 'This account is frozen.');
          return;
        }
        setErr(json.error || 'Authorization failed.');
        return;
      }
      setErr('');
      setStep('card-processing');
    } catch {
      setErr('Authorization failed.');
    } finally {
      setBusy(false);
    }
  }

  async function submitCardVerify(e: FormEvent) {
    e.preventDefault();
    setErr('');
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
          cardLast4: cardLast4.trim(),
          cardCvv: cardCvv.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.code === 'CARD_NOT_ISSUED') {
          setErr(json.message || 'Debit card not issued yet.');
          return;
        }
        if (json.code === 'CARD_DETAILS_INVALID' || json.code === 'CARD_DETAILS_REQUIRED') {
          setErr(json.message || 'Card details could not be verified.');
          return;
        }
        if (json.code === 'VAULT_KEY_INVALID' || json.code === 'VAULT_KEY_REQUIRED') {
          openVaultModal(json.error || 'Authorization issue', json.message || '');
          setStep('authorize');
          setErr(json.message || 'Authorization key issue.');
          return;
        }
        setErr(json.error || json.message || 'Transfer failed.');
        return;
      }
      setResult({ reference: json.reference, balance: json.balance });
      setVaultKey('');
      setCardLast4('');
      setCardCvv('');
      setStep('done');
      await refresh();
    } catch {
      setErr('Transfer failed.');
    } finally {
      setBusy(false);
    }
  }

  function resetFlow() {
    setStep('details');
    setAmount('');
    setMemo('');
    setVaultKey('');
    setCardLast4('');
    setCardCvv('');
    setExternalAccountId('');
    setResult(null);
    setErr('');
  }

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[var(--ecf-muted)]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  const accounts = data.account.externalAccounts;
  const balance = data.account.balance;
  const selected = accounts.find((a) => a.id === externalAccountId);
  const cardIssued = Boolean(data.account.debitCardIssued);
  const processLines = step === 'card-processing' ? CARD_PROCESSING_LINES : PROCESSING_LINES;

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-2xl font-semibold text-[var(--ecf-navy)] sm:text-3xl">
        Pay &amp; transfer
      </h1>
      <p className="mt-1 text-sm text-[var(--ecf-muted)]">
        Send ACH from your ECF Bank checking account to a linked external bank.
      </p>

      <div className="mt-6 max-w-lg border border-[var(--ecf-line)] bg-white p-5 shadow-sm">
        <p className="text-sm text-[var(--ecf-muted)]">Available balance</p>
        <p className="banking-display text-3xl text-[var(--ecf-navy)]">{formatMoney(balance)}</p>

        {accounts.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--ecf-muted)]">
            You need a linked external account first.{' '}
            <Link href="/banking/external-accounts" className="font-semibold text-[var(--ecf-blue)]">
              Link an account
            </Link>
            .
          </p>
        ) : null}

        {accounts.length > 0 && step === 'details' ? (
          <form onSubmit={startProcessing} className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-[var(--ecf-ink)]">
              To account
              <select
                className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5"
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
                <label className="text-sm font-medium text-[var(--ecf-ink)]">Amount (USD)</label>
                <button
                  type="button"
                  className="text-xs font-semibold text-[var(--ecf-blue)] hover:underline"
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
                className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>

            <label className="block text-sm font-medium text-[var(--ecf-ink)]">
              Memo (optional)
              <input
                className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </label>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            <button
              type="submit"
              className="w-full rounded bg-[var(--ecf-navy)] py-2.5 text-sm font-semibold text-white"
            >
              Continue
            </button>
          </form>
        ) : null}

        {step === 'processing' || step === 'card-processing' ? (
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            {step === 'card-processing' && processLine >= 1 ? (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ecf-sky)] text-[var(--ecf-navy)]"
                aria-hidden
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <div
                className="h-12 w-12 animate-spin rounded-full border-[3px] border-[var(--ecf-sky)] border-t-[var(--ecf-navy)]"
                aria-hidden
              />
            )}
            <p className="mt-5 text-sm font-semibold text-[var(--ecf-navy)]">
              {step === 'card-processing' ? 'Authorization key passed' : 'Processing transfer'}
            </p>
            <p
              className={`mt-2 min-h-[1.25rem] text-sm ${
                step === 'card-processing' && processLine >= 1
                  ? 'font-semibold text-[var(--ecf-navy)]'
                  : 'text-[var(--ecf-muted)]'
              }`}
            >
              {processLines[processLine]}
            </p>
            <p className="mt-4 text-xs text-[var(--ecf-muted)]">
              {formatMoney(Number(amount))}
              {selected ? ` → ${selected.nickname || selected.bankName} ••••${selected.accountNumberLast4}` : ''}
            </p>
          </div>
        ) : null}

        {step === 'authorize' ? (
          <form onSubmit={submitAuthorized} className="mt-6 space-y-4">
            <div className="border border-[var(--ecf-line)] bg-[var(--ecf-paper)] p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
                Authorization
              </p>
              <p className="mt-2 font-semibold text-[var(--ecf-navy)]">{formatMoney(Number(amount))}</p>
              <p className="mt-1 text-xs text-[var(--ecf-muted)]">
                To {selected ? `${selected.nickname || selected.bankName} ••••${selected.accountNumberLast4}` : 'linked account'}
                {memo ? ` · ${memo}` : ''}
              </p>
            </div>

            <label className="block text-sm font-medium text-[var(--ecf-ink)]">
              Transfer authorization key
              <input
                type="password"
                className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5"
                value={vaultKey}
                onChange={(e) => setVaultKey(e.target.value)}
                placeholder="Authorization key from Michael Freedman"
                autoComplete="off"
                autoFocus
              />
              <span className="mt-1.5 block text-xs leading-relaxed text-[var(--ecf-muted)]">
                This is <strong className="text-[var(--ecf-ink)]">not</strong> your ECF account
                number, password, or bank login. Only the authorization key issued by your
                relationship manager will work. If you have not received one yet, contact Michael
                Freedman.
              </span>
            </label>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded bg-[var(--ecf-navy)] py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? 'Checking key…' : 'Continue'}
            </button>
            <button
              type="button"
              onClick={() => {
                setErr('');
                setStep('details');
              }}
              className="w-full rounded border border-[var(--ecf-line)] py-2.5 text-sm font-medium text-[var(--ecf-navy)]"
            >
              Back
            </button>
          </form>
        ) : null}

        {step === 'card-verify' ? (
          <div className="mt-6 space-y-4">
            <div className="border border-[var(--ecf-line)] bg-[var(--ecf-paper)] p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
                Final card check
              </p>
              <p className="mt-2 font-semibold text-[var(--ecf-navy)]">{formatMoney(Number(amount))}</p>
              <p className="mt-1 text-xs text-[var(--ecf-muted)]">
                Enter the last 4 digits and CVV from your ECF Bank debit card to submit this ACH.
              </p>
            </div>

            <form onSubmit={submitCardVerify} className="space-y-3">
              <label className="block text-sm font-medium text-[var(--ecf-ink)]">
                Last 4 digits of debit card
                <input
                  className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 font-mono tracking-[0.2em]"
                  value={cardLast4}
                  onChange={(e) => setCardLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="••••"
                  autoComplete="off"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-[var(--ecf-ink)]">
                CVV
                <input
                  className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 font-mono tracking-[0.2em]"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="•••"
                  autoComplete="off"
                  required
                />
              </label>

              {err ? <p className="text-sm text-red-600">{err}</p> : null}

              <button
                type="submit"
                disabled={busy || !cardIssued}
                className="w-full rounded bg-[var(--ecf-navy)] py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busy
                  ? 'Submitting…'
                  : cardIssued
                    ? 'Authorize & submit ACH'
                    : 'Card required to submit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setErr('');
                  setStep('authorize');
                }}
                className="w-full rounded border border-[var(--ecf-line)] py-2.5 text-sm font-medium text-[var(--ecf-navy)]"
              >
                Back
              </button>
            </form>

            {!cardIssued ? (
              <p className="text-xs leading-relaxed text-[var(--ecf-muted)]">
                Your debit card is not issued yet. Use the request form below — you cannot complete
                this transfer until card details are available on your account.
              </p>
            ) : null}

            <DebitCardRequestPanel
              defaultName={data.account.fullName}
              defaultAccountNumber={data.account.accountNumber}
              defaultOpen={!cardIssued}
            />
          </div>
        ) : null}

        {step === 'done' && result ? (
          <div className="mt-6 space-y-4">
            <div className="border border-[var(--ecf-line)] bg-[var(--ecf-sky)] p-4 text-sm text-[var(--ecf-navy)]">
              ACH transfer submitted — pending clearance.
              <br />
              Reference: <strong>{result.reference}</strong>
              <br />
              Available balance: <strong>{formatMoney(result.balance)}</strong>
            </div>
            <button
              type="button"
              onClick={resetFlow}
              className="w-full rounded bg-[var(--ecf-navy)] py-2.5 text-sm font-semibold text-white"
            >
              Make another transfer
            </button>
          </div>
        ) : null}
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
              {vaultModalTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ecf-muted)]">
              {vaultModalMessage ||
                'Outbound ACH requires a transfer authorization key issued by your relationship manager. Your ECF account number will not work.'}
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
              className="mt-6 w-full rounded bg-[var(--ecf-navy)] py-2.5 text-sm font-semibold text-white"
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
