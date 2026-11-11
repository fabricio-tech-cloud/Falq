"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginManager, type LoginState } from "./actions";

const initialState: LoginState = {};

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/manager";
  const [state, formAction, pending] = useActionState(loginManager, initialState);

  return (
    <form className="panel form-grid" action={formAction}>
      <input type="hidden" name="next" value={next} />
      <label>
        Benutzername
        <input
          name="username"
          required
          autoComplete="username"
          placeholder="Manager-Benutzername"
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
  );
}

export default function LoginPage() {
  return (
    <div className="page">
      <section style={{ display: "grid", gap: "1.25rem", maxWidth: 420 }}>
        <div>
          <h1 style={{ marginTop: 0 }}>Manager Login</h1>
          <p className="note">
            Für beide Manager (Cloudflare Secrets). Partner nutzen das Formular
            auf der Partner-Seite — kein öffentlicher Account.
          </p>
        </div>

        <Suspense fallback={<div className="panel">Laden…</div>}>
          <LoginForm />
        </Suspense>
      </section>
    </div>
  );
}
