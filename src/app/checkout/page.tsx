"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import {
  submitOrder,
  type CheckoutActionState,
} from "@/app/checkout/actions";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/products";

const initialState: CheckoutActionState = {};

export default function CheckoutPage() {
  const { items, subtotalCents, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(submitOrder, initialState);
  const clearedForOrder = useRef<string | null>(null);

  useEffect(() => {
    if (!state.ok || !state.orderId) return;
    if (clearedForOrder.current === state.orderId) return;
    clearedForOrder.current = state.orderId;
    clearCart();
  }, [state.ok, state.orderId, clearCart]);

  if (items.length === 0 && !state.ok) {
    return (
      <div className="page">
        <section className="panel">
          <h1>Checkout</h1>
          <p className="empty">Dein Warenkorb ist leer.</p>
          <Link href="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Zum Shop
          </Link>
        </section>
      </div>
    );
  }

  if (state.ok) {
    return (
      <div className="page">
        <section className="panel" role="status">
          <h1>Bestellung eingegangen</h1>
          <p>
            Deine Bestellung wurde gespeichert
            {state.orderId ? (
              <>
                {" "}
                (<code>{state.orderId}</code>)
              </>
            ) : null}
            . Zahlung ist noch manuell — wir schalten den digitalen Zugang frei,
            sobald alles bestätigt ist.
          </p>
          <Link href="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Zurück zum Shop
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section style={{ display: "grid", gap: "1.25rem", maxWidth: 640 }}>
        <div>
          <h1 style={{ marginTop: 0 }}>Checkout</h1>
          <p className="note">
            Digitale Zugänge, keine Lieferadresse. Noch kein Online-Payment —
            Bestellung wird im Manager hinterlegt. Summe:{" "}
            <strong>{formatPrice(subtotalCents)}</strong>
          </p>
        </div>

        <form className="panel form-grid" action={formAction}>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              }))
            )}
          />
          <label>
            Name
            <input
              name="name"
              required
              placeholder="Alex Beispiel"
              autoComplete="name"
            />
          </label>
          <label>
            E-Mail
            <input
              name="email"
              type="email"
              required
              placeholder="alex@example.com"
              autoComplete="email"
            />
          </label>
          <label>
            Discord-Handle{" "}
            <span className="empty">(optional)</span>
            <input name="discord" placeholder="username" />
          </label>
          <label>
            Telegram-Handle{" "}
            <span className="empty">(optional)</span>
            <input name="telegram" placeholder="@username" />
          </label>
          {state.error ? (
            <p className="empty" role="alert" style={{ margin: 0 }}>
              {state.error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Wird gespeichert…" : "Bestellung absenden"}
          </button>
        </form>
      </section>
    </div>
  );
}
