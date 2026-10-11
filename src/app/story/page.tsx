import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const beliefs = [
  {
    title: 'Purpose over profile',
    text: 'We fund clear goals across income stages — crisis recovery, steady growth, and ambitious builds.',
  },
  {
    title: 'Direct over delay',
    text: 'Capital should reach people without endless middlemen. Apply here. Stay on the official email thread.',
  },
  {
    title: 'Dignity in every file',
    text: 'Support is not a loan. No repayment. No interest. A human coordinator when your file moves.',
  },
];

export default function StoryPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">The vision</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            Why this funding
            <br />
            stays direct
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Edwin Castro built this official path so capital can reach clear human goals — recovery,
            growth, and ambition — without forcing people through endless queues.
          </p>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <div className="accent-bar" />
          <h2 className="headline-lg mt-5 text-[var(--trust)]">
            A personal commitment to real momentum
          </h2>
          <p
            className="mt-6 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            After a life-changing win, Edwin looked past the numbers to the people. He saw families
            rebuilding after disaster, students blocked by cost, owners ready to expand, and
            neighbors with ideas that deserved fuel — not another waiting list.
          </p>
          <p
            className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            The fastest path was direct capital. Clear purpose. Human review. Official contact you
            can verify on this site.
          </p>
        </div>
        <aside className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8 md:p-10">
          <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">Quote</p>
          <blockquote
            className="mt-4 text-xl leading-relaxed text-[var(--trust)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            My goal is not only to meet urgent need. It is to invest in people who are ready for
            their next chapter — and who will someday open a door for someone else.
          </blockquote>
          <p className="mt-6 text-sm font-bold tracking-[0.14em] text-[var(--edwin-muted)] uppercase">
            Edwin Castro
          </p>
        </aside>
      </section>

      <section className="border-y border-[var(--edwin-line)] bg-[var(--trust)] py-20 text-white md:py-28">
        <div className="container-wide">
          <p className="section-label text-[var(--accent-gold)]">How we operate</p>
          <h2 className="headline-lg mt-4 text-white">Three core beliefs</h2>
          <div className="mt-12 grid gap-0 border border-white/20 md:grid-cols-3">
            {beliefs.map((b, i) => (
              <article
                key={b.title}
                className={`p-8 md:p-10 ${i > 0 ? 'border-t border-white/20 md:border-t-0 md:border-l' : ''}`}
              >
                <h3 className="text-2xl text-white">{b.title}</h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-white/75 normal-case tracking-normal"
                  style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                >
                  {b.text}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/apply" className="btn-primary">
              Apply for support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
