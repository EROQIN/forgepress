export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl?: string;
  tags: string[];
  status: "draft" | "scheduled" | "published" | "archived";
  publishedAt: string;
  readingMinutes: number;
}

export const seedPosts: Post[] = [
  {
    id: "post_edge_native_blog",
    title: "把技术博客搬到边缘：Workers、D1 与 R2 的组合",
    slug: "edge-native-blog",
    excerpt:
      "从传统服务器迁移到边缘运行时，真正需要重构的并不只是部署脚本，而是数据、媒体和缓存边界。",
    content: `# 把技术博客搬到边缘

ForgePress 把前端渲染、内容 API 与管理入口放进同一个可部署单元，同时把数据和媒体交给 D1 与 R2。

## 为什么是适配器，而不是平台判断

业务组件不应该到处出现 \`if (cloudflare)\`。正确的做法是让内容仓库和媒体仓库暴露稳定接口，再由部署环境提供实现。

## 视觉也属于架构

二次元审美不是贴一张背景图。色彩、圆角、动效、留白和正文对比度都应该由 Token 管理，才能让主题真正可复用。`,
    tags: ["Cloudflare", "Next.js", "Architecture"],
    status: "published",
    publishedAt: "2026-07-12T09:00:00.000Z",
    readingMinutes: 6
  },
  {
    id: "post_theme_system",
    title: "从一组 CSS 变量开始设计可扩展主题系统",
    slug: "theme-system",
    excerpt:
      "主题系统的关键不是提供更多颜色选项，而是建立语义稳定、组件可消费、插件可扩展的视觉协议。",
    content: `# 主题系统

ForgePress 将原始色值、语义色、组件状态和站点配置分层。

## 稳定的语义

组件只关心 \`surface\`、\`foreground\`、\`accent\`，不关心某个颜色究竟是粉色还是蓝色。`,
    tags: ["Design System", "CSS", "Theme"],
    status: "published",
    publishedAt: "2026-07-10T09:00:00.000Z",
    readingMinutes: 4
  },
  {
    id: "post_static_mirror",
    title: "为什么还要保留一个 Pages 静态发行版",
    slug: "static-pages-edition",
    excerpt:
      "动态系统负责创作与互动，静态镜像负责传播、归档与低成本展示；两者并不冲突。",
    content: `# 静态发行版

Pages 版没有在线写入能力，但它部署简单、攻击面小，非常适合个人主页和项目展示。`,
    tags: ["Cloudflare Pages", "Astro"],
    status: "published",
    publishedAt: "2026-07-08T09:00:00.000Z",
    readingMinutes: 3
  }
];

export function getSeedPost(slug: string): Post | undefined {
  return seedPosts.find((post) => post.slug === slug);
}
