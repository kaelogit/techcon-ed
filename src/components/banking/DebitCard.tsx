'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { deriveDebitCard, maskPanGroups } from '@/lib/banking/card';
import { DebitCardRequestPanel } from '@/components/banking/DebitCardRequestPanel';

export { DEBIT_CARD_REQUEST_EMAIL, DEBIT_CARD_ISSUE_FEE } from '@/lib/banking/card';

export function DebitCard({
  accountNumber,
  cardholderName,
  issued = false,
  onCopyAccount,
  copied,
}: {
  accountNumber: string;
  cardholderName: string;
  /** When false, PAN/CVV stay locked and the request flow is shown. */
  issued?: boolean;
  onCopyAccount?: () => void;
  copied?: boolean;
}) {
  const card = deriveDebitCard(accountNumber);
  const [reveal, setReveal] = useState(false);
  const [showLockedNotice, setShowLockedNotice] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);

  return (
    <div className="space-y-3">
      <section className="relative isolate overflow-hidden rounded-2xl bg-[var(--ecf-navy-deep)] text-white shadow-lg">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse at 100% 0%, rgba(15,94,189,.45), transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(255,255,255,.08), transparent 45%), linear-gradient(145deg, #001f5c 0%, #003087 55%, #0a1628 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute -right-8 top-6 h-28 w-28 rounded-full border border-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-2 top-14 h-20 w-20 rounded-full border border-white/10"
          aria-hidden
        />

        {!issued ? (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
            Not issued
          </div>
        ) : null}

        <div className="relative flex aspect-[1.586/1] flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-banking-display)] text-sm font-semibold tracking-wide">
                ECF Bank
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/55">Debit</p>
            </div>
            <div className="flex items-center gap-2">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden className="text-white/70">
                <path
                  d="M3 9c2.2-2.2 5.8-2.2 8 0M5.2 9c1.3-1.3 3.3-1.3 4.6 0M7.4 9c.5-.5 1.3-.5 1.8 0"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="h-8 w-11 overflow-hidden rounded-md border border-amber-200/40"
                style={{
                  background:
                    'linear-gradient(135deg, #f5d78e 0%, #c9a227 40%, #e8c547 70%, #a67c00 100%)',
                }}
                aria-hidden
              >
                <div className="grid h-full grid-cols-3 grid-rows-3 opacity-40">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-black/20" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[15px] tracking-[0.18em] sm:text-lg sm:tracking-[0.22em]">
              {issued ? maskPanGroups(card.groups, reveal) : '•••• •••• •••• ••••'}
            </p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">Cardholder</p>
                <p className="truncate text-xs font-medium uppercase tracking-wide sm:text-sm">
                  {cardholderName}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">Valid thru</p>
                <p className="font-mono text-sm font-semibold tabular-nums">
                  {issued && reveal ? card.expLabel : '••/••'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 bg-black/20 px-4 py-2.5 text-[11px]">
          {issued ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-white/50">CVV</span>
                <span className="font-mono font-semibold tabular-nums">
                  {reveal ? card.cvv : '•••'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setReveal((v) => !v)}
                className="font-semibold text-white/90 underline-offset-2 hover:underline"
              >
                {reveal ? 'Hide details' : 'Show number & CVV'}
              </button>
              {onCopyAccount ? (
                <button
                  type="button"
                  onClick={onCopyAccount}
                  className="ml-auto font-semibold text-white/90 underline-offset-2 hover:underline"
                >
                  {copied ? 'Account # copied' : 'Copy account #'}
                </button>
              ) : null}
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-white/50">CVV</span>
                <span className="font-mono font-semibold tabular-nums">•••</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowLockedNotice(true);
                  setOpenRequest(true);
                }}
                className="font-semibold text-white/90 underline-offset-2 hover:underline"
              >
                View card details
              </button>
              {onCopyAccount ? (
                <button
                  type="button"
                  onClick={onCopyAccount}
                  className="ml-auto font-semibold text-white/90 underline-offset-2 hover:underline"
                >
                  {copied ? 'Account # copied' : 'Copy account #'}
                </button>
              ) : null}
            </>
          )}
        </div>
      </section>

      {!issued && showLockedNotice ? (
        <div className="rounded-xl border border-[var(--ecf-line)] bg-white p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ecf-sky)] text-[var(--ecf-navy)]">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ecf-navy)]">
                Debit card not issued yet
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ecf-muted)]">
                Card details are unavailable until an ECF Bank debit card has been issued and mailed
                to you. Submit a request below to begin.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {!issued ? (
        <DebitCardRequestPanel
          defaultName={cardholderName}
          defaultAccountNumber={accountNumber}
          defaultOpen={openRequest}
        />
      ) : null}
    </div>
  );
}
