// Prints the built CV page (dist/cv.html) to public/andrew-molyuk-cv.pdf, the file the site links to,
// and records the CV's fingerprint in scripts/cv.sha256 for the build test. Run by `mise run cv`,
// which builds first; Cloudflare doesn't run it, since its build image has no browser.
import { readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { preview } from 'vite'
import { cvHash } from './cv-hash.js'

const server = await preview({ logLevel: 'warn', preview: { port: 4318, strictPort: true } })
try {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${server.resolvedUrls.local[0]}cv.html`, { waitUntil: 'networkidle' })
  await page.pdf({ path: 'public/andrew-molyuk-cv.pdf', preferCSSPageSize: true, printBackground: true })
  await browser.close()
} finally {
  await new Promise((done) => server.httpServer.close(done))
}
await writeFile('scripts/cv.sha256', `${cvHash(await readFile('dist/cv.html', 'utf8'))}\n`)
console.log('public/andrew-molyuk-cv.pdf and scripts/cv.sha256 written')
