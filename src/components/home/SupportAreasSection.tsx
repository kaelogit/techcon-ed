"use client";

import { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  Home, 
  Users, 
  Heart, 
  Store, 
  HeartHandshake,
  ArrowRight
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
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-[var(--trust)] transition-colors">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
      
      {/* Learn More Link */}
      <Link 
        href="/areas"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-gold)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
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

  const services = [
    {
      title: "Education",
      description: "Funding for school supplies, university costs, and learning a professional trade.",
      icon: <GraduationCap className="w-7 h-7" />,
      colorClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    },
    {
      title: "Housing",
      description: "Assistance for families affected by disasters or those needing a stable place to live.",
      icon: <Home className="w-7 h-7" />,
      colorClass: "bg-green-50 text-green-600 group-hover:bg-green-100",
    },
    {
      title: "Community",
      description: "Supporting local neighborhood projects, youth sports, and children's homes.",
      icon: <Users className="w-7 h-7" />,
      colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    },
    {
      title: "Health & Wellness",
      description: "Help with medical needs and making sure people can get the care they require.",
      icon: <Heart className="w-7 h-7" />,
      colorClass: "bg-red-50 text-red-600 group-hover:bg-red-100",
    },
    {
      title: "Small Business",
      description: "Providing a start for local shops and neighborhood creators to grow.",
      icon: <Store className="w-7 h-7" />,
      colorClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    },
    {
      title: "Senior Support",
      description: "Making sure our elderly neighbors have the comfort and daily needs they deserve.",
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
        
        {/* Section Header */}
        <div 
          className={`text-center max-w-2xl mx-auto mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              How We Can Help
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            Direct funding for the things that{" "}
            <span className="text-[var(--accent-gold)]">matter most</span>.
          </h2>
        </div>
        
        {/* Services Grid */}
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

        {/* Bottom CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/areas"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--trust)] text-white rounded-full font-semibold hover:bg-[var(--trust-light)] hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Support Areas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
