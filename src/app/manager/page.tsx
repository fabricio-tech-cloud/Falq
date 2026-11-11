import { desc } from "drizzle-orm";
import { logoutManager } from "@/app/login/actions";
import {
  updateOrderStatus,
  updatePartnerStatus,
} from "@/app/manager/actions";
import { getDb } from "@/lib/db";
import { orders, partnerApplications } from "@/lib/db/schema";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function ManagerPage() {
  const db = getDb();
  const [partners, orderRows] = await Promise.all([
    db
      .select()
      .from(partnerApplications)
      .orderBy(desc(partnerApplications.createdAt))
      .limit(50),
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(50),
  ]);

  return (
    <div className="page">
      <section className="manager-shell">
        <div className="manager-shell__head">
          <div>
            <h1 style={{ marginTop: 0 }}>Manager Dashboard</h1>
            <p className="empty" style={{ margin: 0 }}>
              Partner-Anfragen und Bestellungen aus D1.
            </p>
          </div>
          <form action={logoutManager}>
            <button type="submit" className="btn btn-secondary">
              Abmelden
            </button>
          </form>
        </div>

        <div className="panel manager-section">
          <h2>Partner-Anfragen</h2>
          {partners.length === 0 ? (
            <p className="empty">Noch keine Anfragen.</p>
          ) : (
            <ul className="manager-list">
              {partners.map((row) => (
                <li key={row.id} className="manager-card">
                  <div className="manager-card__top">
                    <strong>{row.name}</strong>
                    <span className="empty">{formatWhen(row.createdAt)}</span>
                  </div>
                  <p className="manager-card__meta">
                    {row.email}
                    {row.handle ? ` · ${row.handle}` : ""} · {row.interest}
                  </p>
                  <p className="manager-card__body">{row.message}</p>
                  <form action={updatePartnerStatus} className="manager-card__actions">
                    <input type="hidden" name="id" value={row.id} />
                    <label>
                      Status
                      <select name="status" defaultValue={row.status}>
                        <option value="neu">neu</option>
                        <option value="in_bearbeitung">in Bearbeitung</option>
                        <option value="erledigt">erledigt</option>
                      </select>
                    </label>
                    <button type="submit" className="btn btn-secondary">
                      Speichern
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel manager-section">
          <h2>Bestellungen</h2>
          {orderRows.length === 0 ? (
            <p className="empty">Noch keine Bestellungen.</p>
          ) : (
            <ul className="manager-list">
              {orderRows.map((row) => {
                let itemSummary = "—";
                try {
                  const items = JSON.parse(row.itemsJson) as {
                    name: string;
                    quantity: number;
                  }[];
                  itemSummary = items
                    .map((item) => `${item.quantity}× ${item.name}`)
                    .join(", ");
                } catch {
                  itemSummary = row.itemsJson;
                }

                return (
                  <li key={row.id} className="manager-card">
                    <div className="manager-card__top">
                      <strong>{row.name}</strong>
                      <span className="empty">{formatWhen(row.createdAt)}</span>
                    </div>
                    <p className="manager-card__meta">
                      {row.email}
                      {row.discord ? ` · Discord ${row.discord}` : ""}
                      {row.telegram ? ` · Telegram ${row.telegram}` : ""}
                    </p>
                    <p className="manager-card__body">
                      {itemSummary} · <strong>{formatPrice(row.totalCents)}</strong>
                    </p>
                    <p className="empty" style={{ margin: 0, fontSize: "0.8rem" }}>
                      {row.id}
                    </p>
                    <form action={updateOrderStatus} className="manager-card__actions">
                      <input type="hidden" name="id" value={row.id} />
                      <label>
                        Status
                        <select name="status" defaultValue={row.status}>
                          <option value="pending">pending</option>
                          <option value="fulfilled">fulfilled</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </label>
                      <button type="submit" className="btn btn-secondary">
                        Speichern
                      </button>
                    </form>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
