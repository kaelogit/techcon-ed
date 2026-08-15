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
            Check a message
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--trust)] md:text-5xl">
            Someone contacted you about Edwin Castro funding?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            Verify it here first. If a call, email, or text left you unsure, pause. Confirming official
            contact is the right next step — before you reply, pay, or send documents.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="border border-gray-200 bg-[var(--warm-cream)] p-8 text-center sm:p-10">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--accent-gold)]" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-[var(--trust)]">
              Official support email
            </h2>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20check%20this%20contact`}
              className="mt-3 block font-serif text-xl font-semibold text-[var(--trust)] break-all sm:text-2xl"
            >
              {OFFICIAL_EMAIL}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              This is the only address Edwin Castro uses to follow up. Website:{' '}
              <a href="https://edwinmega.com" className="font-medium text-[var(--trust)] underline">
                {OFFICIAL_SITE}
              </a>
            </p>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20check%20this%20contact`}
              className="mt-6 inline-flex items-center justify-center bg-[var(--trust)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--trust-light)]"
            >
              Email support to check this contact
            </a>
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
              Questions people ask before they reply
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
              Common questions
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center border border-gray-300 px-5 py-3 text-sm font-semibold text-[var(--trust)] transition-colors hover:border-[var(--accent-gold)]"
            >
              How we protect your data
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center bg-[var(--trust)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--trust-light)]"
            >
              Share your goal on this site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
