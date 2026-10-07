-- Gary C. Kosmas — ECF Banking account seed
-- Prerequisites: run ecf-banking.sql and ecf-banking-clearance.sql first.
-- Storage: create private bucket ecf-bank-clearance (see ecf-banking-clearance.sql).
--
-- File: Gary C. Kosmas · 102 Laura Dr., San Angelo, TX 76905 · US · phone 15127456191
-- Support: $75,000 · Account: 751849075001

insert into ecf_bank_accounts (
  account_number, full_name, address_line1, address_line2, city, state, postal_code, country,
  support_amount, credit_date, credit_description, account_type, status
) values (
  '751849075001',
  'Gary C. Kosmas',
  '102 Laura Dr.',
  null,
  'San Angelo',
  'TX',
  '76905',
  'United States',
  75000.00,
  current_date,
  'Electronic Deposit',
  'Premier Checking',
  'active'
)
on conflict (account_number) do update set
  full_name = excluded.full_name,
  address_line1 = excluded.address_line1,
  address_line2 = excluded.address_line2,
  city = excluded.city,
  state = excluded.state,
  postal_code = excluded.postal_code,
  country = excluded.country,
  support_amount = excluded.support_amount,
  credit_date = excluded.credit_date,
  status = 'active';

insert into ecf_bank_transactions (
  id, account_number, txn_date, description, amount, txn_type, status, reference
) values (
  'CR-751849075001',
  '751849075001',
  current_date,
  'Electronic Deposit',
  75000.00,
  'credit',
  'completed',
  'ECF-DEP-075001'
)
on conflict (id) do update set
  amount = excluded.amount,
  description = excluded.description,
  status = 'completed';

-- Clearance ladder: Insurance open; Tax + Completion locked
insert into ecf_bank_clearance_steps (account_number, step, status)
values
  ('751849075001', 'insurance', 'open'),
  ('751849075001', 'tax', 'locked'),
  ('751849075001', 'completion', 'locked')
on conflict (account_number, step) do update set
  status = excluded.status,
  document_path = null,
  original_filename = null,
  uploaded_at = null,
  verified_at = null,
  verified_by = null,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Operator emails: use docs/gary-kosmas-playbook.md (full A–Z).
-- Paid-step rule: explain → amount → Chime → payment verified + processing hold
-- (~6–12 hrs) → THEN document / upload. Never send the cert in the same email
-- as payment verified. One-step rule: do not preview later offices to Gary.
-- Account: 751849075001 · Register: /banking/register · Login: /banking/login
-- Ownership cert: /documents/garycertificate-of-ownership.html
-- ---------------------------------------------------------------------------
