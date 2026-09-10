export interface Product {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: { ar: "طابعة Bambu Lab A1", en: "Bambu Lab A1 Printer" },
    price: 1850,
    image: "/images/products/printer.jpg",
    category: "printers",
  },
  {
    id: "2",
    title: { ar: "خام PLA Premium 1kg", en: "PLA Premium Filament 1kg" },
    price: 85,
    image: "/images/products/filament.jpg",
    category: "materials",
  },
];