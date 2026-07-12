import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPublishedPost, listPublishedPosts } from "@/lib/posts";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublishedPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function headingId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s/]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "");
}

function renderInline(line: string) {
  return line.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith("`") && part.endsWith("`")
      ? <code key={index}>{part.slice(1, -1)}</code>
      : part
  );
}

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("# ")) return null;
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      return <h2 id={headingId(title)} key={index}>{title}</h2>;
    }
    if (line.startsWith("### ")) {
      const title = line.slice(4);
      return <h3 id={headingId(title)} key={index}>{title}</h3>;
    }
    if (line.startsWith("> ")) return <blockquote key={index}>{renderInline(line.slice(2))}</blockquote>;
    if (line.startsWith("- ")) return <ul key={index}><li>{renderInline(line.slice(2))}</li></ul>;
    if (line.trim() === "") return null;
    return <p key={index}>{renderInline(line)}</p>;
  });
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([
    findPublishedPost(slug),
    listPublishedPosts()
  ]);
  if (!post) notFound();

  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const previous = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;
  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3));

  return (
    <article className="article-shell">
      <header className="article-header">
        <div className="article-kicker">
          <span>{post.tags[0] ?? "技术文章"}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("zh-CN")}</time>
          <span>·</span>
          <span>{post.readingMinutes} 分钟阅读</span>
        </div>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="article-meta">
          <span>ForgePress 编辑部</span>
          <span>基于 Next.js 与 Cloudflare 构建</span>
        </div>
      </header>

      <div className="article-cover" role="img" aria-label="夜间森林与植物文章封面" />

      <div className="article-layout">
        <div className="article-body">{renderContent(post.content)}</div>
        <aside className="article-aside" aria-label="文章辅助信息">
          <section>
            <h2>文章目录</h2>
            <nav>
              {headings.length > 0 ? headings.map((heading) => (
                <a key={heading} href={`#${headingId(heading)}`}>{heading}</a>
              )) : <span>本篇暂无分节</span>}
            </nav>
          </section>
          <section>
            <h2>标签</h2>
            <div className="article-tags">
              {post.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>
        </aside>
      </div>

      {(previous || next) && (
        <nav className="article-navigation" aria-label="相邻文章">
          {previous ? (
            <Link href={`/posts/${previous.slug}`}>
              <span>上一篇</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/posts/${next.slug}`}>
              <span>下一篇</span>
              <strong>{next.title}</strong>
            </Link>
          ) : <span />}
        </nav>
      )}
    </article>
  );
}
