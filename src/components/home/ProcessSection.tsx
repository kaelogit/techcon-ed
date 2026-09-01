'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Users, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/layout/SectionHeader';

function ProcessStep({
  number,
  title,
  description,
  icon,
  delay,
  isVisible,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--trust)] text-xl font-bold text-white shadow-sm">
          {number}
        </div>
        <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent-gold)] shadow-sm">
          {icon}
        </div>
      </div>
      <h3 className="mb-3 text-lg font-bold text-[var(--trust)]">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-gray-600">{description}</p>
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Apply online',
      description:
        'Tell us what you are working toward — recovery, growth, or a larger ambition — and the funding amount that makes it real.',
      icon: <Mail className="h-4 w-4 text-white" />,
      delay: 0,
    },
    {
      number: '2',
      title: 'Personal review',
      description:
        'Our team reads every request personally. We look for clarity of purpose and readiness to move — at any income stage.',
      icon: <Users className="h-4 w-4 text-white" />,
      delay: 150,
    },
    {
      number: '3',
      title: 'Direct contact',
      description:
        'If your request aligns with current funding, we email you from our secure address to arrange next steps and delivery.',
      icon: <Send className="h-4 w-4 text-white" />,
      delay: 300,
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-[var(--warm-cream)]">
      <div className="container-page">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <SectionHeader
            label="The process"
            title="Three simple steps to request funding."
          />
        </div>

        <div className="relative">
          <div className="absolute top-7 right-[20%] left-[20%] hidden h-0.5 bg-gray-200 md:block">
            <div
              className={`h-full bg-[var(--accent-gold)] transition-all duration-1000 ease-out ${
                isVisible ? 'w-full' : 'w-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <ProcessStep key={step.number} {...step} isVisible={isVisible} />
            ))}
          </div>
        </div>

        <div
          className={`mt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <Link href="/apply" className="btn-accent">
            Apply now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
