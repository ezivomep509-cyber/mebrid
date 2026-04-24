import { ReactNode } from 'react';

export default function LegalPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-semibold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-ink/60">{subtitle}</p>}
      </header>
      <div className="legal-prose">{children}</div>
    </article>
  );
}
