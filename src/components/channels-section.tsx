import Image from "next/image";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { formatPrice, getProduct } from "@/lib/products";

function ChannelBuyButton({
  href,
  variant,
  className,
}: {
  href: string;
  variant: "light" | "dark";
  className?: string;
}) {
  return (
    <SlideTextButton
      text="Kaufen"
      hoverText="Zum Produkt"
      href={href}
      animateIn={false}
      className={`content-panel__btn content-panel__btn--${variant} h-10 min-w-0 px-5 text-sm md:min-w-0 ${className ?? ""}`.trim()}
    />
  );
}

export function ChannelsSection() {
  const discordVip = getProduct("discord-vip");
  const telegramVip = getProduct("telegram-vip");

  return (
    <section id="channels" className="panel-section" aria-label="Channels">
      <div className="panel-section__inner">
        <div className="panel-section__row panel-section__row--left">
          <div className="content-panel content-panel--light">
            <div className="content-panel__media content-panel__media--left">
              <Image
                src="/brand/discord-mockup.png"
                alt="FALQ Discord Community"
                width={1024}
                height={768}
                className="content-panel__mockup"
              />
            </div>
            <div className="content-panel__body">
              <h2 className="content-panel__title">Discord</h2>
              <p className="content-panel__text">
                {discordVip?.description ??
                  "Zugang zu den VIP-Räumen auf Discord: tiefere Setups, Chart-Talk und Priority-Channels."}
              </p>
              <div className="content-panel__actions content-panel__actions--in-panel">
                <ChannelBuyButton
                  href="/products/discord-vip"
                  variant="light"
                />
              </div>
            </div>
          </div>
          <div className="panel-section__meta">
            <aside
              className="panel-aside panel-aside--right"
              aria-label="Discord VIP Preis"
            >
              <p className="panel-aside__label">Discord VIP</p>
              <p className="panel-aside__price">
                {discordVip ? formatPrice(discordVip.priceCents) : "—"}
              </p>
            </aside>
            <div className="content-panel__actions content-panel__actions--bar">
              <ChannelBuyButton href="/products/discord-vip" variant="dark" />
            </div>
          </div>
        </div>

        <div className="panel-section__row panel-section__row--right">
          <div className="panel-section__meta">
            <aside
              className="panel-aside panel-aside--left"
              aria-label="Telegram VIP Preis"
            >
              <p className="panel-aside__label">Telegram VIP</p>
              <p className="panel-aside__price">
                {telegramVip ? formatPrice(telegramVip.priceCents) : "—"}
              </p>
            </aside>
            <div className="content-panel__actions content-panel__actions--bar">
              <ChannelBuyButton
                href="/products/telegram-vip"
                variant="dark"
              />
            </div>
          </div>
          <div className="content-panel content-panel--dark">
            <div className="content-panel__body">
              <h2 className="content-panel__title">Telegram</h2>
              <p className="content-panel__text">
                {telegramVip?.description ??
                  "Premium-Alerts und kompakte Insights direkt aufs Handy — VIP-Feed mit priorisierten Signalen."}
              </p>
              <div className="content-panel__actions content-panel__actions--in-panel">
                <ChannelBuyButton
                  href="/products/telegram-vip"
                  variant="dark"
                />
              </div>
            </div>
            <div className="content-panel__media content-panel__media--right">
              <Image
                src="/brand/telegram-mockup-v2.png"
                alt="FALQ Telegram"
                width={875}
                height={764}
                className="content-panel__mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
