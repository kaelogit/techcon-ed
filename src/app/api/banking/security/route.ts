import { NextResponse } from 'next/server';
import { hashAnswer, hashPassword, verifyPassword } from '@/lib/banking/crypto';
import { requireSessionAccount } from '@/lib/banking/session';
import { setProfile, updatePasswordHash } from '@/lib/banking/store';

export async function POST(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

    const body = await req.json();
    const action = String(body.action || 'password');

    if (action === 'password') {
      const currentPassword = String(body.currentPassword || '');
      const newPassword = String(body.newPassword || '');
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 });
      }
      if (!verifyPassword(currentPassword, session.profile.passwordHash)) {
        return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
      }
      await updatePasswordHash(session.accountNumber, hashPassword(newPassword));
      return NextResponse.json({ ok: true });
    }

    if (action === 'questions') {
      const questions = body.securityQuestions as { question: string; answer: string }[] | undefined;
      if (!Array.isArray(questions) || questions.length < 3) {
        return NextResponse.json({ error: 'Provide 3 security questions.' }, { status: 400 });
      }
      await setProfile({
        ...session.profile,
        securityQuestions: questions.slice(0, 3).map((q) => ({
          question: q.question.trim(),
          answerHash: hashAnswer(q.answer),
        })),
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err) {
    console.error('[banking/security]', err);
    return NextResponse.json({ error: 'Update failed.' }, { status: 400 });
  }
}
