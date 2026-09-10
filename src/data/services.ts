import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "3d-printing",
    title: "3D Printing",
    titleAr: "الطباعة ثلاثية الأبعاد",
    shortDescription:
      "FDM and resin additive manufacturing for functional parts, prototypes and creative products.",
    shortDescriptionAr:
      "طباعة FDM والريزن للقطع الوظيفية والنماذج الأولية والمنتجات الإبداعية.",
    description:
      "We provide additive manufacturing using FDM and resin technologies, selecting the appropriate process and material according to the application.",
    descriptionAr:
      "نوفر التصنيع بالإضافة باستخدام تقنيات FDM والريزن، مع اختيار التقنية والخامة المناسبة حسب الاستخدام.",
    category: "Manufacturing",
    icon: "printer",
    image: "/images/services/printing/main.jpg",
    features: [
      "FDM printing",
      "Resin printing",
      "Material selection",
      "Print orientation optimization",
      "Support optimization",
      "Prototype and production printing",
    ],
    featuresAr: [
      "طباعة FDM",
      "طباعة الريزن",
      "اختيار الخامة المناسبة",
      "تحسين اتجاه الطباعة",
      "تحسين الدعامات",
      "طباعة النماذج والإنتاج",
    ],
  },

  {
    slug: "cad-design",
    title: "CAD & 3D Design",
    titleAr: "التصميم الهندسي و3D",
    shortDescription:
      "Product, mechanical and creative 3D modelling from concept to manufacturable geometry.",
    shortDescriptionAr:
      "تصميم المنتجات والنماذج الميكانيكية والإبداعية من الفكرة إلى نموذج قابل للتصنيع.",
    description:
      "We convert concepts, sketches and requirements into accurate 3D CAD models prepared for manufacturing.",
    descriptionAr:
      "نحوّل الأفكار والرسومات والمتطلبات إلى نماذج CAD ثلاثية الأبعاد دقيقة وجاهزة للتصنيع.",
    category: "Design",
    icon: "design",
    image: "/images/services/design/main.jpg",
    features: [
      "Mechanical CAD",
      "Product design",
      "Creative modelling",
      "STL preparation",
      "Design for additive manufacturing",
      "Design revisions",
    ],
    featuresAr: [
      "التصميم الميكانيكي",
      "تصميم المنتجات",
      "النمذجة الإبداعية",
      "تجهيز ملفات STL",
      "التصميم للتصنيع بالإضافة",
      "تعديلات التصميم",
    ],
  },

  {
    slug: "rapid-prototyping",
    title: "Rapid Prototyping",
    titleAr: "النمذجة الأولية السريعة",
    shortDescription:
      "Move quickly from concept to prototype, evaluation and final production.",
    shortDescriptionAr:
      "الانتقال السريع من الفكرة إلى النموذج الأولي والتقييم ثم الإنتاج النهائي.",
    description:
      "We help customers test ideas physically before committing to larger production.",
    descriptionAr:
      "نساعد العملاء على اختبار الأفكار بشكل فعلي قبل الانتقال إلى الإنتاج الأكبر.",
    category: "Engineering",
    icon: "prototype",
    image: "/images/services/prototyping/main.jpg",
    features: [
      "Concept evaluation",
      "Prototype development",
      "Design iteration",
      "Functional testing",
      "Small-batch production",
    ],
    featuresAr: [
      "تقييم الفكرة",
      "تطوير النموذج الأولي",
      "تطوير التصميم",
      "اختبار الوظيفة",
      "الإنتاج بكميات صغيرة",
    ],
  },

  {
    slug: "cnc",
    title: "CNC & Digital Fabrication",
    titleAr: "CNC والتصنيع الرقمي",
    shortDescription:
      "Digital machining, engraving, drilling and custom fabrication.",
    shortDescriptionAr:
      "التشغيل الرقمي والحفر والنقش والتصنيع حسب الطلب.",
    description:
      "CNC and digital fabrication capabilities for selected plastics, acrylics, non-ferrous materials, fixtures and prototype components.",
    descriptionAr:
      "إمكانيات CNC والتصنيع الرقمي للبلاستيك والأكريليك وبعض المعادن غير الحديدية والقوالب والقطع الأولية.",
    category: "Fabrication",
    icon: "cnc",
    image: "/images/services/cnc/main.jpg",
    features: [
      "CNC engraving",
      "Precision drilling",
      "Plastic machining",
      "Acrylic machining",
      "Jigs and fixtures",
      "CAD/CAM and G-code workflows",
    ],
    featuresAr: [
      "النقش باستخدام CNC",
      "الحفر الدقيق",
      "تشغيل البلاستيك",
      "تشغيل الأكريليك",
      "Jigs وFixtures",
      "CAD/CAM وG-code",
    ],
  },

  {
    slug: "pcb",
    title: "PCB Prototyping",
    titleAr: "تصنيع النماذج الأولية للـPCB",
    shortDescription:
      "Digital PCB fabrication through engraving, drilling and board routing.",
    shortDescriptionAr:
      "تصنيع النماذج الأولية للدوائر المطبوعة بالحفر والنقش وتحديد مسار اللوحة.",
    description:
      "PCB prototyping using digital fabrication methods for early-stage electronics development.",
    descriptionAr:
      "تصنيع نماذج PCB باستخدام تقنيات التصنيع الرقمي لدعم مراحل تطوير الإلكترونيات الأولية.",
    category: "Electronics",
    icon: "pcb",
    image: "/images/services/pcb/main.jpg",
    features: [
      "Isolation routing",
      "PCB engraving",
      "Precision drilling",
      "Board outline cutting",
      "Prototype PCB fabrication",
    ],
    featuresAr: [
      "Isolation Routing",
      "نقش PCB",
      "الحفر الدقيق",
      "تحديد حدود اللوحة",
      "تصنيع PCB أولي",
    ],
  },

  {
    slug: "uv-printing",
    title: "UV Printing",
    titleAr: "الطباعة بالأشعة فوق البنفسجية",
    shortDescription:
      "Direct-to-object printing for branded, decorative and personalized products.",
    shortDescriptionAr:
      "طباعة مباشرة على المنتجات للأغراض الدعائية والديكورية والشخصية.",
    description:
      "UV printing for compatible rigid and selected flexible surfaces, including logos, graphics, text and personalized designs.",
    descriptionAr:
      "طباعة UV على الأسطح الصلبة المناسبة وبعض الأسطح المرنة، مع إمكانية إضافة الشعارات والرسومات والنصوص.",
    category: "Customization",
    icon: "uv",
    image: "/images/services/uv/main.jpg",
    features: [
      "Logo printing",
      "Graphic printing",
      "Personalization",
      "Promotional products",
      "Decorative applications",
    ],
    featuresAr: [
      "طباعة الشعارات",
      "طباعة الرسومات",
      "التخصيص",
      "المنتجات الدعائية",
      "الاستخدامات الديكورية",
    ],
  },

  {
    slug: "custom-models",
    title: "Custom Models & Collectibles",
    titleAr: "المجسمات والقطع المخصصة",
    shortDescription:
      "Characters, sculptures, miniatures and collectible models.",
    shortDescriptionAr:
      "شخصيات ومجسمات ومنمنمات وقطع قابلة للاقتناء حسب الطلب.",
    description:
      "Creative manufacturing for figures, sculptures, dragons, miniatures, display models and personalized pieces.",
    descriptionAr:
      "تصنيع إبداعي للشخصيات والمجسمات والتنانين والمنمنمات وقطع العرض والتصاميم الشخصية.",
    category: "Creative",
    icon: "model",
    image: "/images/services/custom-models/main.jpg",
    features: [
      "Anime figures",
      "Fantasy models",
      "Dragons and creatures",
      "Busts and statues",
      "Miniatures",
      "Personalized models",
    ],
    featuresAr: [
      "مجسمات الأنمي",
      "مجسمات خيالية",
      "التنانين والكائنات",
      "التماثيل والمجسمات",
      "المنمنمات",
      "المجسمات الشخصية",
    ],
  },

  {
    slug: "printer-maintenance",
    title: "3D Printer Maintenance",
    titleAr: "صيانة الطابعات ثلاثية الأبعاد",
    shortDescription:
      "Troubleshooting, preventive maintenance and performance improvement for 3D printers.",
    shortDescriptionAr:
      "تشخيص الأعطال والصيانة الوقائية وتحسين أداء الطابعات ثلاثية الأبعاد.",
    description:
      "Technical support for printer troubleshooting, preventive maintenance, calibration and process improvement.",
      descriptionAr:
      "دعم فني لتشخيص أعطال الطابعات والصيانة الوقائية والمعايرة وتحسين عملية الطباعة.",
    category: "Technical",
    icon: "maintenance",
    image: "/images/services/maintenance/main.jpg",
    features: [
      "Printer troubleshooting",
      "Preventive maintenance",
      "Calibration",
      "Print quality diagnosis",
      "Mechanical inspection",
      "Process improvement",
    ],
    featuresAr: [
      "تشخيص أعطال الطابعة",
      "الصيانة الوقائية",
      "المعايرة",
      "تشخيص مشاكل جودة الطباعة",
      "الفحص الميكانيكي",
      "تحسين عملية الطباعة",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}