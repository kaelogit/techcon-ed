import { NextResponse } from 'next/server';
import { hashPassword, verifyAnswer } from '@/lib/banking/crypto';
import { getProfile, getSeed, updatePasswordHash } from '@/lib/banking/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = String(body.action || 'questions');
    const accountNumber = String(body.accountNumber || '').trim().toUpperCase();

    if (!accountNumber) {
      return NextResponse.json({ error: 'Account number is required.' }, { status: 400 });
    }

    const seed = await getSeed(accountNumber);
    const profile = await getProfile(accountNumber);
    if (!seed || !profile) {
      return NextResponse.json({ error: 'Account not found or not registered.' }, { status: 404 });
    }

    if (action === 'questions') {
      return NextResponse.json({
        questions: profile.securityQuestions.map((q) => q.question),
      });
    }

    if (action === 'reset') {
      const answers = body.answers as string[] | undefined;
      const newPassword = String(body.newPassword || '');
      if (!Array.isArray(answers) || answers.length < 3 || newPassword.length < 8) {
        return NextResponse.json(
          { error: 'Answer all security questions and choose a password of at least 8 characters.' },
          { status: 400 }
        );
      }

      const ok = profile.securityQuestions.every((q, i) => verifyAnswer(answers[i] || '', q.answerHash));
      if (!ok) {
        return NextResponse.json({ error: 'One or more security answers are incorrect.' }, { status: 401 });
      }

      await updatePasswordHash(accountNumber, hashPassword(newPassword));
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err) {
    console.error('[banking/recover]', err);
    return NextResponse.json({ error: 'Request failed.' }, { status: 400 });
  }
}
