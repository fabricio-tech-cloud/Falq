"use client";

import { useLayoutEffect, useRef, useState } from "react";
import CoverflowCarousel from "@/components/smoothui/coverflow-carousel";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

// Must match `.algorithms-coverflow__frame` width in globals.css.
const DESIGN_WIDTH = 360;
const MAX_SCALE = 1.5;

export function AlgorithmsCoverflow({ products }: { products: Product[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ scale: number; height: number } | null>(
    null
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const frame = frameRef.current;
    if (!viewport || !frame) {
      return;
    }

    const update = () => {
      const width = viewport.clientWidth;
      if (width === 0) {
        return;
      }
      const scale = Math.min(width / DESIGN_WIDTH, MAX_SCALE);
      setLayout({ scale, height: frame.offsetHeight * scale });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

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
    <div
      ref={viewportRef}
      className="algorithms-coverflow"
      style={{ height: layout?.height }}
    >
      <div
        ref={frameRef}
        className="algorithms-coverflow__frame"
        style={{
          transform: `translateX(-50%) scale(${layout?.scale ?? 1})`,
          visibility: layout ? undefined : "hidden",
        }}
      >
        <CoverflowCarousel
          items={items}
          loop
          spacing={200}
          depth={160}
          rotation={36}
          scaleStep={0.12}
          prevLabel="Zurück"
          nextLabel="Weiter"
          stageClassName="algorithms-coverflow__stage"
          itemClassName="algorithms-coverflow__item"
        />
      </div>
    </div>
  );
}
