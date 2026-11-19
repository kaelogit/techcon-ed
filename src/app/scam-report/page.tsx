import Link from 'next/link';
import { AlertTriangle, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { ScamReportForm } from '@/components/scam-report/ScamReportForm';
import { fakeAgents } from '@/data/fake-agents';
import { OFFICIAL_EMAIL } from '@/data/verify';

export default function ScamReportPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">You are not alone</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            Got an Edwin Castro
            <br />
            scam text?
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Someone used a fake name, a soft voice, and a promise that felt like hope. Then the money
            was gone. That shame you are carrying is not yours to keep. It belongs to the people who
            lied to you. We see you. We believe you. And we want to begin recovery with you.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-14 md:py-16">
        <div className="container-wide max-w-3xl">
          <div className="flex items-start gap-4">
            <HeartHandshake className="mt-1 h-8 w-8 shrink-0 text-[var(--edwin-coral)]" />
            <div>
              <p className="section-label">Recovery mode</p>
              <h2 className="mt-3 text-2xl text-[var(--trust)] md:text-3xl">
                Tell your story. Begin recovery of what was taken.
              </h2>
              <p
                className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                The Edwin Castro Foundation has set aside a dedicated Recovery Fund of one billion
                dollars ($1,000,000,000) for people who lost money to fake claims agents and
                trustees. We do not make you wait months or years while someone tries to chase the
                scammer. Recovery is drawn from that Fund on an official file.
              </p>
              <p
                className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                When you speak up, we open a Recovery File and gather your information. Your lost
                amount can be restored from the Fund, and additional support may be added for coming
                forward. After that, release follows the same normal path as other official files.
              </p>
              <ul
                className="mt-6 space-y-3 text-sm leading-relaxed text-[var(--trust)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                <li className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--edwin-coral)]" />
                  $1,000,000,000 Recovery Fund already set aside
                </li>
                <li className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--edwin-coral)]" />
                  Restore what you lost, plus possible extra for speaking up
                </li>
                <li className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--edwin-coral)]" />
                  Official file review, then the same release path as other approved files
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide max-w-3xl py-16 md:py-20">
        <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--edwin-coral)]" />
            <div>
              <h2 className="text-lg text-[var(--trust)]">How they got to you</h2>
              <p
                className="mt-2 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                A text. A call. A flyer on the door. A message on Facebook. They said you won. They
                called themselves your claims agent or trustee. They asked you to reply YES, send
                codes, or move money &quot;just this once.&quot; That pressure was designed to steal
                more than cash. It stole sleep, trust, and dignity. That was never this Foundation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl text-[var(--trust)]">Names that keep hurting people</h2>
          <p
            className="mt-3 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            If one of these names is sitting in your phone, you are not the first. You will not be
            the last unless we shine a light. None of them speak for Edwin Castro.
          </p>
          <ul className="mt-8 space-y-4">
            {fakeAgents.map((agent) => (
              <li
                key={agent.name}
                className="border-b border-[var(--edwin-line)] pb-4 last:border-b-0 last:pb-0"
              >
                <p className="font-semibold text-[var(--trust)]">{agent.name}</p>
                <p
                  className="mt-1 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                  style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                >
                  {agent.note}
                </p>
              </li>
            ))}
          </ul>
          <p
            className="mt-6 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            The name may be misspelled on purpose. Scammers remix names the way they remix hope. If
            they reached out first to say you won, pause. Then tell us.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl text-[var(--trust)]">Begin recovery mode</h2>
          <p
            className="mt-3 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Write what they said. Write what you sent. Write how much left your hands. Even if your
            hands are shaking. Even if you stopped before the last payment. This is where recovery
            starts, and where speaking up can open the door to extra support on top of what was
            taken from you.
          </p>
          <div className="mt-8">
            <ScamReportForm />
          </div>
        </div>

        <div className="mt-14 flex gap-4 border border-[var(--edwin-line)] p-6 sm:p-8">
          <ShieldCheck className="h-6 w-6 shrink-0 text-[var(--edwin-coral)]" />
          <div>
            <h2 className="text-lg text-[var(--trust)]">You are safe here</h2>
            <p
              className="mt-2 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              Official follow-up uses{' '}
              <a href={`mailto:${OFFICIAL_EMAIL}`} className="font-semibold text-[var(--trust)] underline">
                {OFFICIAL_EMAIL}
              </a>
              . You can also{' '}
              <Link href="/verify" className="font-semibold text-[var(--trust)] underline">
                verify a contact
              </Link>{' '}
              before you reply to anyone else. From this point forward, you do not have to face
              that silence alone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
