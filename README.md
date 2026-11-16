# andrew.molyuk.com

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/673652e07e9742fdbaaaff3f1452c9e1)](https://app.codacy.com/gh/andrewmolyuk/andrew.molyuk.com/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

Personal site — portfolio and contact info. Vue 3 + TypeScript + Tailwind CSS v4, built with Vite,
deployed as a static Cloudflare Worker.

## Development

Every command runs through [mise](https://mise.jdx.dev), which also installs the pinned Node, pnpm
and `hathi`:

```bash
mise trust && mise run setup   # once per clone: tools, dependencies, Git hooks
mise run dev                   # local dev server with hot reload
mise run check                 # lint, format check, type check, tests
mise run build                 # type-check, build and prerender to dist/
mise run preview               # serve the production build locally
mise run cv                    # print the CV page to the PDF the site links to
mise run og                    # take the link-preview card's picture
mise tasks                     # all the tasks
```

Turn the Git hooks in `.githooks/` on once in each clone: `git config core.hooksPath .githooks`.

## Deployment

Deploys via [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) —
pushes to `master` build and deploy automatically, through `package.json`'s `build` script, since
the build image has no mise. To deploy by hand:

```bash
mise run deploy   # build + wrangler deploy
```
