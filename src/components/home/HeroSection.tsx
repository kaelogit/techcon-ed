'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[88vh] flex-col overflow-hidden md:min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--trust)] via-[var(--trust)] to-[var(--trust-light)]" />
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/4 -translate-y-1/3 rounded-full bg-[var(--accent-gold)] opacity-[0.06]" />

      <div className="relative z-10 flex flex-1 items-center py-16 md:py-20">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 text-white lg:col-span-7">
              <p
                className={`section-label-light transition-all duration-700 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                Direct Funding Program
              </p>

              <h1
                className={`font-display text-4xl font-semibold leading-[1.08] transition-all duration-700 delay-150 md:text-5xl lg:text-6xl ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                Private funding for
                <br />
                <span className="text-[var(--accent-gold)] italic">every stage</span> of your next
                chapter.
              </h1>

              <p
                className={`max-w-xl text-lg leading-relaxed text-white/75 md:text-xl transition-all duration-700 delay-300 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                Direct, debt-free capital for recovery, growth, and ambition — whether you are
                rebuilding after a setback or accelerating a clear goal.
              </p>

              <div
                className={`flex flex-col gap-3 pt-2 sm:flex-row transition-all duration-700 delay-450 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <Link href="/apply" className="btn-accent">
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/story" className="btn-outline-light">
                  Read the vision
                </Link>
              </div>

              <div
                className={`flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 delay-600 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent-gold)]" />
                  Crisis · Growth · Ambition
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85">
                  <Globe className="h-4 w-4 text-[var(--accent-gold)]" />
                  Open worldwide
                </span>
              </div>
            </div>

            <div
              className={`relative hidden min-w-0 lg:col-span-5 lg:block transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 shadow-lg">
                <img
                  src="/hero-image.jpg"
                  alt="People building the next chapter of their lives"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--trust)]/50 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-4 left-4 max-w-[15rem] rounded-md border border-gray-200 bg-white p-5 shadow-md">
                <p className="font-display text-3xl font-bold text-[var(--trust)]">$50M+</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Committed to people building their next chapter worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
