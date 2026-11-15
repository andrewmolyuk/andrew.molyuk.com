import { createHash } from 'node:crypto'

/**
 * A fingerprint of the CV's content in a built cv.html: the prerendered #app, without the day it was
 * rendered on. scripts/cv-pdf.js records it beside the PDF it prints, and the build test compares it
 * with a fresh build, so a CV that changed without a new PDF fails the tests.
 */
export function cvHash(html) {
  const app = html.slice(html.indexOf('<div id="app"'), html.lastIndexOf('</body>'))
  return createHash('sha256')
    .update(app.replace(/ data-rendered-on="[^"]*"/, ''))
    .digest('hex')
}
