import Link from "next/link";
import Container from "@/components/ui/Container";

interface NavbarProps {
  locale: string;
  labels?: {
    home?: string;
    products?: string;
    about?: string;
    contact?: string;
  };
}

export default function Navbar({ locale, labels }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold tracking-tight text-zinc-900">
            Store Logo
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link href={`/${locale}`} className="hover:text-zinc-900">
              {labels?.home || "Home"}
            </Link>
            <Link href={`/${locale}/shop`} className="hover:text-zinc-900">
              {labels?.products || "Shop"}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-zinc-900">
              {labels?.about || "About"}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-zinc-900">
              {labels?.contact || "Contact"}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}