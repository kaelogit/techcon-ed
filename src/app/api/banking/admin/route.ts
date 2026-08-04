import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { normalizeAccountNumber } from '@/data/ecf-banking-seed';
import { hashPassword } from '@/lib/banking/crypto';
import {
  addSeedAccount,
  archiveAccount,
  buildTransactions,
  clearSecurityQuestions,
  computeBalance,
  deleteAccountHard,
  deleteProfile,
  generateAccountNumber,
  getProfile,
  getSeed,
  listAllSeeds,
  approveTransaction,
  postManualTransaction,
  reverseTransaction,
  setVaultKeyHash,
  toPublicView,
  updateAccountDetails,
  updatePasswordHash,
} from '@/lib/banking/store';
import type { BankTransaction } from '@/lib/banking/types';

function authorize(req: Request): boolean {
  const key = process.env.ECF_BANKING_ADMIN_KEY || 'ecf-admin-demo';
  const header = req.headers.get('x-ecf-admin-key') || '';
  const url = new URL(req.url);
  const q = url.searchParams.get('key') || '';
  return header === key || q === key;
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const url = new URL(req.url);
    const detail = url.searchParams.get('account');

    if (detail) {
      const accountNumber = normalizeAccountNumber(detail);
      const seed = await getSeed(accountNumber);
      if (!seed) return NextResponse.json({ error: 'Account not found.' }, { status: 404 });
      const profile = await getProfile(accountNumber);
      const transactions = await buildTransactions(accountNumber);
      const balance = await computeBalance(accountNumber);
      return NextResponse.json({
        account: {
          ...(await toPublicView(seed)),
          hasVaultKey: profile?.hasVaultKey ?? false,
          registeredAt: profile?.registeredAt ?? null,
          lastLoginAt: profile?.lastLoginAt ?? null,
          securityQuestionCount: profile?.securityQuestions.length ?? 0,
          externalAccounts: profile?.externalAccounts ?? [],
        },
        balance,
        transactions,
      });
    }

    const seeds = await listAllSeeds();
    const accounts = await Promise.all(
      seeds.map(async (s) => {
        const view = await toPublicView(s);
        const profile = view.registered ? await getProfile(s.accountNumber) : null;
        const balance = await computeBalance(s.accountNumber);
        return {
          ...view,
          balance,
          hasVaultKey: profile?.hasVaultKey ?? false,
          registeredAt: profile?.registeredAt ?? null,
          lastLoginAt: profile?.lastLoginAt ?? null,
        };
      })
    );
    return NextResponse.json({ accounts });
  } catch (err) {
    console.error('[banking/admin GET]', err);
    return NextResponse.json({ error: 'Could not load admin data.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const action = String(body.action || 'create');

    if (action === 'create') {
      const fullName = String(body.fullName || '').trim();
      const addressLine1 = String(body.addressLine1 || '').trim();
      const city = String(body.city || '').trim();
      const state = String(body.state || '').trim();
      const postalCode = String(body.postalCode || '').trim();
      const country = String(body.country || 'United States').trim();
      const supportAmount = Number(body.supportAmount);
      const creditDate = String(body.creditDate || new Date().toISOString().slice(0, 10));
      let accountNumber = normalizeAccountNumber(String(body.accountNumber || ''));

      if (!fullName || !addressLine1 || !city || !state || !postalCode || !Number.isFinite(supportAmount) || supportAmount <= 0) {
        return NextResponse.json({ error: 'Name, address, and support amount are required.' }, { status: 400 });
      }
      if (!accountNumber) accountNumber = generateAccountNumber();
      if (accountNumber.length !== 12) {
        return NextResponse.json({ error: 'Account number must be exactly 12 digits.' }, { status: 400 });
      }

      await addSeedAccount({
        accountNumber,
        fullName,
        addressLine1,
        addressLine2: body.addressLine2 ? String(body.addressLine2) : undefined,
        city,
        state,
        postalCode,
        country,
        supportAmount,
        creditDate,
        creditDescription: 'Electronic Deposit',
        accountType: 'Premier Checking',
        status: 'active',
      });

      return NextResponse.json({ ok: true, accountNumber, message: 'Account issued.' });
    }

    const accountNumber = normalizeAccountNumber(String(body.accountNumber || ''));
    if (!accountNumber && action !== 'reverse-txn' && action !== 'approve-txn') {
      return NextResponse.json({ error: 'Account number is required.' }, { status: 400 });
    }

    if (action === 'edit') {
      await updateAccountDetails(accountNumber, {
        fullName: body.fullName,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2 ?? null,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country,
        supportAmount: body.supportAmount != null ? Number(body.supportAmount) : undefined,
        creditDate: body.creditDate,
        creditDescription: body.creditDescription,
        accountType: body.accountType,
      });
      return NextResponse.json({ ok: true });
    }

    if (action === 'freeze') {
      await updateAccountDetails(accountNumber, { status: 'frozen' });
      return NextResponse.json({ ok: true, status: 'frozen' });
    }

    if (action === 'unfreeze') {
      await updateAccountDetails(accountNumber, { status: 'active' });
      return NextResponse.json({ ok: true, status: 'active' });
    }

    if (action === 'archive') {
      await archiveAccount(accountNumber);
      return NextResponse.json({ ok: true, status: 'archived' });
    }

    if (action === 'delete') {
      await deleteAccountHard(accountNumber);
      return NextResponse.json({ ok: true });
    }

    if (action === 'reset-password') {
      const newPassword = String(body.newPassword || '');
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
      }
      const profile = await getProfile(accountNumber);
      if (!profile) return NextResponse.json({ error: 'Account is not registered.' }, { status: 400 });
      await updatePasswordHash(accountNumber, hashPassword(newPassword));
      return NextResponse.json({ ok: true, newPassword });
    }

    if (action === 'clear-security') {
      const profile = await getProfile(accountNumber);
      if (!profile) return NextResponse.json({ error: 'Account is not registered.' }, { status: 400 });
      await clearSecurityQuestions(accountNumber);
      return NextResponse.json({ ok: true });
    }

    if (action === 'clear-registration') {
      await deleteProfile(accountNumber);
      return NextResponse.json({ ok: true });
    }

    if (action === 'vault-key') {
      const vaultKey = String(body.vaultKey || '').trim();
      if (vaultKey.length < 6) {
        return NextResponse.json({ error: 'Vault key must be at least 6 characters.' }, { status: 400 });
      }
      const profile = await getProfile(accountNumber);
      if (!profile) {
        return NextResponse.json({ error: 'Account must be registered first.' }, { status: 400 });
      }
      await setVaultKeyHash(accountNumber, hashPassword(vaultKey));
      return NextResponse.json({ ok: true, vaultKey, accountNumber });
    }

    if (action === 'revoke-vault-key') {
      await setVaultKeyHash(accountNumber, null);
      return NextResponse.json({ ok: true });
    }

    if (action === 'post-txn') {
      const amount = Number(body.amount);
      const description = String(body.description || '').trim();
      if (!description || !Number.isFinite(amount) || amount === 0) {
        return NextResponse.json({ error: 'Description and non-zero amount are required.' }, { status: 400 });
      }
      const txn: BankTransaction = {
        id: `ADM-${randomBytes(5).toString('hex')}`,
        date: String(body.date || new Date().toISOString().slice(0, 10)),
        description,
        amount,
        type: amount >= 0 ? 'credit' : 'debit',
        status: body.pending ? 'pending' : 'completed',
        reference: String(body.reference || `ADM-${Date.now()}`),
      };
      await postManualTransaction(accountNumber, txn);
      return NextResponse.json({ ok: true, transaction: txn });
    }

    if (action === 'approve-txn') {
      const txnId = String(body.txnId || '');
      if (!txnId) return NextResponse.json({ error: 'txnId required.' }, { status: 400 });
      await approveTransaction(txnId);
      return NextResponse.json({ ok: true });
    }

    if (action === 'reverse-txn') {
      const txnId = String(body.txnId || '');
      if (!txnId) return NextResponse.json({ error: 'txnId required.' }, { status: 400 });
      await reverseTransaction(txnId);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err) {
    console.error('[banking/admin POST]', err);
    const message = err instanceof Error ? err.message : 'Admin action failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
