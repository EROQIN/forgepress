import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div>
        <h1>404</h1>
        <h2>这条路径没有留下记录。</h2>
        <p>页面可能已经移动，或者它还没有被写进 ForgePress。</p>
        <div className="not-found-actions">
          <Link className="button primary" href="/">返回首页</Link>
          <Link className="button ghost" href="/archive">浏览归档</Link>
        </div>
      </div>
    </section>
  );
}
