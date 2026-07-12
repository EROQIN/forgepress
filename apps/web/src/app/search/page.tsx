import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";

export const metadata = {
  title: "搜索",
  description: "搜索 ForgePress 的文章标题、摘要和标签。"
};

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const posts = await listPublishedPosts();
  const results = query
    ? posts.filter((post) => [post.title, post.excerpt, ...post.tags].join(" ").toLowerCase().includes(query))
    : [];

  return (
    <div className="public-page">
      <header className="public-page-header">
        <h1>搜索文章</h1>
        <p>搜索标题、摘要或标签，快速回到曾经读过的技术线索。</p>
      </header>

      <form className="search-form" action="/search" role="search">
        <input
          aria-label="搜索文章"
          name="q"
          defaultValue={q}
          placeholder="例如：Cloudflare、Next.js、主题系统"
          type="search"
        />
        <button className="button primary" type="submit">搜索</button>
      </form>

      <section className="search-state" aria-live="polite">
        {!query ? (
          <p>输入关键词开始搜索。</p>
        ) : results.length === 0 ? (
          <div>
            <h2>没有找到相关内容</h2>
            <p>可以尝试更短的关键词，或前往归档浏览全部文章。</p>
            <Link className="text-link" href="/archive">浏览归档 →</Link>
          </div>
        ) : (
          <div className="article-ledger">
            {results.map((post, index) => (
              <Link className="ledger-row" key={post.id} href={`/posts/${post.slug}`}>
                <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="ledger-copy">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="ledger-meta">
                    <span>{post.tags[0]}</span>
                    <span>{post.readingMinutes} 分钟阅读</span>
                  </div>
                </div>
                <span className="ledger-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
