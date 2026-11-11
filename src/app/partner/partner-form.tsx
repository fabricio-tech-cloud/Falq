"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  submitPartnerApplication,
  type PartnerActionState,
} from "@/app/partner/actions";

const initialState: PartnerActionState = {};

export default function PartnerForm() {
  const [state, formAction, pending] = useActionState(
    submitPartnerApplication,
    initialState
  );

  if (state.ok) {
    return (
      <section className="panel partner-success" role="status">
        <h1>Anfrage gesendet</h1>
        <p>
          Danke — wir haben deine Anfrage gespeichert und melden uns bei dir.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Zur Startseite
        </Link>
      </section>
    );
  }

  return (
    <form className="panel form-grid" action={formAction}>
      <label>
        Name
        <input name="name" required placeholder="Alex Beispiel" autoComplete="name" />
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
        Interesse
        <select name="interest" required defaultValue="affiliate">
          <option value="affiliate">Affiliate / Referral</option>
          <option value="community">Community / Discord</option>
          <option value="content">Content / Social</option>
          <option value="other">Sonstiges</option>
        </select>
      </label>
      <label>
        Discord / Telegram{" "}
        <span className="empty">(optional)</span>
        <input name="handle" placeholder="@username" />
      </label>
      <label>
        Nachricht
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Kurz: Wer bist du, und wie stellst du dir die Partnerschaft vor?"
        />
      </label>
      {state.error ? (
        <p className="empty" role="alert" style={{ margin: 0 }}>
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Wird gesendet…" : "Anfrage senden"}
      </button>
    </form>
  );
}
