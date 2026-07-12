# ForgePress contributor guide

- Keep the Cloudflare Workers and static Pages targets working.
- Do not access D1, R2, KV, or environment variables directly from UI components. Use adapters in `apps/web/src/lib`.
- Preserve the theme token contract in `packages/theme`.
- New public pages must remain keyboard accessible and responsive.
- Never commit real account IDs, database IDs, API tokens, session secrets, or administrator passwords.
- Before opening a pull request, run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
