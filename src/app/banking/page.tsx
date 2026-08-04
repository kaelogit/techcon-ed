import Link from 'next/link';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';

export default function BankingHomePage() {
  return (
    <BankingPublicShell>
      {/* Hero — one composition: brand + headline + CTA + full-bleed visual */}
      <section className="relative min-h-[min(72vh,640px)] overflow-hidden bg-[var(--ecf-navy-deep)] text-white sm:min-h-[min(80vh,720px)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(105deg, rgba(0,31,92,.92) 0%, rgba(0,48,135,.78) 42%, rgba(0,31,92,.55) 100%), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto flex min-h-[min(72vh,640px)] max-w-6xl flex-col justify-center px-4 py-12 sm:min-h-[min(80vh,720px)] sm:py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-sm">ECF Bank</p>
          <h1 className="banking-display mt-3 max-w-xl text-3xl font-semibold leading-[1.1] sm:mt-4 sm:text-5xl lg:text-[3.25rem]">
            Banking built around your everyday money.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
            Checking, transfers, and account management — online, anytime.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 sm:mt-9 sm:gap-3">
            <Link
              href="/banking/login"
              className="banking-btn-light rounded bg-white px-4 py-2.5 text-xs font-semibold no-underline hover:bg-[var(--ecf-sky)] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/banking/register"
              className="banking-btn-ghost rounded border border-white/40 bg-white/10 px-4 py-2.5 text-xs font-semibold no-underline backdrop-blur-sm hover:bg-white/20 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Enroll
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--ecf-line)] bg-white">
        <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-3">
          {[
            {
              title: 'Checking',
              body: 'Everyday spending with online statements, alerts, and ACH transfers.',
            },
            {
              title: 'Payments & transfers',
              body: 'Move money to linked external accounts with clear tracking and references.',
            },
            {
              title: 'Security you can trust',
              body: 'Encrypted sessions, password controls, and security questions on every account.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`px-6 py-10 ${i < 2 ? 'md:border-r md:border-[var(--ecf-line)]' : ''}`}
            >
              <h2 className="text-lg font-semibold text-[var(--ecf-navy)]">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ecf-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ecf-paper)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="banking-display text-3xl font-semibold text-[var(--ecf-navy)] sm:text-4xl">
              Your accounts. One secure login.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ecf-muted)]">
              View balances, review activity, manage linked accounts, and send ACH transfers from
              Online Banking.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--ecf-ink)]">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ecf-blue)]" />
                24/7 access to balances and recent transactions
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ecf-blue)]" />
                Link external banks for outbound ACH
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ecf-blue)]" />
                Password reset and security question recovery
              </li>
            </ul>
            <Link
              href="/banking/login"
              className="mt-6 inline-flex rounded bg-[var(--ecf-navy)] px-4 py-2.5 text-xs font-semibold text-white no-underline hover:bg-[var(--ecf-blue)] sm:mt-8 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Go to sign in
            </Link>
          </div>
          <div
            className="relative min-h-[280px] overflow-hidden rounded-sm bg-[var(--ecf-navy)] lg:min-h-[360px]"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(0,31,92,.55), transparent 50%), url(https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </section>
    </BankingPublicShell>
  );
}
