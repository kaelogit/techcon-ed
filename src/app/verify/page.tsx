import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Globe, Mail, MessageSquareWarning, ShieldCheck } from 'lucide-react';
import { OFFICIAL_EMAIL, OFFICIAL_SITE, verifyChecks, verifyFaqs } from '@/data/verify';

const checkIcons = [MessageSquareWarning, AlertTriangle, Mail, ShieldCheck, Globe];

export default function VerifyPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">Stay safe</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            Verify before
            <br />
            you reply
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Did you receive a strange text, email, or message on Facebook or another social app?
            Confirm the channel first. We never contact you out of the blue claiming you won a prize.
          </p>
        </div>
      </section>

      <section className="container-wide max-w-3xl space-y-10 py-16 md:py-20">
        <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8 text-center sm:p-10">
          <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--edwin-coral)]" />
          <h2 className="mt-4 text-2xl text-[var(--trust)]">Verify genuineness now</h2>
          <p
            className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            The only official support email is below. Bookmark it — and this site — before you reply
            to anyone using Edwin Castro&apos;s name.
          </p>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20verify%20this%20contact`}
            className="mt-4 block font-display text-xl text-[var(--trust)] break-all sm:text-2xl"
          >
            {OFFICIAL_EMAIL}
          </a>
          <p
            className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Official site:{' '}
            <a href="https://www.edwinmega.com" className="font-semibold text-[var(--trust)] underline">
              {OFFICIAL_SITE}
            </a>
            . If either one looks different, do not continue yet.
          </p>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Please%20verify%20this%20contact`}
            className="btn-primary mt-6"
          >
            Email support to verify
          </a>
        </div>

        <div>
          <h2 className="text-2xl text-[var(--trust)]">How official contact works</h2>
          <p
            className="mt-3 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            We follow proper procedures after you apply on this site. We will not text, email, or
            message you on social media first with a surprise prize claim. If that happened, treat it
            as unofficial until you verify here.
          </p>
        </div>

        <div className="space-y-0 border border-[var(--edwin-line)]">
          {verifyChecks.map((item, index) => {
            const Icon = checkIcons[index];
            return (
              <div
                key={item.title}
                className={`flex gap-4 p-6 ${index > 0 ? 'border-t border-[var(--edwin-line)]' : ''}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--edwin-line)] text-[var(--edwin-coral)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg text-[var(--trust)]">{item.title}</h3>
                  <p
                    className="mt-1 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                    style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {verifyFaqs?.length ? (
          <div>
            <h2 className="text-2xl text-[var(--trust)]">Quick answers</h2>
            <div className="mt-6 space-y-0 border border-[var(--edwin-line)]">
              {verifyFaqs.map((faq, i) => (
                <div
                  key={faq.question}
                  className={`p-6 ${i > 0 ? 'border-t border-[var(--edwin-line)]' : ''}`}
                >
                  <h3
                    className="text-base font-semibold text-[var(--trust)] normal-case tracking-normal"
                    style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                    style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Link href="/apply" className="btn-primary">
            Apply on this site
          </Link>
          <Link href="/" className="btn-outline">
            Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
