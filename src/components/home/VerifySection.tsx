import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { OFFICIAL_EMAIL, OFFICIAL_SITE } from '@/data/verify';

export function VerifySection() {
  return (
    <section id="verify" className="border-y border-gray-200 bg-[var(--warm-cream)] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[var(--accent-gold)]" />
          <p className="text-xs font-bold tracking-[0.3em] text-[var(--accent-gold)] uppercase">
            Before you reply
          </p>
        </div>
        <h2 className="font-serif text-3xl font-semibold text-[var(--trust)] md:text-4xl lg:text-5xl">
          Someone contacted you about Edwin Castro funding?
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          Pause. Check it here first. Official messages come only from{' '}
          <span className="font-semibold text-[var(--trust)]">{OFFICIAL_EMAIL}</span> on{' '}
          {OFFICIAL_SITE}. We never ask you to pay a fee or share a password.
        </p>
        <div className="mt-8 border border-gray-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Official email</p>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20check%20this%20contact`}
            className="mt-2 block font-serif text-xl font-semibold text-[var(--trust)] sm:text-2xl"
          >
            {OFFICIAL_EMAIL}
          </a>
          <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-gold)]" />
            If the address does not match this one, it is not us.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 bg-[var(--trust)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--trust-light)]"
          >
            Check if this message is real
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20check%20this%20contact`}
            className="inline-flex items-center gap-2 border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-[var(--trust)] transition-colors hover:border-[var(--accent-gold)]"
          >
            <Mail className="h-4 w-4" />
            Email support
          </a>
        </div>
      </div>
    </section>
  );
}
