"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="page">
        <section className="panel partner-success">
          <h1>Anfrage gesendet</h1>
          <p>
            Danke — wir melden uns bei dir. Aktuell ist das nur die Formular-UI;
            Speicherung und Versand kommen mit dem Backend.
          </p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Zur Startseite
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="partner-layout">
        <div className="partner-intro">
          <h1 style={{ marginTop: 0 }}>Partner werden</h1>
          <p className="note">
            Du willst FALQ gemeinsam skalieren — als Affiliate, Community-Partner
            oder Content-Partner? Schreib uns kurz, wer du bist und wie du
            zusammenarbeiten willst.
          </p>
          <ul className="partner-points">
            <li>Zugang zu Partner-Material und Kampagnen</li>
            <li>Klare Konditionen, sobald wir passen</li>
            <li>Direkter Draht zum Team — kein öffentliches Dashboard</li>
          </ul>
        </div>

        <form className="panel form-grid" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">
            Anfrage senden
          </button>
          <p className="empty" style={{ margin: 0, fontSize: "0.85rem" }}>
            Nur UI — noch keine Speicherung oder E-Mail.
          </p>
        </form>
      </section>
    </div>
  );
}
