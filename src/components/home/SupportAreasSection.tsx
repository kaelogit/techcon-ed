'use client';

import { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  Home,
  Users,
  Heart,
  Store,
  HeartHandshake,
  ArrowRight,
  Shield,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/layout/SectionHeader';

function SupportCard({
  title,
  description,
  icon,
  delay,
  isVisible,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`program-card border-l-4 border-l-[var(--accent-gold)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--warm-cream)] text-[var(--trust)]">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-[var(--trust)]">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

export function SupportAreasSection() {
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
      { threshold: 0.1, rootMargin: '-50px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const lanes = [
    {
      title: 'Crisis & Recovery',
      desc: 'Urgent stability when life breaks — housing, medical gaps, disaster rebuild, and time-sensitive relief.',
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: 'Growth & Stability',
      desc: 'Steady next steps for professionals, families, and owners — education, career moves, home upgrades, care plans.',
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: 'Ambition & Scale',
      desc: 'Capital for bigger builds — business expansion, property projects, legacy gifts, and community ventures.',
      icon: <Sparkles className="h-5 w-5" />,
    },
  ];

  const services = [
    {
      title: 'Education',
      description:
        'Tuition, trade training, executive programs, and the tools that unlock the next credential or career leap.',
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      title: 'Housing & Property',
      description:
        'From emergency shelter and rebuilds to upgrades, transitions, and property goals that raise your quality of life.',
      icon: <Home className="h-6 w-6" />,
    },
    {
      title: 'Community & Legacy',
      description:
        'Neighborhood projects, youth programs, foundations, and initiatives that leave something lasting behind.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Health & Care',
      description:
        'Medical gaps, specialized treatment, recovery support, and care choices that should not wait on paperwork.',
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: 'Business & Career',
      description:
        'Startup capital, expansion funding, equipment, and career pivots for builders ready to grow.',
      icon: <Store className="h-6 w-6" />,
    },
    {
      title: 'Family & Longevity',
      description:
        'Support for seniors, multigenerational plans, and the comfort and dignity every household deserves.',
      icon: <HeartHandshake className="h-6 w-6" />,
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-white">
      <div className="container-page">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <SectionHeader
            label="Who we fund"
            title={
              <>
                Direct capital for goals that <span className="text-[var(--accent-gold)]">matter now</span>.
              </>
            }
            description="Open to people rebuilding, people growing, and people ready to scale — income is not the gate."
          />
        </div>

        <div
          className={`mb-12 grid grid-cols-1 gap-4 md:grid-cols-3 transition-all duration-1000 delay-150 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {lanes.map((lane) => (
            <div key={lane.title} className="card-flat p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--warm-cream)] text-[var(--trust)]">
                {lane.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-[var(--trust)]">{lane.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{lane.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <SupportCard key={service.title} {...service} delay={index * 100} isVisible={isVisible} />
          ))}
        </div>

        <div
          className={`mt-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <Link href="/areas" className="btn-primary">
            Explore funding areas
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
