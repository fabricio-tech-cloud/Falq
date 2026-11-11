import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div className="page">
      <article className="product-detail">
        <div className="product-detail__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail__copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.priceCents)}</p>
          <p>{product.description}</p>
          <p className="note">
            Digitaler Zugang — nach der Bestellung wird der Zugang manuell
            freigeschaltet. Keine physische Lieferung.
          </p>
          {!product.inStock ? <p className="stock-out">Aktuell nicht verfügbar</p> : null}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <AddToCartButton productId={product.id} disabled={!product.inStock} />
            <Link href="/cart" className="btn btn-secondary">
              Zum Warenkorb
            </Link>
            <Link href="/products" className="btn btn-secondary">
              Alle Produkte
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
