'use client';

import { FormEvent, useEffect, useState } from 'react';
import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { SECURITY_QUESTION_OPTIONS } from '@/lib/banking/types';

export default function SecurityPage() {
  const { data, loading, error, refresh } = useBankingMe();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [editingQuestions, setEditingQuestions] = useState(false);
  const [q1, setQ1] = useState(SECURITY_QUESTION_OPTIONS[0]);
  const [q2, setQ2] = useState(SECURITY_QUESTION_OPTIONS[1]);
  const [q3, setQ3] = useState(SECURITY_QUESTION_OPTIONS[2]);
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [qMsg, setQMsg] = useState('');
  const [qErr, setQErr] = useState('');

  useEffect(() => {
    if (!data?.account.securityQuestions?.length) return;
    const qs = data.account.securityQuestions;
    if (qs[0]?.question) setQ1(qs[0].question);
    if (qs[1]?.question) setQ2(qs[1].question);
    if (qs[2]?.question) setQ3(qs[2].question);
  }, [data]);

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setErr('');
    if (newPassword !== confirmPassword) {
      setErr('New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setErr('New password must be at least 8 characters.');
      return;
    }
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
    setConfirmPassword('');
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
    setEditingQuestions(false);
    await refresh();
  }

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[var(--ecf-muted)]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  const savedQuestions = data.account.securityQuestions || [];

  return (
    <BankingAppShell accountName={data.account.fullName}>
      <h1 className="banking-display text-2xl font-semibold text-[var(--ecf-navy)] sm:text-3xl">Security</h1>
      <p className="mt-1 text-sm text-[var(--ecf-muted)]">Manage your password and security questions.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <form
          onSubmit={changePassword}
          className="space-y-3 border border-[var(--ecf-line)] bg-white p-5 shadow-sm"
        >
          <h2 className="font-semibold text-[var(--ecf-navy)]">Change password</h2>
          <label className="block text-sm font-medium text-[var(--ecf-ink)]">
            Current password
            <input
              type="password"
              className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 text-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[var(--ecf-ink)]">
            New password
            <input
              type="password"
              className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[var(--ecf-ink)]">
            Confirm new password
            <input
              type="password"
              className="mt-1.5 w-full rounded border border-[var(--ecf-line)] px-3 py-2.5 text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
              required
            />
          </label>
          {err ? <p className="text-sm text-red-600">{err}</p> : null}
          {msg ? <p className="text-sm text-[var(--ecf-navy)]">{msg}</p> : null}
          <button
            type="submit"
            className="rounded bg-[var(--ecf-navy)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Update password
          </button>
        </form>

        <div className="border border-[var(--ecf-line)] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[var(--ecf-navy)]">Security questions</h2>
          <p className="mt-1 text-xs text-[var(--ecf-muted)]">
            Set at enrollment. Answers are never shown again — only the questions on file.
          </p>

          {savedQuestions.length ? (
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--ecf-ink)]">
              {savedQuestions.map((q, i) => (
                <li key={i}>{q.question}</li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-sm text-[var(--ecf-muted)]">No security questions on file.</p>
          )}

          {!editingQuestions ? (
            <button
              type="button"
              onClick={() => {
                setEditingQuestions(true);
                setQMsg('');
                setQErr('');
              }}
              className="mt-5 rounded border border-[var(--ecf-line)] px-4 py-2.5 text-sm font-semibold text-[var(--ecf-navy)]"
            >
              Change questions
            </button>
          ) : (
            <form onSubmit={updateQuestions} className="mt-5 space-y-3 border-t border-[var(--ecf-line)] pt-4">
              <p className="text-xs text-[var(--ecf-muted)]">
                Choose three questions and enter new answers. This replaces your current questions.
              </p>
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
                      placeholder="New answer"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      required
                    />
                  </div>
                );
              })}
              {qErr ? <p className="text-sm text-red-600">{qErr}</p> : null}
              {qMsg ? <p className="text-sm text-[var(--ecf-navy)]">{qMsg}</p> : null}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingQuestions(false)}
                  className="rounded border border-[var(--ecf-line)] px-4 py-2.5 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[var(--ecf-navy)] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Save questions
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </BankingAppShell>
  );
}
