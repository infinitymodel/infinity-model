import type { Metadata } from "next";
import { Cairo, Manrope } from "next/font/google";
import "./globals.css";

const arabicFont = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const latinFont = Manrope({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3dinfinitymodel.com"),

  title: {
    default: "Infinity Model",
    template: "%s | Infinity Model",
  },

  description:
    "Design, Digital Manufacturing and Rapid Prototyping in Jizan, Saudi Arabia.",

  keywords: [
    "Infinity Model",
    "3D Printing",
    "Digital Manufacturing",
    "Rapid Prototyping",
    "CAD Design",
    "3D Design",
    "3D Printer Maintenance",
    "CNC",
    "PCB Prototyping",
    "Jizan",
    "Saudi Arabia",
  ],

  openGraph: {
    title: "Infinity Model",
    description:
      "Design • Digital Manufacturing • Rapid Prototyping",
    type: "website",
    locale: "en_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${arabicFont.variable} ${latinFont.variable}`}>{children}</body>
    </html>
  );
}
