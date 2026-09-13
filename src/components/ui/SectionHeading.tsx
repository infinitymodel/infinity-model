import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  tone?: "default" | "light";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  tone = "default",
}: SectionHeadingProps) {
  const isLight = tone === "light";

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
        <span className="h-px w-10 bg-[#c59b27]/70" />

        <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" aria-hidden="true" />

        <p className={`im-eyebrow text-xs font-black uppercase ${isLight ? "text-[#e3bd50]" : "text-zinc-600"}`}>
          {eyebrow}
        </p>
      </div>

      <h2 className={`mt-4 text-3xl font-black leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-5xl ${isLight ? "text-white" : "text-zinc-950"}`}>
        {title}
      </h2>

      {description && (
        <p className={`mt-5 max-w-2xl text-base leading-8 sm:text-lg ${centered ? "mx-auto" : ""} ${isLight ? "text-zinc-300" : "text-zinc-700"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
