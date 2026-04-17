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
      className="relative bg-[var(--trust)] py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[var(--accent-gold)]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Label */}
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-sm font-bold tracking-[0.3em] uppercase">
              Your New Chapter
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
        </div>
        
        {/* Headline */}
        <h2 
          className={`font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-8 leading-tight transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          The chance to finally <br className="hidden sm:block" />
          <span className="text-[var(--accent-gold)]">move forward.</span>
        </h2>

        {/* Description */}
        <p 
          className={`text-white/70 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Imagine waking up tomorrow without the weight of your biggest obstacle. 
          Whether it is a dream for your family, a degree you have always wanted, 
          or a home that needs healing—we are here to help you turn that "what if" 
          into your new reality.
        </p>

        {/* CTA */}
        <div 
          className={`flex flex-col items-center gap-6 transition-all duration-700 delay-450 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link 
            href="/apply" 
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[var(--trust)] text-lg font-semibold rounded-full hover:bg-[var(--accent-gold)] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Request Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-4">
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
