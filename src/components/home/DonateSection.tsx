import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function DonateSection() {
  return (
    <section data-nosnippet className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-20 md:py-28">
      <div className="container-wide max-w-3xl">
        <p className="section-label">Donate</p>
        <h2 className="headline-lg mt-4 text-[var(--trust)]">
          Want to give
          <br />
          to the Foundation?
        </h2>
        <div className="accent-bar mt-5" />
        <p
          className="mt-6 text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          Gifts have their own page, separate from applications. That is where you say you want to
          help more grant help go out.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/donate" className="btn-navy">
            Donate to the Edwin Castro Foundation
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
