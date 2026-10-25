'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { donorLine, recentDonors } from '@/data/donors';

const scrollLine = recentDonors.map(donorLine).join('     ·     ');

export function DonateTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % recentDonors.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const current = recentDonors[index];

  return (
    <div className="bg-[var(--trust)] text-white">
      <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 text-center text-sm">
        <Heart className="h-4 w-4 shrink-0 text-[var(--accent-gold)]" />
        <span className="font-semibold">Recent donations:</span>
        <span className="font-bold">
          {current.name} from {current.place} donated {current.amount}
        </span>
      </div>
      <div className="overflow-hidden border-t border-white/15 bg-[var(--trust-dark)] py-2.5">
        <div className="donate-ticker flex whitespace-nowrap text-xs tracking-wide text-white/80">
          <span className="inline-block px-8">{scrollLine}</span>
          <span className="inline-block px-8" aria-hidden>
            {scrollLine}
          </span>
        </div>
      </div>
    </div>
  );
}
