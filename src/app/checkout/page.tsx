"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotalCents, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    setSubmitted(true);
  }

  if (items.length === 0 && !submitted) {
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

  if (submitted) {
    return (
      <div className="page">
        <section className="panel">
          <h1>Bestellung vorgemerkt</h1>
          <p>
            UI-Test erfolgreich — es wurde nichts abgebucht. Dein digitaler
            Zugang wird später manuell freigeschaltet.
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
            Nur Formular-UI — kein Stripe, PayPal oder andere Payment-Environments.
            Digitale Zugänge, keine Lieferadresse. Summe:{" "}
            <strong>{formatPrice(subtotalCents)}</strong>
          </p>
        </div>

        <form className="panel form-grid" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" required placeholder="Alex Beispiel" />
          </label>
          <label>
            E-Mail
            <input name="email" type="email" required placeholder="alex@example.com" />
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
          <button type="submit" className="btn btn-primary">
            Bestellung simulieren
          </button>
        </form>
      </section>
    </div>
  );
}
