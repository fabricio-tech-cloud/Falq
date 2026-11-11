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
};

export type CartItem = {
  productId: string;
  quantity: number;
};
