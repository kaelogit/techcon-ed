import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/layout/SectionHeader';

const areas = [
  {
    title: 'Crisis & recovery',
    text: 'Urgent stability when life breaks — housing, medical gaps, disaster rebuild, and time-sensitive relief.',
  },
  {
    title: 'Growth & stability',
    text: 'Steady next steps — education, career moves, care plans, and the footing families need to stay upright.',
  },
  {
    title: 'Ambition & build',
    text: 'Capital for bigger work — business rebuild, community projects, and goals that need real fuel.',
  },
  {
    title: 'Education',
    text: 'Tuition, trade training, and tools that unlock the next credential or career leap.',
  },
  {
    title: 'Housing',
    text: 'From emergency shelter and rebuilds to transitions that raise quality of life.',
  },
  {
    title: 'Community',
    text: 'Neighborhood projects, youth programs, and initiatives that leave something lasting.',
  },
];

export function SupportAreasSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          label="Funding areas"
          title="Where support can go"
          description="Tell us the lane that matches your need. The form is open across recovery, growth, and larger builds."
        />
        <div className="grid gap-0 border border-[var(--edwin-line)] sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <article
              key={area.title}
              className={`bg-white p-7 md:p-8 ${
                i > 0 ? 'border-t border-[var(--edwin-line)] sm:border-t-0' : ''
              } ${i % 2 === 1 ? 'sm:border-l' : ''} ${i >= 2 ? 'lg:border-l' : ''} ${
                i >= 2 ? 'border-t lg:border-t' : ''
              } border-[var(--edwin-line)]`}
            >
              <h3 className="text-xl text-[var(--trust)]">{area.title}</h3>
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
          <Link href="/areas" className="btn-outline">
            See all areas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
