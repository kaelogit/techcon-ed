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
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--trust)] px-6 py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[var(--accent-gold)]" />
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent-gold)]">
              Your Next Chapter
            </p>
            <span className="h-[2px] w-8 bg-[var(--accent-gold)]" />
          </div>
        </div>
        
        <h2 
          className={`mb-8 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
          <Link 
            href="/apply" 
            className="group inline-flex items-center gap-3 bg-white px-10 py-4 text-lg font-semibold text-[var(--trust)] transition-colors hover:bg-[var(--accent-gold)] hover:text-white"
          >
            Share Your Goal
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="mt-4 flex items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-white/50">
              <Clock className="w-4 h-4" />
              Takes less than 5 minutes
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <Shield className="w-4 h-4" />
              Secure & Confidential
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
