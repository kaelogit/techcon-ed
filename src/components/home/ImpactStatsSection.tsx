"use client";

import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Globe2, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface StatBlockProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  desc: string;
  isVisible: boolean;
  delay: number;
  prefix?: string;
}

function StatBlock({ 
  icon, value, suffix, label, desc, isVisible, delay, prefix = "" 
}: StatBlockProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const timer = setTimeout(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth deceleration
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * end);
          
          setCount(current);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, value, delay]);

  return (
    <div 
      className={`group relative flex flex-col transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Vertical Accent Line */}
      <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-(--accent-gold) via-(--accent-gold)/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
      
      {/* Icon */}
      <div className="mb-6 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-(--accent-gold) shadow-lg shadow-gray-200/50 border border-gray-100 group-hover:scale-110 group-hover:bg-(--trust) group-hover:text-white group-hover:shadow-xl transition-all duration-500 ease-out">
        {icon}
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-serif text-5xl lg:text-7xl font-semibold text-(--trust) tracking-tighter transition-colors group-hover:text-(--accent-gold)">
          {prefix}{count}
        </span>
        <span className="text-lg lg:text-xl text-(--accent-gold) font-bold tracking-tight uppercase">
          {suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="text-sm font-bold text-(--trust) uppercase tracking-[0.15em] mb-3">
        {label}
      </h3>
      
      {/* Description */}
      <p className="text-gray-500 leading-relaxed max-w-[320px] group-hover:text-gray-700 transition-colors duration-500">
        {desc}
      </p>
    </div>
  );
}

export function ImpactStatsSection() {
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
      { threshold: 0.15, rootMargin: '-50px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <Globe2 className="w-6 h-6" />,
      value: 50,
      suffix: "States",
      label: "National Reach",
      desc: "Accepting and reviewing personal stories from every corner of the country.",
      delay: 0,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: 7,
      prefix: "",
      suffix: "Focus Areas",
      label: "Holistic Help",
      desc: "Targeted funding for education, housing, health, and local infrastructure.",
      delay: 150,
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      value: 100,
      suffix: "%",
      label: "Direct Impact",
      desc: "Funding moves straight to the families, bypassing traditional agency delays.",
      delay: 300,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-(--warm-cream) py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 bg-(--accent-gold) opacity-[0.03] rounded-full blur-[150px]" />
      <div className="absolute top-0 right-0 w-100 h-100 bg-(--trust) opacity-[0.02] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div 
          className={`mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-0.5 bg-(--accent-gold)" />
              <p className="text-(--accent-gold) text-xs font-bold tracking-[0.3em] uppercase">
                The Scale of Impact
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-(--trust) leading-tight">
              A commitment to rebuilding,{" "}
              <span className="italic text-(--accent-gold)">without</span> the bureaucracy.
            </h2>
          </div>
          
          {/* Live Status Card */}
          <Link 
            href="/apply"
            className="group flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:border-(--accent-gold)/30 transition-all duration-500 self-start lg:self-auto"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <p className="text-(--trust) text-xs font-bold tracking-widest uppercase">
                Live Review Cycle
              </p>
              <p className="text-gray-400 text-[10px] font-medium">
                Currently reviewing applications
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-(--accent-gold) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <StatBlock 
              key={index}
              {...stat}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-(--trust) font-semibold hover:text-(--accent-gold) transition-colors group"
          >
            <TrendingUp className="w-5 h-5" />
            See the full impact report
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
