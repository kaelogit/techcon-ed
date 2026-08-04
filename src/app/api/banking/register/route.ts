import { NextResponse } from 'next/server';
import { hashAnswer, hashPassword } from '@/lib/banking/crypto';
import { createSession } from '@/lib/banking/session';
import { getProfile, getSeed, setProfile, toPublicView } from '@/lib/banking/store';
import type { AccountProfile } from '@/lib/banking/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const accountNumber = String(body.accountNumber || '').trim().toUpperCase();
    const password = String(body.password || '');
    const questions = body.securityQuestions as { question: string; answer: string }[] | undefined;

    if (!accountNumber || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Account number and a password of at least 8 characters are required.' },
        { status: 400 }
      );
    }
    if (!Array.isArray(questions) || questions.length < 3) {
      return NextResponse.json({ error: 'Please answer 3 security questions.' }, { status: 400 });
    }

    const seed = await getSeed(accountNumber);
    if (!seed) {
      return NextResponse.json({ error: 'No account found for that number.' }, { status: 404 });
    }
    if (await getProfile(accountNumber)) {
      return NextResponse.json(
        { error: 'This account is already registered. Please sign in.' },
        { status: 409 }
      );
    }

    for (const q of questions.slice(0, 3)) {
      if (!q.question?.trim() || !q.answer?.trim()) {
        return NextResponse.json({ error: 'Each security question needs an answer.' }, { status: 400 });
      }
    }

    const profile: AccountProfile = {
      accountNumber,
      passwordHash: hashPassword(password),
      securityQuestions: questions.slice(0, 3).map((q) => ({
        question: q.question.trim(),
        answerHash: hashAnswer(q.answer),
      })),
      externalAccounts: [],
      extraTransactions: [],
      registeredAt: new Date().toISOString(),
      welcomeSeen: false,
      hasVaultKey: false,
      vaultKeyHash: null,
    };

    await setProfile(profile);
    await createSession(accountNumber);

    return NextResponse.json({
      ok: true,
      account: await toPublicView(seed),
      firstLogin: true,
    });
  } catch (err) {
    console.error('[banking/register]', err);
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
