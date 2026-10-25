'use client';

import { FormEvent, useState } from 'react';

export function DonateForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, amount, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(typeof data.error === 'string' ? data.error : 'Could not send. Please email support.');
        return;
      }
      setStatus('ok');
    } catch {
      setStatus('error');
      setError('Could not send. Please email support@edwinmega.com.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="card-flat mt-8 p-8">
        <h3 className="text-xl text-[var(--trust)]">Thank you</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)]">
          We have received your donation inquiry. Please check your inbox. Our office will write you
          from support@edwinmega.com with the next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-flat mt-8 space-y-5 p-6 md:p-8">
      <div>
        <label htmlFor="donate-name" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          Full name
        </label>
        <input
          id="donate-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[var(--edwin-line)] bg-white px-4 py-3 text-[var(--trust)] outline-none focus:border-[var(--trust)]"
        />
      </div>
      <div>
        <label htmlFor="donate-email" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          Email
        </label>
        <input
          id="donate-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[var(--edwin-line)] bg-white px-4 py-3 text-[var(--trust)] outline-none focus:border-[var(--trust)]"
        />
      </div>
      <div>
        <label htmlFor="donate-amount" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          Donation amount
        </label>
        <input
          id="donate-amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. $75,000"
          className="w-full border border-[var(--edwin-line)] bg-white px-4 py-3 text-[var(--trust)] outline-none focus:border-[var(--trust)]"
        />
      </div>
      <div>
        <label htmlFor="donate-message" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          Message about your donation
        </label>
        <textarea
          id="donate-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us why you want to give, and anything we should know about this donation."
          className="w-full border border-[var(--edwin-line)] bg-white px-4 py-3 text-[var(--trust)] outline-none focus:border-[var(--trust)]"
        />
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send donation inquiry'}
      </button>
    </form>
  );
}
