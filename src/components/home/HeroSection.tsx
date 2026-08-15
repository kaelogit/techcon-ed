"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden">
      
      <div className="absolute inset-0 bg-linear-to-br from-(--trust) via-(--trust) to-(--trust-light)" />
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/4 -translate-y-1/3 rounded-full bg-(--accent-gold) opacity-[0.04]" />

      <div className="relative z-10 flex flex-1 items-center pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            <div className="space-y-8 text-white lg:col-span-7">
              
              <p 
                className={`text-xs font-bold uppercase tracking-[0.3em] text-(--accent-gold)/80 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Direct Funding Program
              </p>
              
              <h1 
                className={`font-serif text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 delay-150 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Private funding for
                <br />
                <span className="text-(--accent-gold) italic">every stage</span> of <br className="hidden sm:block" /> your next chapter.
              </h1>
              
              <p 
                className={`max-w-xl text-lg leading-relaxed text-white/70 md:text-xl transition-all duration-700 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Direct, debt-free capital for recovery, growth, and ambition — 
                whether you are rebuilding after a setback or accelerating a clear goal.
              </p>
              
              <div 
                className={`flex flex-col gap-4 pt-2 sm:flex-row transition-all duration-700 delay-450 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <Link
                  href="/apply"
                  className="group inline-flex items-center justify-center gap-3 bg-(--accent-gold) px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-(--accent-hover)"
                >
                  Share Your Goal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/story"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  Read The Vision
                </Link>
              </div>

              <div 
                className={`flex flex-wrap items-center gap-6 pt-6 transition-all duration-700 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50">
                  <ShieldCheck className="w-4 h-4 text-(--accent-gold)" />
                  Crisis · Growth · Ambition
                </div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50">
                  <Globe className="w-4 h-4 text-(--accent-gold)" />
                  Open Worldwide
                </div>
              </div>
            </div>

            <div 
              className={`relative hidden lg:col-span-5 lg:block transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative aspect-4/5 overflow-hidden border border-white/10 shadow-lg">
                <img 
                  src="/hero-image.jpg" 
                  alt="People building the next chapter of their lives" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--trust)/50 via-transparent to-transparent" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 max-w-65 border border-gray-200 bg-white p-6 shadow-md">
                <p className="font-serif text-3xl font-bold text-(--trust)">$50M+</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Committed to people building their next chapter worldwide
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-linear-to-t from-(--warm-cream) to-transparent" />
    </section>
  );
}
