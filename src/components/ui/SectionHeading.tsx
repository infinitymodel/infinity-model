import { Sparkles } from "lucide-react";

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
        <span className="h-px w-8 bg-[#c59b27]/70" />

        <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" aria-hidden="true" />

        <p className="im-eyebrow text-xs font-bold uppercase text-zinc-600">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-zinc-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-zinc-700 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
