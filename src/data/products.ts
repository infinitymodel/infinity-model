import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Bambu Lab A1 Printer",
    nameAr: "طابعة Bambu Lab A1",
    price: 1850,
    currency: "SAR",
    material: "3D Printer Hardware",
    category: "printers",
    image: "/images/products/printer.jpg",
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعاً",
    description: "High-speed multi-color 3D printer with AMS lite support.",
    descriptionAr: "طابعة ثلاثية الأبعاد عالية السرعة تدعم الطباعة متعددة الألوان.",
  },
  {
    id: "2",
    name: "PLA Premium Filament 1kg",
    nameAr: "خام PLA Premium 1kg",
    price: 85,
    currency: "SAR",
    material: "PLA Filament",
    category: "materials",
    image: "/images/products/filament.jpg",
    badge: "In Stock",
    badgeAr: "متوفر",
    description: "High quality 1.75mm PLA filament for 3D printing.",
    descriptionAr: "خام PLA عالي الجودة مقاس 1.75 مم للطباعة ثلاثية الأبعاد.",
  },
];