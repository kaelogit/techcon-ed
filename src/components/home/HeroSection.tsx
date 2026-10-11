import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--trust)] text-white">
      <Image
        src="/hero-image.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(125deg, rgba(8,28,78,0.97) 0%, rgba(11,36,102,0.88) 45%, rgba(232,90,79,0.45) 100%)',
        }}
      />

      <div className="container-wide relative flex min-h-[72vh] flex-col items-center justify-center py-20 text-center lg:py-28">
        <p className="font-display text-sm tracking-[0.18em] text-[var(--accent-gold)]">
          Edwin Castro
        </p>
        <h1 className="headline-xl mt-4 max-w-3xl text-white">
          The official page to apply for support.
        </h1>
        <div className="accent-bar mx-auto mt-5 bg-[var(--accent-gold)]" />
        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg normal-case tracking-normal"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          Edwin Castro provides debt-free funding to individuals and families — for housing,
          education, health, business, and community goals. No repayment. No interest. Apply here on
          the official site.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/apply" className="btn-primary">
            Apply for support
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/story" className="btn-outline-light">
            Read the vision
          </Link>
        </div>
      </div>
    </section>
  );
}
