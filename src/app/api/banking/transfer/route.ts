import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { deriveDebitCard } from '@/lib/banking/card';
import { verifyPassword } from '@/lib/banking/crypto';
import { requireSessionAccount } from '@/lib/banking/session';
import { addTransferTransaction, computeBalance } from '@/lib/banking/store';
import type { BankTransaction } from '@/lib/banking/types';

function validateVault(session: NonNullable<Awaited<ReturnType<typeof requireSessionAccount>>>, vaultKey: string) {
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

  return null;
}

export async function POST(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

    const body = await req.json();
    const externalId = String(body.externalAccountId || '');
    const amount = Number(body.amount);
    const memo = String(body.memo || '').trim();
    const vaultKey = String(body.vaultKey || '').trim();
    const validateOnly = body.validateOnly === true;
    const cardLast6 = String(body.cardLast6 || body.cardLast4 || '').replace(/\D/g, '').slice(0, 6);
    const cardCvv = String(body.cardCvv || '').replace(/\D/g, '').slice(0, 4);

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

    const vaultError = validateVault(session, vaultKey);
    if (vaultError) return vaultError;

    if (validateOnly) {
      return NextResponse.json({ ok: true, next: 'card-verify' });
    }

    const card = deriveDebitCard(session.accountNumber);
    if (cardLast6.length !== 6 || cardCvv.length !== 3) {
      return NextResponse.json(
        {
          error: 'Card details required',
          code: 'CARD_DETAILS_REQUIRED',
          message: 'Enter the last 6 digits and CVV from your ECF Bank debit card.',
        },
        { status: 400 }
      );
    }

    if (cardLast6 !== card.last6 || cardCvv !== card.cvv) {
      return NextResponse.json(
        {
          error: 'Incorrect card information',
          code: 'CARD_DETAILS_INVALID',
          message:
            'Incorrect card information. Check the last 6 digits and CVV on the back of your ECF Bank debit card and try again.',
        },
        { status: 403 }
      );
    }

    if (!session.profile.debitCardIssued) {
      return NextResponse.json(
        {
          error: 'Card not yet activated',
          code: 'CARD_NOT_ACTIVATED',
          message:
            'Your debit card is not yet activated. Contact ECF Banking at ecfbanking@edwinmega.com to submit a card activation request. Transfers cannot complete until your card is activated.',
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
