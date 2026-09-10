export interface Equipment {
  slug: string;
  brand: string;
  name: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  image: string;
}

export const equipment: Equipment[] = [
  {
    slug: "bambu-h2d",
    brand: "Bambu Lab",
    name: "H2D",
    category: "FDM 3D Printer",
    categoryAr: "طابعة FDM ثلاثية الأبعاد",
    description:
      "Advanced FDM production platform.",
    descriptionAr:
      "منصة متقدمة للإنتاج باستخدام FDM.",
    image: "/images/machines/bambu/h2d.jpg",
  },
  {
    slug: "bambu-h2s",
    brand: "Bambu Lab",
    name: "H2S",
    category: "FDM 3D Printer",
    categoryAr: "طابعة FDM ثلاثية الأبعاد",
    description:
      "Modern FDM manufacturing system.",
    descriptionAr:
      "نظام حديث للتصنيع باستخدام FDM.",
    image: "/images/machines/bambu/h2s.jpg",
  },
  {
    slug: "bambu-p1s",
    brand: "Bambu Lab",
    name: "P1S",
    category: "FDM 3D Printer",
    categoryAr: "طابعة FDM ثلاثية الأبعاد",
    description:
      "Enclosed FDM printing platform.",
    descriptionAr:
      "منصة طباعة FDM مغلقة.",
    image: "/images/machines/bambu/p1s.jpg",
  },
  {
    slug: "bambu-a1",
    brand: "Bambu Lab",
    name: "A1",
    category: "FDM 3D Printer",
    categoryAr: "طابعة FDM ثلاثية الأبعاد",
    description:
      "Desktop FDM production system.",
    descriptionAr:
      "نظام FDM مكتبي للإنتاج.",
    image: "/images/machines/bambu/a1.jpg",
  },
  {
    slug: "creality-halot-x1",
    brand: "Creality",
    name: "HALOT-X1",
    category: "Resin 3D Printer",
    categoryAr: "طابعة Resin ثلاثية الأبعاد",
    description:
      "High-detail resin manufacturing platform.",
    descriptionAr:
      "منصة تصنيع بالريزن عالية التفاصيل.",
    image: "/images/machines/creality/halot-x1.jpg",
  },
];