import { NextResponse } from 'next/server';
import { buildSnapshot } from '@/lib/delivery/route';
import {
  ensureLynnSeed,
  listDeliveries,
  pauseDelivery,
  resumeDelivery,
} from '@/lib/delivery/store';

function authorize(req: Request): boolean {
  const key = process.env.ECF_DELIVERY_ADMIN_KEY || process.env.ECF_BANKING_ADMIN_KEY || 'ecf-admin-demo';
  const header = req.headers.get('x-ecf-admin-key') || '';
  const url = new URL(req.url);
  const q = url.searchParams.get('key') || '';
  return header === key || q === key;
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    try {
      await ensureLynnSeed();
    } catch {
      /* table may not exist yet — listDeliveries soft-falls back */
    }
    const deliveries = await listDeliveries();
    return NextResponse.json({
      shipments: deliveries.map((d) => ({
        ...buildSnapshot(d),
        raw: {
          paused: d.paused,
          pausedAt: d.pausedAt,
          accumulatedPauseMs: d.accumulatedPauseMs,
          startedAt: d.startedAt,
        },
      })),
    });
  } catch (err) {
    console.error('[delivery/admin GET]', err);
    return NextResponse.json({ error: 'Could not load deliveries.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const action = String(body.action || '');
    const trackingNumber = String(body.trackingNumber || '').trim();
    if (!trackingNumber) {
      return NextResponse.json({ error: 'trackingNumber required.' }, { status: 400 });
    }

    if (action === 'pause') {
      const d = await pauseDelivery(trackingNumber);
      return NextResponse.json({ ok: true, shipment: buildSnapshot(d) });
    }
    if (action === 'resume' || action === 'play') {
      const d = await resumeDelivery(trackingNumber);
      return NextResponse.json({ ok: true, shipment: buildSnapshot(d) });
    }
    return NextResponse.json({ error: 'Unknown action. Use pause or resume.' }, { status: 400 });
  } catch (err) {
    console.error('[delivery/admin POST]', err);
    const message = err instanceof Error ? err.message : 'Admin action failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
