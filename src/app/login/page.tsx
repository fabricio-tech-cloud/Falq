"use client";

import { useActionState } from "react";
import { loginManager, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginManager, initialState);

  return (
    <div className="page">
      <section style={{ display: "grid", gap: "1.25rem", maxWidth: 420 }}>
        <div>
          <h1 style={{ marginTop: 0 }}>Manager Login</h1>
          <p className="note">
            Nur für das interne Team. Kunden nutzen die Partner-Seite — kein
            öffentlicher Account.
          </p>
        </div>

        <form className="panel form-grid" action={formAction}>
          <label>
            Benutzername
            <input
              name="username"
              required
              autoComplete="username"
              placeholder="Benutzername"
            />
          </label>
          <label>
            Passwort
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>
          {state.error ? (
            <p className="form-error" role="alert">
              {state.error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Prüfen…" : "Einloggen"}
          </button>
        </form>
      </section>
    </div>
  );
}
