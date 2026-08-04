import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import { buildTransactions, computeBalance, maskAccountNumber, setProfile, toPublicView } from '@/lib/banking/store';

export async function GET() {
  const session = await requireSessionAccount();
  if (!session) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }
  const { seed, profile } = session;
  const transactions = buildTransactions(seed, profile);
  const balance = computeBalance(seed, profile);

  return NextResponse.json({
    account: {
      ...toPublicView(seed),
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
}

export async function PATCH(req: Request) {
  const session = await requireSessionAccount();
  if (!session) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (body.welcomeSeen === true) {
      setProfile({ ...session.profile, welcomeSeen: true });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Update failed.' }, { status: 400 });
  }
}
