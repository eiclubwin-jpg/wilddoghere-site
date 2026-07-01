type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-clay">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-coffee sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-cocoa/75">{description}</p>
      ) : null}
    </div>
  );
}
