export const contactDetails = {
  phoneDisplay: "+966 59 407 6000",
  phoneHref: "tel:+966594076000",
  whatsappNumber: "966594076000",
  socialLinks: {
    instagram: "https://www.instagram.com/infinitymodel__?stkn=MXh3cHFxazBicGgxaA==",
    tiktok: "https://www.tiktok.com/@3d.3da?_r=1&_t=ZS-99eHeLGWddc",
    linktree: "https://linktr.ee/infinitymodelcompany?utm_source=linktree_profile_share&ltsid=6e1b1e73-46a4-4214-b50b-4cb4ec12518b",
  },
} as const;

export function whatsappUrl(locale: string, context?: string) {
  const message = context ?? (
    locale === "ar"
      ? "مرحباً Infinity Model، أود الاستفسار عن خدماتكم."
      : "Hello Infinity Model, I would like to ask about your services."
  );

  return `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
