import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@forgepress/theme";

const topicMap = [
  { name: "前端工程", count: 12, href: "/topics#frontend" },
  { name: "Cloudflare & Edge", count: 8, href: "/topics#edge" },
  { name: "架构设计", count: 6, href: "/topics#architecture" },
  { name: "设计工程", count: 5, href: "/topics#design" }
];

export default async function HomePage() {
  const posts = await listPublishedPosts();
  const [featured, ...latest] = posts;

  return (
    <div className="editorial-home">
      <section className="editorial-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">记录思考，<br />构建未来。</h1>
          <p>{siteConfig.tagline}</p>
          <div className="hero-actions">
            <Link className="button primary" href={`/posts/${featured.slug}`}>开始阅读</Link>
            <Link className="button ghost" href="/archive">浏览归档</Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="夜间植物主视觉与本期精选">
          <div className="hero-image" aria-hidden="true" />
          <Link className="featured-story" href={`/posts/${featured.slug}`}>
            <span>本期精选</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <footer>
              <time dateTime={featured.publishedAt}>{new Date(featured.publishedAt).toLocaleDateString("zh-CN")}</time>
              <span>{featured.readingMinutes} 分钟阅读</span>
            </footer>
          </Link>
        </div>
      </section>

      <section className="latest-section" aria-labelledby="latest-title">
        <div className="section-title-stack">
          <h2 id="latest-title">最近文章</h2>
          <p>从框架原理、边缘计算到设计工程，记录复杂问题背后的选择与取舍。</p>
        </div>

        <div className="article-ledger">
          {latest.map((post, index) => (
            <Link className={`ledger-row${index === 0 ? " ledger-featured" : ""}`} key={post.id} href={`/posts/${post.slug}`}>
              {index === 0 && <div className="ledger-image" aria-hidden="true" />}
              <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="ledger-copy">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="ledger-meta">
                  <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("zh-CN")}</time>
                  <span>{post.readingMinutes} 分钟阅读</span>
                  <span>{post.tags[0]}</span>
                </div>
              </div>
              <span className="ledger-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <Link className="text-link" href="/archive">查看全部文章 →</Link>
      </section>

      <section className="topic-section" aria-labelledby="topics-title">
        <h2 id="topics-title">专题索引</h2>
        <div className="topic-index">
          {topicMap.map((topic) => (
            <Link key={topic.name} href={topic.href}>
              <span>{topic.name}</span>
              <small>{topic.count} 篇文章</small>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="manifesto-section">
        <div>
          <p>技术博客不只是知识仓库。</p>
          <p>它也可以拥有叙事、节奏和审美。</p>
        </div>
        <Link className="button ghost" href="/about">了解本站</Link>
      </section>
    </div>
  );
}
