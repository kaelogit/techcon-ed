'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { SectionHeader } from '@/components/layout/SectionHeader';

export function FaqPreviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const preview = faqs.slice(0, 6);

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="container-wide max-w-4xl">
        <SectionHeader
          label="FAQ"
          title="Clear answers first"
          description="What this funding is, who it is for, and how to confirm official contact on edwinmega.com."
        />
        <div className="border border-[var(--edwin-line)]">
          {preview.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={index > 0 ? 'border-t border-[var(--edwin-line)]' : ''}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className="pr-4 text-base font-semibold text-[var(--trust)] md:text-lg normal-case tracking-normal"
                    style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                  >
                    {faq.question}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--edwin-line)] text-[var(--trust)]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-6 md:px-7">
                    <p
                      className="max-w-2xl text-sm leading-relaxed text-[var(--edwin-muted)] md:text-base normal-case tracking-normal"
                      style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
