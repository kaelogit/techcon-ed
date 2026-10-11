const stats = [
  { value: '$50M+', label: 'Committed to direct support' },
  { value: 'Worldwide', label: 'Open to applicants 18+' },
  { value: '0%', label: 'Interest — never a loan' },
  { value: 'Email', label: 'Official follow-up channel' },
];

export function StatsBand() {
  return (
    <section className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-14 md:py-16">
      <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l-4 border-[var(--edwin-coral)] pl-5">
            <p className="font-display text-3xl text-[var(--trust)] sm:text-4xl">{stat.value}</p>
            <p
              className="mt-2 text-sm text-[var(--edwin-muted)] normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
