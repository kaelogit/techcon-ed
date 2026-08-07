'use client';

import { useState } from 'react';
import { formatMoney } from '@/lib/banking/format';

type Offer = {
  id: string;
  description: string;
  amount: number;
};

export function SupportOfferCard({
  offer,
  onDecided,
}: {
  offer: Offer;
  onDecided: () => Promise<void> | void;
}) {
  const [busy, setBusy] = useState<'accept' | 'reject' | null>(null);
  const [error, setError] = useState('');
  const [doneMsg, setDoneMsg] = useState('');

  async function decide(action: 'accept' | 'reject') {
    setBusy(action);
    setError('');
    try {
      const res = await fetch('/api/banking/support-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, transactionId: offer.id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Could not update offer.');
        return;
      }
      setDoneMsg(json.message || (action === 'accept' ? 'Accepted.' : 'Declined.'));
      await onDecided();
    } catch {
      setError('Could not update offer.');
    } finally {
      setBusy(null);
    }
  }

  if (doneMsg) {
    return (
      <div className="mb-5 border border-[var(--ecf-line)] bg-white p-4 text-sm text-[var(--ecf-ink)] shadow-sm">
        <p className="font-medium text-[var(--ecf-navy)]">{doneMsg}</p>
      </div>
    );
  }

  return (
    <div className="mb-5 border border-[var(--ecf-blue)]/30 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-blue)]">
        Additional support
      </p>
      <h2 className="banking-display mt-1 text-xl font-semibold text-[var(--ecf-navy)] sm:text-2xl">
        Foundation offer — {formatMoney(offer.amount)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ecf-ink)]">
        Winners may request additional support. Some requests are granted and some are not. The Foundation
        has put your name forward for this offer. Accept to add it to your available balance, or reject to
        decline.
      </p>
      <p className="mt-2 text-xs text-[var(--ecf-muted)]">{offer.description}</p>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={Boolean(busy)}
          onClick={() => decide('accept')}
          className="rounded bg-[var(--ecf-navy)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy === 'accept' ? 'Accepting…' : 'Accept'}
        </button>
        <button
          type="button"
          disabled={Boolean(busy)}
          onClick={() => decide('reject')}
          className="rounded border border-[var(--ecf-line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ecf-ink)] disabled:opacity-60"
        >
          {busy === 'reject' ? 'Rejecting…' : 'Reject'}
        </button>
      </div>
    </div>
  );
}
