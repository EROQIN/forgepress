import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";

export const metadata = {
  title: "专题索引",
  description: "按主题浏览 ForgePress 的技术内容。"
};

const topicDescriptions: Record<string, string> = {
  Cloudflare: "边缘运行时、D1、R2 与部署链路的工程实践。",
  "Next.js": "从渲染模型到生产部署，理解现代 React 框架的真实边界。",
  Architecture: "关注模块边界、适配器、数据模型与长期维护成本。",
  "Design System": "把视觉、组件和内容体验转化为可持续演进的系统。"
};

export default async function TopicsPage() {
  const posts = await listPublishedPosts();
  const topics = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => topics.set(tag, (topics.get(tag) ?? 0) + 1));
  });

  return (
    <div className="public-page">
      <header className="public-page-header">
        <h1>专题索引</h1>
        <p>专题不是简单的标签集合，而是围绕一个问题持续积累的研究路径。</p>
      </header>

      <div className="topic-directory">
        {[...topics.entries()].map(([topic, count]) => (
          <section id={topic.toLowerCase().replace(/\s+/g, "-")} key={topic}>
            <div>
              <h2>{topic}</h2>
              <Link className="text-link" href={`/search?q=${encodeURIComponent(topic)}`}>查看 {count} 篇文章 →</Link>
            </div>
            <p>{topicDescriptions[topic] ?? "围绕这一主题整理的技术实践、设计判断与实现笔记。"}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
