'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';
import { formatMoney } from '@/lib/banking/format';
import { SECURITY_QUESTION_OPTIONS } from '@/lib/banking/types';

type AccountPreview = {
  accountNumber: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  supportAmount: number;
  accountType: string;
  registered: boolean;
};

export default function BankingRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [account, setAccount] = useState<AccountPreview | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [q1, setQ1] = useState(SECURITY_QUESTION_OPTIONS[0]);
  const [q2, setQ2] = useState(SECURITY_QUESTION_OPTIONS[1]);
  const [q3, setQ3] = useState(SECURITY_QUESTION_OPTIONS[2]);
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function lookup(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/banking/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'We could not find that account number.');
        return;
      }
      if (data.account.registered) {
        setError('Online Banking is already set up for this account. Please sign in.');
        return;
      }
      setAccount(data.account);
      setStep(2);
    } catch {
      setError('Lookup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function register(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/banking/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountNumber,
          password,
          securityQuestions: [
            { question: q1, answer: a1 },
            { question: q2, answer: a2 },
            { question: q3, answer: a3 },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Enrollment failed.');
        return;
      }
      router.push('/banking/dashboard');
      router.refresh();
    } catch {
      setError('Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <BankingPublicShell>
      <div className="bg-[var(--ecf-paper)]">
        <div className="mx-auto max-w-lg px-4 py-12">
          <h1 className="banking-display text-3xl font-semibold text-[var(--ecf-navy)]">
            Enroll in Online Banking
          </h1>
          <p className="mt-2 text-sm text-[var(--ecf-muted)]">
            Enter your ECF Bank account number to get started. Already enrolled?{' '}
            <Link href="/banking/login" className="font-semibold text-[var(--ecf-blue)]">
              Sign in
            </Link>
            .
          </p>

          {step === 1 ? (
            <form
              onSubmit={lookup}
              className="mt-8 space-y-4 border border-[var(--ecf-line)] bg-white p-6 shadow-sm"
            >
              <label className="block text-sm font-medium text-[var(--ecf-ink)]">
                Account number
                <input
                  className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 outline-none focus:border-[var(--ecf-blue)]"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="12-digit account number"
                  inputMode="numeric"
                  maxLength={12}
                  pattern="[0-9]{12}"
                  required
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[var(--ecf-navy)] py-3 text-sm font-semibold text-white hover:bg-[var(--ecf-blue)] disabled:opacity-60"
              >
                {loading ? 'Looking up…' : 'Continue'}
              </button>
            </form>
          ) : null}

          {step === 2 && account ? (
            <div className="mt-8 space-y-4">
              <div className="border border-[var(--ecf-line)] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ecf-blue)]">
                  Account found
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--ecf-navy)]">{account.fullName}</p>
                <p className="mt-1 text-sm text-[var(--ecf-muted)]">
                  {account.addressLine1}
                  <br />
                  {account.city}, {account.state} {account.postalCode}
                </p>
                <p className="mt-3 text-sm text-[var(--ecf-ink)]">
                  {account.accountType} · Available balance{' '}
                  <strong>{formatMoney(account.supportAmount)}</strong>
                </p>
              </div>

              <form
                onSubmit={register}
                className="space-y-4 border border-[var(--ecf-line)] bg-white p-6 shadow-sm"
              >
                <label className="block text-sm font-medium text-[var(--ecf-ink)]">
                  Create password
                  <input
                    type="password"
                    className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 outline-none focus:border-[var(--ecf-blue)]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-[var(--ecf-ink)]">
                  Confirm password
                  <input
                    type="password"
                    className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 outline-none focus:border-[var(--ecf-blue)]"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    minLength={8}
                    required
                  />
                </label>

                <p className="pt-2 text-sm font-semibold text-[var(--ecf-navy)]">Security questions</p>
                {[
                  [q1, setQ1, a1, setA1],
                  [q2, setQ2, a2, setA2],
                  [q3, setQ3, a3, setA3],
                ].map((row, idx) => {
                  const [q, setQ, a, setA] = row as [
                    string,
                    (v: string) => void,
                    string,
                    (v: string) => void,
                  ];
                  return (
                    <div key={idx} className="space-y-2 bg-[var(--ecf-paper)] p-3">
                      <select
                        className="w-full rounded border border-[var(--ecf-line)] px-3 py-2 text-sm"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                      >
                        {SECURITY_QUESTION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <input
                        className="w-full rounded border border-[var(--ecf-line)] px-3 py-2 text-sm"
                        placeholder="Your answer"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        required
                      />
                    </div>
                  );
                })}

                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded border border-[var(--ecf-line)] px-4 py-3 text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded bg-[var(--ecf-navy)] py-3 text-sm font-semibold text-white hover:bg-[var(--ecf-blue)] disabled:opacity-60"
                  >
                    {loading ? 'Setting up…' : 'Complete enrollment'}
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </BankingPublicShell>
  );
}
