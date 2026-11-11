import { AlgorithmsCoverflow } from "@/components/algorithms-coverflow";
import { ChannelsSection } from "@/components/channels-section";
import { ProductCard } from "@/components/product-card";
import DotField from "@/components/kokonutui/dot-field";
import { getProductsByKind } from "@/lib/products";

export default function ProductsPage() {
  const algorithms = getProductsByKind("algorithm");

  return (
    <>
      <section className="hero shop-hero -mt-[var(--header-height)] mb-0 w-full">
        <DotField
          fullBleed
          accentChance={0.045}
          palette={{
            light: "#DEDEDE",
            dim: "#4D4D4D",
            accent: "#F25623",
          }}
          className="hero__field shop-hero__field min-h-[min(38vh,360px)] w-full bg-[var(--bg)] text-[var(--ink)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(48%,220px)] bg-gradient-to-b from-transparent via-[#171717]/60 to-[#171717]"
          />
          <div className="hero__content shop-hero__content relative z-[1] pt-[calc(var(--header-height)+1.5rem)] pb-10">
            <div className="hero__copy">
              <h1>
                Shop<span className="hero__dot">.</span>
              </h1>
            </div>
          </div>
        </DotField>
      </section>

      <section
        className="shop-algorithms"
        aria-labelledby="shop-algorithms-title"
      >
        <div className="shop-algorithms__inner">
          <div className="shop-algorithms__head">
            <h2 id="shop-algorithms-title">Algorithmen</h2>
            <p>Vier Strategien — Pulse, Range, Breakout und Scalp.</p>
          </div>
          <div className="product-grid product-grid--algorithms">
            {algorithms.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                generation={(index + 1) as 1 | 2 | 3 | 4}
              />
            ))}
          </div>
          <AlgorithmsCoverflow products={algorithms} />
        </div>
      </section>

      <ChannelsSection />
    </>
  );
}
