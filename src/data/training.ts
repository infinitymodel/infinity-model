import type { TrainingCourse } from "@/types/training";

export const trainingCourses: TrainingCourse[] = [
  {
    slug: "3d-design",
    title: "3D Design",
    titleAr: "التصميم ثلاثي الأبعاد",
    level: "Beginner to Intermediate",
    levelAr: "مبتدئ إلى متوسط",
    duration: "Flexible",
    durationAr: "مرن",
    description:
      "Learn the fundamentals of 3D modelling and prepare designs for manufacturing.",
    descriptionAr:
      "تعلم أساسيات النمذجة ثلاثية الأبعاد وتجهيز التصميم للتصنيع.",
    topics: [
      "3D modelling fundamentals",
      "CAD workflow",
      "Mechanical modelling",
      "Design for 3D printing",
      "STL preparation",
    ],
    topicsAr: [
      "أساسيات النمذجة ثلاثية الأبعاد",
      "منهجية CAD",
      "النمذجة الميكانيكية",
      "التصميم للطباعة ثلاثية الأبعاد",
      "تجهيز STL",
    ],
    image: "/images/training/3d-design.jpg",
  },

  {
    slug: "slicing",
    title: "Slicing & Print Preparation",
    titleAr: "Slicing وتجهيز الطباعة",
    level: "Beginner to Intermediate",
    levelAr: "مبتدئ إلى متوسط",
    duration: "Flexible",
    durationAr: "مرن",
    description:
      "Understand slicing parameters, orientation, supports and print optimization.",
    descriptionAr:
      "فهم إعدادات الـSlicer واتجاه الطباعة والدعامات وتحسين نتائج الطباعة.",
    topics: [
      "Layer height",
      "Infill",
      "Supports",
      "Orientation",
      "Speed",
      "Temperature",
      "Quality optimization",
    ],
    topicsAr: [
      "ارتفاع الطبقة",
      "Infill",
      "الدعامات",
      "اتجاه الطباعة",
      "السرعة",
      "درجة الحرارة",
      "تحسين الجودة",
    ],
    image: "/images/training/slicing.jpg",
  },

  {
    slug: "3d-printing",
    title: "3D Printing",
    titleAr: "الطباعة ثلاثية الأبعاد",
    level: "Beginner",
    levelAr: "مبتدئ",
    duration: "Flexible",
    durationAr: "مرن",
    description:
      "Understand FDM and resin printing workflows from machine setup to finished part.",
    descriptionAr:
      "فهم دورة الطباعة باستخدام FDM والريزن من تجهيز الماكينة إلى المنتج النهائي.",
    topics: [
      "FDM workflow",
      "Resin workflow",
      "Materials",
      "Machine setup",
      "Print monitoring",
      "Post-processing",
    ],
    topicsAr: [
      "دورة FDM",
      "دورة الريزن",
      "الخامات",
      "تجهيز الطابعة",
      "متابعة الطباعة",
      "المعالجة بعد الطباعة",
    ],
    image: "/images/training/3d-printing.jpg",
  },

  {
    slug: "printer-maintenance",
    title: "3D Printer Maintenance",
    titleAr: "صيانة الطابعات ثلاثية الأبعاد",
    level: "Intermediate",
    levelAr: "متوسط",
    duration: "Flexible",
    durationAr: "مرن",
    description:
      "Learn preventive maintenance, troubleshooting and print-quality diagnosis.",
    descriptionAr:
      "تعلم الصيانة الوقائية وتشخيص الأعطال ومشاكل جودة الطباعة.",
    topics: [
      "Mechanical inspection",
      "Nozzle and bed checks",
      "Calibration",
      "Troubleshooting",
      "Preventive maintenance",
      "Failure diagnosis",
    ],
    topicsAr: [
      "الفحص الميكانيكي",
      "فحص الـNozzle والـBed",
      "المعايرة",
      "تشخيص الأعطال",
      "الصيانة الوقائية",
      "تحليل فشل الطباعة",
    ],
    image: "/images/training/maintenance.jpg",
  },
];

export function getTrainingCourse(slug: string) {
  return trainingCourses.find((course) => course.slug === slug);
}