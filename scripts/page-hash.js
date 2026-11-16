import { createHash } from 'node:crypto'

/**
 * A fingerprint of a built page's content (cv.html, og.html): the prerendered #app, without the day
 * it was rendered on. The script that makes a file from the page (cv-pdf.js, og-image.js) records it
 * beside that file, and the build test compares it with a fresh build, so a page that changed
 * without its file made again fails the tests.
 */
export function pageHash(html) {
  const app = html.slice(html.indexOf('<div id="app"'), html.lastIndexOf('</body>'))
  return createHash('sha256')
    .update(app.replace(/ data-rendered-on="[^"]*"/, ''))
    .digest('hex')
}
