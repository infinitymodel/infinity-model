interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "max-w-3xl",
        centered ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-3",
          centered ? "justify-center" : "",
        ].join(" ")}
      >
        <span className="h-px w-8 bg-zinc-300" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}