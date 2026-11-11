import Image from "next/image";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { formatPrice, getProduct } from "@/lib/products";

const FREE_LINKS = {
  discord: "https://discord.gg/",
  telegram: "https://t.me/",
} as const;

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

function ChannelFreeButton({
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
      text="Free"
      hoverText="Join"
      href={href}
      animateIn={false}
      target="_blank"
      rel="noopener noreferrer"
      className={`content-panel__btn content-panel__btn--free content-panel__btn--free-${variant} h-10 min-w-0 px-5 text-sm md:min-w-0 ${className ?? ""}`.trim()}
    />
  );
}

function ChannelActions({
  freeHref,
  vipHref,
  variant,
  placement,
}: {
  freeHref: string;
  vipHref: string;
  variant: "light" | "dark";
  placement: "in-panel" | "bar";
}) {
  const barVariant = placement === "bar" ? "dark" : variant;

  return (
    <div
      className={`content-panel__actions content-panel__actions--${placement}`}
    >
      <ChannelFreeButton href={freeHref} variant={barVariant} />
      <ChannelBuyButton href={vipHref} variant={barVariant} />
    </div>
  );
}

function ChannelPriceAside({
  channel,
  align,
  priceCents,
}: {
  channel: "Discord" | "Telegram";
  align: "left" | "right";
  priceCents?: number;
}) {
  return (
    <aside
      className={`panel-aside panel-aside--${align}`}
      aria-label={`${channel} Channel Preise`}
    >
      <div className="panel-aside__tier">
        <p className="panel-aside__label">{channel} Free</p>
        <p className="panel-aside__price panel-aside__price--free">Free</p>
      </div>
      <div className="panel-aside__tier">
        <p className="panel-aside__label">{channel} VIP</p>
        <p className="panel-aside__price">
          {priceCents != null ? formatPrice(priceCents) : "—"}
        </p>
      </div>
    </aside>
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
              <ChannelActions
                freeHref={FREE_LINKS.discord}
                vipHref="/products/discord-vip"
                variant="light"
                placement="in-panel"
              />
            </div>
          </div>
          <div className="panel-section__meta">
            <ChannelPriceAside
              channel="Discord"
              align="right"
              priceCents={discordVip?.priceCents}
            />
            <ChannelActions
              freeHref={FREE_LINKS.discord}
              vipHref="/products/discord-vip"
              variant="light"
              placement="bar"
            />
          </div>
        </div>

        <div className="panel-section__row panel-section__row--right">
          <div className="panel-section__meta">
            <ChannelPriceAside
              channel="Telegram"
              align="left"
              priceCents={telegramVip?.priceCents}
            />
            <ChannelActions
              freeHref={FREE_LINKS.telegram}
              vipHref="/products/telegram-vip"
              variant="dark"
              placement="bar"
            />
          </div>
          <div className="content-panel content-panel--dark">
            <div className="content-panel__body">
              <h2 className="content-panel__title">Telegram</h2>
              <p className="content-panel__text">
                {telegramVip?.description ??
                  "Premium-Alerts und kompakte Insights direkt aufs Handy — VIP-Feed mit priorisierten Signalen."}
              </p>
              <ChannelActions
                freeHref={FREE_LINKS.telegram}
                vipHref="/products/telegram-vip"
                variant="dark"
                placement="in-panel"
              />
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
