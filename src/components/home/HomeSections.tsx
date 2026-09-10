import {
  ArrowRight,
  Check,
  ChevronDown,
  Factory,
  GraduationCap,
  Layers3,
  Lightbulb,
  MapPin,
  PackageCheck,
  Palette,
  Printer,
  Ruler,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface HomeSectionsProps {
  locale: string;
}

const isArabic = (locale: string) => locale === "ar";

export default function HomeSections({
  locale,
}: HomeSectionsProps) {
  const ar = isArabic(locale);

  return (
    <>
      {/* =====================================================
          WHAT WE DO
      ====================================================== */}
      <section className="border-t border-zinc-200 bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {ar ? "ماذا نقدم" : "What We Do"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                {ar
                  ? "من الفكرة الرقمية إلى المنتج الحقيقي"
                  : "From Digital Ideas to Physical Products"}
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              {ar
                ? "نساعدك في تحويل الأفكار والملفات الرقمية إلى نماذج ومنتجات ملموسة من خلال التصميم، النمذجة الأولية، التصنيع الرقمي والطباعة ثلاثية الأبعاد."
                : "We transform ideas and digital files into physical products through design, prototyping, digital fabrication, and 3D printing."}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Lightbulb className="h-6 w-6" />}
              number="01"
              title={ar ? "Design" : "Design"}
              description={
                ar
                  ? "نحوّل فكرتك إلى نموذج رقمي قابل للتصنيع."
                  : "Turn your idea into a manufacturable digital model."
              }
            />

            <FeatureCard
              icon={<Layers3 className="h-6 w-6" />}
              number="02"
              title={ar ? "Prototype" : "Prototype"}
              description={
                ar
                  ? "نصنع النموذج الأولي لاختبار الشكل والوظيفة."
                  : "Build prototypes to validate form, fit, and function."
              }
            />

            <FeatureCard
              icon={<Factory className="h-6 w-6" />}
              number="03"
              title={ar ? "Manufacture" : "Manufacture"}
              description={
                ar
                  ? "ننقل التصميم إلى منتج حقيقي بجودة قابلة للتكرار."
                  : "Turn approved designs into repeatable physical products."
              }
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="bg-zinc-950 py-20 text-white sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {ar ? "خدماتنا" : "Our Services"}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {ar
                ? "حلول تصنيع رقمي متكاملة"
                : "Complete Digital Manufacturing Solutions"}
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              {ar
                ? "من التصميم الهندسي والطباعة ثلاثية الأبعاد إلى النماذج الأولية والتصنيع الرقمي."
                : "From engineering design and 3D printing to rapid prototyping and digital fabrication."}
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
            <DarkServiceCard
              icon={<Printer />}
              title={ar ? "الطباعة ثلاثية الأبعاد" : "3D Printing"}
              description={
                ar
                  ? "FDM و Resin لتطبيقات هندسية وإبداعية."
                  : "FDM and resin printing for engineering and creative applications."
              }
            />

            <DarkServiceCard
              icon={<Ruler />}
              title={ar ? "CAD والتصميم ثلاثي الأبعاد" : "CAD & 3D Design"}
              description={
                ar
                  ? "تصميم ميكانيكي، منتجات، نماذج وأجزاء مخصصة."
                  : "Mechanical, product, creative, and custom 3D design."
              }
            />

            <DarkServiceCard
              icon={<Zap />}
              title={ar ? "النمذجة الأولية" : "Rapid Prototyping"}
              description={
                ar
                  ? "اختبر فكرتك قبل الدخول في الإنتاج."
                  : "Validate your idea before moving into production."
              }
            />

            <DarkServiceCard
              icon={<Settings />}
              title={ar ? "CNC والتصنيع الرقمي" : "CNC & Fabrication"}
              description={
                ar
                  ? "حفر، نقش، تصنيع PCB وتجهيزات مخصصة."
                  : "Drilling, engraving, PCB fabrication, and custom fixtures."
              }
            />

            <DarkServiceCard
              icon={<Palette />}
              title={ar ? "UV Printing" : "UV Printing"}
              description={
                ar
                  ? "طباعة وتخصيص المنتجات والأسطح."
                  : "Direct printing and product customization."
              }
            />

            <DarkServiceCard
              icon={<Sparkles />}
              title={ar ? "نماذج مخصصة" : "Custom Models"}
              description={
                ar
                  ? "مجسمات، شخصيات، ديكور وهدايا."
                  : "Figures, characters, decor, collectibles, and gifts."
              }
            />

            <DarkServiceCard
              icon={<Wrench />}
              title={ar ? "صيانة الطابعات" : "Printer Maintenance"}
              description={
                ar
                  ? "تشخيص وصيانة وتحسين أداء الطابعات."
                  : "Diagnostics, maintenance, and performance optimization."
              }
            />

            <DarkServiceCard
              icon={<Layers3 />}
              title={ar ? "PCB Prototyping" : "PCB Prototyping"}
              description={
                ar
                  ? "نماذج PCB بالحفر والتخريم والتصنيع الرقمي."
                  : "PCB prototyping through routing, drilling, and fabrication."
              }
            />
          </div>

          <div className="mt-10">
            <Button
              href={`/${locale}/services`}
              variant="secondary"
            >
              {ar ? "استكشف جميع الخدمات" : "Explore All Services"}
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}
      <section className="bg-zinc-50 py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {ar ? "كيف نعمل" : "How It Works"}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              {ar
                ? "عملية واضحة من الفكرة إلى التسليم"
                : "A Clear Process From Idea to Delivery"}
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <ProcessCard
              number="01"
              title={ar ? "Brief" : "Brief"}
              description={
                ar ? "نفهم احتياجك." : "Understand your requirements."
              }
            />

            <ProcessCard
              number="02"
              title={ar ? "Design" : "Design"}
              description={
                ar ? "نجهز التصميم." : "Prepare the design."
              }
            />

            <ProcessCard
              number="03"
              title={ar ? "Quote" : "Quote"}
              description={
                ar ? "نقدم العرض." : "Provide the quotation."
              }
            />

            <ProcessCard
              number="04"
              title={ar ? "Prototype" : "Prototype"}
              description={
                ar
                  ? "نصنع النموذج."
                  : "Build the prototype."
              }
            />

            <ProcessCard
              number="05"
              title={ar ? "Production" : "Production"}
              description={
                ar
                  ? "نبدأ الإنتاج بعد الموافقة."
                  : "Production starts after approval."
              }
            />

            <ProcessCard
              number="06"
              title={ar ? "Delivery" : "Delivery"}
              description={
                ar
                  ? "فحص ثم تسليم."
                  : "Inspect and deliver."
              }
            />
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-zinc-900" />

              <p>
                {ar
                  ? "في طلبات الإنتاج الكمي، تتم الموافقة على النموذج الأولي قبل بدء الإنتاج."
                  : "For batch production, customer approval is obtained before production begins."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ====================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {ar ? "التقنيات" : "Technology"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {ar
                  ? "التقنية المناسبة للتطبيق المناسب"
                  : "The Right Technology for the Right Application"}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600">
                {ar
                  ? "نختار التقنية والخامة والإعدادات بناءً على الاستخدام النهائي للمنتج، وليس فقط على شكل النموذج."
                  : "We select technology, material, and process parameters based on the final application—not just the appearance of the model."}
              </p>

              <div className="mt-8 space-y-4">
                <CheckItem
                  text={
                    ar
                      ? "FDM للطباعة العملية والمتينة"
                      : "FDM for practical and durable parts"
                  }
                />

                <CheckItem
                  text={
                    ar
                      ? "Resin للتفاصيل الدقيقة"
                      : "Resin for high-detail models"
                  }
                />

                <CheckItem
                  text={
                    ar
                      ? "CAD/CAM للتصميم والتصنيع"
                      : "CAD/CAM for design and manufacturing"
                  }
                />

                <CheckItem
                  text={
                    ar
                      ? "CNC للحفر والنقش والتصنيع الرقمي"
                      : "CNC for drilling, engraving, and fabrication"
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TechBox
                title="FDM"
                subtitle={ar ? "Durable" : "Durable"}
              />

              <TechBox
                title="RESIN"
                subtitle={ar ? "High Detail" : "High Detail"}
              />

              <TechBox
                title="CAD/CAM"
                subtitle={ar ? "Design" : "Design"}
              />

              <TechBox
                title="CNC"
                subtitle={ar ? "Fabrication" : "Fabrication"}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}
      <section className="bg-zinc-50 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {ar ? "مشاريع مختارة" : "Selected Projects"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                {ar
                  ? "أفكار مختلفة، حلول مختلفة"
                  : "Different Ideas. Different Solutions."}
              </h2>
            </div>

            <Button
              href={`/${locale}/projects`}
              variant="secondary"
            >
              {ar ? "عرض المشاريع" : "View Projects"}
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <ProjectCard
              title={ar ? "مجسم تنين" : "Dragon Figure"}
              category={ar ? "Creative" : "Creative"}
            />

            <ProjectCard
              title={ar ? "مجسم شخصية" : "Character Figure"}
              category={ar ? "Figures" : "Figures"}
            />

            <ProjectCard
              title={ar ? "نموذج هندسي" : "Engineering Model"}
              category={ar ? "Engineering" : "Engineering"}
            />

            <ProjectCard
              title={ar ? "نموذج PCB" : "PCB Prototype"}
              category="PCB"
            />

            <ProjectCard
              title={ar ? "منتج مخصص" : "Custom Product"}
              category={ar ? "Custom" : "Custom"}
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          INDUSTRIES
      ====================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {ar ? "القطاعات" : "Industries"}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              {ar
                ? "نخدم احتياجات متعددة"
                : "Built for Different Applications"}
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ar
                ? "الهندسة والصناعة"
                : "Engineering & Industrial",
              ar
                ? "الصيانة وقطع الغيار"
                : "Maintenance & Spare Parts",
              ar
                ? "العمارة والتصميم"
                : "Architecture & Design",
              ar ? "التعليم" : "Education",
              ar ? "تطوير المنتجات" : "Product Development",
              ar ? "الإبداع والأعمال" : "Creative & Business",
            ].map((item) => (
              <div
                key={item}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg"
              >
                <Factory className="h-6 w-6 text-zinc-900" />

                <h3 className="mt-6 font-semibold text-zinc-950">
                  {item}
                </h3>

                <ArrowRight className="mt-8 h-4 w-4 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-zinc-900 rtl:rotate-180" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
          TRAINING
      ====================================================== */}
      <section className="bg-zinc-950 py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {ar ? "التدريب" : "Training"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {ar
                  ? "تعلّم. اصنع. أتقن."
                  : "Learn. Build. Master."}
              </h2>

              <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg">
                {ar
                  ? "برامج تدريبية عملية في التصميم ثلاثي الأبعاد، الـSlicing، الطباعة والصيانة."
                  : "Practical training in 3D design, slicing, printing, and printer maintenance."}
              </p>
            </div>

            <Button
              href={`/${locale}/training`}
              variant="secondary"
            >
              <GraduationCap className="me-2 h-4 w-4" />
              {ar ? "استكشف التدريب" : "Explore Training"}
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TrainingCard
              title={ar ? "3D Design" : "3D Design"}
              description={
                ar
                  ? "تعلم إنشاء النماذج."
                  : "Learn to create 3D models."
              }
            />

            <TrainingCard
              title={ar ? "Slicing" : "Slicing"}
              description={
                ar
                  ? "إعداد الملفات للطباعة."
                  : "Prepare files for printing."
              }
            />

            <TrainingCard
              title={ar ? "3D Printing" : "3D Printing"}
              description={
                ar
                  ? "افهم الطباعة والإعدادات."
                  : "Understand printing and parameters."
              }
            />

            <TrainingCard
              title={ar ? "Maintenance" : "Maintenance"}
              description={
                ar
                  ? "تعلم تشخيص وصيانة الطابعات."
                  : "Learn printer diagnostics and maintenance."
              }
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          MAINTENANCE CTA
      ====================================================== */}
      <section className="border-b border-zinc-200 bg-white py-16 sm:py-20">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-zinc-100">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                  <Wrench className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-zinc-950 sm:text-3xl">
                  {ar
                    ? "هل تواجه مشكلة مع طابعتك ثلاثية الأبعاد؟"
                    : "Is Your 3D Printer Giving You Trouble?"}
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
                  {ar
                    ? "نوفر خدمات التشخيص والصيانة والتنظيف والمعايرة وتحسين أداء الطابعات."
                    : "We provide diagnostics, maintenance, cleaning, calibration, and printer performance optimization."}
                </p>
              </div>

              <Button href={`/${locale}/services`}>
                {ar ? "اطلب خدمة الصيانة" : "Request Maintenance"}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          WHY US
      ====================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {ar ? "لماذا Infinity Model؟" : "Why Infinity Model?"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                {ar
                  ? "أكثر من مجرد طباعة ثلاثية الأبعاد"
                  : "More Than Just 3D Printing"}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600">
                {ar
                  ? "نحن نعمل كاستوديو للتصنيع الرقمي يجمع بين الهندسة والتصميم والتصنيع والإبداع في workflow واحد."
                  : "We operate as a digital manufacturing studio combining engineering, design, fabrication, and creativity in one workflow."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <WhyCard
                icon={<Factory />}
                title={ar ? "خبرة هندسية" : "Engineering Mindset"}
              />

              <WhyCard
                icon={<Printer />}
                title={ar ? "تقنيات حديثة" : "Modern Technology"}
              />

              <WhyCard
                icon={<PackageCheck />}
                title={ar ? "جودة قابلة للتكرار" : "Repeatable Quality"}
              />

              <WhyCard
                icon={<Zap />}
                title={ar ? "سرعة عملية" : "Practical Turnaround"}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          QUALITY
      ====================================================== */}
      <section className="bg-zinc-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {ar ? "الجودة" : "Quality"}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              {ar
                ? "جودة يمكنك الاعتماد عليها"
                : "Quality You Can Rely On"}
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">
              {ar
                ? "نستخدم عمليات منظمة للحفاظ على جودة المنتج من التصميم وحتى التسليم."
                : "Structured processes help us maintain product quality from design through delivery."}
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ar ? "الصيانة الوقائية للمعدات" : "Preventive Equipment Maintenance",
              ar ? "إعدادات طباعة موحدة" : "Standardized Print Profiles",
              ar ? "تتبع الخامات والعمليات" : "Material & Process Tracking",
              ar ? "فحص بصري ووظيفي" : "Visual & Functional Checks",
              ar ? "فحص الأبعاد عند الحاجة" : "Dimensional Inspection",
              ar ? "موافقة العميل قبل الإنتاج الكمي" : "Customer Approval Before Batch Production",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                  <Check className="h-4 w-4" />
                </div>

                <p className="text-sm font-medium leading-6 text-zinc-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {ar ? "عن Infinity Model" : "About Infinity Model"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                {ar
                  ? "نربط بين الأفكار والواقع"
                  : "Bridging Ideas and Reality"}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                {ar
                  ? "Infinity Model هو استوديو للتصنيع الرقمي في جازان يجمع التصميم، التصنيع الإضافي، النمذجة الأولية والتصنيع الرقمي لمساعدة الأفراد والمهندسين والشركات على تحويل الأفكار إلى منتجات ملموسة."
                  : "Infinity Model is a digital manufacturing studio in Jizan combining design, additive manufacturing, prototyping, and digital fabrication to help individuals, engineers, and businesses turn ideas into physical products."}
              </p>

              <div className="mt-8">
                <Button
                  href={`/${locale}/about`}
                  variant="secondary"
                >
                  {ar ? "اعرف المزيد عنا" : "Learn More About Us"}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-3xl bg-zinc-950 p-8 text-white sm:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Infinity Model
              </p>

              <p className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">
                {ar
                  ? "Design. Prototype. Manufacture."
                  : "Design. Prototype. Manufacture."}
              </p>

              <div className="mt-10 h-px bg-zinc-800" />

              <p className="mt-8 text-sm leading-7 text-zinc-400">
                {ar
                  ? "منصة مترابطة تجمع التصميم والنمذجة والتخصيص والتصنيع."
                  : "A connected workflow where design, prototyping, customization, and manufacturing work together."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          EQUIPMENT
      ====================================================== */}
      <section className="bg-zinc-950 py-20 text-white sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {ar ? "المعدات" : "Equipment"}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {ar
                ? "تقنيات ومعدات نستخدمها"
                : "Technology We Work With"}
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {["Bambu Lab H2D", "Bambu Lab H2S", "Bambu Lab P1S", "Bambu Lab A1", "Creality HALOT-X1"].map(
              (equipment) => (
                <div
                  key={equipment}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <Printer className="h-6 w-6 text-zinc-400" />

                  <h3 className="mt-6 font-semibold">
                    {equipment}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {equipment.includes("HALOT")
                      ? "Resin"
                      : "FDM"}
                  </p>
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          FUTURE
      ====================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {ar ? "المستقبل" : "What's Next"}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              {ar
                ? "نبني قدراتنا خطوة بخطوة"
                : "Building the Next Generation of Capabilities"}
            </h2>

            <p className="mt-5 leading-8 text-zinc-600">
              {ar
                ? "بعض القدرات التالية تمثل اتجاهات مستقبلية للتوسع والتطوير."
                : "The following capabilities represent future directions for expansion and development."}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ar ? "3D Scanning" : "3D Scanning",
              ar ? "Reverse Engineering" : "Reverse Engineering",
              ar ? "AI-Assisted Design" : "AI-Assisted Design",
              ar
                ? "Larger-Format Manufacturing"
                : "Larger-Format Manufacturing",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-dashed border-zinc-300 p-6"
              >
                <Sparkles className="h-6 w-6 text-zinc-500" />

                <h3 className="mt-6 font-semibold text-zinc-950">
                  {item}
                </h3>

                <span className="mt-4 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {ar ? "مستقبلاً" : "Future"}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}
      <section className="bg-zinc-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                FAQ
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {ar
                  ? "الأسئلة الشائعة"
                  : "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="mt-12 space-y-3">
              <Faq
                question={
                  ar
                    ? "هل أستطيع إرسال ملف STL جاهز للطباعة؟"
                    : "Can I send a ready STL file?"
                }
                answer={
                  ar
                    ? "نعم. يمكننا مراجعة الملف وتجهيزه للطباعة واختيار الخامة والإعدادات المناسبة."
                    : "Yes. We can review the file, prepare it for printing, and recommend suitable material and settings."
                }
              />

              <Faq
                question={
                  ar
                    ? "هل توفرون تصميم القطعة من الصفر؟"
                    : "Can you design the part from scratch?"
                }
                answer={
                  ar
                    ? "نعم، نوفر خدمات CAD والتصميم ثلاثي الأبعاد للمنتجات والأجزاء والنماذج."
                    : "Yes. We provide CAD and 3D design for products, parts, and models."
                }
              />

              <Faq
                question={
                  ar
                    ? "هل يمكن إنتاج أكثر من قطعة؟"
                    : "Can you produce multiple units?"
                }
                answer={
                  ar
                    ? "نعم، يمكننا التعامل مع النماذج الأولية والطلبات الصغيرة والإنتاج الكمي حسب المشروع."
                    : "Yes. We can handle prototypes, small batches, and production quantities depending on the project."
                }
              />

              <Faq
                question={
                  ar
                    ? "هل تقدمون صيانة للطابعات ثلاثية الأبعاد؟"
                    : "Do you provide 3D printer maintenance?"
                }
                answer={
                  ar
                    ? "نعم، تشمل الخدمة التشخيص والتنظيف والمعايرة وتحسين الأداء حسب الحالة."
                    : "Yes. Services include diagnostics, cleaning, calibration, and performance optimization."
                }
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-zinc-950 py-20 text-white sm:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Infinity Model
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {ar
                ? "لديك فكرة؟ دعنا نبنيها معاً."
                : "Have an Idea? Let's Build It."}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              {ar
                ? "أرسل لنا فكرتك أو ملفك وسنساعدك في تحديد أفضل طريقة لتحويلها إلى منتج حقيقي."
                : "Send us your idea or file and we will help you determine the best way to turn it into a physical product."}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={`/${locale}/contact`}>
                {ar ? "ابدأ مشروعك" : "Start Your Project"}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>

              <Button
                href={`/${locale}/shop`}
                variant="secondary"
              >
                {ar ? "تصفح المتجر" : "Explore Shop"}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
        <Container>
          <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-xl font-bold tracking-tight">
                INFINITY MODEL
              </div>

              <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-500">
                {ar
                  ? "التصميم • التصنيع الرقمي • النمذجة الأولية"
                  : "DESIGN • DIGITAL MANUFACTURING • RAPID PROTOTYPING"}
              </p>

              <p className="mt-4 text-sm text-zinc-500">
                {ar
                  ? "من الفكرة إلى الواقع الملموس."
                  : "From idea to physical reality."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                {ar ? "روابط" : "Explore"}
              </h3>

              <div className="mt-5 space-y-3 text-sm text-zinc-500">
                <FooterLink
                  href={`/${locale}`}
                  text={ar ? "الرئيسية" : "Home"}
                />

                <FooterLink
                  href={`/${locale}/services`}
                  text={ar ? "الخدمات" : "Services"}
                />

                <FooterLink
                  href={`/${locale}/shop`}
                  text={ar ? "المتجر" : "Shop"}
                />

                <FooterLink
                  href={`/${locale}/projects`}
                  text={ar ? "المشاريع" : "Projects"}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold">
                {ar ? "خدمات" : "Services"}
              </h3>

              <div className="mt-5 space-y-3 text-sm text-zinc-500">
                <p>{ar ? "3D Printing" : "3D Printing"}</p>
                <p>{ar ? "CAD & Design" : "CAD & Design"}</p>
                <p>{ar ? "Rapid Prototyping" : "Rapid Prototyping"}</p>
                <p>{ar ? "CNC & PCB" : "CNC & PCB"}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">
                {ar ? "تواصل معنا" : "Contact"}
              </h3>

              <div className="mt-5 flex items-start gap-3 text-sm text-zinc-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                <span>
                  {ar
                    ? "جازان، المملكة العربية السعودية"
                    : "Jizan, Saudi Arabia"}
                </span>
              </div>

              <div className="mt-6">
                <Button href={`/${locale}/contact`}>
                  {ar ? "تواصل معنا" : "Contact Us"}
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} Infinity Model.{" "}
            {ar
              ? "جميع الحقوق محفوظة."
              : "All rights reserved."}
          </div>
        </Container>
      </footer>
    </>
  );
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white">
          {icon}
        </div>

        <span className="text-sm font-bold text-zinc-300">
          {number}
        </span>
      </div>

      <h3 className="mt-8 text-xl font-bold text-zinc-950">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function DarkServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-950 p-6 transition hover:bg-zinc-900 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-zinc-950">
        {icon}
      </div>

      <h3 className="mt-7 font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function ProcessCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <span className="text-xs font-bold tracking-widest text-zinc-400">
        {number}
      </span>

      <h3 className="mt-5 font-bold text-zinc-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-white">
        <Check className="h-4 w-4" />
      </div>

      <span className="text-sm font-medium text-zinc-800">
        {text}
      </span>
    </div>
  );
}

function TechBox({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-zinc-950 p-7 text-white">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-zinc-800 transition group-hover:scale-125" />

      <div className="relative">
        <p className="text-2xl font-bold">{title}</p>

        <p className="mt-3 text-sm text-zinc-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white">
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300">
        <div className="h-20 w-20 rounded-3xl border border-white/70 bg-white/40 shadow-inner backdrop-blur" />
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {category}
        </span>

        <h3 className="mt-2 font-bold text-zinc-950">
          {title}
        </h3>
      </div>
    </div>
  );
}

function TrainingCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <GraduationCap className="h-6 w-6 text-zinc-400" />

      <h3 className="mt-6 font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function WhyCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6">
      <div className="text-zinc-900">{icon}</div>

      <h3 className="mt-5 font-semibold text-zinc-950">
        {title}
      </h3>
    </div>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-zinc-200 bg-white p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-zinc-950">
        <span>{question}</span>

        <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400 transition group-open:rotate-180" />
      </summary>

      <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
        {answer}
      </p>
    </details>
  );
}

function FooterLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="block transition hover:text-white"
    >
      {text}
    </a>
  );
}