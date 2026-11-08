import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function DonateSection() {
  return (
    <section className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-20 md:py-28">
      <div className="container-wide max-w-3xl">
        <p className="section-label">Donate</p>
        <h2 className="headline-lg mt-4 text-[var(--trust)]">
          Be part of the
          <br />
          good work
        </h2>
        <div className="accent-bar mt-5" />
        <p
          className="mt-6 text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          After a life-changing lottery win, Edwin Castro started this Foundation so families could
          rebuild, students could finish, and owners could grow without taking on debt. That work is
          still going across housing, education, health, business, family, and community. People and
          companies who believe in it have been giving so more lives can move. If that is you, we
          would be honored to have you with us.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/donate" className="btn-navy">
            Donate
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/areas" className="btn-outline">
            See funding areas
          </Link>
        </div>
      </div>
    </section>
  );
}
