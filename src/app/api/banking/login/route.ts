import { NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/banking/crypto';
import { createSession } from '@/lib/banking/session';
import { getProfile, getSeed, toPublicView } from '@/lib/banking/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const accountNumber = String(body.accountNumber || '').trim().toUpperCase();
    const password = String(body.password || '');

    if (!accountNumber || !password) {
      return NextResponse.json({ error: 'Account number and password are required.' }, { status: 400 });
    }

    const seed = getSeed(accountNumber);
    const profile = getProfile(accountNumber);
    if (!seed || !profile) {
      return NextResponse.json(
        { error: 'Account not found or not registered yet. Please register first.' },
        { status: 401 }
      );
    }

    if (!verifyPassword(password, profile.passwordHash)) {
      return NextResponse.json({ error: 'Incorrect account number or password.' }, { status: 401 });
    }

    await createSession(accountNumber);
    return NextResponse.json({
      ok: true,
      account: toPublicView(seed),
      firstLogin: !profile.welcomeSeen,
    });
  } catch {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
