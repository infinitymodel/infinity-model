import React from "react";
import Container from "@/components/ui/Container";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <main className="py-16">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {isAr ? "تواصل معنا" : "Contact Us"}
        </h1>
        <p className="mt-4 text-slate-600">
          {isAr
            ? "يسعدنا تواصلك معنا لاستشارات الطباعة ثلاثية الأبعاد والتصميم الهندي."
            : "Get in touch with us for 3D printing and CAD design inquiries."}
        </p>
      </Container>
    </main>
  );
}