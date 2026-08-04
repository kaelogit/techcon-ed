import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import { buildTransactions } from '@/lib/banking/store';

export async function GET() {
  const session = await requireSessionAccount();
  if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  return NextResponse.json({
    transactions: buildTransactions(session.seed, session.profile),
  });
}
