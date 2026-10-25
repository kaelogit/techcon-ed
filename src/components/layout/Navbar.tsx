'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/story', label: 'Vision' },
  { href: '/areas', label: 'Areas' },
  { href: '/impact', label: 'Stories' },
  { href: '/donate', label: 'Donate' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/verify', label: 'Verify' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/#faq') return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--edwin-line)] bg-white">
        <div className="container-wide flex h-[4.5rem] items-center justify-between gap-3">
          <Link
            href="/"
            className="font-display min-w-0 shrink-0 text-2xl tracking-[0.04em] text-[var(--trust)] sm:text-[1.75rem]"
          >
            Edwin Castro
          </Link>

          <nav className="hidden min-w-0 items-center gap-2 lg:flex xl:gap-3.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 text-[13px] font-semibold tracking-wide whitespace-nowrap xl:text-sm ${
                  isActive(link.href)
                    ? 'text-[var(--edwin-coral)]'
                    : 'text-[var(--edwin-muted)] hover:text-[var(--trust)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/apply" className="btn-primary shrink-0 px-4 py-2.5 xl:px-5">
              Apply
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-[var(--trust)] hover:bg-[var(--edwin-paper)] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="px-5 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block border-b border-[var(--edwin-line)] px-1 py-4 text-base font-semibold ${
                  isActive(link.href) ? 'text-[var(--edwin-coral)]' : 'text-[var(--trust)]'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-5 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link href="/apply" className="btn-primary w-full" onClick={() => setOpen(false)}>
              Apply now
            </Link>
            <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-[var(--edwin-muted)] uppercase">
              Official support
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
