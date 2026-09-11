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
}: ServiceCardProps) {
  const Icon =
    icons[icon as keyof typeof icons] ?? Box;

  return (
    <Link
      href={href}
      className="group relative min-h-[270px] overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-zinc-100 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white transition-transform duration-500 group-hover:scale-105">
            <Icon className="h-5 w-5" />
          </div>

          <span className="text-xs font-bold text-zinc-300">
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

          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-zinc-950">
            <span>Explore</span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}