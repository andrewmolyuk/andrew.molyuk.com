# andrew.molyuk.com

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/673652e07e9742fdbaaaff3f1452c9e1)](https://app.codacy.com/gh/andrewmolyuk/andrew.molyuk.com/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

Personal site — portfolio and contact info. Vue 3 + TypeScript + Tailwind CSS v4, built with Vite,
deployed as a static Cloudflare Worker.

## Development

```bash
pnpm install
pnpm dev       # local dev server
pnpm build     # typecheck + production build to dist/
pnpm preview   # serve the production build locally
```

## Deployment

Deploys via [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) —
pushes to `master` build and deploy automatically. To deploy manually:

```bash
pnpm deploy    # build + wrangler deploy
```
