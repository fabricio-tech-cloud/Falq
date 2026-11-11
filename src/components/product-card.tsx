"use client";

import Link from "next/link";
import { useState } from "react";
import PixelFlowField, {
  type PixelFlowFieldShape,
} from "@/components/smoothui/pixel-flow-field";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

const FLOW_COLORS = ["#3a3a3a", "var(--accent)", "#ff7a45"] as const;
const BRAND_LETTERS = ["F", "A", "L", "Q"] as const;

const GENERATION_SHAPES: Record<1 | 2 | 3 | 4, PixelFlowFieldShape> = {
  1: "square",
  2: "circle",
  3: "cross",
  4: "cross",
};

export function ProductCard({
  product,
  generation = 1,
  className,
}: {
  product: Product;
  generation?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const shape = GENERATION_SHAPES[generation];
  const fieldLabel = `Gen${generation}`;
  const accentIndex = generation - 1;
  const genLabel = `Gen ${generation}`;
  const soldOut = !product.inStock;

  function handleAddToCart() {
    if (soldOut) return;
    addItem(product.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <article
      className={cn(
        `product-card product-card--gen-${generation}`,
        className
      )}
    >
      <div className="product-card__surface">
        <PixelFlowField
          cellSize={7}
          className="product-card__field"
          colors={[...FLOW_COLORS]}
          gap={3}
          shape={shape}
          text={fieldLabel}
        />
      </div>
      <div className="product-card__lower">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/falq-eagle-on-light.png"
          alt=""
          aria-hidden="true"
          className="product-card__watermark"
        />
        <Link href={`/products/${product.id}`} className="product-card__info">
          <p className="product-card__category">{product.category}</p>
          <h2 className="product-card__title">
            {BRAND_LETTERS.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={
                  index === accentIndex ? "product-card__brand-accent" : undefined
                }
                style={
                  index === accentIndex ? { color: "#f25623" } : undefined
                }
              >
                {letter}
              </span>
            ))}{" "}
            <span className="product-card__gen">{genLabel}</span>
          </h2>
          <p className="product-card__blurb">{product.description}</p>
        </Link>
        <div className="product-card__meta">
          <aside
            className="product-card__price-block"
            aria-label={`${genLabel} Preis`}
          >
            <p className="product-card__price-label">{genLabel}</p>
            <p className="product-card__price">
              {formatPrice(product.priceCents)}
            </p>
          </aside>
          <SlideTextButton
            as="button"
            type="button"
            text={soldOut ? "Sold out" : justAdded ? "Added" : "Kaufen"}
            hoverText={soldOut ? "Sold out" : "Add to cart"}
            animateIn={false}
            disabled={soldOut}
            onClick={handleAddToCart}
            className="product-card__buy h-9 min-w-0 px-3.5 text-sm md:min-w-0"
          />
        </div>
      </div>
    </article>
  );
}
