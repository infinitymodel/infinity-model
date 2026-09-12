import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  CircuitBoard,
  Cog,
  Cuboid,
  Layers3,
  Printer,
  ScanLine,
  Wrench,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
  icon: string;
  locale: string;
}

const icons = {
  printer: Printer,
  design: Cuboid,
  prototype: Box,
  cnc: Cog,
  pcb: CircuitBoard,
  uv: Layers3,
  custom: ScanLine,
  maintenance: Wrench,
};

export default function ServiceCard({
  title,
  description,
  href,
  index,
  icon,
  locale,
}: ServiceCardProps) {
  const Icon =
    icons[icon as keyof typeof icons] ?? Box;

  return (
    <Link
      href={href}
      className="im-premium-card group relative min-h-[280px] rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#c59b27]/45 hover:shadow-[0_28px_80px_rgba(24,24,27,0.12)]"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#c59b27]/10 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-[#e3bd50] shadow-lg shadow-zinc-950/10 transition-transform duration-500 group-hover:scale-105">
            <Icon className="h-5 w-5" />
          </div>

          <span className="im-eyebrow text-[10px] font-black text-zinc-400">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-auto pt-12">
          <h3 className="text-xl font-black tracking-tight text-zinc-950">
            {title}
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-500">
            {description}
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-black text-zinc-950">
            <span>{locale === "ar" ? "اكتشف الخدمة" : "Explore service"}</span>

            <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 ${locale === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </div>
        </div>
      </div>
    </Link>
  );
}
