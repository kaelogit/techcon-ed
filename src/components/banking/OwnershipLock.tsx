'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { OWNERSHIP_REQUIRED_MESSAGE } from '@/lib/banking/ownership';

export function OwnershipLock({ active }: { active: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (pathname !== '/banking/dashboard') {
      setOpen(true);
      router.replace('/banking/dashboard');
    }
  }, [active, pathname, router]);

  useEffect(() => {
    if (!active) return;

    const isExempt = (el: EventTarget | null) =>
      el instanceof Element && Boolean(el.closest('[data-ownership-exempt]'));

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          'a, button, input, select, textarea, label, summary, [role="button"], [role="link"]'
        )
      );
    };

    const block = (e: Event) => {
      if (isExempt(e.target)) return;
      if (!isInteractive(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
      setOpen(true);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (isExempt(e.target)) return;
      if (!isInteractive(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };

    document.addEventListener('click', block, true);
    document.addEventListener('pointerdown', block, true);
    document.addEventListener('submit', block, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('click', block, true);
      document.removeEventListener('pointerdown', block, true);
      document.removeEventListener('submit', block, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [active]);

  if (!active || !open) return null;

  return (
    <div
      data-ownership-exempt
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="ownership-lock-title"
    >
      <div className="w-full max-w-md border border-[var(--ecf-line)] bg-white p-6 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b45309]">
          Account notice
        </p>
        <h2 id="ownership-lock-title" className="mt-2 text-lg font-semibold text-[var(--ecf-navy)]">
          {OWNERSHIP_REQUIRED_MESSAGE}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ecf-muted)]">
          You can view this account. Transfers, linked banks, statements, and other banking
          actions stay unavailable until the Certificate of Ownership is on file.
        </p>
        <button
          type="button"
          className="mt-5 w-full bg-[var(--ecf-navy)] px-4 py-2.5 text-sm font-semibold text-white"
          onClick={() => setOpen(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}
