import Link from "next/link";
import { listPublishedPosts } from "@/lib/posts";

export default async function AdminPage() {
  const posts = await listPublishedPosts();

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <span className="eyebrow">FORGEPRESS CMS</span>
          <h1>创作控制台</h1>
        </div>
        <nav>
          <a className="active" href="#overview">概览</a>
          <a href="#posts">文章</a>
          <a href="#media">媒体</a>
          <a href="#theme">主题</a>
          <a href="#settings">设置</a>
        </nav>
        <Link className="button ghost" href="/">返回站点</Link>
      </aside>
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">GOOD EVENING, CREATOR</span>
            <h2>让下一篇文章开始发光。</h2>
          </div>
          <button className="button primary" type="button">＋ 新建文章</button>
        </div>
        <div className="stat-grid" id="overview">
          <div><strong>{posts.length}</strong><span>已发布文章</span></div>
          <div><strong>03</strong><span>草稿</span></div>
          <div><strong>12.8k</strong><span>本月阅读</span></div>
          <div><strong>99.98%</strong><span>边缘可用性</span></div>
        </div>
        <section className="admin-panel" id="posts">
          <div className="panel-heading">
            <div><span className="eyebrow">CONTENT STREAM</span><h3>最近内容</h3></div>
            <span className="status-badge">D1 READY</span>
          </div>
          <div className="admin-list">
            {posts.map((post) => (
              <article key={post.id}>
                <div>
                  <strong>{post.title}</strong>
                  <span>{post.tags.join(" · ")}</span>
                </div>
                <span>{new Date(post.publishedAt).toLocaleDateString("zh-CN")}</span>
                <span className="status-badge">PUBLISHED</span>
              </article>
            ))}
          </div>
        </section>
        <p className="admin-note">
          当前控制台是可运行的 UI 与数据读取基础。写入操作通过受保护的
          <code> /api/posts </code> 和 <code>/api/media/:key</code> 提供；
          多用户认证、编辑器和 RBAC 将在后续里程碑接入。
        </p>
      </div>
    </section>
  );
}
