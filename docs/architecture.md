# Architecture

## Deployment profiles

ForgePress deliberately supports two profiles.

### Workers full-stack profile

`apps/web` is a Next.js application built by `@opennextjs/cloudflare`.

- React Server Components render the public site and admin UI.
- Route Handlers expose content and media APIs.
- D1 stores mutable content.
- R2 stores media.
- The adapter layer falls back to seed content in ordinary Node development.

This profile is the canonical product.

### Pages static profile

`apps/pages` is an Astro application that imports the same content and theme packages.

- It outputs static HTML.
- It has no authenticated write surface.
- It is intended for forks, previews, portfolios, mirrors and low-maintenance personal sites.

## Boundary rules

1. UI files do not call D1 or R2 directly.
2. Cloudflare bindings are obtained in server-only adapter modules.
3. Shared packages contain platform-neutral TypeScript.
4. Theme customization uses a stable token contract.
5. The public site must remain usable with animations disabled.
6. Static Pages output must not pretend to support dynamic admin features.

## Next milestones

- Database sessions, Argon2id credentials and OAuth.
- Role-based access control.
- Revision history and scheduled publishing.
- Markdown/MDX rendering pipeline with Shiki, KaTeX and Mermaid.
- Comment moderation and Cloudflare Turnstile.
- PostgreSQL and S3 adapters for Docker deployments.
- Plugin lifecycle and block registry.
