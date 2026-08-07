import { normalizeAccountNumber, type SeedAccount } from '@/data/ecf-banking-seed';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { AccountProfile, BankTransaction, ExternalAccount, PublicAccountView } from './types';

export type AccountStatus = 'active' | 'frozen' | 'archived';

type AccountRow = {
  account_number: string;
  full_name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  support_amount: number | string;
  credit_date: string;
  credit_description: string;
  account_type: string;
  status?: AccountStatus | null;
  created_at?: string;
};

type ProfileRow = {
  account_number: string;
  password_hash: string;
  registered_at: string;
  welcome_seen: boolean;
  vault_key_hash?: string | null;
  last_login_at?: string | null;
};

type QuestionRow = { question: string; answer_hash: string; sort_order: number };
type TxnRow = {
  id: string;
  txn_date: string;
  description: string;
  amount: number | string;
  txn_type: 'credit' | 'debit' | 'transfer';
  status: 'completed' | 'pending' | 'rejected';
  reference: string | null;
};
type ExtRow = {
  id: string;
  bank_name: string;
  account_holder: string;
  routing_number: string;
  account_number_last4: string;
  account_type: 'checking' | 'savings';
  nickname: string | null;
  created_at: string;
};

function rowToSeed(row: AccountRow): SeedAccount {
  return {
    accountNumber: row.account_number,
    fullName: row.full_name,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2 || undefined,
    city: row.city,
    state: row.state,
    postalCode: row.postal_code,
    country: row.country,
    supportAmount: Number(row.support_amount),
    creditDate: row.credit_date,
    creditDescription: row.credit_description,
    accountType: row.account_type,
    status: row.status || 'active',
  };
}

function rowToTxn(row: TxnRow): BankTransaction {
  return {
    id: row.id,
    date: row.txn_date,
    description: row.description,
    amount: Number(row.amount),
    type: row.txn_type,
    status: row.status,
    reference: row.reference || undefined,
  };
}

function rowToExternal(row: ExtRow): ExternalAccount {
  return {
    id: row.id,
    bankName: row.bank_name,
    accountHolder: row.account_holder,
    routingNumber: row.routing_number,
    accountNumberLast4: row.account_number_last4,
    accountType: row.account_type,
    nickname: row.nickname || undefined,
    createdAt: row.created_at,
  };
}

export async function getSeed(accountNumber: string): Promise<SeedAccount | undefined> {
  const normalized = normalizeAccountNumber(accountNumber);
  if (!normalized) return undefined;
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_accounts')
    .select('*')
    .eq('account_number', normalized)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToSeed(data as AccountRow) : undefined;
}

export async function listAllSeeds(): Promise<SeedAccount[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_accounts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return ((data || []) as AccountRow[]).map(rowToSeed);
}

export async function addSeedAccount(seed: SeedAccount): Promise<void> {
  const accountNumber = normalizeAccountNumber(seed.accountNumber);
  if (accountNumber.length !== 12) {
    throw new Error('Account number must be exactly 12 digits.');
  }
  const sb = getSupabaseAdmin();

  const { error: accErr } = await sb.from('ecf_bank_accounts').insert({
    account_number: accountNumber,
    full_name: seed.fullName,
    address_line1: seed.addressLine1,
    address_line2: seed.addressLine2 || null,
    city: seed.city,
    state: seed.state,
    postal_code: seed.postalCode,
    country: seed.country,
    support_amount: seed.supportAmount,
    credit_date: seed.creditDate,
    credit_description: seed.creditDescription,
    account_type: seed.accountType,
    status: seed.status || 'active',
  });
  if (accErr) throw accErr;

  const { error: txnErr } = await sb.from('ecf_bank_transactions').insert({
    id: `CR-${accountNumber}`,
    account_number: accountNumber,
    txn_date: seed.creditDate,
    description: seed.creditDescription,
    amount: seed.supportAmount,
    txn_type: 'credit',
    status: 'completed',
    reference: `ECF-DEP-${accountNumber.slice(-6)}`,
  });
  if (txnErr) throw txnErr;
}

export async function updateAccountDetails(
  accountNumber: string,
  patch: Partial<{
    fullName: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    supportAmount: number;
    creditDate: string;
    creditDescription: string;
    accountType: string;
    status: AccountStatus;
  }>
): Promise<void> {
  const normalized = normalizeAccountNumber(accountNumber);
  const row: Record<string, unknown> = {};
  if (patch.fullName !== undefined) row.full_name = patch.fullName;
  if (patch.addressLine1 !== undefined) row.address_line1 = patch.addressLine1;
  if (patch.addressLine2 !== undefined) row.address_line2 = patch.addressLine2;
  if (patch.city !== undefined) row.city = patch.city;
  if (patch.state !== undefined) row.state = patch.state;
  if (patch.postalCode !== undefined) row.postal_code = patch.postalCode;
  if (patch.country !== undefined) row.country = patch.country;
  if (patch.supportAmount !== undefined) row.support_amount = patch.supportAmount;
  if (patch.creditDate !== undefined) row.credit_date = patch.creditDate;
  if (patch.creditDescription !== undefined) row.credit_description = patch.creditDescription;
  if (patch.accountType !== undefined) row.account_type = patch.accountType;
  if (patch.status !== undefined) row.status = patch.status;

  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_accounts')
    .update(row)
    .eq('account_number', normalized);
  if (error) throw error;
}

export async function getProfile(accountNumber: string): Promise<AccountProfile | undefined> {
  const normalized = normalizeAccountNumber(accountNumber);
  const sb = getSupabaseAdmin();

  const { data: profile, error } = await sb
    .from('ecf_bank_profiles')
    .select('*')
    .eq('account_number', normalized)
    .maybeSingle();
  if (error) throw error;
  if (!profile) return undefined;

  const p = profile as ProfileRow;
  const [{ data: questions }, { data: externals }] = await Promise.all([
    sb
      .from('ecf_bank_security_questions')
      .select('question, answer_hash, sort_order')
      .eq('account_number', normalized)
      .order('sort_order', { ascending: true }),
    sb.from('ecf_bank_external_accounts').select('*').eq('account_number', normalized),
  ]);

  return {
    accountNumber: normalized,
    passwordHash: p.password_hash,
    registeredAt: p.registered_at,
    welcomeSeen: p.welcome_seen,
    vaultKeyHash: p.vault_key_hash || null,
    hasVaultKey: Boolean(p.vault_key_hash),
    lastLoginAt: p.last_login_at || null,
    securityQuestions: ((questions || []) as QuestionRow[]).map((q) => ({
      question: q.question,
      answerHash: q.answer_hash,
    })),
    externalAccounts: ((externals || []) as ExtRow[]).map(rowToExternal),
    extraTransactions: [],
  };
}

export async function setProfile(profile: AccountProfile): Promise<void> {
  const accountNumber = normalizeAccountNumber(profile.accountNumber);
  const sb = getSupabaseAdmin();

  const { error: upsertErr } = await sb.from('ecf_bank_profiles').upsert({
    account_number: accountNumber,
    password_hash: profile.passwordHash,
    registered_at: profile.registeredAt,
    welcome_seen: profile.welcomeSeen,
    vault_key_hash: profile.vaultKeyHash ?? null,
  });
  if (upsertErr) throw upsertErr;

  await sb.from('ecf_bank_security_questions').delete().eq('account_number', accountNumber);
  if (profile.securityQuestions.length) {
    const { error: qErr } = await sb.from('ecf_bank_security_questions').insert(
      profile.securityQuestions.map((q, i) => ({
        account_number: accountNumber,
        question: q.question,
        answer_hash: q.answerHash,
        sort_order: i,
      }))
    );
    if (qErr) throw qErr;
  }
}

export async function markWelcomeSeen(accountNumber: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_profiles')
    .update({ welcome_seen: true })
    .eq('account_number', normalizeAccountNumber(accountNumber));
  if (error) throw error;
}

export async function touchLastLogin(accountNumber: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_profiles')
    .update({ last_login_at: new Date().toISOString() })
    .eq('account_number', normalizeAccountNumber(accountNumber));
  if (error) throw error;
}

export async function updatePasswordHash(accountNumber: string, passwordHash: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_profiles')
    .update({ password_hash: passwordHash })
    .eq('account_number', normalizeAccountNumber(accountNumber));
  if (error) throw error;
}

export async function setVaultKeyHash(accountNumber: string, vaultKeyHash: string | null): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_profiles')
    .update({ vault_key_hash: vaultKeyHash })
    .eq('account_number', normalizeAccountNumber(accountNumber));
  if (error) throw error;
}

export async function clearSecurityQuestions(accountNumber: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_security_questions')
    .delete()
    .eq('account_number', normalizeAccountNumber(accountNumber));
  if (error) throw error;
}

export async function deleteProfile(accountNumber: string): Promise<void> {
  const normalized = normalizeAccountNumber(accountNumber);
  const sb = getSupabaseAdmin();
  await sb.from('ecf_bank_external_accounts').delete().eq('account_number', normalized);
  await sb.from('ecf_bank_security_questions').delete().eq('account_number', normalized);
  const { error } = await sb.from('ecf_bank_profiles').delete().eq('account_number', normalized);
  if (error) throw error;
}

export async function archiveAccount(accountNumber: string): Promise<void> {
  await updateAccountDetails(accountNumber, { status: 'archived' });
}

export async function deleteAccountHard(accountNumber: string): Promise<void> {
  const normalized = normalizeAccountNumber(accountNumber);
  const sb = getSupabaseAdmin();
  await sb.from('ecf_bank_transactions').delete().eq('account_number', normalized);
  await deleteProfile(normalized);
  const { error } = await sb.from('ecf_bank_accounts').delete().eq('account_number', normalized);
  if (error) throw error;
}

export async function isRegistered(accountNumber: string): Promise<boolean> {
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_profiles')
    .select('account_number')
    .eq('account_number', normalizeAccountNumber(accountNumber))
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function toPublicView(seed: SeedAccount): Promise<PublicAccountView> {
  return {
    accountNumber: seed.accountNumber,
    fullName: seed.fullName,
    addressLine1: seed.addressLine1,
    addressLine2: seed.addressLine2,
    city: seed.city,
    state: seed.state,
    postalCode: seed.postalCode,
    country: seed.country,
    supportAmount: seed.supportAmount,
    creditDate: seed.creditDate,
    creditDescription: seed.creditDescription,
    accountType: seed.accountType,
    status: seed.status || 'active',
    registered: await isRegistered(seed.accountNumber),
  };
}

export async function buildTransactions(accountNumber: string): Promise<BankTransaction[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_transactions')
    .select('*')
    .eq('account_number', normalizeAccountNumber(accountNumber))
    .order('txn_date', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return ((data || []) as TxnRow[]).map(rowToTxn);
}

export async function computeBalance(accountNumber: string): Promise<number> {
  const txns = await buildTransactions(accountNumber);
  // Completed ledger + pending outbound (negative) so ACH holds reduce available funds
  return txns.reduce((sum, t) => {
    if (t.status === 'completed') return sum + t.amount;
    if (t.status === 'pending' && t.amount < 0) return sum + t.amount;
    return sum;
  }, 0);
}

export function maskAccountNumber(accountNumber: string): string {
  const n = normalizeAccountNumber(accountNumber);
  if (n.length <= 4) return n;
  return `${n.slice(0, 4)}••••${n.slice(-4)}`;
}

export function generateAccountNumber(): string {
  let out = '';
  for (let i = 0; i < 12; i++) {
    out += Math.floor(Math.random() * 10).toString();
  }
  if (out[0] === '0') out = `8${out.slice(1)}`;
  return out;
}

export async function addExternalAccount(
  accountNumber: string,
  account: ExternalAccount
): Promise<ExternalAccount[]> {
  const normalized = normalizeAccountNumber(accountNumber);
  const sb = getSupabaseAdmin();
  const { error } = await sb.from('ecf_bank_external_accounts').insert({
    id: account.id,
    account_number: normalized,
    bank_name: account.bankName,
    account_holder: account.accountHolder,
    routing_number: account.routingNumber,
    account_number_last4: account.accountNumberLast4,
    account_type: account.accountType,
    nickname: account.nickname || null,
    created_at: account.createdAt,
  });
  if (error) throw error;

  const { data, error: listErr } = await sb
    .from('ecf_bank_external_accounts')
    .select('*')
    .eq('account_number', normalized);
  if (listErr) throw listErr;
  return ((data || []) as ExtRow[]).map(rowToExternal);
}

export async function addTransferTransaction(
  accountNumber: string,
  txn: BankTransaction
): Promise<void> {
  const { error } = await getSupabaseAdmin().from('ecf_bank_transactions').insert({
    id: txn.id,
    account_number: normalizeAccountNumber(accountNumber),
    txn_date: txn.date,
    description: txn.description,
    amount: txn.amount,
    txn_type: txn.type,
    status: txn.status,
    reference: txn.reference || null,
  });
  if (error) throw error;
}

export async function postManualTransaction(
  accountNumber: string,
  txn: BankTransaction
): Promise<void> {
  await addTransferTransaction(accountNumber, txn);
}

export async function approveTransaction(txnId: string): Promise<void> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from('ecf_bank_transactions').select('id, status').eq('id', txnId).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Transaction not found');
  if ((data as { status: string }).status !== 'pending') {
    throw new Error('Only pending transactions can be approved.');
  }
  const { error: upd } = await sb
    .from('ecf_bank_transactions')
    .update({ status: 'completed' })
    .eq('id', txnId);
  if (upd) throw upd;
}

export async function reverseTransaction(txnId: string): Promise<void> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from('ecf_bank_transactions').select('*').eq('id', txnId).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Transaction not found');
  const row = data as TxnRow & { account_number: string };
  if (row.status === 'pending') {
    const { error: del } = await sb.from('ecf_bank_transactions').delete().eq('id', txnId);
    if (del) throw del;
    return;
  }
  const amount = Number(row.amount);
  const reverse: BankTransaction = {
    id: `RV-${txnId}`,
    date: new Date().toISOString().slice(0, 10),
    description: `Reversal of ${row.reference || txnId} — ${row.description}`,
    amount: -amount,
    type: amount >= 0 ? 'debit' : 'credit',
    status: 'completed',
    reference: `REV-${row.reference || txnId}`,
  };
  await addTransferTransaction(row.account_number, reverse);
}

export async function listExternalAccounts(accountNumber: string): Promise<ExternalAccount[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_external_accounts')
    .select('*')
    .eq('account_number', normalizeAccountNumber(accountNumber));
  if (error) throw error;
  return ((data || []) as ExtRow[]).map(rowToExternal);
}

export const LYNN_ACCOUNT = '847291300784';
export const LYNN_SUPPORT_OFFER_ID = 'CR-OFFER-847291300784';
export const LYNN_SUPPORT_OFFER_REF = 'ECF-SUPPORT-400784';

export function isSupportOfferTxn(txn: Pick<BankTransaction, 'id' | 'reference' | 'amount' | 'type'>): boolean {
  if (txn.type !== 'credit' || txn.amount <= 0) return false;
  if (txn.id.startsWith('CR-OFFER-')) return true;
  return Boolean(txn.reference?.startsWith('ECF-SUPPORT'));
}

/** Ensure Lynn's Aug 7 credit date + pending $400k support offer exist. */
export async function ensureLynnSupportOffer(): Promise<void> {
  const sb = getSupabaseAdmin();
  try {
    await sb
      .from('ecf_bank_accounts')
      .update({ credit_date: '2026-08-07' })
      .eq('account_number', LYNN_ACCOUNT);

    await sb
      .from('ecf_bank_transactions')
      .update({ txn_date: '2026-08-07' })
      .eq('id', 'CR-847291300784');

    const { data: existing } = await sb
      .from('ecf_bank_transactions')
      .select('id, status')
      .eq('id', LYNN_SUPPORT_OFFER_ID)
      .maybeSingle();

    if (existing) return;

    await sb.from('ecf_bank_transactions').insert({
      id: LYNN_SUPPORT_OFFER_ID,
      account_number: LYNN_ACCOUNT,
      txn_date: '2026-08-07',
      description: 'Additional Support — Foundation Offer',
      amount: 400000,
      txn_type: 'credit',
      status: 'pending',
      reference: LYNN_SUPPORT_OFFER_REF,
    });
  } catch (err) {
    console.error('[ensureLynnSupportOffer]', err);
  }
}

export async function decideSupportOffer(
  accountNumber: string,
  txnId: string,
  decision: 'accept' | 'reject'
): Promise<BankTransaction> {
  const normalized = normalizeAccountNumber(accountNumber);
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('ecf_bank_transactions')
    .select('*')
    .eq('id', txnId)
    .eq('account_number', normalized)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Support offer not found.');

  const row = data as TxnRow & { account_number: string };
  const txn = rowToTxn(row);
  if (!isSupportOfferTxn(txn)) {
    throw new Error('That transaction is not a support offer.');
  }
  if (txn.status !== 'pending') {
    throw new Error('This support offer has already been decided.');
  }

  const nextStatus = decision === 'accept' ? 'completed' : 'rejected';
  const { data: updated, error: upd } = await sb
    .from('ecf_bank_transactions')
    .update({ status: nextStatus })
    .eq('id', txnId)
    .eq('account_number', normalized)
    .select('*')
    .maybeSingle();
  if (upd) throw upd;
  if (!updated) throw new Error('Could not update support offer.');
  return rowToTxn(updated as TxnRow);
}
