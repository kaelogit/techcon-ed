import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    title: 'Direct support',
    text: 'Funding goes toward the need you describe — housing, medical, education, business rebuild, or personal hardship — without middlemen.',
  },
  {
    title: 'Human review',
    text: 'Every application is read. When a file is approved, you hear from a real coordinator on an official email thread.',
  },
  {
    title: 'Clear path',
    text: 'Apply on this site. Verify contacts here. Stay on your coordinator thread. That is how the Foundation works.',
  },
];

export function WhyEdwinSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="section-label">What we do</p>
          <h2 className="headline-lg mt-4 text-[var(--trust)]">Help without the maze.</h2>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            The Edwin Castro Foundation exists so people can get debt-free support when life needs a
            real second chance. No interest. No repayment. Just a clear application and a human on
            the other side of the file.
          </p>
        </div>
        <div className="mt-14 grid gap-0 border border-[var(--edwin-line)] md:grid-cols-3">
          {pillars.map((item, i) => (
            <article
              key={item.title}
              className={`bg-white p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
            >
              <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                0{i + 1}
              </p>
              <h3 className="mt-4 text-2xl text-[var(--trust)]">{item.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/story" className="btn-outline">
            Read the vision
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
