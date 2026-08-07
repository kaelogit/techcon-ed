import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import { decideSupportOffer, isSupportOfferTxn } from '@/lib/banking/store';

export async function POST(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    }
    if (session.seed.status === 'frozen') {
      return NextResponse.json({ error: 'Account is frozen.' }, { status: 403 });
    }

    const body = await req.json();
    const action = String(body.action || '').toLowerCase();
    const transactionId = String(body.transactionId || body.offerId || '').trim();
    if (!transactionId) {
      return NextResponse.json({ error: 'transactionId required.' }, { status: 400 });
    }
    if (action !== 'accept' && action !== 'reject') {
      return NextResponse.json({ error: 'Use action accept or reject.' }, { status: 400 });
    }

    const txn = await decideSupportOffer(session.accountNumber, transactionId, action);
    if (!isSupportOfferTxn(txn)) {
      return NextResponse.json({ error: 'Not a support offer.' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      transaction: txn,
      message:
        action === 'accept'
          ? 'Additional support accepted. Funds have been added to your available balance.'
          : 'Additional support offer declined. No funds were added.',
    });
  } catch (err) {
    console.error('[banking/support-offer]', err);
    const message = err instanceof Error ? err.message : 'Could not update support offer.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
