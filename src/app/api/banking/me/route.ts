import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import {
  buildTransactions,
  computeBalance,
  markWelcomeSeen,
  maskAccountNumber,
  toPublicView,
} from '@/lib/banking/store';

export async function GET() {
  try {
    const session = await requireSessionAccount();
    if (!session) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    }
    const { seed, profile, accountNumber } = session;
    const transactions = await buildTransactions(accountNumber);
    const balance = await computeBalance(accountNumber);

    return NextResponse.json({
      account: {
        ...(await toPublicView(seed)),
        registered: true,
        maskedAccountNumber: maskAccountNumber(seed.accountNumber),
        balance,
        pendingBalance: transactions
          .filter((t) => t.status === 'pending')
          .reduce((s, t) => s + Math.abs(t.amount), 0),
        externalAccounts: profile.externalAccounts,
        securityQuestions: profile.securityQuestions.map((q) => ({ question: q.question })),
        welcomeSeen: profile.welcomeSeen,
        registeredAt: profile.registeredAt,
      },
      transactions,
    });
  } catch (err) {
    console.error('[banking/me GET]', err);
    return NextResponse.json({ error: 'Could not load account.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    }
    const body = await req.json();
    if (body.welcomeSeen === true) {
      await markWelcomeSeen(session.accountNumber);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[banking/me PATCH]', err);
    return NextResponse.json({ error: 'Update failed.' }, { status: 400 });
  }
}
