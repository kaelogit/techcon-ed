'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import type { ClearanceStepId, ClearanceStatus } from '@/lib/banking/clearance';

export type ClearanceStepView = {
  step: ClearanceStepId;
  label: string;
  status: ClearanceStatus;
  originalFilename?: string | null;
  hasDocument: boolean;
};

function statusWord(status: ClearanceStatus): string {
  switch (status) {
    case 'locked':
      return 'Locked';
    case 'open':
      return 'Upload';
    case 'pending':
      return 'Pending';
    case 'verified':
      return 'Verified';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
}

export function ClearancePanel({
  steps,
  complete,
  onUploaded,
}: {
  steps: ClearanceStepView[];
  complete: boolean;
  onUploaded: () => Promise<void> | void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeStep, setActiveStep] = useState<ClearanceStepId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (complete) {
    return (
      <div className="mb-5 border border-[var(--ecf-line)] bg-white px-4 py-3 text-sm text-[var(--ecf-navy)] shadow-sm">
        Clearance complete
      </div>
    );
  }

  async function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const step = activeStep;
    e.target.value = '';
    if (!file || !step) return;
    setBusy(true);
    setError('');
    try {
      const form = new FormData();
      form.set('step', step);
      form.set('file', file);
      const res = await fetch('/api/banking/clearance/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Upload failed.');
        return;
      }
      await onUploaded();
    } catch {
      setError('Upload failed.');
    } finally {
      setBusy(false);
      setActiveStep(null);
    }
  }

  function startUpload(step: ClearanceStepId) {
    setError('');
    setActiveStep(step);
    inputRef.current?.click();
  }

  const current = steps.find((x) => x.status === 'open' || x.status === 'rejected');
  // Only the live step (open / pending / rejected). Hide locked future and verified
  // history so Clearance never reads like a multi-step ladder.
  const visible = steps.filter(
    (s) => s.status === 'open' || s.status === 'pending' || s.status === 'rejected',
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <section className="mb-5 border border-[var(--ecf-line)] bg-white shadow-sm">
      <div className="border-b border-[var(--ecf-line)] px-4 py-3 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-muted)]">
          Clearance
        </p>
      </div>
      <ul className="divide-y divide-[var(--ecf-line)]">
        {visible.map((s) => {
          const canUpload = Boolean(current) && current!.step === s.step;
          return (
            <li key={s.step} className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <span className="min-w-0 flex-1 text-sm font-medium text-[var(--ecf-ink)]">{s.label}</span>
              <span
                className={`shrink-0 text-xs font-semibold ${
                  s.status === 'verified'
                    ? 'text-[var(--ecf-navy)]'
                    : s.status === 'pending'
                      ? 'text-[var(--ecf-blue)]'
                      : s.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-[var(--ecf-muted)]'
                }`}
              >
                {statusWord(s.status)}
              </span>
              {canUpload ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => startUpload(s.step)}
                  className="shrink-0 rounded bg-[var(--ecf-navy)] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {busy && activeStep === s.step
                    ? '…'
                    : s.status === 'rejected'
                      ? 'Upload again'
                      : 'Upload PDF'}
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
      {error ? <p className="px-4 pb-3 text-sm text-red-600 sm:px-5">{error}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={onFileChange}
      />
    </section>
  );
}
