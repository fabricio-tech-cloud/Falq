import type { Product, ProductKind } from "./types";

export const products: Product[] = [
  {
    id: "discord-vip",
    name: "Discord VIP Access",
    description:
      "Zugang zu den VIP-Räumen auf Discord: tiefere Setups, Chart-Talk und Priority-Channels der FALQ Community.",
    priceCents: 1999,
    category: "Channels",
    kind: "channel",
    image: "/products/discord-vip.svg",
    inStock: true,
    purchaseUrl: "https://whop.com/falq/discord-vip-access-e2",
  },
  {
    id: "telegram-vip",
    name: "Telegram VIP Access",
    description:
      "Premium-Alerts und kompakte Insights direkt aufs Handy — VIP-Feed mit priorisierten Signalen.",
    priceCents: 1999,
    category: "Channels",
    kind: "channel",
    image: "/products/telegram-vip.svg",
    inStock: true,
    purchaseUrl: "https://whop.com/falq/telegram-vip-access-b9",
  },
  {
    id: "algo-pulse",
    name: "FALQ Pulse",
    description:
      "Momentum-Algorithmus für Trendsignale. Live-Insights und klare Entry-/Exit-Logik für aktive Märkte.",
    priceCents: 49999,
    category: "Algorithmen",
    kind: "algorithm",
    image: "/products/algo-pulse.svg",
    inStock: true,
    purchaseUrl: "https://whop.com/falq/falq-gen-1",
  },
  {
    id: "algo-range",
    name: "FALQ Range",
    description:
      "Mean-Reversion-Algorithmus für Range-Märkte. Erkennung von Überkauf/-verkauf mit strukturierten Levels.",
    priceCents: 79999,
    category: "Algorithmen",
    kind: "algorithm",
    image: "/products/algo-range.svg",
    inStock: true,
    purchaseUrl: "https://whop.com/falq/falq-gen-2",
  },
  {
    id: "algo-breakout",
    name: "FALQ Breakout",
    description:
      "Breakout-Algorithmus für Volatilitätsphasen. Filtert Scheinausbrüche und markiert valide Expansionen.",
    priceCents: 149999,
    category: "Algorithmen",
    kind: "algorithm",
    image: "/products/algo-breakout.svg",
    inStock: true,
    purchaseUrl: "https://whop.com/falq/falq-gen-3",
  },
  {
    id: "algo-scalp",
    name: "FALQ Scalp",
    description:
      "Kurzfristiger Scalping-Algorithmus für schnelle Setups. Kompakte Signale mit enger Risikosteuerung.",
    priceCents: 229999,
    category: "Algorithmen",
    kind: "algorithm",
    image: "/products/algo-scalp.svg",
    inStock: true,
    purchaseUrl: "https://whop.com/falq/falq-gen-4",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByKind(kind: ProductKind): Product[] {
  return products.filter((product) => product.kind === kind);
}

export function formatPrice(cents: number, locale = "de-DE"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
