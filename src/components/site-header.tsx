"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { useCart } from "@/context/cart-context";

function CartIcon() {
  return (
    <svg
      className="cart-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 7h15l-1.4 8.4a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.7L5.2 4H3" />
      <circle cx="9.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header
      className="site-header sticky top-0 z-40 w-full border-b border-white/10 bg-[#171717]/[0.62] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-[28px] backdrop-saturate-150 supports-[backdrop-filter]:bg-[#171717]/[0.48]"
    >
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="FALQ Startseite">
          <BrandLogo height={56} priority />
        </Link>
        <nav className="site-nav" aria-label="Hauptnavigation">
          <Link href="/partner">Partner</Link>
          <Link href="/products" className="nav-shop">
            Shop
          </Link>
          <Link
            href="/cart"
            className="cart-link"
            aria-label={
              itemCount > 0
                ? `Warenkorb, ${itemCount} Artikel`
                : "Warenkorb"
            }
          >
            <CartIcon />
            {itemCount > 0 ? (
              <span className="cart-count" aria-hidden="true">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
