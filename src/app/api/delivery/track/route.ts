import { NextResponse } from 'next/server';
import { getTrackingSnapshot } from '@/lib/delivery/store';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tracking = String(url.searchParams.get('tracking') || '').trim();
    if (!tracking) {
      return NextResponse.json({ error: 'Tracking number is required.' }, { status: 400 });
    }
    const snapshot = await getTrackingSnapshot(tracking);
    if (!snapshot) {
      return NextResponse.json({ error: 'Tracking number not found.' }, { status: 404 });
    }
    return NextResponse.json({ shipment: snapshot });
  } catch (err) {
    console.error('[delivery/track]', err);
    // Fallback path when Supabase table not ready — still resolve Lynn seed
    try {
      const url = new URL(req.url);
      const tracking = String(url.searchParams.get('tracking') || '').trim();
      const snapshot = await getTrackingSnapshot(tracking);
      if (snapshot) return NextResponse.json({ shipment: snapshot });
    } catch {
      /* ignore */
    }
    return NextResponse.json(
      { error: 'Tracking temporarily unavailable. Confirm the delivery SQL has been run.' },
      { status: 500 }
    );
  }
}
