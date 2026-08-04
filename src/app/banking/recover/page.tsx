'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';

export default function RecoverPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadQuestions(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/banking/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'questions', accountNumber }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not load questions.');
        return;
      }
      setQuestions(data.questions);
      setStep(2);
    } catch {
      setError('Request failed.');
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/banking/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset',
          accountNumber,
          answers,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not reset password.');
        return;
      }
      setDone(true);
      setStep(3);
    } catch {
      setError('Request failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <BankingPublicShell>
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="banking-display text-3xl text-[#0b1f33]">Recover access</h1>
        <p className="mt-2 text-sm text-[#64748b]">
          Reset your password using the security questions you set at registration.
        </p>

        {step === 1 ? (
          <form onSubmit={loadQuestions} className="mt-8 space-y-4 rounded-2xl border border-[#d5dde6] bg-white p-6 shadow-sm">
            <input
              className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
              placeholder="Account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0b1f33] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Loading…' : 'Continue'}
            </button>
          </form>
        ) : null}

        {step === 2 ? (
          <form onSubmit={resetPassword} className="mt-8 space-y-4 rounded-2xl border border-[#d5dde6] bg-white p-6 shadow-sm">
            {questions.map((q, i) => (
              <label key={q} className="block text-sm font-medium text-[#334155]">
                {q}
                <input
                  className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                  value={answers[i]}
                  onChange={(e) => {
                    const next = [...answers];
                    next[i] = e.target.value;
                    setAnswers(next);
                  }}
                  required
                />
              </label>
            ))}
            <label className="block text-sm font-medium text-[#334155]">
              New password
              <input
                type="password"
                className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                required
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2f8f84] py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Resetting…' : 'Reset password'}
            </button>
          </form>
        ) : null}

        {step === 3 && done ? (
          <div className="mt-8 rounded-2xl border border-[#b7e4de] bg-[#ecfdf8] p-6 text-sm text-[#115e59]">
            Password updated. You can now{' '}
            <Link href="/banking/login" className="font-semibold underline">
              sign in
            </Link>
            .
          </div>
        ) : null}
      </div>
    </BankingPublicShell>
  );
}
