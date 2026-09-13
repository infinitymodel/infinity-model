import { sallaCustomPrintingUrl, sallaStoreUrl } from "./store";

export type StoreCategoryIcon =
  | "figures"
  | "decor"
  | "custom"
  | "printer"
  | "filament"
  | "spares";

export interface StoreSubcategory {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  icon: StoreCategoryIcon;
  /** Use this when creating the short category URL in Salla. */
  suggestedHandle: string;
  /** The main storefront remains the safe destination until Salla category URLs are created. */
  href: string;
}

export interface StoreCategoryGroup {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  suggestedHandle: string;
  children: StoreSubcategory[];
}

/**
 * The approved Salla navigation architecture. Keep only these two top-level
 * groups; subcategories make browsing easy without fragmenting the catalogue.
 */
export const storeCategoryGroups: StoreCategoryGroup[] = [
  {
    id: "ready-designs",
    titleAr: "التصاميم الجاهزة",
    titleEn: "Ready Designs",
    descriptionAr: "قطع جاهزة للعرض والاقتناء والهدايا والتخصيص.",
    descriptionEn: "Ready-to-browse pieces for display, gifting and personalisation.",
    suggestedHandle: "ready-designs",
    children: [
      {
        id: "figures-characters",
        titleAr: "مجسمات وشخصيات",
        titleEn: "Figures & Characters",
        descriptionAr: "مجسمات مقتناة وشخصيات بتفاصيل مطبوعة دقيقة.",
        descriptionEn: "Collectible figures and characters with detailed printed finishes.",
        image: "/images/showcase/collectible-figures.jpg",
        icon: "figures",
        suggestedHandle: "figures-characters",
        href: sallaStoreUrl,
      },
      {
        id: "decor-gifts",
        titleAr: "ديكورات وهدايا",
        titleEn: "Décor & Gifts",
        descriptionAr: "قطع ديكورية وهدايا مطبوعة تناسب المنزل والمكتب.",
        descriptionEn: "Printed décor and gifts for home and workspace settings.",
        image: "/images/showcase/pink-character-bust.jpg",
        icon: "decor",
        suggestedHandle: "decor-gifts",
        href: sallaStoreUrl,
      },
      {
        id: "custom-boards-models",
        titleAr: "لوحات ومجسمات مخصصة",
        titleEn: "Custom Boards & Models",
        descriptionAr: "قطع عرض ولوحات ومجسمات تُنفذ وفق الفكرة أو الملف.",
        descriptionEn: "Display pieces, boards and models produced from an idea or file.",
        image: "/images/showcase/saudi-figure.jpg",
        icon: "custom",
        suggestedHandle: "custom-boards-models",
        href: sallaStoreUrl,
      },
    ],
  },
  {
    id: "printers-materials-spares",
    titleAr: "الطابعات والخامات وقطع الغيار",
    titleEn: "Printers, Materials & Spares",
    descriptionAr: "تجهيزات موثوقة للطباعة، من الجهاز إلى الخامة والقطع المساندة.",
    descriptionEn: "Reliable print equipment, from machines to materials and supporting parts.",
    suggestedHandle: "printers-materials-spares",
    children: [
      {
        id: "3d-printers",
        titleAr: "طابعات ثلاثية الأبعاد",
        titleEn: "3D Printers",
        descriptionAr: "طابعات مناسبة للتصميم والنماذج والإنتاج حسب الاحتياج.",
        descriptionEn: "Printers selected for design, prototyping and production needs.",
        image: "/images/showcase/printer-x2d.jpg",
        icon: "printer",
        suggestedHandle: "3d-printers",
        href: sallaStoreUrl,
      },
      {
        id: "filament-resin",
        titleAr: "فيلمنت وريزن",
        titleEn: "Filament & Resin",
        descriptionAr: "خامات مختارة للنماذج والقطع الوظيفية وقطع العرض.",
        descriptionEn: "Materials selected for prototypes, functional parts and display pieces.",
        image: "/images/showcase/blue-filament-spools.jpg",
        icon: "filament",
        suggestedHandle: "filament-resin",
        href: sallaStoreUrl,
      },
      {
        id: "spares-accessories",
        titleAr: "قطع غيار وإكسسوارات",
        titleEn: "Spares & Accessories",
        descriptionAr: "فوهات وقطع صيانة وإكسسوارات مساندة للطابعات.",
        descriptionEn: "Nozzles, maintenance parts and supporting printer accessories.",
        image: "/images/showcase/printing-nozzle.jpg",
        icon: "spares",
        suggestedHandle: "spares-accessories",
        href: sallaStoreUrl,
      },
    ],
  },
];

export const customServiceProduct = {
  titleAr: "طلب تصميم أو طباعة ثلاثية الأبعاد مخصصة",
  titleEn: "Custom 3D Design or Printing Request",
  descriptionAr: "أرسل فكرتك أو ملفك والمقاسات المطلوبة لنراجعها ونقدم عرضاً مناسباً.",
  descriptionEn: "Send your idea or file and required dimensions so we can review it and provide a suitable quote.",
  suggestedHandle: "custom-3d-request",
  href: sallaCustomPrintingUrl,
  image: "/images/showcase/applications-showcase.jpg",
} as const;
