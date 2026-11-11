"use client";

import CoverflowCarousel from "@/components/smoothui/coverflow-carousel";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

export function AlgorithmsCoverflow({ products }: { products: Product[] }) {
  const items = products.map((product, index) => ({
    id: product.id,
    content: (
      <ProductCard
        product={product}
        generation={(index + 1) as 1 | 2 | 3 | 4}
        className="product-card--coverflow"
      />
    ),
  }));

  return (
    <CoverflowCarousel
      className="algorithms-coverflow"
      items={items}
      loop
      spacing={210}
      depth={160}
      rotation={36}
      scaleStep={0.12}
      prevLabel="Zurück"
      nextLabel="Weiter"
      stageClassName="algorithms-coverflow__stage"
      itemClassName="algorithms-coverflow__item"
    />
  );
}
