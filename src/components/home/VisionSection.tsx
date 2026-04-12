"use client";

import { useEffect, useRef, useState } from 'react';
import { Award, Compass, CheckCircle } from 'lucide-react';

export default function VisionSection() {
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

  const values = [
    { icon: Award, label: 'Eagle Scout', desc: 'Values & Integrity' },
    { icon: Compass, label: 'Architect', desc: 'Vision & Precision' },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="vision" 
      className="bg-(--warm-cream) py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Image */}
          <div 
            className={`relative transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group img-zoom">
              <img
                src="/vision-image.jpg"
                alt="Hands planting a tree - symbolizing growth and hope"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-(--trust)/10 to-transparent" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-(--accent-gold)/10 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-28 h-28 bg-(--trust)/10 rounded-full -z-10" />
            
            {/* Floating Badge */}
            <div 
              className={`absolute bottom-8 right-8 bg-white rounded-xl p-4 shadow-xl transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-(--soft-sage) rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-(--trust)" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--trust)">100% Direct</p>
                  <p className="text-xs text-gray-500">No fees, no middlemen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-0.5 bg-(--accent-gold)" />
              <p className="text-sm font-medium uppercase tracking-widest text-(--accent-gold)">
                The Vision
              </p>
            </div>
            
            {/* Headline */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              A Foundation Built on <span className="text-(--trust)">Values</span>
            </h2>

            {/* Body Text */}
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                Edwin Castro grew up with the values of an <strong className="text-gray-900">Eagle Scout</strong> and the 
                disciplined vision of an <strong className="text-gray-900">architect</strong>. When his life changed after 
                winning the $2.04 billion Powerball jackpot, his focus remained on the community that shaped him.
              </p>
              <p>
                Starting with the rebuilding of residential properties in Altadena after the severe wildfires, 
                this platform was created to expand that same hands-on support to the rest of the country. 
                We don't just offer help; we <strong className="text-(--accent-gold)">invest in people</strong> who want to build a better future.
              </p>
              <p className="text-base">
                Every dollar goes directly to those in need. <span className="font-semibold text-gray-900">No administrative fees.</span> 
                No complicated applications. Just real support for real people.
              </p>
            </div>
            
            {/* Values Cards */}
            <div 
              className={`grid grid-cols-2 gap-4 pt-4 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {values.map((value, index) => (
                <div 
                  key={value.label}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-(--soft-sage) rounded-xl flex items-center justify-center shrink-0">
                    <value.icon className="w-6 h-6 text-(--trust)" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{value.label}</p>
                    <p className="text-xs text-gray-500">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature */}
            <div 
              className={`flex items-center gap-4 pt-4 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex -space-x-3">
                <div className="w-12 h-12 bg-(--trust) rounded-full flex items-center justify-center text-white text-sm font-bold border-4 border-white shadow-lg">
                  EC
                </div>
                <div className="w-12 h-12 bg-(--accent-gold) rounded-full flex items-center justify-center text-white text-sm font-bold border-4 border-white shadow-lg">
                  ES
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Eagle Scout Heritage</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Architectural Precision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
