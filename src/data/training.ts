export interface TrainingCourse {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  level: string;
  levelAr: string;
  duration: string;
  durationAr: string;
  mode: string;
  modeAr: string;
  image: string;
  topics: string[];
  topicsAr: string[];
}

export const trainingCourses: TrainingCourse[] = [
  {
    slug: "3d-design",
    title: "3D Design",
    titleAr: "التصميم ثلاثي الأبعاد",
    description:
      "Learn how to turn ideas into manufacturable 3D models.",
    descriptionAr:
      "تعلم كيفية تحويل الأفكار إلى نماذج ثلاثية الأبعاد قابلة للتصنيع.",
    level: "Beginner to Intermediate",
    levelAr: "مبتدئ إلى متوسط",
    duration: "Flexible",
    durationAr: "مرنة",
    mode: "On-site / Custom",
    modeAr: "حضوري / حسب الطلب",
    image: "/images/training/3d-design.jpg",
    topics: [
      "CAD fundamentals",
      "3D modeling",
      "Design workflow",
      "STL preparation",
      "Design for manufacturing",
    ],
    topicsAr: [
      "أساسيات CAD",
      "النمذجة ثلاثية الأبعاد",
      "منهجية التصميم",
      "تجهيز STL",
      "التصميم للتصنيع",
    ],
  },

  {
    slug: "slicing",
    title: "Slicing & Print Preparation",
    titleAr: "Slicing وتجهيز الطباعة",
    description:
      "Understand slicer settings and prepare reliable print jobs.",
    descriptionAr:
      "فهم إعدادات الـSlicer وتجهيز ملفات طباعة موثوقة.",
    level: "Beginner to Intermediate",
    levelAr: "مبتدئ إلى متوسط",
    duration: "Flexible",
    durationAr: "مرنة",
    mode: "On-site / Custom",
    modeAr: "حضوري / حسب الطلب",
    image: "/images/training/slicing.jpg",
    topics: [
      "Layer height",
      "Infill",
      "Supports",
      "Speed",
      "Temperature",
      "Print optimization",
    ],
    topicsAr: [
      "ارتفاع الطبقة",
      "نسبة الملء",
      "الدعامات",
      "السرعة",
      "الحرارة",
      "تحسين الطباعة",
    ],
  },

  {
    slug: "3d-printing",
    title: "3D Printing",
    titleAr: "الطباعة ثلاثية الأبعاد",
    description:
      "Learn practical FDM and resin printing workflows.",
    descriptionAr:
      "تعلم أساسيات العمل العملية في طباعة FDM والريزن.",
    level: "Beginner",
    levelAr: "مبتدئ",
    duration: "Flexible",
    durationAr: "مرنة",
    mode: "On-site / Custom",
    modeAr: "حضوري / حسب الطلب",
    image: "/images/training/3d-printing.jpg",
    topics: [
      "Printer operation",
      "Materials",
      "Bed preparation",
      "Print monitoring",
      "Post-processing",
    ],
    topicsAr: [
      "تشغيل الطابعة",
      "المواد",
      "تجهيز سطح الطباعة",
      "مراقبة الطباعة",
      "المعالجة النهائية",
    ],
  },

  {
    slug: "maintenance",
    title: "3D Printer Maintenance",
    titleAr: "صيانة الطابعات ثلاثية الأبعاد",
    description:
      "Learn preventive maintenance and systematic troubleshooting.",
    descriptionAr:
      "تعلم الصيانة الوقائية وتشخيص الأعطال بطريقة منهجية.",
    level: "Intermediate",
    levelAr: "متوسط",
    duration: "Flexible",
    durationAr: "مرنة",
    mode: "On-site / Custom",
    modeAr: "حضوري / حسب الطلب",
    image: "/images/training/maintenance.jpg",
    topics: [
      "Preventive maintenance",
      "Calibration",
      "Troubleshooting",
      "Mechanical checks",
      "Print quality diagnosis",
    ],
    topicsAr: [
      "الصيانة الوقائية",
      "المعايرة",
      "تشخيص الأعطال",
      "الفحوصات الميكانيكية",
      "تشخيص جودة الطباعة",
    ],
  },
];