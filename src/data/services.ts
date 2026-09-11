export interface Service {
  slug: string;
  title: string;
  titleAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  category: string;
  features: string[];
  featuresAr: string[];
}

export const services: Service[] = [
  {
    slug: "3d-printing",
    title: "3D Printing",
    titleAr: "الطباعة ثلاثية الأبعاد",
    shortDescription:
      "Professional FDM and resin 3D printing for prototypes, products and functional parts.",
    shortDescriptionAr:
      "طباعة ثلاثية الأبعاد احترافية بتقنيات FDM والريزن للنماذج الأولية والمنتجات والقطع الوظيفية.",
    description:
      "We transform your digital models into accurate physical parts using FDM and resin 3D printing technologies. Material and process selection are based on the intended application.",
    descriptionAr:
      "نحوّل نماذجك الرقمية إلى قطع حقيقية بدقة باستخدام تقنيات FDM والريزن، مع اختيار المادة وطريقة التصنيع حسب الاستخدام المطلوب.",
    image: "/images/services/3d-printing/resin-printer.jpg",
    category: "Digital Manufacturing",
    features: [
      "FDM printing",
      "Resin printing",
      "Material selection",
      "Print optimization",
      "Prototype production",
      "Functional parts",
    ],
    featuresAr: [
      "طباعة FDM",
      "طباعة Resin",
      "اختيار المواد",
      "تحسين إعدادات الطباعة",
      "تصنيع النماذج الأولية",
      "القطع الوظيفية",
    ],
  },

  {
    slug: "cad-design",
    title: "CAD & 3D Design",
    titleAr: "التصميم الهندسي و3D CAD",
    shortDescription:
      "Mechanical, product and creative 3D modeling prepared for manufacturing.",
    shortDescriptionAr:
      "تصميم ميكانيكي ومنتجات ومجسمات ثلاثية الأبعاد جاهزة للتصنيع.",
    description:
      "From a concept, sketch or reference, we develop accurate 3D CAD models suitable for prototyping and digital manufacturing.",
    descriptionAr:
      "نحوّل الفكرة أو الرسم أو المرجع إلى نموذج CAD ثلاثي الأبعاد دقيق ومناسب للنمذجة الأولية والتصنيع الرقمي.",
    image: "/images/services/cad-design/cover-ai.png",
    category: "Design",
    features: [
      "Mechanical CAD",
      "Product design",
      "3D modeling",
      "STL preparation",
      "Design for additive manufacturing",
    ],
    featuresAr: [
      "التصميم الميكانيكي",
      "تصميم المنتجات",
      "النمذجة ثلاثية الأبعاد",
      "تجهيز ملفات STL",
      "التصميم للتصنيع بالإضافة",
    ],
  },

  {
    slug: "rapid-prototyping",
    title: "Rapid Prototyping",
    titleAr: "النمذجة الأولية السريعة",
    shortDescription:
      "Move quickly from concept to physical prototype.",
    shortDescriptionAr:
      "الانتقال بسرعة من الفكرة إلى نموذج أولي حقيقي.",
    description:
      "We help product developers, engineers and businesses validate ideas through fast physical prototyping before production.",
    descriptionAr:
      "نساعد المطورين والمهندسين والشركات على اختبار الأفكار من خلال تصنيع نماذج أولية حقيقية قبل الإنتاج.",
    image: "/images/services/cad-design/cover-ai.png",
    category: "Prototyping",
    features: [
      "Concept validation",
      "Functional prototypes",
      "Design iteration",
      "Small-batch production",
      "Pre-production testing",
    ],
    featuresAr: [
      "اختبار الأفكار",
      "النماذج الوظيفية",
      "تطوير التصميم",
      "الإنتاج بكميات صغيرة",
      "اختبار ما قبل الإنتاج",
    ],
  },

  {
    slug: "cnc",
    title: "CNC & Digital Fabrication",
    titleAr: "CNC والتصنيع الرقمي",
    shortDescription:
      "Precision drilling, engraving and digital fabrication.",
    shortDescriptionAr:
      "الحفر والنقش والتصنيع الرقمي بدقة.",
    description:
      "Digital fabrication solutions for PCB drilling, engraving, fixtures and selected plastic, acrylic and non-ferrous applications.",
    descriptionAr:
      "حلول تصنيع رقمي للحفر على لوحات PCB والنقش والـJigs والـFixtures وبعض تطبيقات البلاستيك والأكريليك والمعادن غير الحديدية.",
    image: "/images/services/cnc/cover-ai.png",
    category: "Fabrication",
    features: [
      "Precision drilling",
      "Engraving",
      "PCB machining",
      "Jigs and fixtures",
      "CAD/CAM preparation",
    ],
    featuresAr: [
      "الحفر الدقيق",
      "النقش",
      "تصنيع PCB",
      "Jigs وFixtures",
      "تجهيز CAD/CAM",
    ],
  },

  {
    slug: "pcb",
    title: "PCB Prototyping",
    titleAr: "النمذجة الأولية للوحات PCB",
    shortDescription:
      "Digital PCB prototyping, drilling and board fabrication.",
    shortDescriptionAr:
      "تصنيع النماذج الأولية للوحات PCB والحفر وتجهيز اللوحات.",
    description:
      "We provide digital PCB prototyping workflows including isolation routing, precision drilling and board outline preparation.",
    descriptionAr:
      "نوفر عمليات تصنيع رقمية للنماذج الأولية للوحات PCB تشمل العزل والحفر الدقيق وتجهيز حدود اللوحة.",
    image: "/images/services/cnc/cover-ai.png",
    category: "Electronics",
    features: [
      "Isolation routing",
      "Precision drilling",
      "Board outline",
      "PCB CNC",
      "Prototype preparation",
    ],
    featuresAr: [
      "Isolation Routing",
      "الحفر الدقيق",
      "تجهيز حدود اللوحة",
      "PCB CNC",
      "تجهيز النماذج الأولية",
    ],
  },

  {
    slug: "uv-printing",
    title: "UV Printing",
    titleAr: "الطباعة بالأشعة فوق البنفسجية",
    shortDescription:
      "High-quality direct printing and customization for selected products.",
    shortDescriptionAr:
      "طباعة وتخصيص مباشر عالي الجودة لمجموعة من المنتجات.",
    description:
      "UV printing enables direct customization of suitable surfaces and products for branding, gifts and creative applications.",
    descriptionAr:
      "تتيح الطباعة بالأشعة فوق البنفسجية تخصيص الأسطح والمنتجات المناسبة للهوية التجارية والهدايا والتطبيقات الإبداعية.",
    image: "/images/products/figures/pink-character.jpg",
    category: "Customization",
    features: [
      "Direct printing",
      "Product customization",
      "Branding",
      "Creative applications",
      "Gift customization",
    ],
    featuresAr: [
      "الطباعة المباشرة",
      "تخصيص المنتجات",
      "الهوية التجارية",
      "التطبيقات الإبداعية",
      "تخصيص الهدايا",
    ],
  },

  {
    slug: "custom-models",
    title: "Custom Models",
    titleAr: "المجسمات المخصصة",
    shortDescription:
      "Custom figures, collectibles, decorative models and special projects.",
    shortDescriptionAr:
      "مجسمات وشخصيات وقطع ديكورية ومشاريع مخصصة.",
    description:
      "We design and manufacture custom physical models for creative, educational, commercial and personal applications.",
    descriptionAr:
      "نصمم ونصنع مجسمات مخصصة للاستخدامات الإبداعية والتعليمية والتجارية والشخصية.",
    image: "/images/products/figures/dragon-winged.jpg",
    category: "Creative",
    features: [
      "Figures",
      "Collectibles",
      "Decorative models",
      "Scale models",
      "Custom designs",
    ],
    featuresAr: [
      "الشخصيات",
      "المقتنيات",
      "المجسمات الديكورية",
      "النماذج المصغرة",
      "التصاميم المخصصة",
    ],
  },

  {
    slug: "printer-maintenance",
    title: "3D Printer Maintenance",
    titleAr: "صيانة الطابعات ثلاثية الأبعاد",
    shortDescription:
      "Preventive maintenance, troubleshooting and printer performance support.",
    shortDescriptionAr:
      "الصيانة الوقائية واستكشاف الأعطال ودعم أداء الطابعات.",
    description:
      "We support 3D printer owners and businesses with preventive maintenance, troubleshooting, calibration and performance improvement.",
    descriptionAr:
      "ندعم مستخدمي الطابعات والشركات من خلال الصيانة الوقائية وتشخيص الأعطال والمعايرة وتحسين الأداء.",
    image: "/images/services/printer-maintenance/cover-ai.png",
    category: "Maintenance",
    features: [
      "Preventive maintenance",
      "Troubleshooting",
      "Calibration",
      "Performance checks",
      "Printer setup",
    ],
    featuresAr: [
      "الصيانة الوقائية",
      "تشخيص الأعطال",
      "المعايرة",
      "فحص الأداء",
      "إعداد الطابعات",
    ],
  },
];
export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
