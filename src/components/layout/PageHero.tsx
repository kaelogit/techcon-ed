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
        <div className="container-page max-w-4xl">
          <p className="section-label-light">{label}</p>
          <h1 className="font-display mt-3 text-4xl font-semibold text-white">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="container-page max-w-4xl">
        <p className="section-label">{label}</p>
        <h1 className="mt-3 text-4xl font-bold text-[var(--trust)]">{title}</h1>
        <div className="accent-bar mt-4" />
        {description ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
