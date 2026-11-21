export type ProductKind = "channel" | "algorithm";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  kind: ProductKind;
  image: string;
  inStock: boolean;
  /** External checkout URL (e.g. Whop). When set, buy CTAs go here instead of the local cart. */
  purchaseUrl?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};
