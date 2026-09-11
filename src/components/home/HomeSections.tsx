import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronDown,
  Factory,
  GraduationCap,
  Lightbulb,
  PackageCheck,
  Palette,
  PencilRuler,
  Printer,
  ScanLine,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Wrench,
} from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceCard from "./ServiceCard";

import { services } from "@/data/services";
import { trainingCourses } from "@/data/training";

interface HomeSectionsProps {
  locale: string;
}

export default function HomeSections({
  locale,
}: HomeSectionsProps) {
  return (
    <>
      <WhatWeDo locale={locale} />

      <ServicesSection
        locale={locale}
      />

      <ProcessSection
        locale={locale}
      />

      <TechnologySection
        locale={locale}
      />

      <ProjectsSection
        locale={locale}
      />

      <IndustriesSection
        locale={locale}
      />

      <TrainingSection
        locale={locale}
      />

      <MaintenanceSection
        locale={locale}
      />

      <WhyUsSection
        locale={locale}
      />

      <QualitySection
        locale={locale}
      />

      <AboutSection
        locale={locale}
      />

      <EquipmentSection
        locale={locale}
      />

      <FutureSection
        locale={locale}
      />

      <FaqSection
        locale={locale}
      />

      <FinalCta
        locale={locale}
      />

      {/* Keep existing homepage footer if already present in the project. */}
    </>
  );
}

/* =========================================================
   WHAT WE DO
========================================================= */

function WhatWeDo({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const items = [
    {
      icon: PencilRuler,
      title: ar
        ? "Design"
        : "Design",
      description: ar
        ? "نحوّل الفكرة أو الرسم أو الملف إلى تصميم رقمي جاهز للتصنيع."
        : "We turn an idea, sketch or digital file into a manufacturable design.",
    },
    {
      icon: Boxes,
      title: ar
        ? "Prototype"
        : "Prototype",
      description: ar
        ? "نصنع نماذج أولية سريعة لاختبار الشكل والحجم والوظيفة."
        : "We create rapid prototypes to validate form, size and function.",
    },
    {
      icon: Factory,
      title: ar
        ? "Manufacture"
        : "Manufacture",
      description: ar
        ? "نحوّل التصميم المعتمد إلى منتج فعلي باستخدام تقنيات التصنيع الرقمي."
        : "We turn approved designs into physical products using digital manufacturing.",
    },
  ];

  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "ماذا نفعل"
              : "What We Do"
          }
          title={
            ar
              ? "من الفكرة إلى الواقع الملموس."
              : "From idea to physical reality."
          }
          description={
            ar
              ? "نربط التصميم الرقمي بالتصنيع الحقيقي من خلال منظومة تجمع CAD والطباعة ثلاثية الأبعاد والنمذجة الأولية والتصنيع الرقمي."
              : "We connect digital design with physical manufacturing through CAD, 3D printing, rapid prototyping and digital fabrication."
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[2rem] border border-zinc-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-black text-zinc-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function ServicesSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const iconMap: Record<string, string> = {
    "3d-printing": "printer",
    "cad-design": "design",
    "rapid-prototyping": "prototype",
    cnc: "cnc",
    pcb: "pcb",
    "uv-printing": "uv",
    "custom-models": "custom",
    "printer-maintenance": "maintenance",
  };

  return (
    <section
      id="services"
      className="bg-white py-20 sm:py-24"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={
              ar
                ? "خدماتنا"
                : "Our Services"
            }
            title={
              ar
                ? "حلول تصنيع تبدأ من احتياجك."
                : "Manufacturing solutions built around your needs."
            }
            description={
              ar
                ? "من التصميم والطباعة إلى التصنيع الرقمي والصيانة، نوفر لك سلسلة متكاملة من الخدمات تحت سقف واحد."
                : "From design and printing to digital fabrication and maintenance, we provide an integrated range of services under one roof."
            }
          />

          <Link
            href={`/${locale}/services`}
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold"
          >
            {ar
              ? "كل الخدمات"
              : "All Services"}

            <ArrowRight
              className={[
                "h-4 w-4 transition-transform group-hover:translate-x-1",
                ar
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "",
              ].join(" ")}
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              title={
                ar
                  ? service.titleAr
                  : service.title
              }
              description={
                ar
                  ? service.shortDescriptionAr
                  : service.shortDescription
              }
              href={`/${locale}/services/${service.slug}`}
              index={index + 1}
              icon={
                iconMap[service.slug] ??
                "prototype"
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROCESS
========================================================= */

function ProcessSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const steps = [
    {
      number: "01",
      icon: Target,
      title: ar ? "Brief" : "Brief",
      description: ar
        ? "نفهم الفكرة والمتطلبات والاستخدام النهائي."
        : "We understand the idea, requirements and final application.",
    },
    {
      number: "02",
      icon: PencilRuler,
      title: ar ? "Design" : "Design",
      description: ar
        ? "نجهز التصميم أو نراجع ملف CAD ونختار التقنية المناسبة."
        : "We prepare or review the CAD design and select the right technology.",
    },
    {
      number: "03",
      icon: PackageCheck,
      title: ar ? "Quote" : "Quote",
      description: ar
        ? "نحدد الخامة والكمية ووقت الإنتاج والتكلفة."
        : "We define material, quantity, production time and cost.",
    },
    {
      number: "04",
      icon: Boxes,
      title: ar ? "Prototype" : "Prototype",
      description: ar
        ? "نصنع النموذج الأولي عند الحاجة للمراجعة والاختبار."
        : "We produce a prototype when validation is required.",
    },
    {
      number: "05",
      icon: Factory,
      title: ar ? "Production" : "Production",
      description: ar
        ? "بعد الاعتماد نبدأ الإنتاج الفردي أو الدفعات."
        : "After approval, we begin single-unit or batch production.",
    },
    {
      number: "06",
      icon: ShieldCheck,
      title: ar ? "Quality Control" : "Quality Control",
      description: ar
        ? "نفحص الشكل والأبعاد والوظيفة حسب طبيعة المشروع."
        : "We inspect appearance, dimensions and function based on the project.",
    },
    {
      number: "07",
      icon: Truck,
      title: ar ? "Delivery" : "Delivery",
      description: ar
        ? "نسلم المنتج النهائي بالشكل المتفق عليه."
        : "We deliver the finished product as agreed.",
    },
  ];

  return (
    <section className="im-dark-grid overflow-hidden py-20 text-white sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "طريقة العمل"
              : "How It Works"
          }
          title={
            ar
              ? "عملية واضحة من البداية للنهاية."
              : "A clear process from start to finish."
          }
          description={
            ar
              ? "نعمل بمنهج منظم يقلل المفاجآت ويحافظ على الجودة قبل وأثناء الإنتاج."
              : "A structured workflow that reduces surprises and protects quality before and during production."
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={[
                "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c59b27]/50 hover:bg-white/[0.06]",
                index === 6
                  ? "lg:col-span-1"
                  : "",
              ].join(" ")}
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-white/5 bg-white/[0.025] transition duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 text-[#e3bd50] shadow-lg">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <span className="text-xs font-black tracking-[0.15em] text-[#e3bd50]">
                  {step.number}
                </span>
              </div>

              <h3 className="relative mt-8 text-lg font-black">
                {step.title}
              </h3>

              <p className="relative mt-3 text-sm leading-7 text-zinc-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#c59b27]/20 bg-[#c59b27]/5 px-5 py-4 text-sm text-zinc-300">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#c59b27]" />

          <span>
            {ar
              ? "عند الإنتاج على دفعات، نعتمد النموذج الأولي قبل بدء الكمية."
              : "For batch production, the approved prototype comes before the full quantity."}
          </span>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   TECHNOLOGY
========================================================= */

function TechnologySection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const technologies = [
    {
      code: "FDM",
      title: ar
        ? "طباعة FDM"
        : "FDM Printing",
      description: ar
        ? "عملية وعملية للأجزاء الهندسية والنماذج الأكبر."
        : "Practical for engineering parts, functional models and larger prints.",
      icon: Printer,
    },
    {
      code: "RESIN",
      title: ar
        ? "طباعة Resin"
        : "Resin Printing",
      description: ar
        ? "تفاصيل دقيقة للمجسمات والنماذج ذات التفاصيل العالية."
        : "High-detail production for figures and detailed models.",
      icon: Sparkles,
    },
    {
      code: "CAD/CAM",
      title: ar
        ? "CAD / CAM"
        : "CAD / CAM",
      description: ar
        ? "تصميم وتجهيز الملفات للتصنيع الرقمي."
        : "Design and manufacturing preparation for digital production.",
      icon: PencilRuler,
    },
    {
      code: "CNC",
      title: ar
        ? "CNC"
        : "CNC",
      description: ar
        ? "حفر ونقش وتصنيع رقمي حسب طبيعة المشروع."
        : "Drilling, engraving and digital fabrication.",
      icon: Settings2,
    },
    {
      code: "UV",
      title: ar
        ? "UV Printing"
        : "UV Printing",
      description: ar
        ? "طباعة وتخصيص المنتجات والأسطح."
        : "Product and surface customization.",
      icon: Palette,
    },
  ];

  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "التقنيات"
              : "Technology"
          }
          title={
            ar
              ? "التقنية المناسبة للتطبيق المناسب."
              : "The right technology for the right application."
          }
          description={
            ar
              ? "نختار التقنية والخامة وطريقة التصنيع بناءً على الاستخدام النهائي، وليس بناءً على تقنية واحدة فقط."
              : "We select technology, material and process according to the final application—not a one-size-fits-all approach."
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {technologies.map((technology) => {
            const Icon = technology.icon;

            return (
              <div
                key={technology.code}
                className="group rounded-[1.75rem] border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-zinc-950" />

                  <span className="text-[10px] font-black tracking-[0.15em] text-zinc-400">
                    {technology.code}
                  </span>
                </div>

                <h3 className="mt-10 font-black">
                  {technology.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {technology.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function ProjectsSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const projects = [
    {
      category: ar ? "هندسي" : "Engineering",
      title: ar
        ? "نموذج هندسي"
        : "Engineering Model",
      code: "ENG-01",
    },
    {
      category: ar ? "نماذج أولية" : "Prototype",
      title: ar
        ? "نموذج أولي وظيفي"
        : "Functional Prototype",
      code: "PRO-02",
    },
    {
      category: ar ? "مجسمات" : "Figures",
      title: ar
        ? "مجسم عالي التفاصيل"
        : "High Detail Figure",
      code: "FIG-03",
    },
    {
      category: "PCB",
      title: ar
        ? "نموذج PCB"
        : "PCB Prototype",
      code: "PCB-04",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={
              ar
                ? "أعمالنا"
                : "Selected Work"
            }
            title={
              ar
                ? "أفكار تحولت إلى أشياء حقيقية."
                : "Ideas turned into physical objects."
            }
            description={
              ar
                ? "مجموعة من النماذج الهندسية والمجسمات والنماذج الأولية ومشاريع التصنيع الرقمي."
                : "A selection of engineering models, figures, prototypes and digital fabrication projects."
            }
          />

          <Link
            href={`/${locale}/projects`}
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold"
          >
            {ar
              ? "استكشف المشاريع"
              : "Explore Projects"}

            <ArrowRight
              className={[
                "h-4 w-4 transition-transform group-hover:translate-x-1",
                ar
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "",
              ].join(" ")}
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.code}
              href={`/${locale}/projects`}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-100"
            >
              <div className="im-grid-bg relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={[
                      "h-40 w-40 rotate-12 rounded-[2rem] border border-zinc-300 bg-white shadow-xl transition duration-500 group-hover:scale-110 group-hover:rotate-6",
                      index % 2 === 0
                        ? "rounded-[2rem]"
                        : "rounded-full",
                    ].join(" ")}
                  />
                </div>

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider backdrop-blur">
                  {project.category}
                </div>

                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950/80 to-transparent p-6 pt-24">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
                    {project.code}
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   INDUSTRIES
========================================================= */

function IndustriesSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const industries = [
    {
      icon: Factory,
      title: ar
        ? "الهندسة والصناعة"
        : "Engineering & Industrial",
    },
    {
      icon: Wrench,
      title: ar
        ? "الصيانة وقطع الغيار"
        : "Maintenance & Spare Parts",
    },
    {
      icon: Building2,
      title: ar
        ? "العمارة والتصميم"
        : "Architecture & Design",
    },
    {
      icon: GraduationCap,
      title: ar
        ? "التعليم"
        : "Education",
    },
    {
      icon: Lightbulb,
      title: ar
        ? "تطوير المنتجات"
        : "Product Development",
    },
    {
      icon: Palette,
      title: ar
        ? "المجسمات والإبداع"
        : "Creative & Collectibles",
    },
  ];

  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "القطاعات"
              : "Industries"
          }
          title={
            ar
              ? "التصنيع الرقمي يخدم أكثر من مجال."
              : "Digital manufacturing serves more than one industry."
          }
          description={
            ar
              ? "نخدم الاحتياجات الهندسية والإبداعية والتعليمية والتجارية من خلال حلول تصنيع مرنة."
              : "We support engineering, creative, educational and commercial needs through flexible manufacturing solutions."
          }
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                className="flex items-center gap-5 rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-sm font-bold text-zinc-800">
                  {industry.title}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   TRAINING
========================================================= */

function TrainingSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="overflow-hidden rounded-[2.5rem] bg-zinc-950 p-7 text-white sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-950">
                <GraduationCap className="h-5 w-5" />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                {ar
                  ? "التدريب"
                  : "Training"}
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {ar
                  ? "تعلّم. اصنع. أتقن."
                  : "Learn. Build. Master."}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
                {ar
                  ? "دورات عملية تساعدك على فهم التصميم ثلاثي الأبعاد والطباعة والـSlicing وصيانة الطابعات."
                  : "Practical courses covering 3D design, slicing, printing and printer maintenance."}
              </p>

              <Button
                href={`/${locale}/training`}
                variant="primary"
                className="mt-8"
              >
                {ar
                  ? "استكشف الدورات"
                  : "Explore Training"}
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {trainingCourses.map(
                (course, index) => (
                  <Link
                    key={course.slug}
                    href={`/${locale}/training/${course.slug}`}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#c59b27]">
                        0{index + 1}
                      </span>

                      <ArrowUpRight className="h-4 w-4 text-zinc-600 transition group-hover:text-white" />
                    </div>

                    <h3 className="mt-7 font-black">
                      {ar
                        ? course.titleAr
                        : course.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-zinc-500">
                      {ar
                        ? course.durationAr
                        : course.duration}
                    </p>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   MAINTENANCE
========================================================= */

function MaintenanceSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white lg:grid-cols-[1fr_0.85fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
              <Wrench className="h-5 w-5" />
            </div>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              {ar
                ? "صيانة الطابعات"
                : "Printer Maintenance"}
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {ar
                ? "هل تواجه مشكلة مع طابعتك ثلاثية الأبعاد؟"
                : "Is your 3D printer giving you trouble?"}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600">
              {ar
                ? "نساعد في التشخيص والصيانة الوقائية والتصحيحية وتحسين أداء الطابعة ومعالجة مشاكل جودة الطباعة."
                : "We help diagnose, maintain and optimize 3D printers, including preventive and corrective maintenance and print-quality issues."}
            </p>

            <Link
              href={`/${locale}/services/printer-maintenance`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              {ar
                ? "تعرف على خدمة الصيانة"
                : "Explore Maintenance"}

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="im-grid-bg relative min-h-[320px] overflow-hidden bg-zinc-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-52 w-64 rounded-3xl border border-zinc-300 bg-white shadow-2xl">
                <div className="absolute left-1/2 top-8 h-28 w-40 -translate-x-1/2 rounded-2xl border border-zinc-200 bg-zinc-100" />

                <div className="absolute bottom-5 left-1/2 h-3 w-32 -translate-x-1/2 rounded-full bg-zinc-200" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-xs font-bold shadow-lg backdrop-blur">
              {ar
                ? "تشخيص • صيانة • تحسين"
                : "Diagnose • Maintain • Optimize"}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   WHY US
========================================================= */

function WhyUsSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const reasons = [
    {
      icon: Target,
      title: ar
        ? "حلول حسب التطبيق"
        : "Application-Focused",
      text: ar
        ? "لا نستخدم طريقة واحدة لكل المشاريع."
        : "We do not force every project into one process.",
    },
    {
      icon: Settings2,
      title: ar
        ? "عملية منظمة"
        : "Structured Workflow",
      text: ar
        ? "من الـBrief حتى التسليم، كل خطوة واضحة."
        : "From brief to delivery, every stage is defined.",
    },
    {
      icon: ShieldCheck,
      title: ar
        ? "اهتمام بالجودة"
        : "Quality Focus",
      text: ar
        ? "فحص بصري ووظيفي وأبعادي حسب المشروع."
        : "Visual, functional and dimensional checks when required.",
    },
    {
      icon: Sparkles,
      title: ar
        ? "تصميم وتصنيع"
        : "Design + Manufacturing",
      text: ar
        ? "لا نقدم التصنيع بمعزل عن فهم التصميم."
        : "Manufacturing is connected to design understanding.",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "لماذا Infinity Model"
              : "Why Infinity Model"
          }
          title={
            ar
              ? "أكثر من مجرد طباعة ثلاثية الأبعاد."
              : "More than just 3D printing."
          }
          description={
            ar
              ? "ننظر للمشروع كمنظومة تبدأ من الفكرة والتصميم وتنتهي بمنتج قابل للاستخدام."
              : "We look at the project as a complete system—from idea and design to a usable physical product."
          }
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-[1.75rem] border border-zinc-200 p-6"
              >
                <Icon className="h-6 w-6 text-zinc-950" />

                <h3 className="mt-8 font-black">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {reason.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   QUALITY
========================================================= */

function QualitySection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const points = [
    ar
      ? "صيانة وقائية للمعدات"
      : "Preventive equipment maintenance",
    ar
      ? "إعدادات طباعة موحدة"
      : "Standardized print profiles",
    ar
      ? "تتبع الخامات والعمليات"
      : "Material and process traceability",
    ar
      ? "فحص بصري ووظيفي"
      : "Visual and functional inspection",
    ar
      ? "فحص الأبعاد عند الحاجة"
      : "Dimensional inspection when required",
    ar
      ? "اعتماد النموذج قبل الإنتاج الكمي"
      : "Prototype approval before batch production",
  ];

  return (
    <section className="im-dark-grid py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-950">
              <BadgeCheck className="h-5 w-5" />
            </div>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              {ar ? "الجودة" : "Quality"}
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {ar
                ? "جودة يمكنك الاعتماد عليها."
                : "Quality you can rely on."}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-zinc-400 sm:text-base">
              {ar
                ? "الجودة بالنسبة لنا ليست خطوة أخيرة؛ بل جزء من طريقة العمل منذ تجهيز الملف وحتى المنتج النهائي."
                : "Quality is not just a final step; it is part of the workflow from file preparation to the finished product."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c59b27]" />

                <span className="text-sm leading-6 text-zinc-300">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function AboutSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={
                ar
                  ? "من نحن"
                  : "About Infinity Model"
              }
              title={
                ar
                  ? "نربط بين الأفكار والواقع."
                  : "Bridging ideas and reality."
              }
              description={
                ar
                  ? "Infinity Model هو استوديو للتصنيع الرقمي يجمع بين التصميم والتصنيع الإضافي والنمذجة الأولية والتخصيص لمساعدة العملاء على الانتقال من الملف الرقمي إلى المنتج الحقيقي."
                  : "Infinity Model is a digital manufacturing studio combining design, additive manufacturing, rapid prototyping and customization to help customers move from digital files to physical products."
              }
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white"
              >
                {ar
                  ? "تعرف علينا أكثر"
                  : "Learn More"}

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                <ScanLine className="h-5 w-5" />
              </div>

              <div>
                <p className="font-black">
                  DESIGN
                </p>

                <p className="text-xs text-zinc-500">
                  {ar
                    ? "تصميم رقمي"
                    : "Digital Design"}
                </p>
              </div>
            </div>

            <div className="my-7 h-px bg-zinc-200" />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                <Printer className="h-5 w-5" />
              </div>

              <div>
                <p className="font-black">
                  PROTOTYPE
                </p>

                <p className="text-xs text-zinc-500">
                  {ar
                    ? "نموذج أولي"
                    : "Rapid Prototype"}
                </p>
              </div>
            </div>

            <div className="my-7 h-px bg-zinc-200" />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                <PackageCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="font-black">
                  MANUFACTURE
                </p>

                <p className="text-xs text-zinc-500">
                  {ar
                    ? "منتج فعلي"
                    : "Physical Product"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   EQUIPMENT
========================================================= */

function EquipmentSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const machines = [
    {
      brand: "Bambu Lab",
      model: "H2D",
      category: ar
        ? "FDM"
        : "FDM",
    },
    {
      brand: "Bambu Lab",
      model: "H2S",
      category: ar
        ? "FDM"
        : "FDM",
    },
    {
      brand: "Bambu Lab",
      model: "P1S",
      category: ar
        ? "FDM"
        : "FDM",
    },
    {
      brand: "Bambu Lab",
      model: "A1",
      category: ar
        ? "FDM"
        : "FDM",
    },
    {
      brand: "Creality",
      model: "HALOT-X1",
      category: ar
        ? "Resin"
        : "Resin",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "المعدات"
              : "Equipment"
          }
          title={
            ar
              ? "معدات وتقنيات للتصنيع الفعلي."
              : "Equipment built for real production."
          }
          description={
            ar
              ? "نستخدم مجموعة من معدات التصنيع الرقمي لتغطية التطبيقات الهندسية والإبداعية."
              : "Our equipment portfolio supports both engineering and creative manufacturing applications."
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {machines.map((machine) => (
            <div
              key={`${machine.brand}-${machine.model}`}
              className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50"
            >
              <div className="im-grid-bg flex aspect-square items-center justify-center">
                <div className="relative h-28 w-28 rounded-[1.75rem] border border-zinc-300 bg-white shadow-lg transition duration-500 group-hover:scale-105">
                  <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-200 bg-zinc-100" />
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
                  {machine.brand}
                </p>

                <h3 className="mt-2 text-lg font-black">
                  {machine.model}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  {machine.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   FUTURE
========================================================= */

function FutureSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const futureItems = [
    ar
      ? "3D Scanning"
      : "3D Scanning",
    ar
      ? "Reverse Engineering"
      : "Reverse Engineering",
    ar
      ? "AI-Assisted Design"
      : "AI-Assisted Design",
    ar
      ? "Larger-Format Manufacturing"
      : "Larger-Format Manufacturing",
    ar
      ? "Advanced Materials"
      : "Advanced Materials",
  ];

  return (
    <section className="bg-zinc-50 py-20 sm:py-24">
      <Container>
        <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                {ar
                  ? "المستقبل"
                  : "What's Next"}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                {ar
                  ? "نبني قدراتنا خطوة بخطوة."
                  : "Expanding our capabilities step by step."}
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                {ar
                  ? "بعض هذه التقنيات تمثل اتجاهات مستقبلية ضمن تطور Infinity Model."
                  : "Some of these capabilities represent future directions as Infinity Model continues to grow."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {futureItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
                >
                  <span className="text-xs font-black text-zinc-300">
                    0{index + 1}
                  </span>

                  <span className="text-sm font-bold">
                    {item}
                  </span>

                  <span className="ml-auto rounded-full border border-zinc-200 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-zinc-400">
                    Future
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function FaqSection({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  const faqs = [
    {
      question: ar
        ? "هل أحتاج إلى ملف 3D جاهز؟"
        : "Do I need a ready 3D file?",
      answer: ar
        ? "ليس بالضرورة. يمكننا العمل من فكرة أو رسم أو أبعاد حسب نوع المشروع."
        : "Not necessarily. Depending on the project, we can work from an idea, sketch or dimensions.",
    },
    {
      question: ar
        ? "ما هي الخامات التي توفرونها؟"
        : "What materials do you offer?",
      answer: ar
        ? "نوفر خيارات مثل PLA وPETG وABS وASA للطباعة FDM، بالإضافة إلى Resin لتطبيقات التفاصيل العالية."
        : "We offer materials such as PLA, PETG, ABS and ASA for FDM, plus resin for high-detail applications.",
    },
    {
      question: ar
        ? "هل توفرون إنتاج كميات؟"
        : "Do you handle batch production?",
      answer: ar
        ? "نعم، ويمكن اعتماد نموذج أولي قبل بدء الإنتاج على دفعات."
        : "Yes. A prototype can be approved before batch production begins.",
    },
    {
      question: ar
        ? "هل توفرون صيانة للطابعات؟"
        : "Do you provide printer maintenance?",
      answer: ar
        ? "نعم، لدينا خدمة مخصصة لصيانة وتشخيص وتحسين أداء الطابعات ثلاثية الأبعاد."
        : "Yes. We provide dedicated 3D printer diagnosis, maintenance and optimization services.",
    },
    {
      question: ar
        ? "هل يمكن طلب تصميم خاص؟"
        : "Can I request a custom design?",
      answer: ar
        ? "نعم. التصميم الهندسي والمجسمات المخصصة جزء من خدماتنا."
        : "Yes. Engineering design and custom models are part of our services.",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={
            ar
              ? "الأسئلة الشائعة"
              : "FAQ"
          }
          title={
            ar
              ? "أسئلة قبل أن تبدأ."
              : "Questions before you start."
          }
          centered
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-zinc-200 border-y border-zinc-200">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold text-zinc-900 [&::-webkit-details-marker]:hidden">
                <span>
                  {faq.question}
                </span>

                <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
              </summary>

              <p className="max-w-2xl pt-4 text-sm leading-7 text-zinc-500">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCta({
  locale,
}: {
  locale: string;
}) {
  const ar = locale === "ar";

  return (
    <section className="bg-white pb-20 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 px-7 py-14 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute inset-0 im-dark-grid opacity-60" />

          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c59b27]/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              {ar
                ? "ابدأ مشروعك"
                : "Start Your Project"}
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {ar
                ? "لديك فكرة؟ دعنا نبنيها معًا."
                : "Have an idea? Let's build it."}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              {ar
                ? "أرسل لنا فكرتك أو ملفك أو متطلباتك، وسنساعدك في تحديد أفضل طريقة لتحويلها إلى واقع."
                : "Send us your idea, file or requirements and we will help determine the best way to turn it into reality."}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="im-cta-light inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black transition hover:bg-zinc-200"
              >
                {ar
                  ? "اطلب عرض سعر"
                  : "Request a Quote"}

                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white transition hover:bg-white/[0.08]"
              >
                {ar
                  ? "استكشف الخدمات"
                  : "Explore Services"}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
