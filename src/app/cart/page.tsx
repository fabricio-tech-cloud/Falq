"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice, getProduct } from "@/lib/products";

export default function CartPage() {
  const { items, subtotalCents, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="page">
        <section className="panel">
          <h1>Warenkorb</h1>
          <p className="empty">Noch leer — hol dir etwas aus dem Shop.</p>
          <Link href="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Zum Shop
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section>
        <h1 style={{ marginTop: 0 }}>Warenkorb</h1>
        <div className="panel cart-list">
          {items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="cart-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <div className="empty">{formatPrice(product.priceCents)}</div>
                  <div className="qty" style={{ marginTop: "0.5rem" }}>
                    <button
                      type="button"
                      aria-label="Menge verringern"
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Menge erhöhen"
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ minHeight: "2rem", marginLeft: "0.5rem" }}
                      onClick={() => removeItem(item.productId)}
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
                <strong>
                  {formatPrice(product.priceCents * item.quantity)}
                </strong>
              </div>
            );
          })}
        </div>

        <div className="panel cart-summary">
          <div className="cart-summary__row">
            <span>Zwischensumme</span>
            <strong>{formatPrice(subtotalCents)}</strong>
          </div>
          <Link href="/checkout" className="btn btn-primary">
            Zur Kasse
          </Link>
        </div>
      </section>
    </div>
  );
}
