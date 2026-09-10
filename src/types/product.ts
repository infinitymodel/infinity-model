export interface Product {
  id: string;

  // Names
  name: string;
  nameAr: string;

  // Pricing
  price: number;
  currency: string;

  // Product information
  material: string;
  category: string;

  // Media
  image: string;
  images?: string[];

  // Optional product metadata
  badge?: string;
  badgeAr: string;

  description?: string;
  descriptionAr?: string;

  dimensions?: string;
  dimensionsAr?: string;

  productionTime?: string;
  productionTimeAr?: string;

  colors?: string[];

  inStock?: boolean;

  featured?: boolean;
}