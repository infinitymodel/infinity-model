export interface GalleryItem {
  id: string;
  image: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
}

/**
 * A single source of truth for the workshop and completed-work gallery.
 * Keeping this list shared makes the home carousel and the full gallery
 * consistent whenever a new image is added.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "printed-applications",
    image: "/images/showcase/applications-showcase.jpg",
    titleAr: "تطبيقات الطباعة ثلاثية الأبعاد",
    titleEn: "3D Printing Applications",
    categoryAr: "نماذج وتطبيقات",
    categoryEn: "Applications",
  },
  {
    id: "functional-bracket",
    image: "/images/showcase/functional-bracket.jpg",
    titleAr: "قطعة وظيفية مصممة حسب الاستخدام",
    titleEn: "Functional Custom Part",
    categoryAr: "هندسي",
    categoryEn: "Engineering",
  },
  {
    id: "pcb-holder",
    image: "/images/showcase/pcb-holder.jpg",
    titleAr: "حامل لوحة إلكترونية قابل للضبط",
    titleEn: "Adjustable PCB Holder",
    categoryAr: "إلكترونيات",
    categoryEn: "Electronics",
  },
  {
    id: "black-panther",
    image: "/images/showcase/black-panther.jpg",
    titleAr: "مجسم النمر الأسود",
    titleEn: "Black Panther Figure",
    categoryAr: "مجسمات",
    categoryEn: "Figures",
  },
  {
    id: "dragon-winged",
    image: "/images/showcase/dragon-winged.jpg",
    titleAr: "مجسم تنين مجنّح",
    titleEn: "Winged Dragon Figure",
    categoryAr: "مجسمات",
    categoryEn: "Figures",
  },
  {
    id: "dragon-winged-alt",
    image: "/images/showcase/dragon-winged-alt.jpg",
    titleAr: "مجسم تنين مجنّح — زاوية أخرى",
    titleEn: "Winged Dragon — Alternate View",
    categoryAr: "مجسمات",
    categoryEn: "Figures",
  },
  {
    id: "collectible-figures",
    image: "/images/showcase/collectible-figures.jpg",
    titleAr: "مجسمات شخصيات مقتناة",
    titleEn: "Collectible Character Figures",
    categoryAr: "مقتنيات",
    categoryEn: "Collectibles",
  },
  {
    id: "pink-character-bust",
    image: "/images/showcase/pink-character-bust.jpg",
    titleAr: "مجسم شخصية فني",
    titleEn: "Art Character Bust",
    categoryAr: "إبداعي",
    categoryEn: "Creative",
  },
  {
    id: "turquoise-character-bust",
    image: "/images/showcase/turquoise-character-bust.jpg",
    titleAr: "مجسم شخصية بتفاصيل ملونة",
    titleEn: "Colour Character Bust",
    categoryAr: "إبداعي",
    categoryEn: "Creative",
  },
  {
    id: "grim-cat-figure",
    image: "/images/showcase/grim-cat-figure.jpg",
    titleAr: "مجسم فني تفصيلي",
    titleEn: "Detailed Art Figure",
    categoryAr: "إبداعي",
    categoryEn: "Creative",
  },
  {
    id: "saudi-figure",
    image: "/images/showcase/saudi-figure.jpg",
    titleAr: "مجسم مستلهم من الهوية المحلية",
    titleEn: "Locally Inspired Figure",
    categoryAr: "مخصص",
    categoryEn: "Custom",
  },
  {
    id: "blue-filament-spools",
    image: "/images/showcase/blue-filament-spools.jpg",
    titleAr: "خامات طباعة متعددة الألوان",
    titleEn: "Multi-colour Printing Filament",
    categoryAr: "الخامات",
    categoryEn: "Materials",
  },
  {
    id: "bambu-pla-matte-red",
    image: "/images/showcase/bambu-pla-matte-red.jpg",
    titleAr: "خامة PLA Matte",
    titleEn: "PLA Matte Material",
    categoryAr: "الخامات",
    categoryEn: "Materials",
  },
  {
    id: "bambu-petg-red",
    image: "/images/showcase/bambu-petg-red.jpg",
    titleAr: "خامة PETG",
    titleEn: "PETG Material",
    categoryAr: "الخامات",
    categoryEn: "Materials",
  },
  {
    id: "bambu-pc-fr",
    image: "/images/showcase/bambu-pc-fr.jpg",
    titleAr: "خامة PC FR",
    titleEn: "PC FR Material",
    categoryAr: "الخامات",
    categoryEn: "Materials",
  },
  {
    id: "bambu-asa-aero",
    image: "/images/showcase/bambu-asa-aero.jpg",
    titleAr: "خامة ASA Aero",
    titleEn: "ASA Aero Material",
    categoryAr: "الخامات",
    categoryEn: "Materials",
  },
  {
    id: "printer-h2d",
    image: "/images/showcase/printer-h2d.jpg",
    titleAr: "طابعة Bambu Lab H2D في الورشة",
    titleEn: "Bambu Lab H2D in the Workshop",
    categoryAr: "الورشة",
    categoryEn: "Workshop",
  },
  {
    id: "printer-x1",
    image: "/images/showcase/printer-x1.jpg",
    titleAr: "طابعة Bambu Lab X1E في الورشة",
    titleEn: "Bambu Lab X1E in the Workshop",
    categoryAr: "الورشة",
    categoryEn: "Workshop",
  },
  {
    id: "printer-x2d",
    image: "/images/showcase/printer-x2d.jpg",
    titleAr: "طابعة Bambu Lab X2D",
    titleEn: "Bambu Lab X2D",
    categoryAr: "الورشة",
    categoryEn: "Workshop",
  },
  {
    id: "printer-x2d-workshop",
    image: "/images/showcase/printer-x2d-workshop.jpg",
    titleAr: "محطة طباعة متعددة الخامات",
    titleEn: "Multi-material Print Station",
    categoryAr: "الورشة",
    categoryEn: "Workshop",
  },
  {
    id: "printing-nozzle",
    image: "/images/showcase/printing-nozzle.jpg",
    titleAr: "دقة التنفيذ أثناء الطباعة",
    titleEn: "Precision During Printing",
    categoryAr: "التنفيذ",
    categoryEn: "Production",
  },
];
