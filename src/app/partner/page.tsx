import PartnerForm from "@/app/partner/partner-form";
import PartnerStaffLogin from "@/app/partner/partner-staff-login";

export default function PartnerPage() {
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
            <li>Direkter Draht zum Team — Partner sehen kein öffentliches Dashboard</li>
          </ul>
        </div>

        <div className="partner-panels">
          <PartnerForm />
          <PartnerStaffLogin />
        </div>
      </section>
    </div>
  );
}
