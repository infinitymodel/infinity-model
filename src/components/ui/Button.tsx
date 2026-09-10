import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
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
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 px-6 py-3 text-sm";
  
  const variants = {
    primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
    outline: "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
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