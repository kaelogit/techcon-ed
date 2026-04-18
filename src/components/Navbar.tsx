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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 overflow-x-hidden ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="relative z-50 group"
        >
          <span className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
            isScrolled || isOpen ? 'text-[var(--trust)]' : 'text-white'
          }`}>
            Edwin Castro
          </span>
          <span className={`block h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
            isScrolled || isOpen ? 'bg-[var(--accent-gold)]' : 'bg-white'
          }`} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 link-underline ${
                  isActive(link.href)
                    ? 'text-[var(--accent-gold)]'
                    : isScrolled 
                      ? 'text-gray-600 hover:text-[var(--trust)]' 
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Link
            href="/apply"
            className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
              isScrolled 
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
          className={`relative z-50 lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled || isOpen 
              ? 'text-[var(--trust)] hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 w-full h-full bg-[var(--warm-cream)] z-40 flex flex-col transition-all duration-500 ease-out lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col min-h-full px-8 pt-28 pb-12">
          
          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center justify-between border-b border-gray-200 py-5 transition-all duration-500 ${
                  isOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <span className={`text-2xl font-serif font-medium ${
                  isActive(link.href) 
                    ? 'text-[var(--accent-gold)]' 
                    : 'text-[var(--trust)]'
                }`}>
                  {link.label}
                </span>
                <ArrowRight className={`w-5 h-5 transition-all duration-300 group-hover:translate-x-1 ${
                  isActive(link.href) 
                    ? 'text-[var(--accent-gold)]' 
                    : 'text-gray-300 group-hover:text-[var(--accent-gold)]'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div 
            className={`mt-auto transition-all duration-500 ${
              isOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Link
              href="/apply"
              className="flex items-center justify-center gap-3 w-full py-5 bg-[var(--trust)] text-white text-sm font-semibold rounded-2xl shadow-xl hover:bg-[var(--trust-light)] transition-colors active:scale-[0.98] mb-8"
            >
              Start Your Request
              <Heart className="w-4 h-4 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
            </Link>

            {/* Contact Info */}
            <div className="pt-6 border-t border-gray-200">
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
    </header>
  );
}
