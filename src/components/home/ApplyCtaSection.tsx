import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ApplyCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--trust)] py-20 text-white md:py-28">
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[var(--edwin-coral)] opacity-90 max-md:hidden"
        aria-hidden
      />
      <div className="container-wide relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="section-label text-[var(--accent-gold)]">Apply now</p>
          <h2 className="headline-lg mt-4 text-white">
            Start your
            <br />
            support file
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed text-white/80 normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Debt-free funding for recovery, growth, and ambition. Complete the form on this site. A
            coordinator follows up on your official email thread.
          </p>
        </div>
        <div className="lg:pl-10">
          <div className="border border-white/25 bg-[var(--trust-dark)]/50 p-8 backdrop-blur-sm md:p-10">
            <p className="font-display text-2xl text-white">Ready when you are</p>
            <p
              className="mt-3 text-sm leading-relaxed text-white/75 normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              Tell us what you need and why. Stay on edwinmega.com for every official step.
            </p>
            <Link href="/apply" className="btn-primary mt-7 bg-white text-[var(--trust)] hover:bg-[var(--accent-gold)] hover:text-[var(--trust)]">
              Apply for support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
