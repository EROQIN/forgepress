import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@forgepress/theme";
import "./globals.css";
import "./cinematic.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`
  },
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">F</span>
            <span>
              <strong>{siteConfig.title}</strong>
              <small>independent technical journal</small>
            </span>
          </Link>
          <nav aria-label="主导航">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <span>ForgePress · ideas, systems &amp; craft at the edge</span>
          <span aria-hidden="true">✦</span>
        </footer>
      </body>
    </html>
  );
}
