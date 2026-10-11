import Link from 'next/link';
import { AlertTriangle, Lock, Mail, ShieldCheck } from 'lucide-react';

const blocks = [
  {
    icon: AlertTriangle,
    title: 'Unsure if a contact is real?',
    body: 'Email support@edwinmega.com or use the Verify page. We will confirm whether the outreach matches an official file.',
  },
  {
    icon: Lock,
    title: 'Private applications',
    body: 'Your details are used to review your funding request and contact you. We do not sell your information or share your story without permission.',
  },
  {
    icon: ShieldCheck,
    title: 'Official channels',
    body: 'Use edwinmega.com and support@edwinmega.com. We will never ask for passwords, remote access, or upfront fees to release funding.',
  },
  {
    icon: Mail,
    title: 'How follow-up works',
    body: 'After you apply, your assigned coordinator contacts you by email. Reply on that thread. If anything looks off, verify before you reply or share documents.',
  },
];

export default function SecurityPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">Security</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            Trust, privacy,
            <br />
            and how to verify us
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Edwin Castro funding protects every applicant — and helps people confirm whether a
            message is really from the official team.
          </p>
        </div>
      </section>

      <section className="container-wide max-w-3xl space-y-10 py-16 md:py-20">
        {blocks.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--edwin-line)] text-[var(--edwin-coral)]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg text-[var(--trust)]">{title}</h2>
              <p
                className="mt-1 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {body}
              </p>
            </div>
          </div>
        ))}

        <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8">
          <p className="section-label">No fees</p>
          <h2 className="mt-3 text-xl text-[var(--trust)]">We never ask you to pay to receive funding</h2>
          <p
            className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            This path is debt-free support. If someone claiming to represent Edwin Castro asks for
            money, taxes, or processing fees, it is not us.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/verify" className="btn-primary">
            Go to Verify page
          </Link>
          <a href="mailto:support@edwinmega.com" className="btn-outline">
            Email support
          </a>
        </div>
      </section>
    </div>
  );
}
