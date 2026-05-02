"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-(--trust) via-(--trust) to-(--trust-light)" />
      
      {/* Animated Decorative Orbs */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-(--accent-gold) opacity-[0.06] rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-white opacity-[0.04] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 w-75 h-75 bg-(--accent-gold) opacity-[0.03] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      {/* Main Content */}
      <div className="relative flex-1 flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 z-10">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 text-white space-y-8">
              
              {/* Badge */}
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--accent-gold) opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-(--accent-gold)"></span>
                </span>
          
              </div>
              
              {/* Headline */}
              <h1 
                className={`font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] transition-all duration-700 delay-150 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Rebuilding lives.
                <br />
                <span className="text-(--accent-gold) italic">Empowering</span> your <br className="hidden sm:block" /> next chapter.
              </h1>
              
              {/* Description */}
              <p 
                className={`text-lg md:text-xl text-white/70 max-w-xl leading-relaxed transition-all duration-700 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                A personal initiative providing direct funding, stability, and growth 
                for families, students, and neighborhoods across the United States.
              </p>
              
              {/* CTA Buttons */}
              <div 
                className={`flex flex-col sm:flex-row gap-4 pt-2 transition-all duration-700 delay-450 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <Link
                  href="/apply"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-(--accent-gold) px-8 py-4 text-sm font-bold text-white transition-all hover:bg-(--accent-hover) hover:scale-[1.02] hover:shadow-xl hover:shadow-(--accent-gold)/20"
                >
                  Request Funding Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/story"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/50"
                >
                  Read The Vision
                  <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div 
                className={`flex flex-wrap items-center gap-6 pt-6 transition-all duration-700 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-(--accent-gold)" />
                  Verified Personal Funding
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase tracking-widest">
                  <Heart className="w-4 h-4 text-(--accent-gold) fill-(--accent-gold)" />
                  All 50 States
                </div>
              </div>
            </div>

            {/* Right Column: Image & Stat Card */}
            <div 
              className={`hidden lg:block lg:col-span-5 relative transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden aspect-4/5 shadow-2xl shadow-black/30 border border-white/10 group">
                <img 
                  src="/hero-image.jpg" 
                  alt="Community members working together to rebuild" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--trust)/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl max-w-65 animate-float">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-(--soft-sage) rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-(--trust)" />
                  </div>
                  <p className="text-(--trust) font-serif font-bold text-3xl">$50M+</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Committed to community & family stability across America
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-(--accent-gold)/30 rounded-full" />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-(--warm-cream) to-transparent z-20" />
    </section>
  );
}
