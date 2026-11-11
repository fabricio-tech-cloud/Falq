import Image from "next/image";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { formatPrice, getProduct } from "@/lib/products";

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
              <div className="content-panel__actions">
                <SlideTextButton
                  text="Kaufen"
                  hoverText="Zum Produkt"
                  href="/products/discord-vip"
                  animateIn={false}
                  className="content-panel__btn content-panel__btn--light h-10 min-w-0 px-5 text-sm md:min-w-0"
                />
              </div>
            </div>
          </div>
          <aside className="panel-aside panel-aside--right" aria-label="Discord VIP Preis">
            <p className="panel-aside__label">Discord VIP</p>
            <p className="panel-aside__price">
              {discordVip ? formatPrice(discordVip.priceCents) : "—"}
            </p>
          </aside>
        </div>
        <div className="panel-section__row panel-section__row--right">
          <aside className="panel-aside panel-aside--left" aria-label="Telegram VIP Preis">
            <p className="panel-aside__label">Telegram VIP</p>
            <p className="panel-aside__price">
              {telegramVip ? formatPrice(telegramVip.priceCents) : "—"}
            </p>
          </aside>
          <div className="content-panel content-panel--dark">
            <div className="content-panel__body">
              <h2 className="content-panel__title">Telegram</h2>
              <p className="content-panel__text">
                {telegramVip?.description ??
                  "Premium-Alerts und kompakte Insights direkt aufs Handy — VIP-Feed mit priorisierten Signalen."}
              </p>
              <div className="content-panel__actions">
                <SlideTextButton
                  text="Kaufen"
                  hoverText="Zum Produkt"
                  href="/products/telegram-vip"
                  animateIn={false}
                  className="content-panel__btn content-panel__btn--dark h-10 min-w-0 px-5 text-sm md:min-w-0"
                />
              </div>
            </div>
            <div className="content-panel__media content-panel__media--right">
              <Image
                src="/brand/telegram-mockup.png"
                alt="FALQ Telegram"
                width={1024}
                height={767}
                className="content-panel__mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
