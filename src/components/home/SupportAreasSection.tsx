"use client";

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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface SupportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  delay: number;
  isVisible: boolean;
}

function SupportCard({ title, description, icon, colorClass, delay, isVisible }: SupportCardProps) {
  return (
    <div 
      className={`group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-(--trust) transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
      
      <Link 
        href="/areas"
        className="inline-flex items-center gap-2 text-sm font-medium text-(--accent-gold) opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
      >
        Learn more
        <ArrowRight className="w-4 h-4" />
      </Link>
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lanes = [
    {
      title: "Crisis & Recovery",
      desc: "Urgent stability when life breaks — housing, medical gaps, disaster rebuild, and time-sensitive relief.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "Growth & Stability",
      desc: "Steady next steps for professionals, families, and owners — education, career moves, home upgrades, care plans.",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Ambition & Scale",
      desc: "Capital for bigger builds — business expansion, property projects, legacy gifts, and community ventures.",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const services = [
    {
      title: "Education",
      description: "Tuition, trade training, executive programs, and the tools that unlock the next credential or career leap.",
      icon: <GraduationCap className="w-7 h-7" />,
      colorClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    },
    {
      title: "Housing & Property",
      description: "From emergency shelter and rebuilds to upgrades, transitions, and property goals that raise your quality of life.",
      icon: <Home className="w-7 h-7" />,
      colorClass: "bg-green-50 text-green-600 group-hover:bg-green-100",
    },
    {
      title: "Community & Legacy",
      description: "Neighborhood projects, youth programs, foundations, and initiatives that leave something lasting behind.",
      icon: <Users className="w-7 h-7" />,
      colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    },
    {
      title: "Health & Care",
      description: "Medical gaps, specialized treatment, recovery support, and care choices that should not wait on paperwork.",
      icon: <Heart className="w-7 h-7" />,
      colorClass: "bg-red-50 text-red-600 group-hover:bg-red-100",
    },
    {
      title: "Business & Career",
      description: "Startup capital, expansion funding, equipment, and career pivots for builders ready to grow.",
      icon: <Store className="w-7 h-7" />,
      colorClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    },
    {
      title: "Family & Longevity",
      description: "Support for seniors, multigenerational plans, and the comfort and dignity every household deserves.",
      icon: <HeartHandshake className="w-7 h-7" />,
      colorClass: "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="bg-white py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        
        <div 
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-(--accent-gold)" />
            <p className="text-(--accent-gold) text-xs font-bold tracking-[0.3em] uppercase">
              Who We Fund
            </p>
            <span className="w-8 h-0.5 bg-(--accent-gold)" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            Direct capital for goals that{" "}
            <span className="text-(--accent-gold)">matter now</span>.
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Open to people rebuilding, people growing, and people ready to scale — income is not the gate.
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-20 transition-all duration-1000 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {lanes.map((lane) => (
            <div
              key={lane.title}
              className="rounded-2xl border border-gray-100 bg-[var(--warm-cream)] p-6 text-left"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--trust)] shadow-sm">
                {lane.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">{lane.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{lane.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <SupportCard 
              key={service.title}
              {...service}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/areas"
            className="inline-flex items-center gap-3 px-8 py-4 bg-(--trust) text-white rounded-full font-semibold hover:bg-(--trust-light) hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Funding Areas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
