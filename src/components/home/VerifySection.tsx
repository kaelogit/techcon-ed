import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { OFFICIAL_EMAIL, OFFICIAL_SITE } from '@/data/verify';

export function VerifySection() {
  return (
    <section data-nosnippet className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-20 md:py-28">
      <div className="container-wide max-w-3xl">
        <p className="section-label">Stay safe</p>
        <h2 className="headline-lg mt-4 text-[var(--trust)]">
          Is this Edwin Castro
          <br />
          text real?
        </h2>
        <div className="accent-bar mt-5" />
        <p
          className="mt-6 text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          If a text, an email, or a Facebook message says the Foundation picked you, stop. We do not
          text people first. We do not tell you that you won a grant before you apply.
        </p>
        <div className="mt-8 border border-[var(--edwin-line)] bg-white p-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.16em] text-[var(--edwin-muted)] uppercase">
            Official email
          </p>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20verify%20this%20contact`}
            className="mt-2 block font-display text-2xl text-[var(--trust)] sm:text-3xl"
          >
            {OFFICIAL_EMAIL}
          </a>
          <p
            className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--edwin-coral)]" />
            Real follow-up uses {OFFICIAL_EMAIL} on {OFFICIAL_SITE}. If anything looks off, verify
            before you reply or share documents.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/verify" className="btn-navy">
            Check if the text is real
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/scam-report" className="btn-outline">
            Report a fake agent
          </Link>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20verify%20this%20contact`}
            className="btn-outline"
          >
            <Mail className="h-4 w-4" />
            Email support
          </a>
        </div>
      </div>
    </section>
  );
}
