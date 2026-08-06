'use client';

import Image from 'next/image';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { CA_TO_CT_ROUTE } from '@/lib/delivery/route';

type Shipment = {
  trackingNumber: string;
  recipientName: string;
  destination: string;
  origin: string;
  serviceLevel: string;
  status: string;
  statusLabel: string;
  progress: number;
  hoursElapsed: number;
  hoursRemaining: number;
  eta: string;
  currentLabel: string;
  currentFacility: string;
  lat: number;
  lng: number;
  paused: boolean;
  delivered: boolean;
  noticeActive?: boolean;
  noticeTitle?: string | null;
  noticeBody?: string | null;
  noticeImageUrl?: string | null;
  scans: {
    id: string;
    at: string;
    title: string;
    detail: string;
    city: string;
    state: string;
  }[];
};

function formatHours(h: number) {
  if (h <= 0) return '0h 0m';
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  return `${hours}h ${mins}m`;
}

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function RouteMap({ progress, lat, lng }: { progress: number; lat: number; lng: number }) {
  const points = useMemo(() => {
    const minLng = -118.5;
    const maxLng = -72.0;
    const minLat = 33.5;
    const maxLat = 42.5;
    return CA_TO_CT_ROUTE.map((wp) => ({
      x: ((wp.lng - minLng) / (maxLng - minLng)) * 100,
      y: (1 - (wp.lat - minLat) / (maxLat - minLat)) * 100,
    }));
  }, []);

  const marker = useMemo(() => {
    const minLng = -118.5;
    const maxLng = -72.0;
    const minLat = 33.5;
    const maxLat = 42.5;
    return {
      x: ((lng - minLng) / (maxLng - minLng)) * 100,
      y: (1 - (lat - minLat) / (maxLat - minLat)) * 100,
    };
  }, [lat, lng]);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="relative overflow-hidden rounded border border-[var(--ecf-line)] bg-[var(--ecf-sky)]">
      <svg viewBox="0 0 100 56" className="h-auto w-full" role="img" aria-label="Delivery route map">
        <rect width="100" height="56" fill="#e8f1fb" />
        <path d={pathD} fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="1.5 1" />
        <path
          d={pathD}
          fill="none"
          stroke="#003087"
          strokeWidth="1.2"
          pathLength={100}
          strokeDasharray={`${progress * 100} 100`}
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === 0 || i === points.length - 1 ? 1.4 : 0.7}
            fill={i / (points.length - 1) <= progress ? '#003087' : '#94a3b8'}
          />
        ))}
        <circle cx={marker.x} cy={marker.y} r="2.2" fill="#0f5ebd" stroke="#fff" strokeWidth="0.6" />
      </svg>
      <div className="flex justify-between px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--ecf-muted)]">
        <span>Los Angeles, CA</span>
        <span>Niantic, CT</span>
      </div>
    </div>
  );
}

export default function TrackDeliveryPage() {
  const [trackingInput, setTrackingInput] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (tracking: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/delivery/track?tracking=${encodeURIComponent(tracking)}`);
      const data = await res.json();
      if (!res.ok) {
        setShipment(null);
        setError(data.error || 'Not found');
        return;
      }
      setShipment(data.shipment);
    } catch {
      setError('Could not load tracking.');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!shipment || shipment.delivered || shipment.paused) return;
    const id = window.setInterval(() => {
      load(shipment.trackingNumber);
    }, 20_000);
    return () => window.clearInterval(id);
  }, [shipment, load]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (trackingInput.trim()) load(trackingInput.trim());
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[var(--ecf-line)] bg-white">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ecf-blue)]">
              Edwin Castro Foundation
            </p>
            <p className="display text-lg font-semibold text-[var(--ecf-navy)]">Delivery Tracking</p>
          </div>
        </div>
      </header>

      <section className="relative min-h-[320px] overflow-hidden bg-[var(--ecf-navy-deep)] text-white sm:min-h-[380px]">
        <Image
          src="/delivery/ecf-delivery-team.jpg"
          alt="ECF Delivery Team and security escort with delivery trucks"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ecf-navy-deep)] via-[var(--ecf-navy-deep)]/85 to-[var(--ecf-navy)]/40" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Secure escorted transport
          </p>
          <h1 className="display mt-3 max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
            Track your ECF delivery
          </h1>
          <p className="mt-4 max-w-lg text-sm text-white/80 sm:text-base">
            Live status for foundation shipments moving under ECF Delivery Team and external security
            escort.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 border border-[var(--ecf-line)] bg-white p-4 shadow-sm sm:flex-row sm:items-end"
        >
          <label className="block flex-1 text-sm font-medium text-[var(--ecf-ink)]">
            Tracking number
            <input
              className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 font-mono text-sm"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value.toUpperCase())}
              placeholder="Enter tracking number"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-[var(--ecf-navy)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Tracking…' : 'Track'}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {shipment ? (
          <div className="mt-8 space-y-6">
            {shipment.noticeActive && (shipment.noticeTitle || shipment.noticeBody || shipment.noticeImageUrl) ? (
              <div className="overflow-hidden border border-[var(--ecf-line)] bg-white shadow-sm">
                {shipment.noticeImageUrl ? (
                  <div className="relative aspect-[16/9] w-full bg-[var(--ecf-paper)] sm:aspect-[21/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shipment.noticeImageUrl}
                      alt={shipment.noticeTitle || 'Delivery update'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-blue)]">
                    Delivery update
                  </p>
                  {shipment.noticeTitle ? (
                    <h2 className="display mt-2 text-xl font-semibold text-[var(--ecf-navy)] sm:text-2xl">
                      {shipment.noticeTitle}
                    </h2>
                  ) : null}
                  {shipment.noticeBody ? (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--ecf-ink)]">
                      {shipment.noticeBody}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="border border-[var(--ecf-line)] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ecf-muted)]">
                      Status
                    </p>
                    <p
                      className={`display mt-1 text-2xl font-semibold ${
                        shipment.paused ? 'text-amber-800' : 'text-[var(--ecf-navy)]'
                      }`}
                    >
                      {shipment.statusLabel}
                    </p>
                    <p className="mt-1 font-mono text-sm text-[var(--ecf-muted)]">
                      {shipment.trackingNumber}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-[var(--ecf-muted)]">Hours remaining</p>
                    <p className="text-xl font-semibold tabular-nums text-[var(--ecf-navy)]">
                      {formatHours(shipment.hoursRemaining)}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-1.5 flex justify-between text-xs text-[var(--ecf-muted)]">
                    <span>{Math.round(shipment.progress * 100)}% complete</span>
                    <span>
                      {formatHours(shipment.hoursElapsed)} of {formatHours(44)} drive time
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--ecf-paper)]">
                    <div
                      className="h-full rounded-full bg-[var(--ecf-navy)] transition-all duration-700"
                      style={{ width: `${Math.min(100, shipment.progress * 100)}%` }}
                    />
                  </div>
                </div>

                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[var(--ecf-muted)]">Current location</dt>
                    <dd className="mt-1 font-semibold text-[var(--ecf-ink)]">{shipment.currentLabel}</dd>
                    <dd className="text-xs text-[var(--ecf-muted)]">{shipment.currentFacility}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[var(--ecf-muted)]">Recipient</dt>
                    <dd className="mt-1 font-semibold text-[var(--ecf-ink)]">{shipment.recipientName}</dd>
                    <dd className="text-xs text-[var(--ecf-muted)]">{shipment.destination}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[var(--ecf-muted)]">Origin</dt>
                    <dd className="mt-1">{shipment.origin}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[var(--ecf-muted)]">Est. arrival</dt>
                    <dd className="mt-1">{shipment.delivered ? 'Delivered' : formatWhen(shipment.eta)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase text-[var(--ecf-muted)]">Service</dt>
                    <dd className="mt-1">{shipment.serviceLevel}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3">
                <RouteMap progress={shipment.progress} lat={shipment.lat} lng={shipment.lng} />
                <p className="text-xs text-[var(--ecf-muted)]">
                  Corridor updates as the escorted convoy progresses east from California to Connecticut.
                  Location refreshes automatically while in transit.
                </p>
              </div>
            </div>

            <div className="border border-[var(--ecf-line)] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--ecf-navy)]">Tracking history</h2>
              <ul className="mt-4 space-y-0">
                {shipment.scans.map((scan, idx) => (
                  <li key={scan.id} className="relative flex gap-3 pb-5 last:pb-0">
                    {idx < shipment.scans.length - 1 ? (
                      <span className="absolute left-[7px] top-4 h-[calc(100%-8px)] w-px bg-[var(--ecf-line)]" />
                    ) : null}
                    <span className="relative z-[1] mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--ecf-navy)] bg-white" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[var(--ecf-ink)]">{scan.title}</p>
                      <p className="text-sm text-[var(--ecf-muted)]">{scan.detail}</p>
                      <p className="mt-1 text-xs text-[var(--ecf-muted)]">
                        {scan.city}, {scan.state} · {formatWhen(scan.at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-[var(--ecf-line)] bg-[var(--ecf-paper)] px-4 py-6 text-center text-xs text-[var(--ecf-muted)]">
        ECF Delivery Tracking · Edwin Castro Foundation · For authorized recipients
      </footer>
    </div>
  );
}
