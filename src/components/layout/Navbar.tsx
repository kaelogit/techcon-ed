'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '/story', label: 'Vision' },
  { href: '/areas', label: 'Areas' },
  { href: '/impact', label: 'Stories' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/verify', label: 'Is this real?' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  const isActive = (href: string) => {
    if (href === '/#faq') return false;
    return pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          
          <Link href="/" className="relative z-50 shrink-0">
            <span className="font-serif text-lg font-semibold tracking-tight text-[var(--trust)] sm:text-xl md:text-2xl">
              Edwin Castro
            </span>
          </Link>

          <nav className="hidden min-w-0 items-center gap-3 lg:flex xl:gap-5">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`shrink-0 text-[13px] font-medium whitespace-nowrap xl:text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-[var(--accent-gold)]'
                    : 'text-gray-600 hover:text-[var(--trust)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              href="/apply"
              className="inline-flex shrink-0 items-center gap-2 bg-[var(--trust)] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--trust-light)] xl:px-5 xl:py-2.5 xl:text-sm"
            >
              Share Your Goal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-[var(--trust)] transition-colors hover:bg-gray-200 lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--warm-cream)] pt-16 lg:hidden">
          <div className="flex h-full flex-col overflow-y-auto px-6 pb-8">
            
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
                  <ArrowRight className="w-5 h-5 text-gray-300 transition-colors group-hover:text-[var(--accent-gold)]" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href="/apply"
                className="flex w-full items-center justify-center gap-2 bg-[var(--trust)] py-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--trust-light)]"
                onClick={() => setIsOpen(false)}
              >
                Share Your Goal
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                  Direct Channel
                </p>
                <a 
                  href="mailto:support@edwinmega.com" 
                  className="text-lg font-serif font-medium text-[var(--trust)] transition-colors hover:text-[var(--accent-gold)]"
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
