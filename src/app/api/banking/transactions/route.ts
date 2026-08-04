import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import { buildTransactions } from '@/lib/banking/store';

export async function GET() {
  try {
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    return NextResponse.json({
      transactions: await buildTransactions(session.accountNumber),
    });
  } catch (err) {
    console.error('[banking/transactions]', err);
    return NextResponse.json({ error: 'Could not load transactions.' }, { status: 500 });
  }
}
