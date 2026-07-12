import Link from "next/link";

export const metadata = {
  title: "关于 ForgePress",
  description: "了解 ForgePress 的编辑理念、技术架构与开源方向。"
};

export default function AboutPage() {
  return (
    <div className="public-page">
      <header className="public-page-header">
        <h1>关于本站</h1>
        <p>ForgePress 是一个面向开发者的技术出版系统，也是一场关于内容、工程与视觉如何共存的实验。</p>
      </header>

      <div className="about-manifesto">
        技术博客不只是知识仓库。它也可以拥有叙事、节奏和审美，并在长期维护中保持清晰与克制。
      </div>

      <div className="about-grid">
        <section>
          <h2>编辑理念</h2>
          <p>优先记录问题背后的判断、约束和权衡，而不是只展示最终答案。</p>
        </section>
        <section>
          <h2>技术架构</h2>
          <p>Next.js 负责完整体验，Cloudflare Workers、D1 与 R2 提供边缘运行能力。</p>
        </section>
        <section>
          <h2>开放演进</h2>
          <p>项目保持开源，主题、内容适配器和部署方式都可以被替换与扩展。</p>
        </section>
      </div>

      <div className="about-actions">
        <Link className="button primary" href="/archive">浏览文章</Link>
        <a className="button ghost" href="https://github.com/EROQIN/forgepress">查看 GitHub</a>
      </div>
    </div>
  );
}
