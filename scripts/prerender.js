// Puts each rendered page into its built HTML file (the site's index.html, the CV's cv.html and the
// link-preview card's og.html), so a crawler that runs no JavaScript still reads it. Run after
// `vite build`, with the build's folder (default: dist). Plain JavaScript, not TypeScript, so it runs
// on any Node the build machine has.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const outDir = resolve(process.argv[2] ?? 'dist')
// Inside the project whatever outDir is: the server build imports vue from node_modules, which Node
// finds only from a folder under the project. The pid keeps two builds at once apart.
const ssrDir = resolve(`node_modules/.prerender-${process.pid}`)
const EMPTY = '<div id="app"></div>'

await build({ logLevel: 'warn', build: { ssr: 'src/entry-server.ts', outDir: ssrDir, emptyOutDir: true } })
const { PAGES } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

for (const [name, render] of Object.entries(PAGES)) {
  const file = join(outDir, name)
  const html = await readFile(file, 'utf8')
  if (!html.includes(EMPTY)) throw new Error(`${file} has no empty ${EMPTY} to fill: was it prerendered already?`)
  const { html: page, renderedOn } = await render()
  // A function, not a string, as the replacement: the page holds "$" (the "~$" prompt), which a
  // replacement string would read as a pattern.
  await writeFile(
    file,
    html.replace(EMPTY, () => `<div id="app" data-rendered-on="${renderedOn}">${page}</div>`),
  )
}
await rm(ssrDir, { recursive: true })
