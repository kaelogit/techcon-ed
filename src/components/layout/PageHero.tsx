type PageHeroProps = {
  label: string;
  title: string;
  description?: string;
  dark?: boolean;
};

export function PageHero({ label, title, description, dark = false }: PageHeroProps) {
  if (dark) {
    return (
      <section className="border-b border-white/10 bg-[var(--trust)] pt-16 pb-12 text-white">
        <div className="container-wide max-w-4xl">
          <p className="section-label-light">{label}</p>
          <h1 className="headline-lg mt-4 text-white">{title}</h1>
          {description ? (
            <p
              className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              {description}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="container-wide max-w-4xl">
        <p className="section-label">{label}</p>
        <h1 className="headline-lg mt-4 text-[var(--trust)]">{title}</h1>
        <div className="accent-bar mt-5" />
        {description ? (
          <p
            className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--edwin-muted)] md:text-base normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
