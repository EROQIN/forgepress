# ForgePress

<p align="center">
  <strong>可高度定制、二次元审美、Cloudflare 原生友好的全栈技术博客系统。</strong>
</p>

<p align="center">
  Next.js · OpenNext · Cloudflare Workers · D1 · R2 · Astro Pages Edition
</p>

<p align="center">
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/EROQIN/forgepress">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare">
  </a>
</p>

> 当前版本为 `v0.1.0` 基础平台：已经包含可运行的博客前台、文章详情、管理控制台雏形、D1 内容 API、R2 媒体 API、主题 Token、Cloudflare Workers 部署配置和 Cloudflare Pages 静态发行版。

## 特色

- **二次元但不牺牲阅读体验**：樱粉、星蓝、玻璃质感、柔和光晕与轻量动效，正文区域保持高对比和舒适行宽。
- **Cloudflare Workers 全栈版**：Next.js App Router 通过 OpenNext 部署，D1 保存内容，R2 保存媒体。
- **Cloudflare Pages 静态版**：Astro 构建纯静态镜像，适合 Fork 后直接传播、展示和个人主页。
- **部署目标解耦**：业务层通过内容与存储适配器访问平台能力，后续可增加 PostgreSQL/S3 适配器。
- **可定制主题**：颜色、字体、圆角、阴影、内容宽度和动效均由 CSS Token 驱动。
- **安全的写入入口**：初始管理 API 需要 `ADMIN_TOKEN`，生产环境必须使用 Wrangler Secret。
- **GitHub Actions**：包含 CI 与 Cloudflare 手动部署工作流。

## 仓库结构

```text
apps/
  web/       Next.js 全栈 Workers 版本
  pages/     Astro 静态 Pages 版本
packages/
  content/   共享示例内容与类型
  theme/     主题 Token 和站点配置
migrations/  Cloudflare D1 迁移
scripts/     Cloudflare 资源初始化脚本
docs/        架构与定制说明
```

## 本地开发

要求 Node.js 22 或更高版本、pnpm 10。

```bash
corepack enable
pnpm install
cp apps/web/.dev.vars.example apps/web/.dev.vars
pnpm dev
```

访问：

- 博客前台：`http://localhost:3000`
- 管理台预览：`http://localhost:3000/admin`
- 健康检查：`http://localhost:3000/api/health`
- 文章 API：`http://localhost:3000/api/posts`

普通 `pnpm dev` 使用内置示例内容，不要求先创建 Cloudflare 资源；`next.config.ts` 已启用 OpenNext 的本地开发初始化。要在本地真实模拟 D1/R2，请先执行 Cloudflare 初始化，再运行：

```bash
pnpm preview:cf
```

## 一键部署到 Cloudflare Workers（完整功能）

完整版本使用：

- Workers：运行 Next.js、API 和管理台
- D1：文章、页面、分类、标签、评论与配置
- R2：封面和正文媒体
- 可选 KV：缓存站点配置和速率限制状态

### 方式 A：Deploy to Cloudflare 按钮

点击 README 顶部按钮，授权 GitHub 和 Cloudflare。首次部署后，在 Cloudflare 控制台中确认或创建以下绑定：

| 类型 | Binding | 推荐资源名 |
|---|---|---|
| D1 | `DB` | `forgepress-db` |
| R2 | `MEDIA` | `forgepress-media` |

随后设置管理员密钥：

```bash
pnpm --filter @forgepress/web wrangler secret put ADMIN_TOKEN
```

执行远程迁移：

```bash
pnpm --filter @forgepress/web wrangler d1 migrations apply forgepress-db --remote
```

### 方式 B：一条命令初始化并部署

先登录 Wrangler：

```bash
pnpm dlx wrangler login
```

然后执行：

```bash
pnpm cf:bootstrap
```

脚本会：

1. 创建 `forgepress-db` D1 数据库；
2. 创建 `forgepress-media` R2 存储桶；
3. 把生成的 D1 ID 写入 `apps/web/wrangler.jsonc`；
4. 应用远程 D1 迁移；
5. 提示设置 `ADMIN_TOKEN`；
6. 构建并部署 Worker。

如资源已存在，脚本会复用资源而不是删除数据。

### 方式 C：GitHub Actions

在仓库的 Actions Secrets 中配置：

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

然后运行 `Deploy Cloudflare` 工作流。首次部署前仍需创建 D1/R2 资源并把真实 D1 `database_id` 写入 `apps/web/wrangler.jsonc`。

## 部署到 Cloudflare Pages（静态传播版）

Cloudflare Pages 版本位于 `apps/pages`。它是只读静态站点，文章来自 `packages/content`，不包含在线管理、评论写入和媒体上传。

在 Cloudflare Pages 中连接本仓库并填写：

```text
Root directory: /
Build command: corepack enable && pnpm install --frozen-lockfile=false && pnpm --filter @forgepress/pages build
Build output directory: apps/pages/dist
Node.js version: 22
```

也可以本地直接发布：

```bash
pnpm install
pnpm deploy:pages
```

需要完整 SSR、后台、D1 和 R2 时，请选择 Workers 版。Pages 版定位是“Fork 即发布”的轻量展示版本。

## Cloudflare 配置文件

`apps/web/wrangler.jsonc` 默认使用占位 D1 ID：

```jsonc
"database_id": "REPLACE_WITH_D1_DATABASE_ID"
```

该占位符不能用于生产部署。运行 `pnpm cf:bootstrap` 自动替换，或手动执行：

```bash
pnpm --filter @forgepress/web wrangler d1 create forgepress-db
pnpm --filter @forgepress/web wrangler r2 bucket create forgepress-media
```

## 内容 API

### 读取文章

```bash
curl https://your-worker.example/api/posts
```

### 创建文章

```bash
curl https://your-worker.example/api/posts \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  --data '{
    "title": "Hello ForgePress",
    "slug": "hello-forgepress",
    "excerpt": "第一篇文章",
    "content": "# Hello",
    "tags": ["Next.js", "Cloudflare"]
  }'
```

### 上传媒体到 R2

```bash
curl https://your-worker.example/api/media/cover.png \
  -X PUT \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: image/png" \
  --data-binary @cover.png
```

## 主题定制

全局 Token 位于 `packages/theme/src/index.ts`，页面样式消费 CSS 变量：

```css
:root {
  --fp-primary: #8b5cf6;
  --fp-accent: #ff7ab6;
  --fp-cyan: #5ee7f7;
  --fp-radius-card: 24px;
  --fp-content-width: 1120px;
}
```

可以只换 Token，也可以新建完整主题。视觉规范见 [`docs/customization.md`](docs/customization.md)。

## 安全说明

`v0.1.0` 的管理写入接口使用单一 `ADMIN_TOKEN`，用于验证 Cloudflare 部署、D1 写入和 R2 上传链路。它不是最终多用户权限系统。

生产使用必须：

- 通过 `wrangler secret put ADMIN_TOKEN` 设置高熵密钥；
- 不把密钥写入 `.dev.vars` 以外的受版本控制文件；
- 在公网开放管理台前增加 Cloudflare Access；
- 后续升级到数据库 Session、Argon2id 和细粒度 RBAC。

路线图见 Issues 和 [`docs/architecture.md`](docs/architecture.md)。

## 校验

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm preview:cf
```

## License

MIT
