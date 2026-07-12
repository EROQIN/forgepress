import type { Metadata } from "next";
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

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("# ")) return <h1 key={index}>{line.slice(2)}</h1>;
    if (line.startsWith("## ")) return <h2 key={index}>{line.slice(3)}</h2>;
    if (line.trim() === "") return <br key={index} />;
    const parts = line.split(/(`[^`]+`)/g);
    return (
      <p key={index}>
        {parts.map((part, partIndex) =>
          part.startsWith("`") && part.endsWith("`")
            ? <code key={partIndex}>{part.slice(1, -1)}</code>
            : part
        )}
      </p>
    );
  });
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await findPublishedPost(slug);
  if (!post) notFound();

  return (
    <article className="article-shell">
      <header className="article-header">
        <div className="tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="article-meta">
          <span>{new Date(post.publishedAt).toLocaleDateString("zh-CN")}</span>
          <span>✦</span>
          <span>{post.readingMinutes} 分钟阅读</span>
        </div>
      </header>
      <div className="article-body">{renderContent(post.content)}</div>
    </article>
  );
}
