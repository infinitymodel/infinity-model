import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const isAr = locale === 'ar';
  
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
        <span className="text-xs text-slate-400">صورة المنتج</span>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-slate-900">
          {isAr ? product.title.ar : product.title.en}
        </h3>
        <p className="text-sm font-bold text-cyan-600">
          {product.price} ر.س
        </p>
      </div>
    </div>
  );
}