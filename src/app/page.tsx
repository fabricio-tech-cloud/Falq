import { ChannelsSection } from "@/components/channels-section";
import DotField from "@/components/kokonutui/dot-field";
import SlideTextButton from "@/components/kokonutui/slide-text-button";

export default function HomePage() {
  return (
    <>
      <section className="hero -mt-[var(--header-height)] mb-0 w-full">
        <DotField
          fullBleed
          accentChance={0.055}
          palette={{
            light: "#DEDEDE",
            dim: "#4D4D4D",
            accent: "#F25623",
          }}
          className="hero__field min-h-[min(68vh,640px)] w-full bg-[var(--bg)] text-[var(--ink)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(52%,340px)] bg-gradient-to-b from-transparent via-[#171717]/60 to-[#171717]"
          />
          <div className="hero__content relative z-[1] pt-[calc(var(--header-height)+2.25rem)] pb-16">
            <div className="hero__copy">
              <h1>
                FALQ<span className="hero__dot">.</span>
              </h1>
              <p>providing Algorithms and live insights</p>
            </div>
            <div className="hero__cta">
              <SlideTextButton
                text="Zum Shop"
                hoverText="Entdecken"
                href="/products"
                className="hero__shop-btn h-11 min-w-0 px-6 text-base md:min-w-40"
              />
            </div>
          </div>
        </DotField>
      </section>

      <ChannelsSection />
    </>
  );
}
