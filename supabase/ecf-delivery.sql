-- ECF Delivery tracking (CA → CT escorted ground)
-- Run in Supabase SQL Editor

create table if not exists ecf_deliveries (
  tracking_number text primary key,
  recipient_name text not null,
  address_line1 text not null,
  city text not null,
  state text not null,
  postal_code text not null,
  origin_label text not null default 'Los Angeles, CA',
  destination_label text not null,
  started_at timestamptz not null default now(),
  paused boolean not null default false,
  paused_at timestamptz,
  accumulated_pause_ms bigint not null default 0,
  total_drive_hours numeric(6,2) not null default 44,
  status text not null default 'in_transit'
    check (status in ('scheduled', 'in_transit', 'paused', 'delivered')),
  service_level text not null default 'ECF Secure Ground — Escorted',
  created_at timestamptz not null default now()
);

alter table ecf_deliveries enable row level security;

-- Lynn Zakowski — California to Connecticut (~44h drive)
insert into ecf_deliveries (
  tracking_number, recipient_name, address_line1, city, state, postal_code,
  origin_label, destination_label, started_at, paused, accumulated_pause_ms,
  total_drive_hours, status, service_level
) values (
  'ECF784291304847',
  'Lynn Zakowski',
  '9 Stoneywood Drive',
  'Niantic',
  'CT',
  '06357',
  'Los Angeles, CA',
  'Niantic, CT',
  now(),
  false,
  0,
  44,
  'in_transit',
  'ECF Secure Ground — Escorted'
)
on conflict (tracking_number) do update set
  recipient_name = excluded.recipient_name,
  address_line1 = excluded.address_line1,
  city = excluded.city,
  state = excluded.state,
  postal_code = excluded.postal_code,
  origin_label = excluded.origin_label,
  destination_label = excluded.destination_label,
  total_drive_hours = excluded.total_drive_hours,
  service_level = excluded.service_level;
