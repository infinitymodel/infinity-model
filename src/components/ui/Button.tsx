import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "dark" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-[#c59b27] text-zinc-950 shadow-[0_10px_24px_rgba(197,155,39,0.2)] hover:-translate-y-0.5 hover:bg-[#d5ad3e] hover:shadow-[0_14px_30px_rgba(197,155,39,0.28)]",
    secondary: "bg-zinc-200 text-zinc-950 hover:-translate-y-0.5 hover:bg-zinc-300",
    dark: "bg-zinc-950 text-white shadow-[0_10px_24px_rgba(24,24,27,0.16)] hover:-translate-y-0.5 hover:bg-zinc-800",
    outline: "border border-zinc-300 bg-white text-zinc-950 hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",
    ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
