'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export function TrustBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-[var(--trust)]">
      <div className="container-page relative z-10 max-w-4xl text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="section-label-light">Your next chapter</p>
        </div>

        <h2
          className={`font-display mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl transition-all duration-700 delay-150 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Ready for what comes <br className="hidden sm:block" />
          <span className="text-[var(--accent-gold)]">after the plan.</span>
        </h2>

        <p 
          className={`mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Whether you are recovering from a real crisis, strengthening a steady life, 
          or funding a bold next move — share the goal. If the purpose is clear, 
          we are ready to consider direct capital behind it.
        </p>

        <div 
          className={`flex flex-col items-center gap-6 transition-all duration-700 delay-450 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link href="/apply" className="btn-accent bg-white text-[var(--trust)] hover:bg-[var(--accent-gold)] hover:text-white">
            Apply now
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="flex items-center gap-2 text-sm text-white/50">
              <Clock className="w-4 h-4" />
              Takes less than 5 minutes
            </span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <Link href="/verify" className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
              <Shield className="w-4 h-4" />
              Check if this message is real
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
