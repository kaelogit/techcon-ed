import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Globe, Mail, ShieldCheck } from 'lucide-react';
import { OFFICIAL_EMAIL, OFFICIAL_SITE, verifyChecks, verifyFaqs } from '@/data/verify';

const checkIcons = [Globe, Mail, ShieldCheck, AlertTriangle];

export default function VerifyPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-[var(--warm-cream)] px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-[var(--accent-gold)] uppercase">
            Official contact verification
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--trust)] md:text-5xl">
            Confirm you are speaking with Edwin Castro funding
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            This page exists so you can verify a call, text, or email before you reply. When the
            contact is real, you will recognize the official channel. When it is not, you will know
            to stop.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="border border-gray-200 bg-[var(--warm-cream)] p-8 text-center sm:p-10">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--accent-gold)]" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-[var(--trust)]">
              The only official support email
            </h2>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20verify%20this%20contact`}
              className="mt-3 block font-serif text-xl font-semibold text-[var(--trust)] break-all sm:text-2xl"
            >
              {OFFICIAL_EMAIL}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Bookmark this address and the official site:{' '}
              <a href="https://www.edwinmega.com" className="font-medium text-[var(--trust)] underline">
                {OFFICIAL_SITE}
              </a>
              . If either one looks different, do not continue the conversation yet.
            </p>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20verify%20this%20contact`}
              className="mt-6 inline-flex items-center justify-center bg-[var(--trust)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--trust-light)]"
            >
              Email support to verify this contact
            </a>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--trust)]">
              Why this page matters
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              People searching for Edwin Castro funding deserve one clear place to separate official
              contact from lookalikes. Use these checks every time someone reaches out using this
              name.
            </p>
          </div>

          <div className="space-y-6">
            {verifyChecks.map((item, index) => {
              const Icon = checkIcons[index];
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--warm-cream)] text-[var(--accent-gold)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[var(--trust)]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--trust)]">
              Common verification questions
            </h2>
            <div className="mt-4">
              {verifyFaqs.map((item) => (
                <div key={item.question} className="border-t border-gray-200 py-5">
                  <h3 className="text-sm font-semibold text-[var(--trust)]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/#faq"
              className="inline-flex items-center border border-gray-300 px-5 py-3 text-sm font-semibold text-[var(--trust)] transition-colors hover:border-[var(--accent-gold)]"
            >
              Funding questions
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center border border-gray-300 px-5 py-3 text-sm font-semibold text-[var(--trust)] transition-colors hover:border-[var(--accent-gold)]"
            >
              Privacy
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center bg-[var(--trust)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--trust-light)]"
            >
              Apply on the official site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
