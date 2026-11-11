import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FALQ Shop",
  description: "VIP-Channels und Algorithmen — digitaler Zugang, Warenkorb und Checkout-UI",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${syne.variable} ${figtree.variable}`}>
      <body className="site-shell antialiased">
        <Providers>
          <SiteHeader />
          <main className="page-main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
