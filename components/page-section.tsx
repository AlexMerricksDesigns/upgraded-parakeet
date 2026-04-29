import type { ReactNode } from "react";

type PageSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

export function PageSection({
  eyebrow,
  title,
  intro,
  children,
}: PageSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          {eyebrow}
        </p>
      ) : null}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 text-lg leading-8 text-stone-700">{intro}</p>
        ) : null}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
