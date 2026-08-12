'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import {
  DEBIT_CARD_ISSUE_FEE,
  DEBIT_CARD_REQUEST_EMAIL,
} from '@/lib/banking/card';

export function DebitCardRequestPanel({
  defaultName = '',
  defaultAccountNumber = '',
  defaultOpen = false,
}: {
  defaultName?: string;
  defaultAccountNumber?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [fullName, setFullName] = useState(defaultName);
  const [accountNumber, setAccountNumber] = useState(defaultAccountNumber);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  useEffect(() => {
    if (defaultName) setFullName(defaultName);
  }, [defaultName]);

  useEffect(() => {
    if (defaultAccountNumber) setAccountNumber(defaultAccountNumber);
  }, [defaultAccountNumber]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const res = await fetch('/api/banking/debit-card-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          accountNumber: accountNumber.trim(),
          email: email.trim(),
          phone: phone.trim(),
          mailingAddress: mailingAddress.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error || 'Could not submit request.');
        return;
      }
      setDone(true);
    } catch {
      setErr('Could not submit request. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--ecf-line)] bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[var(--ecf-navy)]">
          How to get your card?
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--ecf-muted)] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open ? (
        <div className="space-y-4 border-t border-[var(--ecf-line)] bg-[var(--ecf-paper)] px-4 py-4">
          <p className="text-xs leading-relaxed text-[var(--ecf-muted)]">
            A physical ECF Bank debit card must be requested separately. Issuing and mailing costs{' '}
            <strong className="text-[var(--ecf-ink)] tabular-nums">
              ${DEBIT_CARD_ISSUE_FEE.toLocaleString('en-US')}
            </strong>
            . After your request is submitted, expect{' '}
            <strong className="text-[var(--ecf-ink)]">{DEBIT_CARD_REQUEST_EMAIL}</strong> to reach out
            soon.
          </p>

          {done ? (
            <div className="rounded-lg border border-[var(--ecf-line)] bg-white p-3 text-xs leading-relaxed text-[var(--ecf-navy)]">
              <p className="font-semibold">Debit card request submitted</p>
              <p className="mt-1.5 text-[var(--ecf-muted)]">
                A confirmation email was sent to you. Note: debit card delivery costs $
                {DEBIT_CARD_ISSUE_FEE.toLocaleString('en-US')}. Expect{' '}
                {DEBIT_CARD_REQUEST_EMAIL} to reach out to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
                Submit debit card request
              </p>
              <label className="block text-xs font-medium text-[var(--ecf-ink)]">
                Full name
                <input
                  className="mt-1 w-full rounded border border-[var(--ecf-line)] bg-white px-3 py-2 text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </label>
              <label className="block text-xs font-medium text-[var(--ecf-ink)]">
                ECF account number
                <input
                  className="mt-1 w-full rounded border border-[var(--ecf-line)] bg-white px-3 py-2 font-mono text-sm"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  inputMode="numeric"
                  maxLength={12}
                  required
                />
              </label>
              <label className="block text-xs font-medium text-[var(--ecf-ink)]">
                Email
                <input
                  type="email"
                  className="mt-1 w-full rounded border border-[var(--ecf-line)] bg-white px-3 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="block text-xs font-medium text-[var(--ecf-ink)]">
                Phone (optional)
                <input
                  type="tel"
                  className="mt-1 w-full rounded border border-[var(--ecf-line)] bg-white px-3 py-2 text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="block text-xs font-medium text-[var(--ecf-ink)]">
                Mailing address for the card
                <textarea
                  className="mt-1 w-full rounded border border-[var(--ecf-line)] bg-white px-3 py-2 text-sm"
                  rows={2}
                  value={mailingAddress}
                  onChange={(e) => setMailingAddress(e.target.value)}
                  placeholder="Street, city, state, ZIP"
                  required
                />
              </label>
              {err ? <p className="text-xs text-red-600">{err}</p> : null}
              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ecf-navy)] px-3.5 py-2.5 text-xs font-semibold text-white disabled:opacity-60"
              >
                <Mail className="h-3.5 w-3.5" />
                {busy ? 'Submitting…' : 'Submit debit card request'}
              </button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
}
