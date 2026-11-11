"use client";

import { useActionState } from "react";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/app/newsletter/actions";

const initialState: NewsletterState = {};

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState
  );

  if (state.ok) {
    return (
      <p className="site-footer__newsletter-label" role="status">
        Danke — du bist angemeldet.
      </p>
    );
  }

  return (
    <form className="site-footer__newsletter" action={formAction}>
      <label className="site-footer__newsletter-label" htmlFor="footer-email">
        Newsletter
      </label>
      <div className="site-footer__newsletter-row">
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className="site-footer__newsletter-input"
          disabled={pending}
        />
        <SlideTextButton
          as="button"
          type="submit"
          text={pending ? "…" : "Subscribe"}
          hoverText="Join"
          animateIn={false}
          disabled={pending}
          aria-disabled={pending}
          className="site-footer__newsletter-btn content-panel__btn content-panel__btn--dark h-10 min-w-0 px-5 text-sm md:min-w-0"
        />
      </div>
      {state.error ? (
        <p className="empty" role="alert" style={{ margin: "0.5rem 0 0", fontSize: "0.85rem" }}>
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
