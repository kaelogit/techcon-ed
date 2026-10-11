import type { ReactNode } from 'react';

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  light = false,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div className={`mb-12 md:mb-14 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
      <p className={light ? 'section-label-light' : 'section-label'}>{label}</p>
      <h2 className={`headline-lg mt-4 ${light ? 'text-white' : 'text-[var(--trust)]'}`}>{title}</h2>
      <div className={`accent-bar mt-5 ${centered ? 'mx-auto' : ''}`} />
      {description ? (
        <p
          className={`mt-6 text-base leading-relaxed md:text-lg normal-case tracking-normal ${
            light ? 'text-white/75' : 'text-[var(--edwin-muted)]'
          }`}
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
