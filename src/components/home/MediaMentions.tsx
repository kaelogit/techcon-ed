'use client';

import { useEffect, useRef, useState } from 'react';
import { Newspaper, Tv, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface MediaItem {
  image: string;
  outlet: string;
  headline: string;
  date: string;
  type: 'broadcast' | 'print' | 'online';
}

const mediaItems: MediaItem[] = [
  {
    image: '/media-news1.jpg',
    outlet: 'Global News Network',
    headline: 'Billionaire Winner Gives Back — Community Support Initiative',
    date: 'March 2024',
    type: 'broadcast',
  },
  {
    image: '/media-news2.jpg',
    outlet: 'The Daily Gazette',
    headline: 'Local Man Wins $2 Billion, Pledges to Rebuild Community',
    date: 'October 2023',
    type: 'print',
  },
  {
    image: '/media-news3.jpg',
    outlet: 'The Daily Gazette Online',
    headline: 'From Jackpot to Community Champion: How One Winner is Changing Lives',
    date: 'October 2023',
    type: 'online',
  },
  {
    image: '/media-news4.jpg',
    outlet: 'National Broadcast Network',
    headline: 'Together We Rise — Live Interview on Community Giving',
    date: 'January 2024',
    type: 'broadcast',
  },
  {
    image: '/media-news5.jpg',
    outlet: 'TIME Magazine',
    headline: 'The Giving Billionaire: Changing Lives One Community at a Time',
    date: 'October 2024',
    type: 'print',
  },
];

const typeIcons = {
  broadcast: <Tv className="w-4 h-4" />,
  print: <Newspaper className="w-4 h-4" />,
  online: <Globe className="w-4 h-4" />,
};

const typeLabels = {
  broadcast: 'TV Broadcast',
  print: 'Print Media',
  online: 'Online Publication',
};

export function MediaMentions() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate featured item
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featured = mediaItems[activeIndex];
  const others = mediaItems.filter((_, i) => i !== activeIndex);

  return (
    <section 
      ref={sectionRef}
      className="bg-white py-24 md:py-32 px-6 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              In The News
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Recognized Across the Nation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Edwin Castro's commitment to community support has been featured by major news outlets worldwide.
          </p>
        </div>

        {/* Featured Item (Large) */}
        <div 
          className={`mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <div className="aspect-[21/9] md:aspect-[21/8]">
              <img
                src={featured.image}
                alt={featured.headline}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {typeIcons[featured.type]}
                  {typeLabels[featured.type]}
                </span>
                <span className="text-white/70 text-xs">{featured.date}</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 max-w-3xl">
                {featured.headline}
              </h3>
              <p className="text-white/70 text-sm font-medium">{featured.outlet}</p>
            </div>

            {/* External Link Icon */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {mediaItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'w-8 bg-[var(--accent-gold)]' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View ${mediaItems[idx].outlet}`}
              />
            ))}
          </div>
        </div>

        {/* Grid of Other Mentions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {others.map((item, index) => (
            <div
              key={item.outlet}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onClick={() => {
                const fullIndex = mediaItems.findIndex(m => m.outlet === item.outlet);
                setActiveIndex(fullIndex);
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[var(--trust)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[var(--accent-gold)]">{typeIcons[item.type]}</span>
                  <span className="text-xs text-gray-400">{item.outlet}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 line-clamp-2 group-hover:text-[var(--trust)] transition-colors">
                  {item.headline}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-[var(--warm-cream)] rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Newspaper className="w-5 h-5 text-[var(--accent-gold)]" />
              <span className="font-medium">{mediaItems.length}+ Media Features</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tv className="w-5 h-5 text-[var(--accent-gold)]" />
              <span className="font-medium">Worldwide Coverage</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="w-5 h-5 text-[var(--accent-gold)]" />
              <span className="font-medium">60+ Country Reached</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
