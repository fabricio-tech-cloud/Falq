"use client";

import { useActionState } from "react";
import { loginManager, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export default function PartnerStaffLogin() {
  const [state, formAction, pending] = useActionState(
    loginManager,
    initialState
  );

  return (
    <section className="panel partner-staff-login">
      <div>
        <h2 style={{ margin: 0 }}>Manager Login</h2>
        <p className="empty" style={{ margin: "0.45rem 0 0" }}>
          Beide Manager melden sich mit den Cloudflare-Zugangsdaten an und
          öffnen das Dashboard.
        </p>
      </div>

      <form className="form-grid" action={formAction}>
        <input type="hidden" name="next" value="/manager" />
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
        <button type="submit" className="btn btn-secondary" disabled={pending}>
          {pending ? "Prüfen…" : "Zum Dashboard"}
        </button>
      </form>
    </section>
  );
}
