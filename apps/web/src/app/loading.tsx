export default function Loading() {
  return (
    <div className="loading-page" aria-label="正在加载内容" aria-live="polite">
      <div className="loading-copy">
        <span />
        <span />
        <span />
      </div>
      <div className="loading-visual" />
      <div className="loading-lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
