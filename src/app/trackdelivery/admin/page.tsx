'use client';

import Link from 'next/link';
import { FormEvent, useCallback, useState } from 'react';
import { CA_TO_CT_ROUTE } from '@/lib/delivery/route';

type AdminShipment = {
  trackingNumber: string;
  recipientName: string;
  destination: string;
  origin: string;
  statusLabel: string;
  progress: number;
  hoursElapsed: number;
  hoursRemaining: number;
  currentLabel: string;
  currentFacility: string;
  paused: boolean;
  delivered: boolean;
  eta: string;
  scans: { id: string; at: string; title: string; city: string; state: string }[];
  raw?: {
    paused: boolean;
    pausedAt: string | null;
    accumulatedPauseMs: number;
    startedAt: string;
  };
};

function formatHours(h: number) {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  return `${hours}h ${mins}m`;
}

export default function DeliveryAdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [shipments, setShipments] = useState<AdminShipment[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback(async (adminKey: string) => {
    const res = await fetch(`/api/delivery/admin?key=${encodeURIComponent(adminKey)}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Unauthorized');
      setAuthed(false);
      return;
    }
    setShipments(data.shipments);
    setAuthed(true);
    setError('');
    if (!selected && data.shipments[0]) {
      setSelected(data.shipments[0].trackingNumber);
    }
  }, [selected]);

  async function unlock(e: FormEvent) {
    e.preventDefault();
    await load(key);
  }

  async function run(action: 'pause' | 'resume', trackingNumber: string) {
    setBusy(true);
    setMsg('');
    setError('');
    try {
      const res = await fetch('/api/delivery/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ecf-admin-key': key,
        },
        body: JSON.stringify({ action, trackingNumber }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Action failed');
        return;
      }
      setMsg(action === 'pause' ? 'Delivery paused.' : 'Delivery resumed.');
      await load(key);
    } finally {
      setBusy(false);
    }
  }

  const active = shipments.find((s) => s.trackingNumber === selected) || shipments[0];

  return (
    <div className="min-h-screen bg-[var(--ecf-paper)]">
      <header className="border-b border-[var(--ecf-line)] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-blue)]">
              ECF Delivery Ops
            </p>
            <h1 className="display text-xl font-semibold text-[var(--ecf-navy)]">Delivery admin</h1>
          </div>
          <Link href="/trackdelivery" className="text-sm font-semibold text-[var(--ecf-navy)]">
            Public tracking
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {!authed ? (
          <form onSubmit={unlock} className="max-w-md space-y-3 border border-[var(--ecf-line)] bg-white p-5">
            <p className="text-sm text-[var(--ecf-muted)]">
              Admin key (same as banking demo key unless{' '}
              <code className="rounded bg-[var(--ecf-paper)] px-1">ECF_DELIVERY_ADMIN_KEY</code> is set).
            </p>
            <input
              type="password"
              className="w-full rounded border border-[var(--ecf-line)] px-3 py-2.5"
              placeholder="Admin key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" className="rounded bg-[var(--ecf-navy)] px-4 py-2.5 text-sm font-semibold text-white">
              Unlock
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {(error || msg) && (
              <p className={`text-sm ${error ? 'text-red-600' : 'text-[var(--ecf-navy)]'}`}>{error || msg}</p>
            )}

            <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
              <div className="border border-[var(--ecf-line)] bg-white p-3">
                <p className="px-2 text-xs font-semibold uppercase text-[var(--ecf-muted)]">Shipments</p>
                <ul className="mt-2 space-y-1">
                  {shipments.map((s) => (
                    <li key={s.trackingNumber}>
                      <button
                        type="button"
                        onClick={() => setSelected(s.trackingNumber)}
                        className={`w-full rounded px-3 py-2.5 text-left text-sm ${
                          selected === s.trackingNumber
                            ? 'bg-[var(--ecf-navy)] text-white'
                            : 'hover:bg-[var(--ecf-paper)]'
                        }`}
                      >
                        <span className="block font-semibold">{s.recipientName}</span>
                        <span className="block font-mono text-[11px] opacity-80">{s.trackingNumber}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {active ? (
                <div className="space-y-4 border border-[var(--ecf-line)] bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--ecf-navy)]">{active.recipientName}</h2>
                      <p className="font-mono text-sm text-[var(--ecf-muted)]">{active.trackingNumber}</p>
                      <p className="mt-1 text-sm">{active.destination}</p>
                    </div>
                    <div className="flex gap-2">
                      {active.paused ? (
                        <button
                          type="button"
                          disabled={busy || active.delivered}
                          onClick={() => run('resume', active.trackingNumber)}
                          className="rounded bg-[var(--ecf-navy)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          Play / Resume
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={busy || active.delivered}
                          onClick={() => run('pause', active.trackingNumber)}
                          className="rounded border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50"
                        >
                          Pause
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => load(key)}
                        className="rounded border border-[var(--ecf-line)] px-4 py-2 text-sm font-semibold"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-4">
                    <div className="bg-[var(--ecf-paper)] p-3">
                      <p className="text-[10px] uppercase text-[var(--ecf-muted)]">Status</p>
                      <p className="font-semibold">{active.statusLabel}</p>
                    </div>
                    <div className="bg-[var(--ecf-paper)] p-3">
                      <p className="text-[10px] uppercase text-[var(--ecf-muted)]">Progress</p>
                      <p className="font-semibold">{Math.round(active.progress * 100)}%</p>
                    </div>
                    <div className="bg-[var(--ecf-paper)] p-3">
                      <p className="text-[10px] uppercase text-[var(--ecf-muted)]">Elapsed</p>
                      <p className="font-semibold">{formatHours(active.hoursElapsed)}</p>
                    </div>
                    <div className="bg-[var(--ecf-paper)] p-3">
                      <p className="text-[10px] uppercase text-[var(--ecf-muted)]">Remaining</p>
                      <p className="font-semibold">{formatHours(active.hoursRemaining)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--ecf-navy)]">Current movement</p>
                    <p className="mt-1 text-sm">{active.currentLabel}</p>
                    <p className="text-xs text-[var(--ecf-muted)]">{active.currentFacility}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--ecf-navy)]">Route checkpoints</p>
                    <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto text-sm">
                      {CA_TO_CT_ROUTE.map((wp) => {
                        const passed = active.hoursElapsed >= wp.hoursFromStart;
                        return (
                          <li
                            key={wp.id}
                            className={`flex justify-between gap-2 rounded px-2 py-1.5 ${
                              passed ? 'bg-[var(--ecf-sky)]' : 'text-[var(--ecf-muted)]'
                            }`}
                          >
                            <span>
                              {wp.label}
                              <span className="ml-2 text-xs opacity-70">{wp.facility}</span>
                            </span>
                            <span className="shrink-0 tabular-nums text-xs">{wp.hoursFromStart}h</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--ecf-navy)]">Recent scans</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {active.scans.slice(0, 8).map((s) => (
                        <li key={s.id} className="border-b border-[var(--ecf-line)] pb-2">
                          <span className="font-medium">{s.title}</span>
                          <span className="text-[var(--ecf-muted)]">
                            {' '}
                            · {s.city}, {s.state}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
