import { getSupabaseAdmin } from '@/lib/supabase/admin';
import {
  buildSnapshot,
  lynnSeedDelivery,
  type DeliveryRecord,
  type TrackingSnapshot,
} from '@/lib/delivery/route';

type DeliveryRow = {
  tracking_number: string;
  recipient_name: string;
  address_line1: string;
  city: string;
  state: string;
  postal_code: string;
  origin_label: string;
  destination_label: string;
  started_at: string;
  paused: boolean;
  paused_at: string | null;
  accumulated_pause_ms: number | string;
  total_drive_hours: number | string;
  status: DeliveryRecord['status'];
  service_level: string;
  notice_title?: string | null;
  notice_body?: string | null;
  notice_image_url?: string | null;
  notice_active?: boolean | null;
};

/** In-memory fallback when Supabase table is not ready yet */
let softLynn: DeliveryRecord | null = null;

function getSoftLynn(): DeliveryRecord {
  if (!softLynn) softLynn = lynnSeedDelivery();
  return softLynn;
}

function setSoftLynn(d: DeliveryRecord) {
  softLynn = d;
}

function rowToDelivery(row: DeliveryRow): DeliveryRecord {
  return {
    trackingNumber: row.tracking_number,
    recipientName: row.recipient_name,
    addressLine1: row.address_line1,
    city: row.city,
    state: row.state,
    postalCode: row.postal_code,
    originLabel: row.origin_label,
    destinationLabel: row.destination_label,
    startedAt: row.started_at,
    paused: Boolean(row.paused),
    pausedAt: row.paused_at,
    accumulatedPauseMs: Number(row.accumulated_pause_ms) || 0,
    totalDriveHours: Number(row.total_drive_hours) || 44,
    status: row.status,
    serviceLevel: row.service_level,
    noticeTitle: row.notice_title || null,
    noticeBody: row.notice_body || null,
    noticeImageUrl: row.notice_image_url || null,
    noticeActive: Boolean(row.notice_active),
  };
}

function normalizeTracking(tracking: string): string {
  return tracking.replace(/\s+/g, '').toUpperCase();
}

export async function getDelivery(trackingNumber: string): Promise<DeliveryRecord | null> {
  const tracking = normalizeTracking(trackingNumber);
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('ecf_deliveries')
      .select('*')
      .eq('tracking_number', tracking)
      .maybeSingle();
    if (error) throw error;
    if (data) return rowToDelivery(data as DeliveryRow);
  } catch {
    const soft = getSoftLynn();
    return tracking === soft.trackingNumber ? soft : null;
  }
  const soft = getSoftLynn();
  return tracking === soft.trackingNumber ? soft : null;
}

export async function listDeliveries(): Promise<DeliveryRecord[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('ecf_deliveries')
      .select('*')
      .order('started_at', { ascending: false });
    if (error) throw error;
    const rows = ((data || []) as DeliveryRow[]).map(rowToDelivery);
    if (rows.length) return rows;
  } catch {
    /* fall through */
  }
  return [getSoftLynn()];
}

export async function getTrackingSnapshot(trackingNumber: string): Promise<TrackingSnapshot | null> {
  const delivery = await getDelivery(trackingNumber);
  if (!delivery) return null;
  const snap = buildSnapshot(delivery);
  if (snap.delivered && delivery.status !== 'delivered') {
    try {
      await getSupabaseAdmin()
        .from('ecf_deliveries')
        .update({ status: 'delivered', paused: false, paused_at: null })
        .eq('tracking_number', delivery.trackingNumber);
    } catch {
      setSoftLynn({ ...delivery, status: 'delivered', paused: false, pausedAt: null });
    }
  }
  return snap;
}

export async function pauseDelivery(trackingNumber: string): Promise<DeliveryRecord> {
  const delivery = await getDelivery(trackingNumber);
  if (!delivery) throw new Error('Shipment not found');
  if (delivery.paused) return delivery;

  const pausedAt = new Date().toISOString();
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('ecf_deliveries')
      .update({
        paused: true,
        paused_at: pausedAt,
        status: 'paused',
      })
      .eq('tracking_number', normalizeTracking(trackingNumber))
      .select('*')
      .maybeSingle();
    if (!error && data) return rowToDelivery(data as DeliveryRow);
  } catch {
    /* soft */
  }
  const next = { ...delivery, paused: true, pausedAt, status: 'paused' as const };
  setSoftLynn(next);
  return next;
}

export async function resumeDelivery(trackingNumber: string): Promise<DeliveryRecord> {
  const delivery = await getDelivery(trackingNumber);
  if (!delivery) throw new Error('Shipment not found');
  if (!delivery.paused) return delivery;

  let extra = 0;
  if (delivery.pausedAt) {
    extra = Math.max(0, Date.now() - new Date(delivery.pausedAt).getTime());
  }
  const accumulated = delivery.accumulatedPauseMs + extra;

  try {
    const { data, error } = await getSupabaseAdmin()
      .from('ecf_deliveries')
      .update({
        paused: false,
        paused_at: null,
        accumulated_pause_ms: accumulated,
        status: 'in_transit',
      })
      .eq('tracking_number', normalizeTracking(trackingNumber))
      .select('*')
      .maybeSingle();
    if (!error && data) return rowToDelivery(data as DeliveryRow);
  } catch {
    /* soft */
  }
  const next = {
    ...delivery,
    paused: false,
    pausedAt: null,
    accumulatedPauseMs: accumulated,
    status: 'in_transit' as const,
  };
  setSoftLynn(next);
  return next;
}

export async function ensureLynnSeed(): Promise<void> {
  const seed = getSoftLynn();
  try {
    const { data } = await getSupabaseAdmin()
      .from('ecf_deliveries')
      .select('tracking_number')
      .eq('tracking_number', seed.trackingNumber)
      .maybeSingle();
    if (data) return;

    await getSupabaseAdmin().from('ecf_deliveries').insert({
      tracking_number: seed.trackingNumber,
      recipient_name: seed.recipientName,
      address_line1: seed.addressLine1,
      city: seed.city,
      state: seed.state,
      postal_code: seed.postalCode,
      origin_label: seed.originLabel,
      destination_label: seed.destinationLabel,
      started_at: seed.startedAt,
      paused: false,
      paused_at: null,
      accumulated_pause_ms: 0,
      total_drive_hours: seed.totalDriveHours,
      status: 'in_transit',
      service_level: seed.serviceLevel,
    });
  } catch {
    /* SQL not run yet — soft mode active */
  }
}
