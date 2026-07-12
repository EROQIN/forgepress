import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@forgepress/theme";

export default async function HomePage() {
  const posts = await listPublishedPosts();
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 4);

  return (
    <div className="cinematic-home">
      <section className="cinematic-hero" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-editorial">
            <span className="hero-kicker">Independent technical journal · Edge native</span>
            <h1 id="hero-title">
              记录思考，
              <em>构建未来。</em>
            </h1>
            <p className="hero-deck">
              {siteConfig.tagline} 在代码、系统与审美之间，沉淀值得反复阅读的技术叙事。
            </p>
            <div className="hero-actions">
              <Link className="button primary" href={`/posts/${featured.slug}`}>
                开始阅读&nbsp; ↗
              </Link>
              <Link className="button ghost" href="#latest">
                浏览最新文章
              </Link>
            </div>
            <div className="hero-meta" aria-label="站点技术信息">
              <span>Next.js 16</span>
              <span>Cloudflare Workers</span>
              <span>D1 · R2</span>
              <span>Open source</span>
            </div>
          </div>

          <aside className="feature-rail" aria-label="精选文章">
            <div className="feature-rail-label">
              <span>Editor&apos;s selection</span>
              <span>01 / {String(posts.length).padStart(2, "0")}</span>
            </div>
            <Link className="feature-rail-card" href={`/posts/${featured.slug}`}>
              <div>
                <div className="tags">
                  {featured.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <small>{featured.readingMinutes} 分钟阅读 · 阅读全文 ↗</small>
              </div>
              <div className="feature-rail-art" aria-hidden="true" />
            </Link>
          </aside>
        </div>
        <a className="scroll-cue" href="#latest">Scroll to explore</a>
      </section>

      <section className="editorial-section" id="latest">
        <div className="editorial-heading">
          <div>
            <span className="eyebrow">LATEST FIELD NOTES</span>
            <h2>最近文章</h2>
          </div>
          <p>
            从框架原理、边缘计算到产品工程，用清晰的结构记录复杂问题，也保留技术创作应有的温度与质感。
          </p>
        </div>

        <div className="cinematic-grid">
          {latest.map((post, index) => (
            <Link className="cinematic-card" key={post.id} href={`/posts/${post.slug}`}>
              <span className="card-index">0{index + 2}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <footer>
                <div className="tags">
                  {post.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span>{post.readingMinutes} MIN</span>
              </footer>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
