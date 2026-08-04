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
        setError(data.error || 'Sign in failed.');
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
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="banking-display text-3xl text-[#0b1f33]">Sign in</h1>
        <p className="mt-2 text-sm text-[#64748b]">
          Use your ECF account number and password. New here?{' '}
          <Link href="/banking/register" className="font-semibold text-[#2f8f84]">
            Register first
          </Link>
          .
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-[#d5dde6] bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-[#334155]">
            Account number
            <input
              className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 outline-none focus:border-[#2f8f84]"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="ECF-300-784291"
              autoComplete="username"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[#334155]">
            Password
            <input
              type="password"
              className="mt-1.5 w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 outline-none focus:border-[#2f8f84]"
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
            className="w-full rounded-xl bg-[#0b1f33] py-3 text-sm font-semibold text-white hover:bg-[#12324d] disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-center text-sm text-[#64748b]">
            <Link href="/banking/recover" className="font-medium text-[#2f8f84]">
              Forgot password?
            </Link>
          </p>
        </form>
      </div>
    </BankingPublicShell>
  );
}
