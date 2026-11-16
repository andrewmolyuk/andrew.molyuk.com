// Takes full-page screenshots of the built site at desktop, tablet and phone widths into <dir>, and
// prints for each its page height, any horizontal overflow and the console's errors: the way to see a
// change in a browser. Run by `mise run shots <dir> [page]`, which builds first; page is a path under
// dist/, such as cv.html, and the home page by default.
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { preview } from 'vite'

const [dir, path = ''] = process.argv.slice(2)
if (!dir) {
  console.error('usage: mise run shots <dir> [page]')
  process.exit(2)
}
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'phone', width: 390, height: 844 },
]

await mkdir(dir, { recursive: true })
const server = await preview({ logLevel: 'warn', preview: { port: 4320, strictPort: true } })
try {
  const browser = await chromium.launch()
  for (const { name, width, height } of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width, height } })
    // Cloudflare's analytics beacon only works on the live site; served empty, it stays out of the errors.
    await page.route('**/*cloudflareinsights.com/**', (r) =>
      r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }),
    )
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(`${server.resolvedUrls.local[0]}${path}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const file = join(dir, `${name}-${width}.png`)
    await page.screenshot({ path: file, fullPage: true })
    const { pageHeight, scrollWidth } = await page.evaluate(() => ({
      pageHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    const overflow = scrollWidth > width ? `overflows by ${scrollWidth - width}px` : 'no overflow'
    console.log(`${file}  height ${pageHeight}  ${overflow}  errors ${errors.length ? errors.join(' | ') : 'none'}`)
    await page.close()
  }
  await browser.close()
} finally {
  await new Promise((done) => server.httpServer.close(done))
}
