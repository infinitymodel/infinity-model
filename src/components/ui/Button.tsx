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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-[#c59b27] text-zinc-950 hover:bg-[#d5ad3e]",
    secondary: "bg-zinc-200 text-zinc-950 hover:bg-zinc-300",
    dark: "bg-zinc-950 text-white hover:bg-zinc-800",
    outline: "border border-zinc-300 text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",
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
