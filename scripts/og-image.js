// Takes a picture of the built link-preview card (dist/og.html) into public/og-image.png, the image
// the page's link-preview tags point to, and records the card's fingerprint in scripts/og.sha256 for
// the build test. Run by `mise run og`, which builds first; Cloudflare doesn't run it, since its
// build image has no browser.
import { readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { preview } from 'vite'
import { pageHash } from './page-hash.js'

const server = await preview({ logLevel: 'warn', preview: { port: 4319, strictPort: true } })
try {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(`${server.resolvedUrls.local[0]}og.html`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/og-image.png' })
  await browser.close()
} finally {
  await new Promise((done) => server.httpServer.close(done))
}
await writeFile('scripts/og.sha256', `${pageHash(await readFile('dist/og.html', 'utf8'))}\n`)
console.log('public/og-image.png and scripts/og.sha256 written')
