'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Users, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}

function ProcessStep({ number, title, description, icon, delay, isVisible }: ProcessStepProps) {
  return (
    <div 
      className={`flex flex-col items-center text-center relative z-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Number Badge */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-[var(--trust)] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-xl ring-8 ring-[var(--warm-cream)]">
          {number}
        </div>
        {/* Icon overlay */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--accent-gold)] rounded-full flex items-center justify-center shadow-lg">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-sm">{description}</p>
    </div>
  );
}

export function ProcessSection() {
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
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "1",
      title: "Share Your Story",
      description: "Fill out the secure form on our website. Tell us exactly what kind of help you are looking for and how it will change your life.",
      icon: <Mail className="w-5 h-5 text-white" />,
      delay: 0,
    },
    {
      number: "2",
      title: "Personal Review",
      description: "Our small, dedicated team reads every single message personally. We look for people who are ready to take the next step.",
      icon: <Users className="w-5 h-5 text-white" />,
      delay: 150,
    },
    {
      number: "3",
      title: "Direct Contact",
      description: "If your request aligns with our current funding, we will email you directly from our secure address to arrange the support.",
      icon: <Send className="w-5 h-5 text-white" />,
      delay: 300,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-[var(--warm-cream)] py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              The Process
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            Three simple steps to request support.
          </h2>
        </div>

        {/* Steps Grid with Timeline */}
        <div className="relative">
          
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gray-200">
            <div 
              className={`h-full bg-[var(--accent-gold)] transition-all duration-1000 ease-out ${
                isVisible ? 'w-full' : 'w-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <ProcessStep 
                key={step.number}
                {...step}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-gold)] text-white rounded-full font-semibold hover:bg-[var(--accent-hover)] hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
