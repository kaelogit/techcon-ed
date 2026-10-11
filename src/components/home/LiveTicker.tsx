const items = [
  'Edwin Castro Foundation · debt-free support',
  'Grants — not loans',
  'Recovery · growth · ambition',
  'Verify every contact on this site',
  'Apply at edwinmega.com',
  'Coordinator by email only',
];

export function LiveTicker() {
  const line = items.join('   ·   ');
  return (
    <div className="overflow-hidden border-y border-[var(--edwin-line)] bg-[var(--accent-gold)] py-3">
      <div className="edwin-ticker flex whitespace-nowrap font-display text-sm tracking-[0.12em] text-[var(--trust)] uppercase">
        <span className="inline-block px-8">{line}</span>
        <span className="inline-block px-8" aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}
