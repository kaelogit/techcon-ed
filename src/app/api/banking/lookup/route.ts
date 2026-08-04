import { NextResponse } from 'next/server';
import { getSeed, toPublicView } from '@/lib/banking/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const accountNumber = String(body.accountNumber || '').trim();
    if (!accountNumber) {
      return NextResponse.json({ error: 'Account number is required.' }, { status: 400 });
    }
    const seed = getSeed(accountNumber);
    if (!seed) {
      return NextResponse.json({ error: 'No account found for that number.' }, { status: 404 });
    }
    return NextResponse.json({ account: toPublicView(seed) });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
