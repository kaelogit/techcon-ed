-- Pause Lynn's shipment + short Batch E accident notice (message + image)
-- Run in Supabase SQL Editor

alter table ecf_deliveries
  add column if not exists notice_title text,
  add column if not exists notice_body text,
  add column if not exists notice_image_url text,
  add column if not exists notice_active boolean not null default false;

-- Freeze movement (public status shows "Not moving") + activate notice
update ecf_deliveries
set
  paused = true,
  paused_at = coalesce(paused_at, now()),
  status = 'paused',
  notice_title = 'Incident involving delivery team Batch E',
  notice_body = 'An unfortunate incident occurred last night involving delivery team Batch E. Your shipment is currently not moving. Please contact your coordinator for more information.',
  notice_image_url = '/delivery/ecf-batch-e-incident.png',
  notice_active = true
where tracking_number = 'ECF784291304847';
