-- Lynn: Aug 7 credit date + $400k additional support offer (accept / reject)
-- Run in Supabase SQL Editor

-- Allow rejected status on ledger (declined support offers)
alter table ecf_bank_transactions
  drop constraint if exists ecf_bank_transactions_status_check;

alter table ecf_bank_transactions
  add constraint ecf_bank_transactions_status_check
  check (status in ('completed', 'pending', 'rejected'));

-- Move Lynn's $300,000 deposit to Aug 7, 2026
update ecf_bank_accounts
set credit_date = '2026-08-07'
where account_number = '847291300784';

update ecf_bank_transactions
set txn_date = '2026-08-07'
where id = 'CR-847291300784';

-- Pending $400,000 additional support offer (does not affect balance until accepted)
insert into ecf_bank_transactions (
  id, account_number, txn_date, description, amount, txn_type, status, reference
) values (
  'CR-OFFER-847291300784',
  '847291300784',
  '2026-08-07',
  'Additional Support — Foundation Offer',
  400000.00,
  'credit',
  'pending',
  'ECF-SUPPORT-400784'
)
on conflict (id) do update set
  description = excluded.description,
  amount = excluded.amount,
  txn_type = excluded.txn_type,
  -- Do not overwrite if she already accepted or rejected
  status = case
    when ecf_bank_transactions.status in ('completed', 'rejected') then ecf_bank_transactions.status
    else excluded.status
  end,
  reference = excluded.reference,
  txn_date = excluded.txn_date;
