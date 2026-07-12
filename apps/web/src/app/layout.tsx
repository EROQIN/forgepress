import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@forgepress/theme";
import "./globals.css";

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
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="star-field" aria-hidden="true">
          <span>✦</span><span>⋆</span><span>✧</span><span>✦</span><span>⋆</span>
        </div>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">F</span>
            <span>
              <strong>{siteConfig.title}</strong>
              <small>edge-native journal</small>
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
          <span>ForgePress · built for creators at the edge</span>
          <span aria-hidden="true">✦</span>
        </footer>
      </body>
    </html>
  );
}
