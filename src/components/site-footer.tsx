import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/newsletter-form";

const siteLinks = [
  { href: "/products", label: "Shop" },
  { href: "/partner", label: "Partner" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/#channels", label: "Channels" },
  { href: "/products/discord-vip", label: "VIP" },
] as const;

const channelLinks = [
  {
    group: "Discord",
    items: [
      { href: "https://discord.gg/", label: "Free", external: true },
      { href: "/products/discord-vip", label: "VIP", external: false },
    ],
  },
  {
    group: "Telegram",
    items: [
      { href: "https://t.me/", label: "Free", external: true },
      { href: "/products/telegram-vip", label: "VIP", external: false },
    ],
  },
] as const;

const socialLinks = [
  { href: "https://x.com/", label: "X", icon: "x" },
  { href: "https://www.reddit.com/", label: "Reddit", icon: "reddit" },
  { href: "https://www.facebook.com/", label: "Facebook", icon: "facebook" },
  { href: "https://www.instagram.com/", label: "Instagram", icon: "instagram" },
  { href: "https://www.tiktok.com/", label: "TikTok", icon: "tiktok" },
  { href: "https://t.me/", label: "Telegram", icon: "telegram" },
  { href: "https://discord.gg/", label: "Discord", icon: "discord" },
] as const;

function ArrowUpRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.992 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "reddit":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.18 8.1c.42 0 .77.26.92.63a2.86 2.86 0 0 0-1.64-1.04 2.1 2.1 0 0 0-1.33-1.93l.3-1.4a.4.4 0 0 0-.1-.37.4.4 0 0 0-.37-.13l-2.42.52a.4.4 0 0 0-.31.39v.05l.08.37c-1.64.05-3.13.63-4.05 1.5a2.85 2.85 0 0 0-1.66 1.04c.15-.37.5-.63.92-.63.67 0 1.22.55 1.22 1.22 0 .1-.01.2-.04.29A4.7 4.7 0 0 0 12 12.9c1.2 0 2.28-.3 3.05-.8a1.22 1.22 0 0 0 2.13-.99v-.01zm-7.26 1.7a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm6.16 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zM12 17.2c-1.45 0-2.7-.66-3.24-1.63a.35.35 0 0 1 .61-.34c.4.72 1.4 1.2 2.63 1.2s2.23-.48 2.63-1.2a.35.35 0 1 1 .61.34C14.7 16.54 13.45 17.2 12 17.2z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M14 8.2h2.3V5H14c-2.4 0-4 1.5-4 4.1V11H7.5v3.2H10V21h3.3v-6.8h2.4l.5-3.2h-2.9V9.4c0-.7.3-1.2 1.2-1.2z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.6 4.2c.6 1.7 1.9 3 3.6 3.4v2.5a6.7 6.7 0 0 1-3.6-1.1v6.3a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.7a3.2 3.2 0 1 0 2.3 3.1V4.2h2.7z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common} fill="currentColor">
          <path d="M21.5 4.3 3.9 11c-1.2.5-1.2 1.1-.2 1.4l4.5 1.4 1.7 5.3c.2.6.1.8.7.8.5 0 .7-.2 1-1l2.4-3.9 5 3.7c.9.5 1.6.2 1.8-.9L22.8 5.5c.3-1.2-.4-1.7-1.3-1.2z" />
        </svg>
      );
    case "discord":
      return (
        <svg {...common} fill="currentColor">
          <path d="M19.3 5.2A16.4 16.4 0 0 0 15.4 4l-.2.4c1.5.4 2.8 1 4 1.8A14.6 14.6 0 0 0 9 5.8c-.7 0-1.4.1-2.1.2C5.6 5.3 4.3 4.7 2.8 4.4L2.6 4A16.5 16.5 0 0 0 .7 5.2C.2 9.5-.4 13.7.9 17.9c1.7 1.2 3.4 2 5.2 2.5l.7-1.1c-.7-.3-1.4-.6-2.1-1 .1-.1.3-.1.4-.2 3.1 1.4 6.5 1.4 9.6 0 .1.1.3.1.4.2-.7.4-1.4.7-2.1 1l.7 1.1c1.8-.5 3.5-1.3 5.2-2.5 1.4-4.7.8-8.9.4-12.7zM8.3 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__watermark" aria-hidden="true">
        <Image
          src="/brand/falq-logo.png"
          alt=""
          width={900}
          height={600}
          className="site-footer__watermark-img"
        />
      </div>

      <div className="footer-inner">
        <div className="site-footer__grid">
          <nav className="site-footer__nav" aria-label="Footer">
            <p className="site-footer__heading">Explore</p>
            <ul className="site-footer__list">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__text-link">
                    <span>{link.label}</span>
                    <ArrowUpRightIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__channels">
            <p className="site-footer__heading">Join</p>
            <div className="site-footer__channel-groups">
              {channelLinks.map((group) => (
                <div key={group.group} className="site-footer__channel-group">
                  <span className="site-footer__channel-name">{group.group}</span>
                  <div className="site-footer__channel-actions">
                    {group.items.map((item) => {
                      const label = `${group.group} ${item.label}`;
                      const className = "site-footer__text-link";
                      const content = (
                        <>
                          <span>{item.label}</span>
                          <ArrowUpRightIcon />
                        </>
                      );

                      if (item.external) {
                        return (
                          <a
                            key={label}
                            href={item.href}
                            className={className}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                          >
                            {content}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={label}
                          href={item.href}
                          className={className}
                          aria-label={label}
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="site-footer__social-block">
            <p className="site-footer__heading">Follow</p>
            <ul className="site-footer__social">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="site-footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>

            <NewsletterForm />
          </div>
        </div>

        <p className="site-footer__legal">
          © 2026 FALQ. Algorithms and live insights.
        </p>
      </div>
    </footer>
  );
}
