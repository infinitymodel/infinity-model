import Footer from "./Footer";

interface SiteFooterShellProps {
  children: React.ReactNode;
  locale: "ar" | "en";
}

export default function SiteFooterShell({
  children,
  locale,
}: SiteFooterShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
      <Footer locale={locale} />
    </div>
  );
}
