import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/layout/SectionHeader';

const previews = [
  {
    name: 'The Martinez Family',
    place: 'California',
    amount: '$420,000',
    line: 'Disaster recovery support that helped them rebuild on the lot they called home.',
  },
  {
    name: 'James T.',
    place: 'Texas',
    amount: '$85,000',
    line: 'Trade education support that changed the trajectory of an entire family.',
  },
  {
    name: 'Sarah Jenkins',
    place: 'Florida',
    amount: '$150,000',
    line: 'Community youth program support that turned a borrowed hall into a lasting refuge.',
  },
];

export function StoriesPreviewSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          label="Stories"
          title="Real files. Real people."
          description="A few of the lives this Foundation has stood behind. Full stories live on the Stories page."
        />
        <div className="grid gap-0 border border-[var(--edwin-line)] md:grid-cols-3">
          {previews.map((story, i) => (
            <article
              key={story.name}
              className={`bg-white p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
            >
              <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                {story.amount}
              </p>
              <h3 className="mt-3 text-2xl text-[var(--trust)]">{story.name}</h3>
              <p
                className="mt-1 text-sm text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {story.place}
              </p>
              <p
                className="mt-4 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {story.line}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/impact" className="btn-outline">
            Read more stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
