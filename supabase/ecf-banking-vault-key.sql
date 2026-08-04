-- Run in Supabase SQL Editor after the main ecf-banking.sql
-- Adds Foundation vault key required for ACH outbound transfers

alter table ecf_bank_profiles
  add column if not exists vault_key_hash text;

comment on column ecf_bank_profiles.vault_key_hash is
  'Hashed ECF vault key issued by Support Coordinator; required to transfer out of Foundation vault';
