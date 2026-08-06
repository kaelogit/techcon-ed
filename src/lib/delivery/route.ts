/** Cross-country ECF delivery route: Los Angeles, CA → Niantic, CT (~44 driving hours). */

export type RouteWaypoint = {
  id: string;
  city: string;
  state: string;
  label: string;
  lat: number;
  lng: number;
  /** Cumulative drive hours from origin */
  hoursFromStart: number;
  facility: string;
};

export const CA_TO_CT_ROUTE: RouteWaypoint[] = [
  {
    id: 'lax',
    city: 'Los Angeles',
    state: 'CA',
    label: 'Los Angeles, CA',
    lat: 34.0522,
    lng: -118.2437,
    hoursFromStart: 0,
    facility: 'ECF Origin Hub — Southern California',
  },
  {
    id: 'barstow',
    city: 'Barstow',
    state: 'CA',
    label: 'Barstow, CA',
    lat: 34.8958,
    lng: -117.0173,
    hoursFromStart: 2.5,
    facility: 'Desert Corridor Checkpoint',
  },
  {
    id: 'kingman',
    city: 'Kingman',
    state: 'AZ',
    label: 'Kingman, AZ',
    lat: 35.1894,
    lng: -114.053,
    hoursFromStart: 5.5,
    facility: 'I-40 West Facility',
  },
  {
    id: 'flagstaff',
    city: 'Flagstaff',
    state: 'AZ',
    label: 'Flagstaff, AZ',
    lat: 35.1983,
    lng: -111.6513,
    hoursFromStart: 8.5,
    facility: 'Northern Arizona Sort Center',
  },
  {
    id: 'albuquerque',
    city: 'Albuquerque',
    state: 'NM',
    label: 'Albuquerque, NM',
    lat: 35.0844,
    lng: -106.6504,
    hoursFromStart: 14,
    facility: 'New Mexico Regional Hub',
  },
  {
    id: 'amarillo',
    city: 'Amarillo',
    state: 'TX',
    label: 'Amarillo, TX',
    lat: 35.222,
    lng: -101.8313,
    hoursFromStart: 18.5,
    facility: 'Texas Panhandle Facility',
  },
  {
    id: 'okc',
    city: 'Oklahoma City',
    state: 'OK',
    label: 'Oklahoma City, OK',
    lat: 35.4676,
    lng: -97.5164,
    hoursFromStart: 22.5,
    facility: 'Central Plains Hub',
  },
  {
    id: 'stl',
    city: 'St. Louis',
    state: 'MO',
    label: 'St. Louis, MO',
    lat: 38.627,
    lng: -90.1994,
    hoursFromStart: 28.5,
    facility: 'Midwest Gateway Facility',
  },
  {
    id: 'indy',
    city: 'Indianapolis',
    state: 'IN',
    label: 'Indianapolis, IN',
    lat: 39.7684,
    lng: -86.1581,
    hoursFromStart: 32.5,
    facility: 'Indiana Sort Center',
  },
  {
    id: 'columbus',
    city: 'Columbus',
    state: 'OH',
    label: 'Columbus, OH',
    lat: 39.9612,
    lng: -82.9988,
    hoursFromStart: 35.5,
    facility: 'Ohio Distribution Center',
  },
  {
    id: 'pittsburgh',
    city: 'Pittsburgh',
    state: 'PA',
    label: 'Pittsburgh, PA',
    lat: 40.4406,
    lng: -79.9959,
    hoursFromStart: 38.5,
    facility: 'Western Pennsylvania Hub',
  },
  {
    id: 'scranton',
    city: 'Scranton',
    state: 'PA',
    label: 'Scranton, PA',
    lat: 41.409,
    lng: -75.6624,
    hoursFromStart: 40.5,
    facility: 'Northeast Corridor Facility',
  },
  {
    id: 'hartford',
    city: 'Hartford',
    state: 'CT',
    label: 'Hartford, CT',
    lat: 41.7658,
    lng: -72.6734,
    hoursFromStart: 43,
    facility: 'Connecticut Regional Hub',
  },
  {
    id: 'niantic',
    city: 'Niantic',
    state: 'CT',
    label: 'Niantic, CT',
    lat: 41.3254,
    lng: -72.1931,
    hoursFromStart: 44,
    facility: 'Destination — Recipient address',
  },
];

export const TOTAL_DRIVE_HOURS = 44;

export type DeliveryRecord = {
  trackingNumber: string;
  recipientName: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  originLabel: string;
  destinationLabel: string;
  startedAt: string;
  paused: boolean;
  pausedAt: string | null;
  accumulatedPauseMs: number;
  totalDriveHours: number;
  status: 'scheduled' | 'in_transit' | 'paused' | 'delivered';
  serviceLevel: string;
  noticeTitle?: string | null;
  noticeBody?: string | null;
  noticeImageUrl?: string | null;
  noticeActive?: boolean;
};

export type ScanEvent = {
  id: string;
  at: string;
  title: string;
  detail: string;
  city: string;
  state: string;
};

export type TrackingSnapshot = {
  trackingNumber: string;
  recipientName: string;
  destination: string;
  origin: string;
  serviceLevel: string;
  status: DeliveryRecord['status'] | 'out_for_delivery';
  statusLabel: string;
  progress: number;
  hoursElapsed: number;
  hoursRemaining: number;
  eta: string;
  currentLabel: string;
  currentFacility: string;
  lat: number;
  lng: number;
  lastWaypoint: RouteWaypoint;
  nextWaypoint: RouteWaypoint | null;
  scans: ScanEvent[];
  paused: boolean;
  delivered: boolean;
  startedAt: string;
  noticeTitle?: string | null;
  noticeBody?: string | null;
  noticeImageUrl?: string | null;
  noticeActive?: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function getEffectiveElapsedMs(d: DeliveryRecord, now = Date.now()): number {
  const start = new Date(d.startedAt).getTime();
  let pausedMs = d.accumulatedPauseMs || 0;
  if (d.paused && d.pausedAt) {
    pausedMs += Math.max(0, now - new Date(d.pausedAt).getTime());
  }
  return Math.max(0, now - start - pausedMs);
}

export function getEffectiveElapsedHours(d: DeliveryRecord, now = Date.now()): number {
  return getEffectiveElapsedMs(d, now) / 3_600_000;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function positionAlongRoute(hoursElapsed: number): {
  lat: number;
  lng: number;
  last: RouteWaypoint;
  next: RouteWaypoint | null;
  segmentT: number;
  label: string;
  facility: string;
} {
  const hours = clamp(hoursElapsed, 0, TOTAL_DRIVE_HOURS);
  const route = CA_TO_CT_ROUTE;

  if (hours <= 0) {
    const first = route[0];
    return {
      lat: first.lat,
      lng: first.lng,
      last: first,
      next: route[1] || null,
      segmentT: 0,
      label: first.label,
      facility: first.facility,
    };
  }

  if (hours >= TOTAL_DRIVE_HOURS) {
    const last = route[route.length - 1];
    return {
      lat: last.lat,
      lng: last.lng,
      last,
      next: null,
      segmentT: 1,
      label: last.label,
      facility: last.facility,
    };
  }

  let i = 0;
  while (i < route.length - 1 && route[i + 1].hoursFromStart <= hours) i++;
  const last = route[i];
  const next = route[i + 1];
  const span = next.hoursFromStart - last.hoursFromStart || 1;
  const t = clamp((hours - last.hoursFromStart) / span, 0, 1);

  return {
    lat: lerp(last.lat, next.lat, t),
    lng: lerp(last.lng, next.lng, t),
    last,
    next,
    segmentT: t,
    label: t < 0.15 ? last.label : t > 0.85 ? next.label : `En route to ${next.city}, ${next.state}`,
    facility:
      t < 0.2
        ? last.facility
        : t > 0.8
          ? next.facility
          : `Secure transport corridor — approaching ${next.city}`,
  };
}

export function buildScanEvents(d: DeliveryRecord, now = Date.now()): ScanEvent[] {
  const start = new Date(d.startedAt).getTime();
  const elapsedH = getEffectiveElapsedHours(d, now);
  const events: ScanEvent[] = [];

  events.push({
    id: 'pickup',
    at: new Date(start).toISOString(),
    title: 'Shipment picked up',
    detail: 'Package collected by ECF Delivery Team with escort present.',
    city: 'Los Angeles',
    state: 'CA',
  });

  events.push({
    id: 'depart-origin',
    at: new Date(start + 20 * 60_000).toISOString(),
    title: 'Departed origin facility',
    detail: 'Left ECF Origin Hub — Southern California.',
    city: 'Los Angeles',
    state: 'CA',
  });

  for (let i = 1; i < CA_TO_CT_ROUTE.length; i++) {
    const wp = CA_TO_CT_ROUTE[i];
    const arriveH = wp.hoursFromStart;
    if (elapsedH + 0.01 < arriveH) break;

    const arriveAt = new Date(start + arriveH * 3_600_000).toISOString();
    const isDest = i === CA_TO_CT_ROUTE.length - 1;

    if (!isDest) {
      events.push({
        id: `arr-${wp.id}`,
        at: arriveAt,
        title: 'Arrived at facility',
        detail: wp.facility,
        city: wp.city,
        state: wp.state,
      });
      if (elapsedH >= arriveH + 0.35) {
        events.push({
          id: `dep-${wp.id}`,
          at: new Date(start + (arriveH + 0.35) * 3_600_000).toISOString(),
          title: 'Departed facility',
          detail: `In transit toward destination — next corridor east.`,
          city: wp.city,
          state: wp.state,
        });
      }
    } else if (elapsedH >= TOTAL_DRIVE_HOURS) {
      events.push({
        id: 'ofd',
        at: new Date(start + 43.2 * 3_600_000).toISOString(),
        title: 'Out for delivery',
        detail: 'Local escort assigned for final delivery.',
        city: 'Niantic',
        state: 'CT',
      });
      events.push({
        id: 'delivered',
        at: new Date(start + TOTAL_DRIVE_HOURS * 3_600_000).toISOString(),
        title: 'Delivered',
        detail: 'Signed delivery completed at recipient address.',
        city: 'Niantic',
        state: 'CT',
      });
    }
  }

  if (elapsedH >= 42.5 && elapsedH < TOTAL_DRIVE_HOURS) {
    events.push({
      id: 'ofd-early',
      at: new Date(start + 42.5 * 3_600_000).toISOString(),
      title: 'Out for delivery',
      detail: 'Final leg to recipient address with security escort.',
      city: 'Hartford',
      state: 'CT',
    });
  }

  return events.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}

export function buildSnapshot(d: DeliveryRecord, now = Date.now()): TrackingSnapshot {
  const hoursElapsed = getEffectiveElapsedHours(d, now);
  const total = d.totalDriveHours || TOTAL_DRIVE_HOURS;
  const progress = clamp(hoursElapsed / total, 0, 1);
  const delivered = progress >= 1 || d.status === 'delivered';
  const hoursRemaining = delivered ? 0 : Math.max(0, total - hoursElapsed);
  const pos = positionAlongRoute(Math.min(hoursElapsed, total));

  let status: TrackingSnapshot['status'] = d.status;
  if (delivered) status = 'delivered';
  else if (d.paused) status = 'paused';
  else if (hoursElapsed >= 42.5) status = 'out_for_delivery';
  else if (d.status === 'scheduled' && hoursElapsed <= 0) status = 'scheduled';
  else status = 'in_transit';

  const statusLabel =
    status === 'delivered'
      ? 'Delivered'
      : status === 'paused'
        ? 'Not moving'
        : status === 'out_for_delivery'
          ? 'Out for delivery'
          : status === 'scheduled'
            ? 'Label created'
            : 'In transit';

  const eta = new Date(now + hoursRemaining * 3_600_000).toISOString();

  return {
    trackingNumber: d.trackingNumber,
    recipientName: d.recipientName,
    destination: `${d.addressLine1}, ${d.city}, ${d.state} ${d.postalCode}`,
    origin: d.originLabel,
    serviceLevel: d.serviceLevel,
    status,
    statusLabel,
    progress,
    hoursElapsed: Math.min(hoursElapsed, total),
    hoursRemaining,
    eta,
    currentLabel: delivered ? 'Niantic, CT' : pos.label,
    currentFacility: delivered
      ? 'Delivered — destination address'
      : d.paused
        ? 'Location held — awaiting next movement update'
        : pos.facility,
    lat: pos.lat,
    lng: pos.lng,
    lastWaypoint: pos.last,
    nextWaypoint: delivered ? null : pos.next,
    scans: buildScanEvents(d, now),
    paused: d.paused,
    delivered,
    startedAt: d.startedAt,
    noticeTitle: d.noticeActive ? d.noticeTitle || null : null,
    noticeBody: d.noticeActive ? d.noticeBody || null : null,
    noticeImageUrl: d.noticeActive ? d.noticeImageUrl || null : null,
    noticeActive: Boolean(d.noticeActive && (d.noticeTitle || d.noticeBody || d.noticeImageUrl)),
  };
}

/** Default Lynn shipment seed (used when DB row missing / for SQL seed). */
export const LYNN_TRACKING_NUMBER = 'ECF784291304847';

/** Keep true until you clear the Batch E notice from tracking. */
export const LYNN_INCIDENT_ACTIVE = true;

export const LYNN_INCIDENT_NOTICE = {
  title: 'Incident involving delivery team Batch E',
  body: 'An unfortunate incident occurred last night involving delivery team Batch E. Your shipment is currently not moving. I am monitoring this closely and will keep you updated.',
  imageUrl: '/delivery/ecf-batch-e-incident.png',
} as const;

/** Force pause + accident notice onto Lynn's record (works even if DB columns were never added). */
export function withLynnIncidentOverlay(d: DeliveryRecord): DeliveryRecord {
  if (!LYNN_INCIDENT_ACTIVE || d.trackingNumber !== LYNN_TRACKING_NUMBER) return d;
  return {
    ...d,
    paused: true,
    pausedAt: d.pausedAt || new Date().toISOString(),
    status: 'paused',
    noticeTitle: LYNN_INCIDENT_NOTICE.title,
    noticeBody: LYNN_INCIDENT_NOTICE.body,
    noticeImageUrl: LYNN_INCIDENT_NOTICE.imageUrl,
    noticeActive: true,
  };
}

export function lynnSeedDelivery(startedAt = new Date().toISOString()): DeliveryRecord {
  const pausedAt = new Date().toISOString();
  return withLynnIncidentOverlay({
    trackingNumber: LYNN_TRACKING_NUMBER,
    recipientName: 'Lynn Zakowski',
    addressLine1: '9 Stoneywood Drive',
    city: 'Niantic',
    state: 'CT',
    postalCode: '06357',
    originLabel: 'Los Angeles, CA',
    destinationLabel: 'Niantic, CT',
    startedAt,
    paused: true,
    pausedAt,
    accumulatedPauseMs: 0,
    totalDriveHours: TOTAL_DRIVE_HOURS,
    status: 'paused',
    serviceLevel: 'ECF Secure Ground — Escorted',
    noticeTitle: LYNN_INCIDENT_NOTICE.title,
    noticeBody: LYNN_INCIDENT_NOTICE.body,
    noticeImageUrl: LYNN_INCIDENT_NOTICE.imageUrl,
    noticeActive: true,
  });
}
