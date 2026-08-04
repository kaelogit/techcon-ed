'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';

export default function BankingLoginPage() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/banking/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'We could not sign you in. Check your account number and password.');
        return;
      }
      router.push('/banking/dashboard');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <BankingPublicShell>
      <div className="bg-[var(--ecf-paper)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-start lg:py-16">
          <div className="hidden pt-6 lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ecf-blue)]">
              Online Banking
            </p>
            <h1 className="banking-display mt-3 text-4xl font-semibold text-[var(--ecf-navy)]">
              Welcome back
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ecf-muted)]">
              Sign in to view balances, review activity, and manage transfers.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <h1 className="banking-display text-3xl font-semibold text-[var(--ecf-navy)] lg:hidden">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-[var(--ecf-muted)] lg:hidden">
              New to Online Banking?{' '}
              <Link href="/banking/register" className="font-semibold text-[var(--ecf-blue)]">
                Enroll now
              </Link>
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 space-y-4 border border-[var(--ecf-line)] bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="hidden text-lg font-semibold text-[var(--ecf-navy)] lg:block">Sign in</p>
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
                  autoComplete="username"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-[var(--ecf-ink)]">
                Password
                <input
                  type="password"
                  className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 outline-none focus:border-[var(--ecf-blue)]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[var(--ecf-navy)] py-3 text-sm font-semibold text-white hover:bg-[var(--ecf-blue)] disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
              <div className="flex flex-wrap justify-between gap-2 text-sm text-[var(--ecf-muted)]">
                <Link href="/banking/recover" className="font-medium text-[var(--ecf-blue)]">
                  Forgot password?
                </Link>
                <Link href="/banking/register" className="font-medium text-[var(--ecf-blue)]">
                  Enroll
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BankingPublicShell>
  );
}
