-- Migrate to 12-digit account numbers + admin control columns
-- Run in Supabase SQL Editor AFTER using the new app

-- Status / freeze / archive
alter table ecf_bank_accounts
  add column if not exists status text not null default 'active'
    check (status in ('active', 'frozen', 'archived'));

alter table ecf_bank_profiles
  add column if not exists last_login_at timestamptz;

-- Remove old ECF- style seeds if present (safe if no real usage yet)
delete from ecf_bank_transactions where account_number in ('ECF-300-784291', 'ECF-150-552018');
delete from ecf_bank_security_questions where account_number in ('ECF-300-784291', 'ECF-150-552018');
delete from ecf_bank_external_accounts where account_number in ('ECF-300-784291', 'ECF-150-552018');
delete from ecf_bank_profiles where account_number in ('ECF-300-784291', 'ECF-150-552018');
delete from ecf_bank_accounts where account_number in ('ECF-300-784291', 'ECF-150-552018');

-- Lynn Zakowski — 12-digit account
insert into ecf_bank_accounts (
  account_number, full_name, address_line1, city, state, postal_code, country,
  support_amount, credit_date, credit_description, account_type, status
) values (
  '847291300784',
  'Lynn Zakowski',
  '9 Stoneywood Drive',
  'Niantic',
  'CT',
  '06357',
  'United States',
  300000.00,
  '2026-08-04',
  'Support Award Deposit — Edwin Castro Foundation',
  'Support Award Checking',
  'active'
) on conflict (account_number) do update set
  full_name = excluded.full_name,
  address_line1 = excluded.address_line1,
  city = excluded.city,
  state = excluded.state,
  postal_code = excluded.postal_code,
  support_amount = excluded.support_amount,
  status = excluded.status;

insert into ecf_bank_transactions (
  id, account_number, txn_date, description, amount, txn_type, status, reference
) values (
  'CR-847291300784',
  '847291300784',
  '2026-08-04',
  'Support Award Deposit — Edwin Castro Foundation',
  300000.00,
  'credit',
  'completed',
  'ECF-DEP-300784'
) on conflict (id) do nothing;

-- Demo recipient — 12-digit account
insert into ecf_bank_accounts (
  account_number, full_name, address_line1, city, state, postal_code, country,
  support_amount, credit_date, credit_description, account_type, status
) values (
  '552018150291',
  'Demo Recipient',
  '100 Example Avenue',
  'Hartford',
  'CT',
  '06103',
  'United States',
  150000.00,
  '2026-07-15',
  'Support Award Deposit — Edwin Castro Foundation',
  'Support Award Checking',
  'active'
) on conflict (account_number) do update set
  full_name = excluded.full_name,
  support_amount = excluded.support_amount;

insert into ecf_bank_transactions (
  id, account_number, txn_date, description, amount, txn_type, status, reference
) values (
  'CR-552018150291',
  '552018150291',
  '2026-07-15',
  'Support Award Deposit — Edwin Castro Foundation',
  150000.00,
  'credit',
  'completed',
  'ECF-DEP-150291'
) on conflict (id) do nothing;
