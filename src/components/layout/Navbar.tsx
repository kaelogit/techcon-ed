'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/story', label: 'Vision' },
  { href: '/areas', label: 'Areas' },
  { href: '/impact', label: 'Stories' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/verify', label: 'Is this real?' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollLockY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    scrollLockY.current = window.scrollY;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.scrollTo(0, scrollLockY.current);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/#faq') return false;
    return pathname === href;
  };

  return (
    <>
      <div
        className={`top-0 z-50 transition-shadow max-lg:fixed max-lg:inset-x-0 lg:sticky ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="brand-topbar" />
        <header
          className={`border-b bg-white/95 backdrop-blur-md ${
            scrolled ? 'border-gray-200' : 'border-transparent'
          }`}
        >
          <div className="container-page flex h-16 items-center justify-between gap-3">
            <Link href="/" className="shrink-0 font-display text-lg font-semibold tracking-tight text-[var(--trust)] sm:text-xl">
              Edwin Castro
            </Link>

            <nav className="hidden min-w-0 items-center gap-1 lg:flex xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 rounded-md px-2.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors xl:px-3 xl:text-sm ${
                    isActive(link.href)
                      ? 'bg-[var(--warm-cream)] text-[var(--accent-gold)]'
                      : 'text-gray-600 hover:bg-[var(--warm-cream)] hover:text-[var(--trust)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/apply" className="btn-accent ml-2 shrink-0 px-4 py-2.5 xl:px-5">
                Apply now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md p-2 text-[var(--trust)] hover:bg-[var(--warm-cream)] lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>
      </div>

      <div className="h-[4.25rem] shrink-0 lg:hidden" aria-hidden />

      {open ? (
        <div
          className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto overscroll-y-contain bg-white touch-pan-y lg:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <nav className="px-5 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-4 text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-[var(--warm-cream)] text-[var(--accent-gold)]'
                    : 'text-[var(--trust)]'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 px-5 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link href="/apply" className="btn-accent w-full" onClick={() => setOpen(false)}>
              Apply now
            </Link>
            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-gray-400">
              Direct channel
            </p>
            <a
              href="mailto:support@edwinmega.com"
              className="mt-1 block text-sm font-semibold text-[var(--trust)]"
            >
              support@edwinmega.com
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
