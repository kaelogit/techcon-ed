'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { fakeAgents, scamChannels } from '@/data/fake-agents';

const inputClass =
  'w-full border border-[var(--edwin-line)] bg-white px-4 py-3 text-[var(--trust)] outline-none focus:border-[var(--trust)]';

export function ScamReportForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');
  const [agentPreset, setAgentPreset] = useState('');
  const [agentOther, setAgentOther] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const agentName =
      agentPreset === 'other'
        ? agentOther.trim()
        : agentPreset || String(data.get('agentName') || '').trim();

    if (!agentName) {
      setError('Please choose or enter the fake agent name.');
      return;
    }

    const body = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      agentName,
      channel: String(data.get('channel') || '').trim(),
      amountLost: String(data.get('amountLost') || '').trim(),
      whenHappened: String(data.get('whenHappened') || '').trim(),
      story: String(data.get('story') || '').trim(),
    };

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/scam-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(typeof json.error === 'string' ? json.error : 'Could not send. Please try again.');
        return;
      }
      setStatus('ok');
      form.reset();
      setAgentPreset('');
      setAgentOther('');
    } catch {
      setStatus('error');
      setError('Could not send. Please email support@edwinmega.com.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8">
        <CheckCircle2 className="h-10 w-10 text-[var(--edwin-coral)]" />
        <h3 className="mt-4 text-xl text-[var(--trust)]">Recovery mode has begun</h3>
        <p
          className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          Thank you for trusting us with something this heavy. Our support team will review your
          story and the amount you lost. Speaking up matters. We will write you from
          support@edwinmega.com about the next step on your recovery path.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 border border-[var(--edwin-line)] bg-white p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="scam-name" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
            Your full name
          </label>
          <input id="scam-name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="scam-email" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
            Email
          </label>
          <input id="scam-email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="scam-phone" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
            Phone <span className="font-normal text-[var(--edwin-muted)]">(optional)</span>
          </label>
          <input id="scam-phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="scam-agent" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          Fake agent name
        </label>
        <select
          id="scam-agent"
          required
          value={agentPreset}
          onChange={(e) => setAgentPreset(e.target.value)}
          className={inputClass}
        >
          <option value="">Select a name, or choose Other</option>
          {fakeAgents.map((agent) => (
            <option key={agent.name} value={agent.name}>
              {agent.name}
            </option>
          ))}
          <option value="other">Other / name not listed</option>
        </select>
        {agentPreset === 'other' ? (
          <input
            name="agentName"
            required
            value={agentOther}
            onChange={(e) => setAgentOther(e.target.value)}
            placeholder="Type the name they used"
            className={`${inputClass} mt-3`}
          />
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="scam-channel" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
            How they contacted you
          </label>
          <select id="scam-channel" name="channel" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a channel
            </option>
            {scamChannels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="scam-amount" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
            How much you lost
          </label>
          <input
            id="scam-amount"
            name="amountLost"
            required
            placeholder="e.g. $2,500 or Nothing, I stopped in time"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="scam-when" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          When it happened <span className="font-normal text-[var(--edwin-muted)]">(optional)</span>
        </label>
        <input
          id="scam-when"
          name="whenHappened"
          placeholder="e.g. October 2026, or last week"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="scam-story" className="mb-2 block text-sm font-semibold text-[var(--trust)]">
          Tell us the story
        </label>
        <textarea
          id="scam-story"
          name="story"
          required
          rows={7}
          placeholder="What did they say? What did they ask you to send? How did it feel when you realized the truth? Tell us everything you can."
          className={`${inputClass} resize-y`}
        />
      </div>

      {error || status === 'error' ? (
        <p className="text-sm text-red-700">{error || 'Something went wrong. Please try again.'}</p>
      ) : null}

      <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting recovery…
          </>
        ) : (
          'Begin recovery mode'
        )}
      </button>
    </form>
  );
}
