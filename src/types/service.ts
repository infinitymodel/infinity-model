export interface Service {
  slug: string;
  title: string;
  titleAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  icon:
    | "printer"
    | "design"
    | "prototype"
    | "cnc"
    | "pcb"
    | "uv"
    | "model"
    | "maintenance";
  image: string;
  features: string[];
  featuresAr: string[];
}