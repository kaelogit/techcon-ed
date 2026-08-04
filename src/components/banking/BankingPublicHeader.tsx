'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function BankingPublicHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="bg-[var(--ecf-navy-deep)] px-4 py-1 text-center text-[10px] text-white/70 sm:py-1.5 sm:text-left sm:text-[11px]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-1">
          <span>1-800-ECF-BANK · Mon–Fri 7am–9pm ET</span>
          <span className="hidden sm:inline">Locations · Security · About</span>
        </div>
      </div>

      <header className="relative z-50 border-b border-[var(--ecf-line)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/banking"
            className="banking-nav-item flex items-center no-underline"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/banking/ecf-bank-logo.png"
              alt="ECF Bank"
              width={160}
              height={160}
              className="h-11 w-auto object-contain object-left sm:h-12"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--ecf-ink)] md:flex">
            <span className="cursor-default">Checking</span>
            <span className="cursor-default">Savings</span>
            <span className="cursor-default">Payments</span>
            <span className="cursor-default">Help</span>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/banking/login"
              className="banking-nav-item rounded px-2.5 py-1.5 text-xs font-semibold text-[var(--ecf-navy)] no-underline hover:bg-[var(--ecf-sky)] sm:px-3 sm:py-2 sm:text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/banking/register"
              className="banking-nav-active rounded bg-[var(--ecf-navy)] px-2.5 py-1.5 text-xs font-semibold text-white no-underline hover:bg-[var(--ecf-blue)] sm:px-3.5 sm:py-2 sm:text-sm"
            >
              Enroll
            </Link>
            <button
              type="button"
              className="ml-0.5 flex h-9 w-9 items-center justify-center rounded border border-[var(--ecf-line)] text-[var(--ecf-navy)] md:hidden"
              aria-expanded={open}
              aria-controls="ecf-mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition ${open ? 'opacity-0' : ''}`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/35 md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div
              id="ecf-mobile-menu"
              className="absolute inset-x-0 top-full z-50 border-b border-[var(--ecf-line)] bg-white shadow-lg md:hidden"
            >
              <nav className="mx-auto flex max-w-6xl flex-col px-2 py-2 text-sm">
                {['Checking', 'Savings', 'Payments', 'Help'].map((label) => (
                  <span key={label} className="rounded px-3 py-2.5 font-medium text-[var(--ecf-ink)]">
                    {label}
                  </span>
                ))}
                <div className="my-1 border-t border-[var(--ecf-line)]" />
                <Link
                  href="/banking/login"
                  className="banking-nav-item rounded px-3 py-2.5 font-semibold text-[var(--ecf-navy)] no-underline"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/banking/register"
                  className="banking-nav-item rounded px-3 py-2.5 font-semibold text-[var(--ecf-navy)] no-underline"
                  onClick={() => setOpen(false)}
                >
                  Enroll in Online Banking
                </Link>
              </nav>
            </div>
          </>
        ) : null}
      </header>
    </>
  );
}
