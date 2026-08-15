'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { faqs } from '@/data/faqs';

export function FaqPreviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faq"
      className="bg-white py-24 md:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div 
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Common Questions
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Straight Answers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Funding for recovery, growth, and ambition — here is exactly how it works.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[var(--warm-cream)] shadow-lg' 
                    : 'bg-white hover:border-gray-300 hover:shadow-sm'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${200 + index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  
                  <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen 
                      ? 'bg-[var(--trust)] border-[var(--trust)] text-white rotate-0' 
                      : 'bg-transparent border-gray-300 text-gray-500 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                
                <div className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 md:px-8 md:pb-8 text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--trust)] text-white text-base font-semibold rounded-full hover:bg-[var(--trust-light)] transition-all hover:scale-[1.02] shadow-lg"
          >
            Ready to share your goal? Start here.
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
