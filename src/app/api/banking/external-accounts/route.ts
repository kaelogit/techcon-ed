import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { requireSessionAccount } from '@/lib/banking/session';
import { addExternalAccount } from '@/lib/banking/store';
import type { ExternalAccount } from '@/lib/banking/types';

export async function GET() {
  try {
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    return NextResponse.json({ accounts: session.profile.externalAccounts });
  } catch (err) {
    console.error('[banking/external GET]', err);
    return NextResponse.json({ error: 'Could not load accounts.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

    const body = await req.json();
    const bankName = String(body.bankName || '').trim();
    const accountHolder = String(body.accountHolder || '').trim();
    const routingNumber = String(body.routingNumber || '').replace(/\D/g, '');
    const accountNumberFull = String(body.accountNumber || '').replace(/\D/g, '');
    const accountType = body.accountType === 'savings' ? 'savings' : 'checking';
    const nickname = String(body.nickname || '').trim();

    if (!bankName || !accountHolder || routingNumber.length < 9 || accountNumberFull.length < 4) {
      return NextResponse.json(
        { error: 'Bank name, holder, routing (9 digits), and account number are required.' },
        { status: 400 }
      );
    }

    const account: ExternalAccount = {
      id: `ext_${randomBytes(6).toString('hex')}`,
      bankName,
      accountHolder,
      routingNumber: routingNumber.slice(0, 9),
      accountNumberLast4: accountNumberFull.slice(-4),
      accountType,
      nickname: nickname || undefined,
      createdAt: new Date().toISOString(),
    };

    const accounts = await addExternalAccount(session.accountNumber, account);
    return NextResponse.json({ ok: true, accounts });
  } catch (err) {
    console.error('[banking/external POST]', err);
    return NextResponse.json({ error: 'Could not add account.' }, { status: 400 });
  }
}
