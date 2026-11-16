# The site is prerendered by its own script, its CV PDF and link-preview image are committed, and its commands run through mise

Date: 2026-11-16

- Crawlers that run no JavaScript must read the whole page, so after `vite build`,
  `scripts/prerender.js` renders every page with `vue/server-renderer` (part of `vue`): the site's
  `App` into `dist/index.html`, where the browser hydrates it, and the CV's `CvPage` into
  `dist/cv.html` and the link-preview card's `OgCard` into `dist/og.html`, which run no JavaScript.
  No vite-ssg: for three pages it would add a dependency and nothing else.
- The prerender writes the day it rendered on into `#app` as `data-rendered-on`, a calendar day
  (`2026-11-15`), not an instant in UTC. The browser hydrates with that day and switches to today
  only after mount (`src/lib/today.ts`, `src/main.ts`). Hydrating with today breaks it: Vue does
  not patch `style` attributes while hydrating, so the timeline's bars would stay at the build's
  month, and the year's count would mismatch once the year turns. An instant in UTC would give
  another day than the build's to a visitor many hours off UTC.
- The CV PDF, `public/andrew-molyuk-cv.pdf`, is printed from the built CV page by `mise run cv`
  with Playwright, pinned exactly, and committed. Cloudflare's build doesn't run a browser; the
  build test fails when the CV changed and the PDF wasn't printed again.
- The link-preview image, `public/og-image.png`, is made the same way: `og.html` holds the Hero as
  a 1200×630 card (`src/OgCard.vue`), prerendered with the other pages, and `mise run og` takes its
  picture with Playwright and records its fingerprint in `scripts/og.sha256`, so the build test
  fails when the Hero's data changed and the picture wasn't taken again.
- Every command runs from `mise.toml`, with the tools pinned there. `package.json` keeps only the
  `build` script, because Cloudflare Workers Builds runs `pnpm run build` on every push to
  `master` and its build image has no mise. `.claude/settings.json` allows `mise run check`,
  `test`, `lint` and `build`, but not `deploy` and not `mise run *`.

## Considered options

- vite-ssg for the prerender: worth it once the site has more pages than the site, its CV and its
  link-preview card.

## Consequences

- Crawlers see the date-dependent values (years in the field, the footer's year, the timeline) as
  of the last deploy; visitors get today's after the JavaScript loads.
- Removing `build` from `package.json`, or running a bare `vite build` in Cloudflare, ships the
  pages without the prerender.
