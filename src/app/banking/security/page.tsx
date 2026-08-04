'use client';

import { FormEvent, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { SECURITY_QUESTION_OPTIONS } from '@/lib/banking/types';

export default function SecurityPage() {
  const { data, loading, error } = useBankingMe();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [q1, setQ1] = useState(SECURITY_QUESTION_OPTIONS[0]);
  const [q2, setQ2] = useState(SECURITY_QUESTION_OPTIONS[1]);
  const [q3, setQ3] = useState(SECURITY_QUESTION_OPTIONS[2]);
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [qMsg, setQMsg] = useState('');
  const [qErr, setQErr] = useState('');

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setErr('');
    const res = await fetch('/api/banking/security', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'password',
        currentPassword,
        newPassword,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setErr(json.error || 'Could not update password.');
      return;
    }
    setMsg('Password updated.');
    setCurrentPassword('');
    setNewPassword('');
  }

  async function updateQuestions(e: FormEvent) {
    e.preventDefault();
    setQMsg('');
    setQErr('');
    const res = await fetch('/api/banking/security', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'questions',
        securityQuestions: [
          { question: q1, answer: a1 },
          { question: q2, answer: a2 },
          { question: q3, answer: a3 },
        ],
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setQErr(json.error || 'Could not update questions.');
      return;
    }
    setQMsg('Security questions updated.');
    setA1('');
    setA2('');
    setA3('');
  }

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[#64748b]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-3xl text-[#0b1f33]">Security</h1>
      <p className="mt-1 text-sm text-[#64748b]">Manage your password and security questions.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={changePassword} className="space-y-3 rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#0b1f33]">Change password</h2>
          <input
            type="password"
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
            placeholder="New password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            required
          />
          {err ? <p className="text-sm text-red-600">{err}</p> : null}
          {msg ? <p className="text-sm text-[#0f766e]">{msg}</p> : null}
          <button type="submit" className="rounded-xl bg-[#0b1f33] px-4 py-2.5 text-sm font-semibold text-white">
            Update password
          </button>
        </form>

        <form onSubmit={updateQuestions} className="space-y-3 rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#0b1f33]">Update security questions</h2>
          <p className="text-xs text-[#64748b]">
            Current questions on file:{' '}
            {data.account.securityQuestions.map((q) => q.question).join(' · ')}
          </p>
          {[
            [q1, setQ1, a1, setA1],
            [q2, setQ2, a2, setA2],
            [q3, setQ3, a3, setA3],
          ].map((row, idx) => {
            const [q, setQ, a, setA] = row as [string, (v: string) => void, string, (v: string) => void];
            return (
              <div key={idx} className="space-y-2 rounded-xl bg-[#f8fafc] p-3">
                <select
                  className="w-full rounded-lg border border-[#cbd5e1] px-3 py-2 text-sm"
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
                  className="w-full rounded-lg border border-[#cbd5e1] px-3 py-2 text-sm"
                  placeholder="New answer"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  required
                />
              </div>
            );
          })}
          {qErr ? <p className="text-sm text-red-600">{qErr}</p> : null}
          {qMsg ? <p className="text-sm text-[#0f766e]">{qMsg}</p> : null}
          <button type="submit" className="rounded-xl bg-[#2f8f84] px-4 py-2.5 text-sm font-semibold text-white">
            Save questions
          </button>
        </form>
      </div>
    </BankingAppShell>
  );
}
