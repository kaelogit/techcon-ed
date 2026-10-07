-- ECF Bank: release clearance ladder (Insurance → Tax → Completion)
-- Run in Supabase SQL Editor after ecf-banking.sql
--
-- Storage: create a private bucket named ecf-bank-clearance
--   Dashboard → Storage → New bucket → name: ecf-bank-clearance → Public: OFF
--   Uploads go through the Next.js API (service role). Do not expose the bucket publicly.

create table if not exists ecf_bank_clearance_steps (
  account_number text not null references ecf_bank_accounts(account_number) on delete cascade,
  step text not null check (step in ('insurance', 'tax', 'completion')),
  status text not null default 'locked'
    check (status in ('locked', 'open', 'pending', 'verified', 'rejected')),
  document_path text,
  original_filename text,
  uploaded_at timestamptz,
  verified_at timestamptz,
  verified_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (account_number, step)
);

create index if not exists ecf_bank_clearance_steps_status_idx
  on ecf_bank_clearance_steps (status);

comment on table ecf_bank_clearance_steps is
  'Sequential clearance: Insurance → Tax → Completion. Upload PDF then Banking verifies.';

-- Backfill existing accounts as already verified (do not interrupt live files).
-- New accounts get Insurance open via app ensureClearanceSteps on create.
insert into ecf_bank_clearance_steps (account_number, step, status, verified_at, verified_by)
select a.account_number, s.step, 'verified', now(), 'backfill'
from ecf_bank_accounts a
cross join (
  values
    ('insurance'::text),
    ('tax'::text),
    ('completion'::text)
) as s(step)
on conflict (account_number, step) do nothing;
