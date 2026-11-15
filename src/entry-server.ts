import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { RENDERED_ON } from './lib/today'

/** The page as HTML, and the date it was rendered on, for scripts/prerender.js to put into the built index.html. */
export async function render(): Promise<{ html: string; renderedOn: string }> {
  const renderedOn = new Date()
  const app = createSSRApp(App).provide(RENDERED_ON, renderedOn)
  return { html: await renderToString(app), renderedOn: renderedOn.toISOString() }
}
