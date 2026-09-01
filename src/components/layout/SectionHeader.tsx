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
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <p className={light ? 'section-label-light' : 'section-label'}>{label}</p>
      <h2
        className={`mt-3 text-3xl font-bold leading-tight md:text-4xl ${
          light ? 'text-white' : 'text-[var(--trust)]'
        }`}
      >
        {title}
      </h2>
      <div className={`accent-bar mt-4 ${centered ? 'mx-auto' : ''}`} />
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            light ? 'text-white/75' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
