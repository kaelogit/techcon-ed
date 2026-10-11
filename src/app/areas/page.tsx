import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const lanes = [
  {
    title: 'Crisis & recovery',
    text: 'When something breaks and speed matters — urgent stability without treating you like a case number.',
  },
  {
    title: 'Growth & stability',
    text: 'Clear next steps for professionals, families, and owners — education, career, home, or care.',
  },
  {
    title: 'Ambition & scale',
    text: 'Expansion capital, property projects, legacy gifts, and ventures with real upside.',
  },
];

const supportAreas = [
  {
    title: 'Housing & property',
    text: 'Crisis housing, rebuilds, upgrades, transitions, and property goals that raise quality of life.',
  },
  {
    title: 'Education & career',
    text: 'Tuition, trade programs, certifications, and the runway that makes completion realistic.',
  },
  {
    title: 'Health & care',
    text: 'Medical gaps, specialized treatment, and recovery support that should not stall on paperwork alone.',
  },
  {
    title: 'Business & enterprise',
    text: 'Launch, stabilization, equipment, inventory, and expansion for owners ready to grow.',
  },
  {
    title: 'Family & longevity',
    text: 'Support for seniors, multigenerational households, and dignity in care decisions.',
  },
  {
    title: 'Community & legacy',
    text: 'Youth programs, neighborhood centers, and projects that leave something lasting.',
  },
];

export default function AreasPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">Funding areas</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            What support
            <br />
            can cover
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Choose the area that matches your real next step. Crisis recovery stays open — and so do
            growth and scale.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-16 md:py-20">
        <div className="container-wide grid gap-0 border border-[var(--edwin-line)] bg-white md:grid-cols-3">
          {lanes.map((lane, i) => (
            <article
              key={lane.title}
              className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
            >
              <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                0{i + 1}
              </p>
              <h2 className="mt-3 text-2xl text-[var(--trust)]">{lane.title}</h2>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {lane.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-wide py-20 md:py-28">
        <div className="grid gap-0 border border-[var(--edwin-line)] sm:grid-cols-2">
          {supportAreas.map((area, i) => (
            <article
              key={area.title}
              className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)]' : ''} ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i >= 2 ? 'sm:border-t' : ''} border-[var(--edwin-line)]`}
            >
              <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-xl text-[var(--trust)]">{area.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {area.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/apply" className="btn-primary">
            Apply with your area
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
