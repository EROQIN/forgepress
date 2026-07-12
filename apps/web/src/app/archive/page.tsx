import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";

export const metadata = {
  title: "文章归档",
  description: "按时间浏览 ForgePress 发布的技术文章。"
};

export default async function ArchivePage() {
  const posts = await listPublishedPosts();
  const groups = posts.reduce<Record<string, typeof posts>>((result, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    result[year] ??= [];
    result[year].push(post);
    return result;
  }, {});

  return (
    <div className="public-page">
      <header className="public-page-header">
        <h1>文章归档</h1>
        <p>按时间回看每一次研究、实验和架构选择。这里保留完整记录，而不是只展示流行内容。</p>
      </header>

      {Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a)).map(([year, yearPosts]) => (
        <section className="archive-year" key={year}>
          <h2>{year}</h2>
          <div className="archive-list">
            {yearPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" })}</time>
                <strong>{post.title}</strong>
                <span>{post.readingMinutes} 分钟</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
