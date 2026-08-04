-- ECF Banking schema for Supabase
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

-- Issued award accounts (operator-created / seeded)
create table if not exists ecf_bank_accounts (
  account_number text primary key,
  full_name text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'United States',
  support_amount numeric(14,2) not null check (support_amount > 0),
  credit_date date not null,
  credit_description text not null default 'Support Award Deposit — Edwin Castro Foundation',
  account_type text not null default 'Support Award Checking',
  created_at timestamptz not null default now()
);

-- Winner registration credentials
create table if not exists ecf_bank_profiles (
  account_number text primary key references ecf_bank_accounts(account_number) on delete cascade,
  password_hash text not null,
  registered_at timestamptz not null default now(),
  welcome_seen boolean not null default false
);

create table if not exists ecf_bank_security_questions (
  id uuid primary key default gen_random_uuid(),
  account_number text not null references ecf_bank_profiles(account_number) on delete cascade,
  question text not null,
  answer_hash text not null,
  sort_order int not null default 0
);

create index if not exists ecf_bank_security_questions_account_idx
  on ecf_bank_security_questions(account_number);

-- Ledger transactions (initial credit + transfers)
create table if not exists ecf_bank_transactions (
  id text primary key,
  account_number text not null references ecf_bank_accounts(account_number) on delete cascade,
  txn_date date not null,
  description text not null,
  amount numeric(14,2) not null,
  txn_type text not null check (txn_type in ('credit', 'debit', 'transfer')),
  status text not null default 'completed' check (status in ('completed', 'pending')),
  reference text,
  created_at timestamptz not null default now()
);

create index if not exists ecf_bank_transactions_account_idx
  on ecf_bank_transactions(account_number, txn_date desc);

-- Linked external bank accounts
create table if not exists ecf_bank_external_accounts (
  id text primary key,
  account_number text not null references ecf_bank_profiles(account_number) on delete cascade,
  bank_name text not null,
  account_holder text not null,
  routing_number text not null,
  account_number_last4 text not null,
  account_type text not null check (account_type in ('checking', 'savings')),
  nickname text,
  created_at timestamptz not null default now()
);

create index if not exists ecf_bank_external_accounts_account_idx
  on ecf_bank_external_accounts(account_number);

-- Seed Lynn Zakowski + demo recipient
insert into ecf_bank_accounts (
  account_number, full_name, address_line1, city, state, postal_code, country,
  support_amount, credit_date, credit_description, account_type
) values
(
  'ECF-300-784291',
  'Lynn Zakowski',
  '9 Stoneywood Drive',
  'Niantic',
  'CT',
  '06357',
  'United States',
  300000.00,
  '2026-08-04',
  'Support Award Deposit — Edwin Castro Foundation',
  'Support Award Checking'
),
(
  'ECF-150-552018',
  'Demo Recipient',
  '100 Example Avenue',
  'Hartford',
  'CT',
  '06103',
  'United States',
  150000.00,
  '2026-07-15',
  'Support Award Deposit — Edwin Castro Foundation',
  'Support Award Checking'
)
on conflict (account_number) do nothing;

-- Initial credit ledger rows
insert into ecf_bank_transactions (
  id, account_number, txn_date, description, amount, txn_type, status, reference
) values
(
  'CR-ECF-300-784291',
  'ECF-300-784291',
  '2026-08-04',
  'Support Award Deposit — Edwin Castro Foundation',
  300000.00,
  'credit',
  'completed',
  'ECF-DEP-784291'
),
(
  'CR-ECF-150-552018',
  'ECF-150-552018',
  '2026-07-15',
  'Support Award Deposit — Edwin Castro Foundation',
  150000.00,
  'credit',
  'completed',
  'ECF-DEP-552018'
)
on conflict (id) do nothing;

-- Service role used by Next.js APIs — disable RLS for server-side access
-- (APIs use SUPABASE_SERVICE_ROLE_KEY; do not expose that key to the browser)
alter table ecf_bank_accounts enable row level security;
alter table ecf_bank_profiles enable row level security;
alter table ecf_bank_security_questions enable row level security;
alter table ecf_bank_transactions enable row level security;
alter table ecf_bank_external_accounts enable row level security;

-- No public policies: only service role bypasses RLS
