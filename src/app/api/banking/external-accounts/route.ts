import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import { addExternalAccount } from '@/lib/banking/store';
import type { ExternalAccount } from '@/lib/banking/types';
import { randomBytes } from 'crypto';

export async function GET() {
  const session = await requireSessionAccount();
  if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  return NextResponse.json({ accounts: session.profile.externalAccounts });
}

export async function POST(req: Request) {
  const session = await requireSessionAccount();
  if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  try {
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

    const updated = addExternalAccount(session.accountNumber, account);
    return NextResponse.json({ ok: true, accounts: updated?.externalAccounts ?? [] });
  } catch {
    return NextResponse.json({ error: 'Could not add account.' }, { status: 400 });
  }
}
