import type { Metadata, Viewport } from "next";
import "./globals.css";

import Analytics from "@/components/analytics/Analytics";
import { SITE_URL } from "@/lib/seo";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

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

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: googleVerification
    ? { google: googleVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#101010",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
