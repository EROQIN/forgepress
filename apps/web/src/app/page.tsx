import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@forgepress/theme";

export default async function HomePage() {
  const posts = await listPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">✦ FULL-STACK ANIME TECH BLOG</span>
          <h1>把代码、灵感与<br /><em>星光</em>写进同一个宇宙。</h1>
          <p>{siteConfig.tagline}</p>
          <div className="hero-actions">
            <Link className="button primary" href={`/posts/${featured.slug}`}>开始阅读</Link>
            <Link className="button ghost" href="/admin">进入控制台</Link>
          </div>
          <div className="tech-strip" aria-label="技术栈">
            <span>Next.js</span><span>Workers</span><span>D1</span><span>R2</span>
          </div>
        </div>
        <div className="mascot-card" aria-label="ForgePress 原创星灵形象">
          <div className="halo" aria-hidden="true" />
          <div className="mascot" aria-hidden="true">
            <div className="ear left" /><div className="ear right" />
            <div className="face">
              <span className="eye left" /><span className="eye right" />
              <span className="mouth">ω</span>
            </div>
            <div className="ribbon">FORGE</div>
          </div>
          <div className="mascot-caption">
            <strong>Lumi</strong>
            <span>负责守护你的草稿与深夜灵感</span>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FEATURED TRANSMISSION</span>
            <h2>本期精选</h2>
          </div>
          <span className="signal">LIVE · EDGE NETWORK</span>
        </div>
        <Link className="featured-card" href={`/posts/${featured.slug}`}>
          <div className="featured-art" aria-hidden="true">
            <span>01</span>
            <div className="orbit" />
          </div>
          <div>
            <div className="tags">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <small>{featured.readingMinutes} 分钟阅读 · {new Date(featured.publishedAt).toLocaleDateString("zh-CN")}</small>
          </div>
        </Link>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LATEST LOGS</span>
            <h2>最近文章</h2>
          </div>
        </div>
        <div className="post-grid">
          {rest.map((post, index) => (
            <Link className="post-card" key={post.id} href={`/posts/${post.slug}`}>
              <span className="post-number">0{index + 2}</span>
              <div className="tags">{post.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <small>{post.readingMinutes} 分钟阅读</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
