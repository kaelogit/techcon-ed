import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { verifyPassword } from '@/lib/banking/crypto';
import { requireSessionAccount } from '@/lib/banking/session';
import { addTransferTransaction, computeBalance } from '@/lib/banking/store';
import type { BankTransaction } from '@/lib/banking/types';

export async function POST(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

    const body = await req.json();
    const externalId = String(body.externalAccountId || '');
    const amount = Number(body.amount);
    const memo = String(body.memo || '').trim();
    const vaultKey = String(body.vaultKey || '').trim();

    if (!externalId || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Valid external account and amount are required.' }, { status: 400 });
    }

    const external = session.profile.externalAccounts.find((a) => a.id === externalId);
    if (!external) {
      return NextResponse.json({ error: 'External account not found.' }, { status: 404 });
    }

    if (session.seed.status === 'frozen') {
      return NextResponse.json(
        {
          error: 'Account frozen',
          code: 'ACCOUNT_FROZEN',
          message: 'This account is frozen. Transfers are disabled. Contact your Support Coordinator.',
        },
        { status: 403 }
      );
    }

    // Vault key required to release funds from Foundation vault
    if (!session.profile.vaultKeyHash) {
      return NextResponse.json(
        {
          error: 'Vault key required',
          code: 'VAULT_KEY_REQUIRED',
          message:
            'Your transfer authorization key has not been issued yet. Your ECF account number will not work here. Contact Michael Freedman — he must generate and send you the authorization key before this transfer can complete.',
        },
        { status: 403 }
      );
    }

    if (!vaultKey) {
      return NextResponse.json(
        {
          error: 'Authorization key required',
          code: 'VAULT_KEY_REQUIRED',
          message:
            'Enter the transfer authorization key issued by your relationship manager. Your ECF account number is not the authorization key.',
        },
        { status: 403 }
      );
    }

    if (!verifyPassword(vaultKey, session.profile.vaultKeyHash)) {
      return NextResponse.json(
        {
          error: 'Invalid authorization key',
          code: 'VAULT_KEY_INVALID',
          message:
            'That authorization key is incorrect. Your ECF account number, password, or bank details will not work here. Only the exact authorization key issued by your relationship manager can release this transfer. If you have not received one yet, contact Michael Freedman.',
        },
        { status: 403 }
      );
    }

    const balance = await computeBalance(session.accountNumber);
    if (amount > balance) {
      return NextResponse.json({ error: 'Insufficient available balance.' }, { status: 400 });
    }

    const reference = `ACH-${randomBytes(4).toString('hex').toUpperCase()}`;
    const txn: BankTransaction = {
      id: `TX-${randomBytes(6).toString('hex')}`,
      date: new Date().toISOString().slice(0, 10),
      description: `ACH transfer to ${external.bankName} ••••${external.accountNumberLast4}${memo ? ` — ${memo}` : ''}`,
      amount: -Math.abs(amount),
      type: 'transfer',
      status: 'pending',
      reference,
    };

    await addTransferTransaction(session.accountNumber, txn);
    const newBalance = await computeBalance(session.accountNumber);

    return NextResponse.json({
      ok: true,
      transaction: txn,
      balance: newBalance,
      reference,
      message: 'ACH transfer submitted for processing. Funds are reserved pending clearance.',
    });
  } catch (err) {
    console.error('[banking/transfer]', err);
    return NextResponse.json({ error: 'Transfer failed.' }, { status: 500 });
  }
}
