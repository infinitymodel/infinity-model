import React from "react";

interface SectionHeadingProps {
  eyebrow?: string; // أضفنا هذه الخاصية هنا
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-cyan-600">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}