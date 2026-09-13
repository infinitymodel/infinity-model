import { contactDetails } from "@/data/contact";
import { SITE_URL } from "@/lib/seo";

export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Infinity Model",
    url: SITE_URL,
    description:
      "Digital manufacturing studio in Jizan, Saudi Arabia, specializing in 3D printing, CAD design and rapid prototyping.",
    email: contactDetails.email,
    telephone: contactDetails.phoneDisplay,
    areaServed: {
      "@type": "City",
      name: "Jizan",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SA",
      },
    },
    sameAs: Object.values(contactDetails.socialLinks),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
