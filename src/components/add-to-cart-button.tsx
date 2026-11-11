"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";

export function AddToCartButton({
  productId,
  disabled = false,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    if (disabled) return;
    addItem(productId);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? "Ausverkauft" : justAdded ? "Hinzugefügt" : "In den Warenkorb"}
    </button>
  );
}
