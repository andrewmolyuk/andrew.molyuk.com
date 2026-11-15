// The ways to reach Andrew, wherever the page offers them.

export const TELEGRAM = { href: 'https://t.me/andrewmolyuk', handle: 't.me/andrewmolyuk' }
export const LINKEDIN = 'https://linkedin.com/in/andrewmolyuk'
export const EMAIL = 'andrew@molyuk.com'
/** Made from the CV page by `mise run cv`. */
export const CV = '/andrew-molyuk-cv.pdf'

// The number is assembled only on click, so it never sits in the page for scrapers to collect:
// each part is reversed, and the parts are in reverse order.
const WA = ['2847', '674', '45', '279']

export function whatsAppNumber(): string {
  return WA.map((part) => [...part].reverse().join(''))
    .reverse()
    .join('')
}
