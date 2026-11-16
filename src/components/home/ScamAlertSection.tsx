import Link from 'next/link';
import { ArrowRight, AlertTriangle, HeartHandshake } from 'lucide-react';
import { fakeAgents } from '@/data/fake-agents';

const featured = fakeAgents.slice(0, 8);

export function ScamAlertSection() {
  return (
    <section id="scam-alert" className="border-y border-[var(--edwin-line)] bg-white py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="section-label">You are not alone</p>
            <h2 className="headline-lg mt-4 text-[var(--trust)]">
              We feel your pain.
              <br />
              Begin recovery.
            </h2>
            <div className="accent-bar mt-5" />
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              Fake claims agents, trustees, and coordinators keep borrowing Edwin Castro&apos;s name.
              Names like Ralph Montigny and Bobby Miller show up again and again. If they took from
              you, tell us the story. We can open recovery mode for what you lost, and extra support
              may be added for those brave enough to speak up.
            </p>
            <div className="mt-6 flex items-start gap-3 text-sm text-[var(--trust)]">
              <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-[var(--edwin-coral)]" />
              <p
                className="leading-relaxed normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                Your courage protects the next person. Your story can help bring your funds home.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/scam-report" className="btn-navy">
                Start recovery mode
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/verify" className="btn-outline">
                Verify a contact
              </Link>
            </div>
          </div>

          <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[var(--edwin-coral)]">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p className="text-xs font-bold tracking-[0.16em] uppercase">Names we keep seeing</p>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {featured.map((agent) => (
                <li
                  key={agent.name}
                  className="border border-[var(--edwin-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--trust)]"
                >
                  {agent.name}
                </li>
              ))}
            </ul>
            <p
              className="mt-5 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              These names are not Foundation staff. Full list, recovery path, and story form on the
              next page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
