import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import { siteConfig } from "@forgepress/theme";
import "./globals.css";
import "./cinematic.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap"
});

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
    <html lang="zh-CN" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="ForgePress 首页">
            <span className="brand-mark" aria-hidden="true">✦</span>
            <strong>{siteConfig.title}</strong>
          </Link>

          <nav className="desktop-nav" aria-label="主导航">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="header-search" href="/search">搜索</Link>
            <Link className="header-cta" href="/posts/edge-native-blog">开始阅读</Link>
          </div>

          <details className="mobile-menu">
            <summary aria-label="打开导航菜单"><span /><span /><span /></summary>
            <nav aria-label="移动端导航">
              {siteConfig.navigation.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <Link href="/search">搜索</Link>
              <Link className="mobile-cta" href="/posts/edge-native-blog">开始阅读</Link>
            </nav>
          </details>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">✦</span>
              <strong>{siteConfig.title}</strong>
            </Link>
            <p>记录思考，构建未来。一个面向开发者的技术出版平台。</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>导航</strong>
              <Link href="/">文章</Link>
              <Link href="/archive">归档</Link>
              <Link href="/topics">专题</Link>
              <Link href="/about">关于</Link>
            </div>
            <div>
              <strong>资源</strong>
              <Link href="/api/posts">内容 API</Link>
              <Link href="/admin">管理后台</Link>
              <a href="https://github.com/EROQIN/forgepress">GitHub</a>
            </div>
          </div>
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} ForgePress</span>
            <span>Next.js · Cloudflare</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
