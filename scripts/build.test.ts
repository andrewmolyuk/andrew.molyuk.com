// Checks the built site the way a crawler or a scraper sees it: the files in the build, with no
// JavaScript run. It builds into a folder of its own, so it never touches dist/.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { extname, join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { whatsAppNumber } from '../src/lib/contact.ts'

const OUT = mkdtempSync(join(tmpdir(), 'andrew-molyuk-build-'))
const read = (file: string) => readFileSync(join(OUT, file), 'utf8')
let html = ''

beforeAll(() => {
  // Vitest sets NODE_ENV=test, which would build the page as in development (comments kept, for one).
  const env = { ...process.env, NODE_ENV: 'production' }
  execFileSync('pnpm', ['exec', 'vite', 'build', '--outDir', OUT, '--emptyOutDir', '--logLevel', 'warn'], { env })
  execFileSync('node', ['scripts/prerender.js', OUT], { env })
  html = read('index.html')
}, 120_000)

afterAll(() => rmSync(OUT, { recursive: true, force: true }))

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  )
}

describe('prerendered page', () => {
  it('holds every section and its heading without running JavaScript', () => {
    const app = html.slice(html.indexOf('<div id="app"'))
    expect(app).toMatch(/<h1[^>]*>\s*Andrew Molyuk\s*<\/h1>/)
    for (const heading of ['How I Think About Systems', 'Technical Focus', 'What I&#39;m Building', 'Let&#39;s talk']) {
      expect(app).toContain(heading)
    }
  })

  it('puts the sections in order: Hero, Experience, Skills, Projects, Contact', () => {
    const at = ['approach', 'skills', 'projects', 'contact'].map((id) => html.indexOf(`id="${id}"`))
    expect(at.every((i) => i > 0)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  it('links the header to every section', () => {
    const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'))
    expect([...header.matchAll(/href="#(\w+)"/g)].map((m) => m[1])).toEqual([
      'approach',
      'skills',
      'projects',
      'contact',
    ])
  })

  it('opens every link that leaves the site in a new tab, with noopener noreferrer', () => {
    const app = html.slice(html.indexOf('<div id="app"'))
    const links = [...app.matchAll(/<a\b[^>]*href="https?:[^>]*>/g)].map((m) => m[0])
    expect(links.length).toBeGreaterThan(10)
    for (const a of links) {
      expect(a, a).toContain('target="_blank"')
      expect(a, a).toContain('rel="noopener noreferrer"')
    }
  })

  it('links each project name to its live site, and the GitHub mark after it to its public repository', () => {
    const projects = html.slice(html.indexOf('id="projects"'), html.indexOf('id="contact"'))
    expect(projects).toMatch(/<a href="https:\/\/servienta\.com"[^>]*>servienta<\/a>/)
    expect(projects).toMatch(
      /<a href="https:\/\/github\.com\/servienta\/servienta"[^>]*aria-label="servienta on GitHub"/,
    )
    // chainofsale's repository is private, so it has no GitHub mark.
    expect(projects).toMatch(/<a href="https:\/\/chainofsale\.com"[^>]*>chainofsale<\/a>/)
    expect(projects).not.toContain('chainofsale on GitHub')
    // instrumenta has no live site, so its name links nowhere.
    expect(projects).toMatch(/<span[^>]*>instrumenta<\/span>/)
    expect(projects).toContain('aria-label="instrumenta on GitHub"')
  })
})

describe('WhatsApp number', () => {
  it('appears in no built file, together or split by spaces, dashes, dots or brackets', () => {
    const local = whatsAppNumber().replace(/^972/, '')
    const pattern = new RegExp([...local].join('[\\s\\-.()]*'))
    const text = ['.html', '.js', '.css', '.txt', '.xml', '.json', '.svg']
    for (const file of files(OUT).filter((f) => text.includes(extname(f)))) {
      expect(pattern.test(readFileSync(file, 'utf8')), file).toBe(false)
    }
  })
})

describe('sharing and discovery', () => {
  const PROFILES = [
    'https://github.com/andrewmolyuk',
    'https://linkedin.com/in/andrewmolyuk',
    'https://t.me/andrewmolyuk',
  ]

  it('has a title, description, canonical URL and link-preview tags with a 1200×630 image', () => {
    expect(html).toMatch(/<title>[^<]+<\/title>/)
    expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]+"/)
    expect(html).toContain('<link rel="canonical" href="https://andrew.molyuk.com/" />')
    for (const tag of ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:image']) {
      expect(html).toMatch(new RegExp(`(property|name)="${tag}"`))
    }
    expect(html).toContain('<meta property="og:image:width" content="1200" />')
    expect(html).toContain('<meta property="og:image:height" content="630" />')

    const png = readFileSync(join(OUT, 'og-image.png'))
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630])
  })

  it('describes Andrew as a schema.org Person linked to his profiles', () => {
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]
    const person = JSON.parse(json)
    expect(person['@type']).toBe('Person')
    expect(person.sameAs).toEqual(PROFILES)
  })

  it('lists every section and profile in llms.txt', () => {
    const llms = read('llms.txt')
    for (const id of ['approach', 'skills', 'projects', 'contact']) expect(llms).toContain(`/#${id})`)
    for (const profile of PROFILES) expect(llms).toContain(`(${profile})`)
  })

  it('lets every crawler in and points it to the sitemap of the one page', () => {
    expect(read('robots.txt')).toMatch(/User-agent: \*\s+Allow: \//)
    expect(read('robots.txt')).toContain('Sitemap: https://andrew.molyuk.com/sitemap.xml')
    expect(read('sitemap.xml')).toContain('<loc>https://andrew.molyuk.com/</loc>')
  })
})

describe('text colors', () => {
  const css = readFileSync('src/style.css', 'utf8')
  const color = (name: string) => css.match(new RegExp(`--color-${name}: (#[0-9a-f]{6})`))![1]
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
  }

  it('meet WCAG AA, 4.5:1, on every background', () => {
    for (const text of ['heading', 'body', 'muted', 'faint', 'accent']) {
      for (const bg of ['ink', 'panel', 'panel-alt']) {
        expect(contrast(color(text), color(bg)), `${text} on ${bg}`).toBeGreaterThanOrEqual(4.5)
      }
    }
  })
})
