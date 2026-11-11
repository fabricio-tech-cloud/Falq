import { logoutManager } from "@/app/login/actions";

export default function ManagerPage() {
  return (
    <div className="page">
      <section className="manager-shell">
        <div className="manager-shell__head">
          <div>
            <h1 style={{ marginTop: 0 }}>Manager Dashboard</h1>
            <p className="empty" style={{ margin: 0 }}>
              Interner Bereich — Partner-Anfragen und Shop-Verwaltung kommen mit
              dem Backend.
            </p>
          </div>
          <form action={logoutManager}>
            <button type="submit" className="btn btn-secondary">
              Abmelden
            </button>
          </form>
        </div>

        <div className="panel manager-placeholder">
          <h2>Partner-Anfragen</h2>
          <p className="note">
            Formular auf <strong>/partner</strong> ist live als UI. Speicherung,
            Übersicht und Status kommen, sobald Datenbank und Backend stehen.
          </p>
          <ul className="manager-todo">
            <li>Anfragen aus dem Partner-Formular listen</li>
            <li>Status setzen (neu / in Bearbeitung / erledigt)</li>
            <li>Optional: E-Mail-Benachrichtigung</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
