import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { getProduct } from "@/lib/products";

const COURSE_TRACKS = [
  {
    title: "Price Action Lab",
    detail: "Struktur, Liquidity & Session-Playbooks",
    count: "24 Module",
  },
  {
    title: "Risk & Execution",
    detail: "Sizing, Psychologie und Trade-Management",
    count: "18 Module",
  },
  {
    title: "Algo Foundations",
    detail: "Signal-Logik, Backtests und Live-Setups",
    count: "32 Module",
  },
  {
    title: "Market Narrative",
    detail: "Makro, Catalysts und Bias-Building",
    count: "16 Module",
  },
] as const;

const MARQUEE_COURSES = [
  "Powell",
  "Salman Nassiri",
  "Wicked",
  "Quanttower Settings",
  "Dante",
  "Ethan ICT",
  "TJR",
  "Axia",
  "Alex G",
  "Lit Treader",
  "Alex FX",
  "PB Trading",
] as const;

function CourseMarquee() {
  const loop = [...MARQUEE_COURSES, ...MARQUEE_COURSES];

  return (
    <div className="sauce-marquee" aria-hidden="true">
      <div className="sauce-marquee__track">
        {loop.map((course, index) => (
          <span key={`${course}-${index}`} className="sauce-marquee__item">
            {course}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DiscordSauceSection() {
  const discordVip = getProduct("discord-vip");
  const vipHref = discordVip?.purchaseUrl ?? "/products/discord-vip";
  const vipExternal = Boolean(discordVip?.purchaseUrl);

  return (
    <section
      id="sauce"
      className="sauce-section"
      aria-labelledby="sauce-title"
    >
      <div className="sauce-section__inner">
        <div className="sauce-section__intro">
          <p className="sauce-section__eyebrow">Discord Sauce</p>
          <h2 id="sauce-title" className="sauce-section__title">
            Sauce<span className="sauce-section__dot">.</span>
          </h2>
          <p className="sauce-section__lead">
            Die FALQ Course Library auf Discord — unzählige Module, klare
            Tracks und laufend neue Setups für Trader, die tiefer gehen.
          </p>
          <div className="sauce-section__cta">
            <SlideTextButton
              text="Zugang sichern"
              hoverText="Zum VIP"
              href={vipHref}
              animateIn={false}
              {...(vipExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="sauce-section__btn h-11 min-w-0 px-6 text-base md:min-w-40"
            />
          </div>
        </div>

        <ul className="sauce-tracks">
          {COURSE_TRACKS.map((track) => (
            <li key={track.title} className="sauce-tracks__item">
              <div className="sauce-tracks__copy">
                <h3>{track.title}</h3>
                <p>{track.detail}</p>
              </div>
              <span className="sauce-tracks__count">{track.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <CourseMarquee />
    </section>
  );
}
