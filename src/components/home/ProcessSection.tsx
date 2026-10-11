import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/layout/SectionHeader';

const steps = [
  {
    n: '01',
    title: 'Apply online',
    text: 'Tell us what you are working toward and the support amount that makes it real. Use this site only.',
  },
  {
    n: '02',
    title: 'Personal review',
    text: 'A coordinator reads your file. You get follow-up by email — not by cold texts or random apps.',
  },
  {
    n: '03',
    title: 'Clear next steps',
    text: 'If approved, you stay on your official thread for verification, processing, and release of support.',
  },
];

export function ProcessSection() {
  return (
    <section className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          label="How it works"
          title="Three clear steps"
          description="No maze. Apply, get a human review, then follow the official email thread for your file."
        />
        <div className="grid gap-0 border border-[var(--edwin-line)] bg-white md:grid-cols-3">
          {steps.map((step, i) => (
            <article
              key={step.n}
              className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
            >
              <p className="font-display text-sm tracking-[0.16em] text-[var(--edwin-coral)]">
                {step.n}
              </p>
              <h3 className="mt-4 text-2xl text-[var(--trust)]">{step.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {step.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/apply" className="btn-primary">
            Start your application
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
