-- ECF Bank: debit card issuance flag (default not issued)
-- Run in Supabase SQL Editor after ecf-banking.sql

alter table ecf_bank_profiles
  add column if not exists debit_card_issued boolean not null default false;

comment on column ecf_bank_profiles.debit_card_issued is
  'When true, debit card is activated. Set after $3500 activation fee confirmed.';
