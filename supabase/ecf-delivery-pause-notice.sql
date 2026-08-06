-- Pause Lynn's shipment + support for tracking notice (message + image)
-- Run in Supabase SQL Editor

alter table ecf_deliveries
  add column if not exists notice_title text,
  add column if not exists notice_body text,
  add column if not exists notice_image_url text,
  add column if not exists notice_active boolean not null default false;

-- Freeze movement now (public status will show "Not moving")
update ecf_deliveries
set
  paused = true,
  paused_at = coalesce(paused_at, now()),
  status = 'paused'
where tracking_number = 'ECF784291304847'
  and paused = false;
