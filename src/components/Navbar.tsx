'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { View, Text } from '@/components/Themed';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'The Vision' },
  { href: '/areas', label: 'How We Help' },
  { href: '/impact', label: 'Real Stories' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white border-b ${
        scrolled || open ? 'shadow-sm border-stone-100 py-4' : 'border-transparent py-5'
      }`}
    >
      <View className="max-w-7xl mx-auto px-6 flex items-center justify-between bg-white">
        
        {/* LOGO AREA */}
        <Link href="/" onClick={() => setOpen(false)} className="relative z-[110]">
          <Text className="text-lg md:text-xl font-black tracking-[0.2em] uppercase text-edwin-black">
            Edwin Castro
          </Text>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10 bg-white">
          <View className="flex items-center gap-8 bg-white">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-edwin-black ${
                  pathname === link.href ? 'text-edwin-black underline underline-offset-8 decoration-2' : 'text-stone-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </View>
          <Link
            href="/apply"
            className="px-8 py-3 bg-edwin-navy text-white text-xs font-bold rounded-full hover:bg-edwin-black transition-all shadow-sm"
          >
            Request Support
          </Link>
        </nav>

        {/* MOBILE TRIGGER */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-[110] lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <View className={`h-[2px] w-5 bg-edwin-black transition-all duration-300 ${open ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <View className={`h-[2px] w-5 bg-edwin-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>

      </View>

      {/* MOBILE MENU OVERLAY */}
      <View 
        className={`fixed inset-0 bg-white z-[105] flex flex-col transition-all duration-500 ease-in-out lg:hidden overflow-y-auto ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <View className="flex flex-col min-h-full px-8 pt-28 pb-10 bg-white">
          
          <View className="flex flex-col mb-10 bg-white">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-stone-50 py-5 transition-all duration-500 bg-white ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Text className={`text-lg font-bold tracking-[0.1em] uppercase ${pathname === link.href ? 'text-edwin-black' : 'text-stone-500'}`}>
                  {link.label}
                </Text>
                <View className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center">
                   <Text className="text-edwin-navy text-xs">{'→'}</Text>
                </View>
              </Link>
            ))}
          </View>

          {/* Call to Action & Contact Area */}
          <View className={`mt-auto transition-all duration-700 delay-300 bg-white ${open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="block w-full py-5 bg-edwin-navy text-white text-center text-sm font-bold rounded-2xl shadow-lg active:scale-95 mb-10 uppercase tracking-[0.2em]"
            >
              Request Support
            </Link>

            <View className="pt-8 border-t border-stone-100">
              <Text className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Direct Contact</Text>
              <a href="mailto:support@edwinmega.com" className="text-base font-bold text-edwin-black">
                support@edwinmega.com
              </a>
            </View>
          </View>

        </View>
      </View>
    </header>
  );
}