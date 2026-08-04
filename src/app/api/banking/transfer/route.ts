import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { requireSessionAccount } from '@/lib/banking/session';
import { addTransferTransaction, computeBalance } from '@/lib/banking/store';
import type { BankTransaction } from '@/lib/banking/types';

export async function POST(req: Request) {
  const session = await requireSessionAccount();
  if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  try {
    const body = await req.json();
    const externalId = String(body.externalAccountId || '');
    const amount = Number(body.amount);
    const memo = String(body.memo || '').trim();

    if (!externalId || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Valid external account and amount are required.' }, { status: 400 });
    }

    const external = session.profile.externalAccounts.find((a) => a.id === externalId);
    if (!external) {
      return NextResponse.json({ error: 'External account not found.' }, { status: 404 });
    }

    const balance = computeBalance(session.seed, session.profile);
    if (amount > balance) {
      return NextResponse.json({ error: 'Insufficient available balance.' }, { status: 400 });
    }

    const reference = `TRF-${randomBytes(4).toString('hex').toUpperCase()}`;
    const txn: BankTransaction = {
      id: `TX-${randomBytes(6).toString('hex')}`,
      date: new Date().toISOString().slice(0, 10),
      description: `Transfer to ${external.bankName} ••••${external.accountNumberLast4}${memo ? ` — ${memo}` : ''}`,
      amount: -Math.abs(amount),
      type: 'transfer',
      status: 'completed',
      reference,
    };

    addTransferTransaction(session.accountNumber, txn);
    const newBalance = balance - amount;

    return NextResponse.json({
      ok: true,
      transaction: txn,
      balance: newBalance,
      reference,
    });
  } catch {
    return NextResponse.json({ error: 'Transfer failed.' }, { status: 500 });
  }
}
