-- Activate Lynn Zakowski debit card (account 847291300784)
-- Run in Supabase SQL Editor

update ecf_bank_profiles
set debit_card_issued = true
where account_number = '847291300784';
