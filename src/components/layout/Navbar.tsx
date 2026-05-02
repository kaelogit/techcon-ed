'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Heart } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'The Vision' },
  { href: '/areas', label: 'How We Help' },
  { href: '/impact', label: 'Real Stories' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  /* KEY FIX: Only the homepage has a dark hero. All other pages are light. */
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-lg shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-50 group flex-shrink-0">
            <span className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled || !isHomePage || isOpen ? 'text-[var(--trust)]' : 'text-white'
            }`}>
              Edwin Castro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors link-underline ${
                  isActive(link.href)
                    ? 'text-[var(--accent-gold)]'
                    : isScrolled || !isHomePage
                      ? 'text-gray-600 hover:text-[var(--trust)]' 
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              href="/apply"
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all ${
                isScrolled || !isHomePage
                  ? 'bg-[var(--trust)] text-white hover:bg-[var(--trust-light)]' 
                  : 'bg-white text-[var(--trust)] hover:bg-[var(--warm-cream)]'
              }`}
            >
              Request Support
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled || !isHomePage || isOpen 
                ? 'bg-gray-100 text-[var(--trust)] hover:bg-gray-200' 
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--warm-cream)] lg:hidden">
          <div className="flex flex-col h-full px-6 pt-24 pb-8 overflow-y-auto">
            
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-gray-200 py-5"
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`text-2xl font-serif font-medium ${
                    isActive(link.href) ? 'text-[var(--accent-gold)]' : 'text-[var(--trust)]'
                  }`}>
                    {link.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--accent-gold)] transition-colors" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href="/apply"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[var(--trust)] text-white text-sm font-semibold rounded-2xl hover:bg-[var(--trust-light)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Start Your Request
                <Heart className="w-4 h-4 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
              </Link>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Direct Channel
                </p>
                <a 
                  href="mailto:support@edwinmega.com" 
                  className="text-lg font-serif font-medium text-[var(--trust)] hover:text-[var(--accent-gold)] transition-colors"
                >
                  support@edwinmega.com
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}